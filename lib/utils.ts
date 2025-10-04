import { clsx, type ClassValue } from 'clsx'
import { Code2, Layers, Rocket } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const templates = {
  basic: {
    title: "Basic",
    description: "Simple Android app structure for getting started quickly",
    icon: Code2,
    structure: {
      name: "MyAndroidApp",
      type: "folder",
      children: [
        {
          name: "app",
          type: "folder",
          children: [
            {
              name: "src",
              type: "folder",
              children: [
                {
                  name: "main",
                  type: "folder",
                  children: [
                    {
                      name: "java",
                      type: "folder",
                      children: [
                        {
                          name: "com",
                          type: "folder",
                          children: [
                            {
                              name: "example",
                              type: "folder",
                              children: [
                                {
                                  name: "myapp",
                                  type: "folder",
                                  children: [
                                    {
                                      name: "ui", type: "folder", children: [
                                        {
                                          name: "theme", type: "folder", children: [
                                            { name: "Theme.kt", type: "file" }
                                          ]
                                        }
                                      ]
                                    },
                                    { name: "MainActivity.kt", type: "file" },
                                    { name: "Application.kt", type: "file" }
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    { name: "AndroidManifest.xml", type: "file" },
                  ],
                },
              ],
            },
            { name: "build.gradle.kts", type: "file" },

          ],
        },
        { name: "build.gradle.kts", type: "file" },
        { name: "settings.gradle.kts", type: "file" },
        { name: "gradle.properties", type: "file" },
        { name: ".gitignore", type: "file" },
      ],
    },
  },
  intermediate: {
    title: "Intermediate",
    description: "Organized MVVM structure with navigation and dependency injection",
    icon: Layers,
    structure: {
      name: "MyAndroidApp",
      type: "folder",
      children: [
        {
          name: "app",
          type: "folder",
          children: [
            {
              name: "src",
              type: "folder",
              children: [
                {
                  name: "main",
                  type: "folder",
                  children: [
                    {
                      name: "java",
                      type: "folder",
                      children: [
                        {
                          name: "com",
                          type: "folder",
                          children: [
                            {
                              name: "example",
                              type: "folder",
                              children: [
                                {
                                  name: "myapp",
                                  type: "folder",
                                  children: [
                                    {
                                      name: "ui",
                                      type: "folder",
                                      children: [
                                        {
                                          name: "home",
                                          type: "folder",
                                          children: [
                                            { name: "HomeFragment.kt", type: "file" },
                                            { name: "HomeViewModel.kt", type: "file" },
                                          ],
                                        },
                                        {
                                          name: "profile",
                                          type: "folder",
                                          children: [
                                            { name: "ProfileFragment.kt", type: "file" },
                                            { name: "ProfileViewModel.kt", type: "file" },
                                          ],
                                        },
                                      ],
                                    },
                                    {
                                      name: "data",
                                      type: "folder",
                                      children: [
                                        {
                                          name: "repository",
                                          type: "folder",
                                          children: [{ name: "UserRepository.kt", type: "file" }],
                                        },
                                        {
                                          name: "model",
                                          type: "folder",
                                          children: [{ name: "User.kt", type: "file" }],
                                        },
                                      ],
                                    },
                                    {
                                      name: "di",
                                      type: "folder",
                                      children: [{ name: "AppModule.kt", type: "file" }],
                                    },
                                    { name: "MainActivity.kt", type: "file" },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    {
                      name: "res",
                      type: "folder",
                      children: [
                        {
                          name: "layout",
                          type: "folder",
                          children: [
                            { name: "activity_main.xml", type: "file" },
                            { name: "fragment_home.xml", type: "file" },
                            { name: "fragment_profile.xml", type: "file" },
                          ],
                        },
                        {
                          name: "navigation",
                          type: "folder",
                          children: [{ name: "nav_graph.xml", type: "file" }],
                        },
                        {
                          name: "values",
                          type: "folder",
                          children: [
                            { name: "strings.xml", type: "file" },
                            { name: "colors.xml", type: "file" },
                            { name: "themes.xml", type: "file" },
                          ],
                        },
                      ],
                    },
                    { name: "AndroidManifest.xml", type: "file" },
                  ],
                },
              ],
            },
            { name: "build.gradle.kts", type: "file" },
          ],
        },
        { name: "build.gradle.kts", type: "file" },
        { name: "settings.gradle.kts", type: "file" },
        { name: ".gitignore", type: "file" },
      ],
    },
  },
  advanced: {
    title: "Advanced",
    description: "Enterprise-ready Clean Architecture with testing, CI/CD, and modularization",
    icon: Rocket,
    structure: {
      name: "MyAndroidApp",
      type: "folder",
      children: [
        {
          name: "app",
          type: "folder",
          children: [
            {
              name: "src",
              type: "folder",
              children: [
                {
                  name: "main",
                  type: "folder",
                  children: [
                    {
                      name: "java",
                      type: "folder",
                      children: [
                        {
                          name: "com",
                          type: "folder",
                          children: [
                            {
                              name: "example",
                              type: "folder",
                              children: [
                                {
                                  name: "myapp",
                                  type: "folder",
                                  children: [
                                    { name: "MyApplication.kt", type: "file" },
                                    { name: "MainActivity.kt", type: "file" },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                    { name: "AndroidManifest.xml", type: "file" },
                  ],
                },
                {
                  name: "test",
                  type: "folder",
                  children: [{ name: "ExampleUnitTest.kt", type: "file" }],
                },
                {
                  name: "androidTest",
                  type: "folder",
                  children: [{ name: "ExampleInstrumentedTest.kt", type: "file" }],
                },
              ],
            },
            { name: "build.gradle.kts", type: "file" },
            { name: "proguard-rules.pro", type: "file" },
          ],
        },
        {
          name: "core",
          type: "folder",
          children: [
            {
              name: "domain",
              type: "folder",
              children: [
                {
                  name: "src",
                  type: "folder",
                  children: [
                    {
                      name: "main",
                      type: "folder",
                      children: [
                        {
                          name: "java",
                          type: "folder",
                          children: [
                            {
                              name: "usecase",
                              type: "folder",
                              children: [{ name: "GetUserUseCase.kt", type: "file" }],
                            },
                            {
                              name: "repository",
                              type: "folder",
                              children: [{ name: "UserRepository.kt", type: "file" }],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                { name: "build.gradle.kts", type: "file" },
              ],
            },
            {
              name: "data",
              type: "folder",
              children: [
                {
                  name: "src",
                  type: "folder",
                  children: [
                    {
                      name: "main",
                      type: "folder",
                      children: [
                        {
                          name: "java",
                          type: "folder",
                          children: [
                            {
                              name: "repository",
                              type: "folder",
                              children: [{ name: "UserRepositoryImpl.kt", type: "file" }],
                            },
                            {
                              name: "remote",
                              type: "folder",
                              children: [{ name: "ApiService.kt", type: "file" }],
                            },
                            {
                              name: "local",
                              type: "folder",
                              children: [{ name: "AppDatabase.kt", type: "file" }],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                { name: "build.gradle.kts", type: "file" },
              ],
            },
          ],
        },
        {
          name: "feature",
          type: "folder",
          children: [
            {
              name: "home",
              type: "folder",
              children: [
                {
                  name: "src",
                  type: "folder",
                  children: [
                    {
                      name: "main",
                      type: "folder",
                      children: [
                        {
                          name: "java",
                          type: "folder",
                          children: [
                            { name: "HomeFragment.kt", type: "file" },
                            { name: "HomeViewModel.kt", type: "file" },
                          ],
                        },
                        {
                          name: "res",
                          type: "folder",
                          children: [
                            {
                              name: "layout",
                              type: "folder",
                              children: [{ name: "fragment_home.xml", type: "file" }],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
                { name: "build.gradle.kts", type: "file" },
              ],
            },
          ],
        },
        {
          name: ".github",
          type: "folder",
          children: [
            {
              name: "workflows",
              type: "folder",
              children: [{ name: "ci.yml", type: "file" }],
            },
          ],
        },
        { name: "build.gradle.kts", type: "file" },
        { name: "settings.gradle.kts", type: "file" },
        { name: "gradle.properties", type: "file" },
        { name: ".gitignore", type: "file" },
        { name: "README.md", type: "file" },
      ],
    },
  },
} as const