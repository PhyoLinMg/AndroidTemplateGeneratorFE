"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FolderTree } from "@/components/folder-tree"
import { Code2, Layers, Rocket, Lock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { templates } from "@/lib/utils"
import { generateTemplate, downloadBlob, TemplateGenerationError } from "@/network/templates"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

type TemplateType = "basic" | "intermediate" | "advanced" | null

export function TemplateGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [projectName, setProjectName] = useState("MyAndroidApp")
  const [packageName, setPackageName] = useState("com.example.myapp")
  const [isGenerating, setIsGenerating] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [validationErrors, setValidationErrors] = useState<{
    projectName?: string
    packageName?: string
  }>({})
  const [retryCount, setRetryCount] = useState(0)
  const [networkClientType, setNetworkLibrary] = useState<"Retrofit" | "Ktor">("Ktor")
  const [dependencyInjectionType, setDiLibrary] = useState<"Hilt" | "Koin">("Hilt")
  const [compileTime, setAnnotationProcessor] = useState<"KAPT" | "KSP">("KSP")

  const [features, setFeatures] = useState({
    compose: true,
    viewModel: true,
    coroutines: true,
    room: false,
    navigation: false,
  })

  const templateStatus = {
    basic: { available: true, status: "Released" },
    intermediate: { available: true, status: "Coming Soon" },
    advanced: { available: false, status: "Planned" },
  }
  const toggleFeature = (feature: keyof typeof features) => {
    setFeatures((prev) => ({ ...prev, [feature]: !prev[feature] }))
  }

  const validateInputs = (): boolean => {
    const errors: { projectName?: string; packageName?: string } = {}
    let isValid = true

    // Validate project name
    if (!projectName || projectName.trim() === "") {
      errors.projectName = "Project name is required"
      isValid = false
    } else if (!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(projectName.trim())) {
      errors.projectName = "Project name must start with a letter and contain only letters, numbers, and underscores"
      isValid = false
    } else if (projectName.trim().length > 50) {
      errors.projectName = "Project name must be less than 50 characters"
      isValid = false
    }

    // Validate package name
    if (!packageName || packageName.trim() === "") {
      errors.packageName = "Package name is required"
      isValid = false
    } else if (!/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)*$/.test(packageName.trim())) {
      errors.packageName = "Package name must be in format like 'com.example.myapp' (lowercase, dots, underscores only)"
      isValid = false
    } else if (packageName.trim().length > 100) {
      errors.packageName = "Package name must be less than 100 characters"
      isValid = false
    }

    setValidationErrors(errors)
    return isValid
  }

  const clearErrors = () => {
    setErrorMessage(null)
    setValidationErrors({})
    setRetryCount(0)
  }

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
    handleDownload()
  }

  const handleDownload = async () => {
    // Clear previous errors but keep retry count
    setErrorMessage(null)
    setValidationErrors({})

    // Validate template selection
    if (!selectedTemplate) {
      setErrorMessage("Please choose a template first.")
      return
    }

    // Validate inputs
    if (!validateInputs()) {
      return
    }

    setIsGenerating(true)
    
    try {
      const dependencyList: string[] = [
        dependencyInjectionType.toLowerCase(),
        networkClientType.toLowerCase(),
        ...(features.coroutines ? ["coroutines"] : []),
        ...(features.viewModel ? ["viewmodel"] : []),
      ]

      const { blob, filename, status } = await generateTemplate({
        projectName: projectName.trim(),
        packageName: packageName.trim(),
        dependencyList,
        compilerType: compileTime.toLowerCase() as "kapt" | "ksp",
      })

      // The generateTemplate function now throws errors for non-2xx responses
      // If we reach here, the response was successful
      await downloadBlob(blob, filename || `${projectName.trim()}.zip`)
      setIsDialogOpen(false)
      
      // Show success message (optional - you might want to add a toast notification)
      console.log("Template generated and downloaded successfully")
      
    } catch (error) {
      console.error("Failed to generate template:", error)
      
      if (error instanceof TemplateGenerationError) {
        // Handle specific error types with appropriate user messages
        switch (error.code) {
          case "NETWORK_ERROR":
            setErrorMessage("Unable to connect to the template generation service. Please check your internet connection and try again.")
            break
          case "INVALID_BLOB":
            setErrorMessage("The generated template file is invalid. Please try again.")
            break
          case "INVALID_FILENAME":
            setErrorMessage("There was an issue with the generated file name. Please try again.")
            break
          case "BROWSER_NOT_SUPPORTED":
            setErrorMessage("Your browser doesn't support file downloads. Please try using a different browser.")
            break
          case "DOWNLOAD_ERROR":
            setErrorMessage("Failed to download the generated template. Please try again.")
            break
          default:
            // Use the error message from the server or fallback message
            setErrorMessage(error.message || "An unexpected error occurred while generating your template.")
        }
      } else {
        // Handle unexpected errors
        setErrorMessage("An unexpected error occurred. Please try again or contact support if the problem persists.")
      }
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
    {/* Header */}
    <header className="border-b border-border bg-card">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Code2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-balance">Android Template Generator</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <a href="/release-notes" className="text-muted-foreground hover:text-foreground transition-colors">
              Release Notes
            </a>
            <a href="/support" className="text-muted-foreground hover:text-foreground transition-colors">
              Support
            </a>
          </nav>
        </div>
      </div>
    </header>

    {/* Main Content */}
    <main className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-bold mb-4 text-balance">Choose Your Android Template</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
          Select a template that matches your Android project needs. Each template provides a different level of
          structure and architectural complexity.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-muted rounded-lg">
          <Badge variant="default">Basic Released</Badge>
          <span className="text-sm text-muted-foreground">Intermediate & Advanced coming soon</span>
        </div>
      </div>

      {/* Template Selection Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {(Object.keys(templates) as TemplateType[]).map((key) => {
          if (!key) return null
          const template = templates[key]
          const Icon = template.icon
          const isSelected = selectedTemplate === key
          const status = templateStatus[key]
          const isAvailable = status.available

          return (
            <Card
              key={key}
              className={`cursor-pointer transition-all hover:shadow-lg ${
                isSelected ? "ring-2 ring-primary shadow-lg" : ""
              } ${!isAvailable ? "opacity-60" : ""}`}
              onClick={() => isAvailable && setSelectedTemplate(key)}
            >
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-lg ${
                      isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                    }`}
                  >
                    {!isAvailable ? <Lock className="h-6 w-6" /> : <Icon className="h-6 w-6" />}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{template.title}</CardTitle>
                    <Badge variant={isAvailable ? "default" : "secondary"} className="mt-1">
                      {status.status}
                    </Badge>
                  </div>
                </div>
                <CardDescription className="text-pretty">{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  variant={isSelected ? "default" : "outline"}
                  disabled={!isAvailable}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (isAvailable) setSelectedTemplate(key)
                  }}
                >
                  {!isAvailable ? status.status : isSelected ? "Selected" : "Select Template"}
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Folder Structure Visualization */}
      {selectedTemplate && (
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Project Structure</CardTitle>
              <CardDescription>
                Preview the folder structure for the {templates[selectedTemplate].title.toLowerCase()} template
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted rounded-lg p-6 font-mono text-sm">
                <FolderTree node={templates[selectedTemplate].structure} />
              </div>
              <div className="mt-6">
                <Button className="w-full" size="lg" onClick={() => setIsDialogOpen(true)} disabled={false}>
                  Generate Project
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </main>

    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Customize Your Android Project</DialogTitle>
          <DialogDescription>
            Configure your project settings and select the features you want to include.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Project Details Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Project Details</h3>

            <div className="space-y-2">
              <Label htmlFor="projectName">Project Name</Label>
              <Input
                id="projectName"
                value={projectName}
                onChange={(e) => {
                  setProjectName(e.target.value)
                  // Clear validation error when user starts typing
                  if (validationErrors.projectName) {
                    setValidationErrors(prev => ({ ...prev, projectName: undefined }))
                  }
                }}
                placeholder="MyAndroidApp"
                className={validationErrors.projectName ? "border-destructive" : ""}
              />
              {validationErrors.projectName && (
                <p className="text-sm text-destructive">{validationErrors.projectName}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="packageName">Package Name</Label>
              <Input
                id="packageName"
                value={packageName}
                onChange={(e) => {
                  setPackageName(e.target.value)
                  // Clear validation error when user starts typing
                  if (validationErrors.packageName) {
                    setValidationErrors(prev => ({ ...prev, packageName: undefined }))
                  }
                }}
                placeholder="com.example.myapp"
                className={validationErrors.packageName ? "border-destructive" : ""}
              />
              {validationErrors.packageName && (
                <p className="text-sm text-destructive">{validationErrors.packageName}</p>
              )}
            </div>
          </div>

          {/* Features Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Features & Libraries</h3>

            {/* UI Features - Jetpack Compose only */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">UI Framework</h4>
              <div className="flex items-center space-x-2 px-4 py-3 bg-muted rounded-lg">
                <Checkbox id="compose" checked={features.compose} disabled />
                <Label htmlFor="compose" className="cursor-default">
                  Jetpack Compose (Default)
                </Label>
              </div>
            </div>

            {/* Network - Radio Group */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">Network Library (Choose One)</h4>
              <RadioGroup value={networkClientType} onValueChange={(value) => setNetworkLibrary(value as any)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Retrofit" id="network-retrofit" />
                  <Label htmlFor="network-retrofit" className="cursor-pointer">
                    Retrofit
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Ktor" id="network-ktor" />
                  <Label htmlFor="network-ktor" className="cursor-pointer">
                    Ktor
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Dependency Injection - Radio Group */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">Dependency Injection (Choose One)</h4>
              <RadioGroup value={dependencyInjectionType} onValueChange={(value) => setDiLibrary(value as any)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Hilt" id="di-hilt" />
                  <Label htmlFor="di-hilt" className="cursor-pointer">
                    Hilt
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Koin" id="di-koin" />
                  <Label htmlFor="di-koin" className="cursor-pointer">
                    Koin
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Annotation Processing - Radio Group */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">Annotation Processing (Choose One)</h4>
              <RadioGroup value={compileTime} onValueChange={(value) => setAnnotationProcessor(value as any)}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="KAPT" id="compile-kapt" />
                  <Label htmlFor="compile-kapt" className="cursor-pointer">
                    KAPT
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="KSP" id="compile-ksp" />
                  <Label htmlFor="compile-ksp" className="cursor-pointer">
                    KSP
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Other Libraries */}
            <div className="space-y-3">
              <h4 className="font-medium text-sm text-muted-foreground">Other Libraries</h4>
              <div className="space-y-2">
                {/* Default libraries - disabled checkboxes */}
                <div className="flex items-center space-x-2 px-4 py-2 bg-muted rounded-lg">
                  <Checkbox id="viewModel" checked={features.viewModel} disabled />
                  <Label htmlFor="viewModel" className="cursor-default">
                    ViewModel (Default)
                  </Label>
                </div>

                <div className="flex items-center space-x-2 px-4 py-2 bg-muted rounded-lg">
                  <Checkbox id="coroutines" checked={features.coroutines} disabled />
                  <Label htmlFor="coroutines" className="cursor-default">
                    Kotlin Coroutines (Default)
                  </Label>
                </div>

                {/* Optional libraries */}
                {/* <div className="flex items-center space-x-2">
                  <Checkbox id="room" checked={features.room} onCheckedChange={() => toggleFeature("room")} />
                  <Label htmlFor="room" className="cursor-pointer">
                    Room Database
                  </Label>
                </div> */}

                {/* <div className="flex items-center space-x-2">
                  <Checkbox
                    id="navigation"
                    checked={features.navigation}
                    onCheckedChange={() => toggleFeature("navigation")}
                  />
                  <Label htmlFor="navigation" className="cursor-pointer">
                    Navigation Component
                  </Label>
                </div> */}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="flex-col space-y-4">
          {/* Error Message Display */}
          {errorMessage && (
            <div className="w-full p-3 bg-destructive/10 border border-destructive/20 rounded-md">
              <p className="text-sm text-destructive mb-2">{errorMessage}</p>
              {retryCount < 3 && (
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    {retryCount > 0 && `Retry attempt ${retryCount}/3`}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRetry}
                    disabled={isGenerating}
                    className="text-xs"
                  >
                    {isGenerating ? "Retrying..." : "Try Again"}
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {/* Validation Errors Display */}
          {(validationErrors.projectName || validationErrors.packageName) && (
            <div className="w-full space-y-2">
              {validationErrors.projectName && (
                <p className="text-sm text-destructive">• {validationErrors.projectName}</p>
              )}
              {validationErrors.packageName && (
                <p className="text-sm text-destructive">• {validationErrors.packageName}</p>
              )}
            </div>
          )}
          
          <div className="flex justify-end space-x-2 w-full">
            <Button 
              variant="outline" 
              onClick={() => {
                setIsDialogOpen(false)
                clearErrors()
              }}
              disabled={isGenerating}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleDownload} 
              disabled={isGenerating}
              className="min-w-[140px]"
            >
              {isGenerating ? "Generating..." : "Download Project"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    {/* Footer */}
    <footer className="border-t border-border bg-muted mt-20 sticky top-[100vh]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2025 Android Template Generator. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
  )
}
