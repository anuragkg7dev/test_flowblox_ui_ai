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
        fontSizes: {
          custom20: "20px",
        },
        colors: {
          brand: {

            OffBlackBg: "#09090B",
            OffBlackTxt: "#09090B",
            OffBlackButton: "#18181B",
            OffBlackButtonHover: "#212126ff",

            pureBlackBg: "#000000",
            pureBlackTxt: "#000000",
            pureBlackButton: "#000000",
            pureBlackButtonHover: "#18181bf2",

            pureWhiteBg: "#FFFFFF",
            pureWhiteTxt: "#FFFFFF",

            darkBrandBg: "#2A0850",
            darkBrandTxt: "#2A0850",

            primaryBrandBg: "#873AE1",
            primaryBrandTxt: "#873AE1",
            primaryBrandBorder: "#873AE1",
            primaryBrandButton: "#873AE1",
            primaryBrandButtonHoverShade: "#7b24dfff",

            subBrandBg: "#D2B5F9",
            subBrandTxt: "#D2B5F9",
            subBrandButton: "#D2B5F9",

            greyBrandBg: "#A1A1A9",
            greyBrandTxt: "#A1A1A9",
            greyBrandBorderLight: "#A1A1A9",

            greyBrandBorder: "#27272A",

            primaryErrorBg: "#ff4d4f",
            primaryErrorTxt: "#ff4d4f",
            primaryErrorBorder: "#ff4d4f",

            delete: '#CC0D10',
            deleteHover: '#c91c1fff',

          },
        },
      },
      recipes: {
        button: {
          variants: {
            variant: {
              fblox: {
                bg: 'brand.primaryBrandButton',
                color: 'brand.pureWhiteTxt',
                _hover: {
                  bg: 'brand.primaryBrandButtonHoverShade',
                },
              },
              fbloxD: {
                bg: 'brand.OffBlackButton',
                color: 'brand.pureWhiteTxt',
                borderColor: "brand.greyBrandBorder",
                borderWidth: "1px",
                borderStyle: "solid",
                _hover: {
                  bg: 'brand.OffBlackButtonHover',

                },
              },
              delete: {
                bg: 'brand.delete',
                color: 'brand.pureWhiteTxt',
                _hover: {
                  bg: 'brand.deleteHover',
                },
              },
              asLabel: {
                bg: 'brand.pureBlackBg',
                color: 'brand.pureWhiteTxt',
                border:"none",
                borderWidth: "0px",
                _hover: {
                  bg: 'brand.primaryBrandButton',
                },
              },
            },
          },
        },
        input: {
          variants: {
            variant: {
              fbloxD: {
                bg: "brand.pureBlackBg",
                color: 'brand.pureWhiteTxt',
                borderColor: "brand.greyBrandBorder",
                borderWidth: "1px",
                borderStyle: "solid",
                boxShadow: 'none',

                _focus: {
                  borderColor: 'brand.subBrandBg',
                  boxShadow: 'none',
                },
                fontSize: { base: "sm", md: "md" }
              },
            },
          },
        },

        textarea: {
          variants: {
            variant: {
              fbloxD: {
                bg: "brand.pureBlackBg",
                color: 'brand.pureWhiteTxt',
                borderColor: "brand.greyBrandBorder",
                borderWidth: "1px",
                borderStyle: "solid",
                boxShadow: 'none',

                _focus: {
                  borderColor: 'brand.subBrandBg',
                  boxShadow: 'none',
                },
                fontSize: { base: "sm", md: "md" }
              },
            },
          },
        },

        select: {
          variants: {
            variant: {
              fbloxD: {
                bg: "brand.pureBlackBg",
                color: 'brand.pureWhiteTxt',
                borderColor: "brand.greyBrandBorder",
                borderWidth: "1px",
                borderStyle: "solid",
                boxShadow: 'none',

                _focus: {
                  borderColor: 'brand.subBrandBg',
                  boxShadow: 'none',
                },
                fontSize: { base: "sm", md: "md" }
              },
            },
          },
        },

      },
    },
  })
)
