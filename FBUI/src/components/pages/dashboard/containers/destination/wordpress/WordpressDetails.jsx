import { Field, HStack, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsFiletypeKey } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { SiCurl } from "react-icons/si";

export default function WordpressDetails(props) {

    const id = props.id;
    const config = props.config;
    const updateConfig = props.updateConfig
    const [user, setUser] = useState(config?.user ?? '')
    const [token, setToken] = useState(config?.token ?? '')
    const [url, setUrl] = useState(config?.url ?? '')

    const cml = props.cml;
    const cwidth = props.cwidth;
    const cvariant = props.variant ?? "fbloxD";
    const labelIconSize = props.labelIconSize
    const error = props.error
    const validate = props.validate


    return (
        <>
            <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6} invalid={error}>
                <Field.Label>
                    <HStack>
                        <SiCurl size={labelIconSize} color="inherit" />
                        <Text>Site URL</Text>
                    </HStack>
                </Field.Label>
                <Input
                    placeholder="URL"
                    onChange={(e) => { setUrl(e.target.value); updateConfig('url', e.target.value); }}
                    mb={2}
                    variant={cvariant}
                    value={url}
                    ml={cml}
                    width={cwidth}
                    onBlur={() => validate?.()}
                />
                <Field.ErrorText ml={cml} fontSize={{ base: "xs", md: "sm" }}>{error}</Field.ErrorText>
            </Field.Root>

            <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6} invalid={error}>
                <Field.Label>
                    <HStack>
                        <FaRegUserCircle size={labelIconSize} color="inherit" />
                        <Text>User</Text>
                    </HStack>
                </Field.Label>
                <Input
                    placeholder="User"
                    onChange={(e) => { setUser(e.target.value); updateConfig('user', e.target.value) }}
                    mb={2}
                    variant={cvariant}
                    value={user}
                    ml={cml}
                    width={cwidth}
                    onBlur={() => validate?.()}
                />
                <Field.ErrorText ml={cml} fontSize={{ base: "xs", md: "sm" }}>{error}</Field.ErrorText>
            </Field.Root>

            <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6} invalid={error}>
                <Field.Label>
                    <HStack>
                        <BsFiletypeKey size={labelIconSize} color="inherit" />
                        <Text>Application Password</Text>
                    </HStack>
                </Field.Label>
                <Input
                    placeholder="Password"
                    onChange={(e) => { setToken(e.target.value); updateConfig('token', e.target.value) }}
                    mb={2}
                    variant={cvariant}
                    value={token}
                    ml={cml}
                    width={cwidth}
                    onBlur={() => validate?.()}
                />
                <Field.ErrorText ml={cml} fontSize={{ base: "xs", md: "sm" }}>{error}</Field.ErrorText>
            </Field.Root>

        </>
    );
}