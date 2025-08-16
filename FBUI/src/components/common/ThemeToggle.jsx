import { useColorMode } from "@/components/ui/color-mode"
import { Button } from "@chakra-ui/react"

export function ThemeToggle() {
    const { toggleColorMode } = useColorMode()
    return (
        <Button variant="outline" onClick={toggleColorMode}>
            Toggle Mode
        </Button>
    )
}
