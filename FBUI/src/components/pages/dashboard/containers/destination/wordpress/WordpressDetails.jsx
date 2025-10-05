import { Field, HStack, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { BsFiletypeKey } from "react-icons/bs";
import { FaRegUserCircle } from "react-icons/fa";
import { SiCurl } from "react-icons/si";
import { SOURCE_DESTINATION_KEY } from "../../ContainersConstant";
import { DESTINATION_TYPE } from "@/components/client/EdgeConstant";
import CustomLoaderButton from "@/components/common/element/CustomLoaderButton";
import { verifyDestination } from "@/components/client/EdgeFunctionRepository";
import { useAuthStore } from "@/components/store/AuthStateStore";
import { toast } from "@/components/common/Notification";
import { destinationValidationSchema } from "../../validation/ContainerValidation";
import { validate } from "@/components/validation/ValidationUtil";

export default function WordpressDetails(props) {

    const { jwt: authkeyBearer } = useAuthStore();

    const id = props.id;
    const config = props.config;
    const updateConfig = props.updateConfig
    const [user, setUser] = useState(config?.user ?? '')
    const [token, setToken] = useState(config?.token ?? '')
    const [url, setUrl] = useState(config?.url ?? '')
    const [connected, setConnection] = useState(false)

    const [loader, setLoader] = useState(false)


    const cml = props.cml;
    const cwidth = props.cwidth;
    const cvariant = props.variant ?? "fbloxD";
    const labelIconSize = props.labelIconSize


    const error = props.error
    const setError = props.setError;

    const type = DESTINATION_TYPE.WORDPRESS

    const connectAndVerify = () => {
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
            console.log(result)
            setConnection(true)
            toast.success('Test connection sucessful')
        } else {
            toast.error('Connection test failed')
            setConnection(true)
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



    const validateUser = () => {
        let userError = validate(destinationValidationSchema, SOURCE_DESTINATION_KEY.USER, user)
        setError({
            ...error,
            [SOURCE_DESTINATION_KEY.USER]: userError
        })
        return userError

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
                    onBlur={() => validateUrl()}
                />
                <Field.ErrorText ml={cml} fontSize={{ base: "xs", md: "sm" }}>{error?.[SOURCE_DESTINATION_KEY.URL]}</Field.ErrorText>
            </Field.Root>

            <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6} invalid={error?.[SOURCE_DESTINATION_KEY.USER]}>
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
                    onBlur={() => validateUser()}
                />
                <Field.ErrorText ml={cml} fontSize={{ base: "xs", md: "sm" }}>{error?.[SOURCE_DESTINATION_KEY.USER]}</Field.ErrorText>
            </Field.Root>

            <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6} invalid={error?.[SOURCE_DESTINATION_KEY.TOKEN]}>
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
                    onBlur={() => validateToken()}
                />
                <Field.ErrorText ml={cml} fontSize={{ base: "xs", md: "sm" }}>{error?.[SOURCE_DESTINATION_KEY.TOKEN]}</Field.ErrorText>
            </Field.Root>

            <CustomLoaderButton
                cwidth="100%"
                cvariant={"fbloxD"}
                cloadingText={'Connecting'}
                loader={loader}
                onClickBtn={() => { connectAndVerify() }}
                clabel={'Verify Integration'}
            />

        </>
    );
}