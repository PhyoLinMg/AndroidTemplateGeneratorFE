export type GenerateTemplateRequest = {
  projectName: string
  packageName: string
  dependencyList: string[]
  compilerType: "kapt" | "ksp"
}

export type GenerateTemplateResponse = {
  blob: Blob
  filename: string
  contentType: string
  status: number
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080"

export class TemplateGenerationError extends Error {
  constructor(
    message: string,
    public status?: number,
    public code?: string
  ) {
    super(message)
    this.name = "TemplateGenerationError"
  }
}

export async function generateTemplate(payload: GenerateTemplateRequest, grade:String): Promise<GenerateTemplateResponse> {
  const url = `${API_BASE_URL}/api/templates/${grade}/generate`

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/octet-stream",
      },
      body: JSON.stringify(payload),
    })

    // Check if the response is ok (status 200-299)
    if (!response.ok) {
      let errorMessage = `Request failed with status ${response.status}`
      
      // Try to get error details from response body
      try {
        const errorText = await response.text()
        if (errorText) {
          // Try to parse as JSON for structured error messages
          try {
            const errorJson = JSON.parse(errorText)
            errorMessage = errorJson.message || errorJson.error || errorText
          } catch {
            // If not JSON, use the text as is
            errorMessage = errorText
          }
        }
      } catch {
        // If we can't read the error body, use the status-based message
      }

      throw new TemplateGenerationError(errorMessage, response.status)
    }

    const contentType = response.headers.get("Content-Type") || ""
    const disposition = response.headers.get("Content-Disposition") || ""
    const suggestedName = (() => {
      const match = disposition.match(/filename\*=UTF-8''([^;]+)|filename="?([^;"]+)"?/i)
      if (match) {
        return decodeURIComponent(match[1] || match[2])
      }
      return `${payload.projectName}.zip`
    })()

    const blob = await response.blob()

    // Validate that we received a valid blob
    if (!blob || blob.size === 0) {
      throw new TemplateGenerationError("Received empty file from server", response.status)
    }

    return {
      blob,
      filename: suggestedName,
      contentType,
      status: response.status,
    }
  } catch (error) {
    if (error instanceof TemplateGenerationError) {
      throw error
    }
    
    // Handle network errors, timeout, etc.
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new TemplateGenerationError(
        "Network error: Unable to connect to the template generation service. Please check your internet connection and try again.",
        undefined,
        "NETWORK_ERROR"
      )
    }
    
    // Handle other unexpected errors
    throw new TemplateGenerationError(
      `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
      undefined,
      "UNKNOWN_ERROR"
    )
  }
}

export async function downloadBlob(blob: Blob, filename: string): Promise<void> {
  try {
    // Validate inputs
    if (!blob) {
      throw new TemplateGenerationError("No file data to download", undefined, "INVALID_BLOB")
    }
    
    if (!filename || filename.trim() === "") {
      throw new TemplateGenerationError("Invalid filename provided", undefined, "INVALID_FILENAME")
    }

    // Check if browser supports the required APIs
    if (typeof URL === 'undefined' || !URL.createObjectURL) {
      throw new TemplateGenerationError("Browser does not support file downloads", undefined, "BROWSER_NOT_SUPPORTED")
    }

    const url = URL.createObjectURL(blob)
    
    try {
      const a = document.createElement("a")
      a.href = url
      a.download = filename
      a.style.display = "none"
      
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } finally {
      // Always revoke the URL to prevent memory leaks
      URL.revokeObjectURL(url)
    }
  } catch (error) {
    if (error instanceof TemplateGenerationError) {
      throw error
    }
    
    throw new TemplateGenerationError(
      `Failed to download file: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
      undefined,
      "DOWNLOAD_ERROR"
    )
  }
}


