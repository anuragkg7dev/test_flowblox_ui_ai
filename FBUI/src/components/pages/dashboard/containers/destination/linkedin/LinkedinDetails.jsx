import { DESTINATION_TYPE } from "@/components/client/EdgeConstant";
import { verifyDestination } from "@/components/client/EdgeFunctionRepository";
import CustomLoaderButton from "@/components/common/element/CustomLoaderButton";
import { toast } from "@/components/common/Notification";
import { useAuthStore } from "@/components/store/AuthStateStore";
import { Field, HStack, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsCardHeading, BsFiletypeKey } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { GrDocumentUser } from "react-icons/gr";
import { SiCurl } from "react-icons/si";
import { destinationValidationSchema } from "../../validation/ContainerValidation";
import { SOURCE_DESTINATION_KEY } from "../../ContainersConstant";
import { validate } from "@/components/validation/ValidationUtil";

export default function LinkedInDetails(props) {
    const { jwt: authkeyBearer } = useAuthStore();
    const id = props.id;
    const config = props.config;
    const updateConfig = props.updateConfig
    const [token, setToken] = useState(config?.token ?? '')
    const [url, setUrl] = useState(config?.url ?? '')
    const [user, setUser] = useState(config?.user ?? '')
    const [preText, setPreText] = useState(config?.prefixText ?? 'Check out my latest article')
    const [loader, setLoader] = useState(false)


    const cml = props.cml;
    const cwidth = props.cwidth;
    const cvariant = props.variant ?? "fbloxD";
    const labelIconSize = props.labelIconSize
    const error = props.error
    const setError = props.setError
    const setIsModified = props.setIsModified

    const type = DESTINATION_TYPE.LINKEDIN

    const connectAndVerify = () => {
        setIsModified(true); 
        if (!token || !url) {
            toast.error('Token or URL missing')
        } else {
            setLoader(true)
            const input = { token, url }
            verifyDestination({ input, type }, verifyDestinationCallback, authkeyBearer)
        }
    }


    const verifyDestinationCallback = (flag, result) => {
        if (flag && result.flag) {
            console.log(result.data)
            setUser(result.data)
            updateConfig(SOURCE_DESTINATION_KEY.USER, result.data)
            toast.success('Connected')
        } else {
            toast.error('Connection test failed')
        }
        setLoader(false)
    }

    const validateUrl = () => {
        console.log(error)
        console.log(setError)
        console.log(url)
        let urlError = validate(destinationValidationSchema, SOURCE_DESTINATION_KEY.URL, url)
        setError({
            ...error,
            [SOURCE_DESTINATION_KEY.URL]: urlError
        })
        console.log(urlError)
        return urlError
    }



    const validatePreText = () => {
        let preTextError = validate(destinationValidationSchema, SOURCE_DESTINATION_KEY.PREFIX_TEXT, preText)
        setError({
            ...error,
            [SOURCE_DESTINATION_KEY.PREFIX_TEXT]: preTextError
        })
        return preTextError

    }

    const validateToken = () => {
        let tokenError = validate(destinationValidationSchema, SOURCE_DESTINATION_KEY.TOKEN, token)
        setError({
            ...error,
            [SOURCE_DESTINATION_KEY.TOKEN]: tokenError
        })
        console.log(tokenError)
        return tokenError

    }

    return (
        <>
            <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6} invalid={error?.[SOURCE_DESTINATION_KEY.URL]}>
                <Field.Label>
                    <HStack>
                        <SiCurl size={labelIconSize} color="inherit" />
                        <Text>LinkedIn Page URL</Text>
                    </HStack>
                </Field.Label>
                <Input
                    placeholder="URL"
                    onChange={(e) => { setUrl(e.target.value); updateConfig(SOURCE_DESTINATION_KEY.URL, e.target.value);setIsModified(true); }}
                    mb={2}
                    variant={cvariant}
                    value={url}
                    ml={cml}
                    width={cwidth}
                    onBlur={() => validateUrl()}
                />
                <Field.ErrorText ml={cml} fontSize={{ base: "xs", md: "sm" }}>{error?.[SOURCE_DESTINATION_KEY.URL]}</Field.ErrorText>
            </Field.Root>

            <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6} invalid={error?.[SOURCE_DESTINATION_KEY.TOKEN]}>
                <Field.Label>
                    <HStack>
                        <BsFiletypeKey size={labelIconSize} color="inherit" />
                        <Text>Token</Text>
                    </HStack>
                </Field.Label>
                <Input
                    placeholder="Password"
                    onChange={(e) => { setToken(e.target.value); updateConfig('token', e.target.value);setIsModified(true); }}
                    mb={2}
                    variant={cvariant}
                    value={token}
                    ml={cml}
                    width={cwidth}
                    onBlur={() => validateToken()}
                />
                <Field.ErrorText ml={cml} fontSize={{ base: "xs", md: "sm" }}>{error?.[SOURCE_DESTINATION_KEY.TOKEN]}</Field.ErrorText>
            </Field.Root>


            <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6} invalid={error?.[SOURCE_DESTINATION_KEY.USER]}>
                <Field.Label>
                    <HStack>
                        <GrDocumentUser size={labelIconSize} color="inherit" />
                        <Text>URN</Text>
                    </HStack>
                </Field.Label>
                <HStack width={cwidth} ml={cml}>
                    <Input
                        placeholder="URN"
                        mb={2}
                        variant={cvariant}
                        value={user}
                        width={'70%'}
                        onBlur={() => validatePreText()}
                        disabled
                        mt={1}

                    />


                    <CustomLoaderButton
                        cwidth="30%"
                        cvariant={"fbloxD"}
                        cloadingText={'Look Up'}
                        loader={loader}
                        onClickBtn={() => { connectAndVerify() }}
                        clabel={'Look Up'}
                    />

                </HStack>
                <Field.ErrorText ml={cml} fontSize={{ base: "xs", md: "sm" }}>{error?.[SOURCE_DESTINATION_KEY.USER]}</Field.ErrorText>
            </Field.Root>

            <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6} invalid={error?.[SOURCE_DESTINATION_KEY.PREFIX_TEXT]}>
                <Field.Label>
                    <HStack>
                        <BsCardHeading size={labelIconSize} color="inherit" />
                        <Text>Heading Prefix</Text>
                    </HStack>
                </Field.Label>
                <Input
                    placeholder="Prefix"
                    onChange={(e) => { setPreText(e.target.value); updateConfig(SOURCE_DESTINATION_KEY.PREFIX_TEXT, e.target.value);setIsModified(true); }}
                    mb={2}
                    variant={cvariant}
                    value={preText}
                    ml={cml}
                    width={cwidth}
                    onBlur={() => validatePreText()}
                    maxLength={50}
                />
                <Field.ErrorText ml={cml} fontSize={{ base: "xs", md: "sm" }}>{error?.[SOURCE_DESTINATION_KEY.PREFIX_TEXT]}</Field.ErrorText>
            </Field.Root>


        </>
    );
}