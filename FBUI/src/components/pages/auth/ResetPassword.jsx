import { HOME_URL } from "@/components/common/constants/AppRouterConstant";
import CustomLoaderButton from "@/components/common/element/CustomLoaderButton";
import { toast } from "@/components/common/Notification";
import { Box, Field, Flex, HStack, Icon, Image, Input, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import { useNavigate, useSearchParams } from "react-router-dom";
import bg1 from "../../../assets/bg1.jpg";
import logo from "../../../assets/logo1.png";
import { handleResetPassword } from "./AuthLogic";

export default function ResetPassword() {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loader, setLoader] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
        const email = searchParams.get("email");


    console.log("Reset Pass page")

    useEffect(() => {
       // handleSignOut((flag, data) => { console.log(flag, data) })
    }, []);

    const resetPasswordCallback = (status, message) => {
        setLoader(false);
        if (!status) {
            toast.error(message);
        } else {
            toast.success(message);  
            navigate(HOME_URL); 
        }
    };

    const handlePasswordReset = () => {
        if (!newPassword || !confirmPassword) {
            toast.error("Both fields are required");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        if (!token) {
            toast.error("Invalid or missing reset token");
            return;
        }

        setLoader(true);
        const data = { password: newPassword, token, email }; // Fixed typo from 'passowrd' to 'password'
        handleResetPassword(data, resetPasswordCallback);
    };

    return (
        <Flex
            height="100vh"
            direction={{ base: "column", md: "row" }}
            bg="brand.pureBlackBg"
            overflow="auto"
        >
            {/* Left side - form */}
            <Flex
                flex={{ base: "1 1 auto", md: "0 0 50%" }}
                align="center"
                justify="center"
                p={{ base: 6, md: 8 }}
            >
                <Box maxW={{ base: "100%", sm: "400px", md: "385px" }} width="100%" p={6}>
                    <Text
                        color="brand.pureWhiteTxt"
                        fontSize={{ base: "xl", md: "2xl" }}
                        fontWeight="bold"
                        mb={6}
                        textAlign="center"
                    >
                        Set New Password
                    </Text>

                    {/* New Password */}
                    <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6}>
                        <Field.Label>New Password</Field.Label>
                        <Input
                            placeholder="New Password"
                            type="password"
                            onChange={(e) => setNewPassword(e.target.value)}
                            mb={2}
                            variant="fbloxD"
                        />
                        <Field.ErrorText fontSize={{ base: "xs", md: "sm" }}>
                            This field is required
                        </Field.ErrorText>
                    </Field.Root>

                    {/* Confirm Password */}
                    <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6}>
                        <Field.Label>Confirm Password</Field.Label>
                        <Input
                            placeholder="Confirm Password"
                            type="password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            mb={2}
                            variant="fbloxD"
                        />
                        <Field.ErrorText fontSize={{ base: "xs", md: "sm" }}>
                            This field is required
                        </Field.ErrorText>
                    </Field.Root>

                    <HStack width="100%" justifyContent="space-between" mt={4} fontSize={{ base: "sm", md: "md" }}>
                        <Text
                            color="brand.subBrandBg"
                            cursor="pointer"
                            userSelect="none"
                            onClick={() => navigate(HOME_URL)}
                            _hover={{ textDecoration: "underline" }}
                        >
                            Back to Sign In
                        </Text>
                        <Text color="brand.subBrandBg" cursor="pointer" userSelect="none">
                            Help <Icon as={LiaExternalLinkAltSolid} color="brand.subBrandBg" boxSize={{ base: 3, md: 4 }} />
                        </Text>
                    </HStack>

                    <CustomLoaderButton
                        cwidth="100%"
                        cmt={6}
                        cvariant="fblox"
                        cloadingText="Updating Password"
                        loader={loader}
                        onClickBtn={handlePasswordReset}
                        clabel="Update Password"
                    />

                    <Text mt={4} color="brand.subBrandBg" fontSize={{ base: "xs", md: "sm" }} textAlign="center">
                        By resetting your password, you agree to our Terms of Service and Privacy Policy.
                    </Text>
                </Box>
            </Flex>

            {/* Right-side Image (hide on mobile) */}
            <Box
                flex={{ base: "0 0 0", md: "0 0 50%" }}
                display={{ base: "none", md: "flex" }}
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                p={8}
                backgroundImage={`url(${bg1})`}
                backgroundSize="cover"
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
            >
                <Box p={6} rounded="md" textAlign="center" maxW="426px" width="100%">
                    <Image
                        src={logo}
                        alt="Logo"
                        width={{ base: "200px", md: "300px", lg: "426px" }}
                        height="auto"
                        objectFit="contain"
                        mx="auto"
                    />
                </Box>
            </Box>
        </Flex>
    );
}