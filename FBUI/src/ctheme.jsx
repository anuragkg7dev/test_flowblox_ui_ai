import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

export const customThemeSystem = createSystem(
  defaultConfig,
  defineConfig({
    theme: {
      tokens: {
        fonts: {
          body: "Lato, system-ui, sans-serif",
          heading: "Lato, system-ui, sans-serif",
        },
        colors: {
          brand: {
            bgDark: "#09090B",
            bgLight: "#FFFFFF",
            textLight: "#FFFFFF",
            textDark: "#09090B",
            accent: "#D2B5F9",
            border: "#27272A",
            darkAccent: "#2A0850",
            darkGrey: "#111111",
          },
        },
      },
    },
  })
)
