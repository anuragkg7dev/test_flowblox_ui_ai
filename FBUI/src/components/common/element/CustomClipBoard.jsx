import { Button, Clipboard, IconButton } from "@chakra-ui/react"

export const CustomClipBoard = (props) => {
    let cvalue = props.cvalue
    let csize = props.csize ?? "xs"
    let showLabel = props.showLabel ?? false

    return (
        <Clipboard.Root value={cvalue}>
            <Clipboard.Trigger asChild>
                <Button variant="fbloxD" size={csize}>
                    <Clipboard.Indicator />
                    {showLabel && (<> <Clipboard.CopyText /> </>)}
                </Button>
            </Clipboard.Trigger>
        </Clipboard.Root>
    )
}
