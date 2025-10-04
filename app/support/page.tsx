import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, MessageSquare } from "lucide-react"

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Support</h1>
            <a href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Back to Home
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold mb-4 text-balance">How Can We Help?</h2>
            <p className="text-lg text-muted-foreground text-pretty">
              Get support, report issues, or share feedback about the Android Template Generator.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Github className="h-6 w-6" />
                  </div>
                  <CardTitle>GitHub Issues</CardTitle>
                </div>
                <CardDescription>Report bugs, request features, or discuss improvements</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Open an issue on our GitHub repository to report bugs, suggest new features, or discuss any problems
                  you encounter with the templates.
                </p>
                <Button className="w-full" asChild>
                  <a
                    href="https://github.com/PhyoLinMg/AndroidTemplateGenerator/issues"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4 mr-2" />
                    Open GitHub Issue
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <MessageSquare className="h-6 w-6" />
                  </div>
                  <CardTitle>Discussions</CardTitle>
                </div>
                <CardDescription>Join the community conversation</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Participate in GitHub Discussions to ask questions, share ideas, and connect with other developers
                  using the templates.
                </p>
                <Button className="w-full bg-transparent" variant="outline" asChild>
                  <a
                    href="https://github.com/PhyoLinMg/AndroidTemplateGenerator/discussions"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Join Discussions
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Getting Started</CardTitle>
              <CardDescription>Quick tips for using the Android Template Generator</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                  <span className="font-semibold text-sm">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Choose Your Template</h4>
                  <p className="text-sm text-muted-foreground">
                    Select from Basic, Intermediate, or Advanced templates based on your project needs. Start with Basic
                    if you're unsure.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                  <span className="font-semibold text-sm">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Customize Your Project</h4>
                  <p className="text-sm text-muted-foreground">
                    Click "Customize" to configure project name, package name, SDK versions, and select the libraries
                    you need.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                  <span className="font-semibold text-sm">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Download & Build</h4>
                  <p className="text-sm text-muted-foreground">
                    Download your customized template configuration and use it to set up your Android project in Android
                    Studio.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                  <span className="font-semibold text-sm">4</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-1">Need Help?</h4>
                  <p className="text-sm text-muted-foreground">
                    If you encounter any issues or have questions, open a GitHub issue or join our discussions. We're
                    here to help!
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
