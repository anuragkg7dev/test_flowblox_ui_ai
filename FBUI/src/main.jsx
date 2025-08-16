import { ChakraProvider } from "@chakra-ui/react"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App.jsx"
import "./index.css"
import { ColorModeProvider } from "./components/ui/color-mode.jsx"
import "@fontsource/lato/400.css"
import "@fontsource/lato/700.css"
import { customThemeSystem } from "./ctheme.jsx"


createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <ChakraProvider value={customThemeSystem}>
      {/* <ColorModeProvider> */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
      {/* </ColorModeProvider> */}
    </ChakraProvider>
  // </StrictMode>
)
