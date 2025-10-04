import { TemplateGenerator } from "@/components/template-generator"
import { ErrorBoundary } from "@/components/error-boundary"

export default function Home() {
  return (
    <ErrorBoundary>
      <TemplateGenerator />
    </ErrorBoundary>
  )
}
