import {
  Box,
  Field,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/components/common/Notification";
import { handleForgotPassword } from "./AuthLogic";
import { HOME_URL } from "@/components/common/constants/AppRouterConstant";
import CustomLoaderButton from "@/components/common/element/CustomLoaderButton";
import bg1 from "../../../assets/bg1.jpg";
import logo from "../../../assets/logo1.png";
import { LiaExternalLinkAltSolid } from "react-icons/lia";
import CustomHelpLink from "@/components/common/element/CustomHelpLink";
import CustomTermsNConditions from "@/components/common/element/CustomTermsNConditions";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();

  const forgotPasswordCallback = (status, message) => {
    console.log('forgotPasswordCallback ', status, message)
    //https://tsdnwkcetuysrzhdhpsj.supabase.co/auth/v1/verify?token=cf36d72151042b5ca578fb6a4dc00893117aaa2d9cd78eff02af9931&type=recovery&redirect_to=https://test-flowblox-ui-ai.vercel.app/
    setLoader(false);
    if (!status) {
      toast.error(message);
    } else {
      toast.success(message);
      navigate(HOME_URL); // Navigate to home after successful reset request
    }
  };

  const handleEmailForgotPassword = () => {
    setLoader(true);
    handleForgotPassword(email, forgotPasswordCallback);
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
          {/* Heading */}
          <Text
            color="brand.pureWhiteTxt"
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
            mb={6}
            textAlign="center"
          >
            Reset Your Password
          </Text>

          {/* Email */}
          <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6}>
            <Field.Label>Email</Field.Label>
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              mb={2}
              variant="fbloxD"
            />
            <Field.ErrorText fontSize={{ base: "xs", md: "sm" }}>
              This field is required
            </Field.ErrorText>
          </Field.Root>

          {/* Links */}
          <HStack width="100%" justifyContent="space-between" mt={4} fontSize={{ base: "sm", md: "md" }}>
            <Text
              color="brand.primaryBrandTxt"
              cursor="pointer"
              userSelect="none"
              onClick={() => navigate(HOME_URL)}
              _hover={{ textDecoration: "underline" }}
            >
              Back to Sign In
            </Text>
            <CustomHelpLink />
          </HStack>

          {/* Reset Password Button */}
          <CustomLoaderButton
            cwidth="100%"
            cmt={6}
            cvariant="fblox"
            cloadingText="Sending Reset Link"
            loader={loader}
            onClickBtn={handleEmailForgotPassword}
            clabel="Send Reset Link"
          />

          {/* Terms */}
          <CustomTermsNConditions purpose={"By requesting a password reset"} />

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