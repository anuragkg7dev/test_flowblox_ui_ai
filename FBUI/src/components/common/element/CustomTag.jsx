import { Tag, Text } from "@chakra-ui/react"

export default function CustomTag(props) {

    let cmt = props.cmt ?? 2
    let name = props.name ?? 2

    return (
        <>
            <Tag.Root mt={cmt} size={"md"} rounded="full" bg={"brand.accent"}>
                <Tag.Label>
                    <Text px={2}> {name} </Text>
                </Tag.Label>
            </Tag.Root>
        </>
    )
}
