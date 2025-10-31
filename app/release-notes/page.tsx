import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, CheckCircle2 } from "lucide-react"

export default function ReleaseNotesPage() {
  const releases = [
    {
      version: "1.0.0",
      date: "2025-10-04",
      type: "Basic Template",
      status: "Released",
      changes: [
        "Initial release of Basic Android template",
        "Simple MainActivity with Jetpack Compose",
        "Hilt or Koin dependency injection setup",
        "Retrofit or Ktor network library setup",
        "Kotlin Coroutines for asynchronous operations",
        "Basic Gradle configuration with Kotlin support",
        "AndroidManifest.xml with basic app configuration",
        "Gradle properties for project-wide settings",
      ],
    },
    {
      version: "1.0.1",
      date: "2025-10-04",
      type: "Basic Template - Bug Fixes",
      status: "Released",
      changes: [
        "Refactored the template API as the new foundation for later templates."
      ],
    },
    {
      version: "1.1.0",
      date: "2025-10-15",
      type: "Intermediate Template",
      status: "Released",
      changes: [
        "MVVM architecture implementation",
        "Navigation Component integration",
        "Integrated Modularization",
        "Repository pattern for data management",
        "ViewModel with LiveData/StateFlow",
        "Multiple screens with navigation graph",
        "Room, Hilt, Retrofit added for library support"
      ],
    },
    {
      version: "1.2.0",
      date: "In Progress",
      type: "Advanced Template",
      status: "Planned",
      changes: [
        "Enterprise-level modular app architecture (multi-module, scalable structure)",
        "Clean Architecture+ MVVM+ Repository pattern",
        "Domain, Data, and Feature modules",
        "Build Logic Implementation",
        "Room, Hilt, Retrofit and others for Library support"
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Release Notes</h1>
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Back to Home
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4 text-balance">Template Release History</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Track the evolution of our Android templates. We're releasing templates in phases, starting with Basic,
              followed by Intermediate, and finally Advanced.
            </p>
          </div>

          <div className="space-y-6">
            {releases.map((release) => (
              <Card key={release.version}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <CardTitle className="text-2xl">Version {release.version}</CardTitle>
                        <Badge
                          variant={
                            release.status === "Released"
                              ? "default"
                              : release.status === "In Development"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {release.status}
                        </Badge>
                      </div>
                      <CardDescription className="text-base">{release.type}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{release.date}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold mb-3">Changes & Features:</h4>
                  <ul className="space-y-2">
                    {release.changes.map((change, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{change}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
