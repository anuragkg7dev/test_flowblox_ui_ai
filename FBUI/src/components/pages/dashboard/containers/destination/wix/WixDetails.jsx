import { Field, HStack, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsFiletypeKey } from "react-icons/bs";
import { FaOrcid } from "react-icons/fa";
import { HiOutlineCollection } from "react-icons/hi";
import { SiCurl } from "react-icons/si";

export default function WixDetails(props) {

    const id = props.id;
    const config = props.config;
    const updateConfig = props.updateConfig
    const [collectionName, setCollectionName] = useState(config?.collectionName ?? '')
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
            {id && (<>
                <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6} invalid={error}>
                    <Field.Label>
                        <HStack>
                            <FaOrcid size={labelIconSize} color="inherit" />
                            <Text>Collection Id</Text>
                        </HStack>
                    </Field.Label>
                    <Input
                        placeholder="ID"
                        mb={2}
                        variant={cvariant}
                        value={url}
                        ml={cml}
                        width={cwidth}
                        disabled
                    />
                    <Field.ErrorText ml={cml} fontSize={{ base: "xs", md: "sm" }}>{error}</Field.ErrorText>
                </Field.Root>
            </>)}

            <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6} invalid={error}>
                <Field.Label>
                    <HStack>
                        <SiCurl size={labelIconSize} color="inherit" />
                        <Text>URL</Text>
                    </HStack>
                </Field.Label>
                <Input
                    placeholder="WIX URL"
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
                        <HiOutlineCollection size={labelIconSize} color="inherit" />
                        <Text>Collection Name</Text>
                    </HStack>
                </Field.Label>
                <Input
                    placeholder="Collection Name"
                    onChange={(e) => { setCollectionName(e.target.value); updateConfig('collectionName', e.target.value) }}
                    mb={2}
                    variant={cvariant}
                    value={collectionName}
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
                        <Text>Wix API Token</Text>
                    </HStack>
                </Field.Label>
                <Input
                    placeholder="Token"
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