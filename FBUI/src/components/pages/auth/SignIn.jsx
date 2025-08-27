import {
  DASHBOARD_URL
} from "@/components/common/constants/AppRouterConstant"
import { toast } from "@/components/common/Notification"
import { useAppRouterStore } from "@/components/store/AppRouterStore"
import {
  Box,
  Checkbox,
  Field,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Text
} from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { handleSignin } from "./AuthLogic"

import bg1 from "../../../assets/bg1.jpg"
import logo from "../../../assets/logo1.png"

import { getUsersPersonalDetails } from "@/components/client/EdgeFunctionRepository"
import { supabase } from "@/components/client/SuperbasClient"
import { APP_CONFIG_KEYS, SIDEBAR_SWITCH_FLAG_DEFAULT, SIDEBAR_SWITCH_FLAG_KEY, THEME, THEME_DARK } from "@/components/common/constants/CommonConstant"
import CustomLoaderButton from "@/components/common/element/CustomLoaderButton"
import { useAppConfigStore } from "@/components/store/AppConfigStore"
import { BsGoogle } from "react-icons/bs"
import { ImAppleinc } from "react-icons/im"
import { IoLogoWindows } from "react-icons/io5"
import { LiaExternalLinkAltSolid } from "react-icons/lia"
import { useUserDetailStore } from "@/components/store/UserDetailStore"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loader, setLoader] = useState(false)
  const updateRouterAtSignIn = useAppRouterStore((state) => state.updateRouterAtSignIn)
  const { config, setConfig, updateConfig } = useAppConfigStore();
  const { user, setUser } = useUserDetailStore();
  const navigate = useNavigate()

  const siginCallback = async (status, message) => {
    if (!status) {
      toast.error(message)
    } else {
      updateRouterAtSignIn();

      let initConfig = { [THEME]: THEME_DARK, [SIDEBAR_SWITCH_FLAG_KEY]: SIDEBAR_SWITCH_FLAG_DEFAULT }
      let nconfig = config ? { ...config, ...initConfig } : initConfig
      setConfig(nconfig);
      await updateJwtToken();
      toast.success("Logged in!")
      navigate(DASHBOARD_URL)
    }
    setLoader(false)
  }

  const updateJwtToken = async () => {
    let jwtToken = undefined

    await supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        jwtToken = session.access_token; // Access token (JWT)
        setConfig({ ...useAppConfigStore.getState().config, [APP_CONFIG_KEYS.JWT_TOKEN]: jwtToken });
        getUsersPersonalDetails(getUsersPersonalDetailsCallback, jwtToken);
      } else {
        console.log("AKG , no active session");
      }
    });
  }

  const getUsersPersonalDetailsCallback = async (status, data) => {
    if (!status) {
      toast.error('Failed to fetch user details !!')
    } else {
       setUser({...data});    
    }
  }

  const handleEmailSignin = () => {
    setLoader(true)
    handleSignin(email, password, siginCallback)
  }

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
          {/* Email */}
          <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6}>
            <Field.Label>Email</Field.Label>
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              mb={2}
              variant={"fbloxD"}
            />
            <Field.ErrorText fontSize={{ base: "xs", md: "sm" }}>This field is required</Field.ErrorText>
          </Field.Root>

          {/* Password */}
          <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6}>
            <Field.Label>Password</Field.Label>
            <Input
              placeholder="Password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              mb={2}
              variant={"fbloxD"}
            />
            <Field.ErrorText fontSize={{ base: "xs", md: "sm" }}>This field is required</Field.ErrorText>
          </Field.Root>

          {/* Links */}
          <HStack width="100%" justifyContent="space-between" mt={4} fontSize={{ base: "sm", md: "md" }}>
            <Text color="brand.subBrandBg" cursor="pointer" userSelect="none">
              Forgot password?
            </Text>
            <Text color="brand.subBrandBg" cursor="pointer" userSelect="none">
              Help <Icon as={LiaExternalLinkAltSolid} color="brand.subBrandBg" boxSize={{ base: 3, md: 4 }} />
            </Text>
          </HStack>

          {/* Sign in Button */}
          <CustomLoaderButton
            cwidth="100%"
            cmt={6}
            cvariant={"fblox"}
            cloadingText={'Sign In'}
            loader={loader}
            onClickBtn={handleEmailSignin}
            clabel={'Sign In'}
          />

          {/* Terms */}
          <Text mt={4} color="brand.subBrandBg" fontSize={{ base: "xs", md: "sm" }} textAlign="center">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </Text>

          {/* Checkbox */}
          <Checkbox.Root variant="solid" colorPalette="purple" mt={4}>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }}>
              Keep me signed in
            </Checkbox.Label>
          </Checkbox.Root>

          {/* Divider */}
          <HStack width="100%" alignItems="center" mt={6}>
            <Box as="hr" flex="1" borderColor="brand.greyBrandBorder" borderWidth="1px" />
            <Text color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mx={2}>
              or continue with
            </Text>
            <Box as="hr" flex="1" borderColor="brand.greyBrandBorder" borderWidth="1px" />
          </HStack>

          {/* Social Icons */}
          <HStack width="100%" justifyContent="center" mt={4}>
            {[
              { icon: IoLogoWindows },
              { icon: BsGoogle },
              { icon: ImAppleinc },
            ].map(({ icon }, idx) => (
              <Box
                key={idx}
                mx={1}
                border="1px solid"
                borderColor="brand.greyBrandBorder"
                borderRadius="md"
                boxSize={{ base: 8, md: 10 }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                _hover={{ bg: "brand.subBrandBg", color: "white" }}
              >
                <Icon as={icon} color="brand.pureWhiteTxt" boxSize={{ base: 4, md: 6 }} />
              </Box>
            ))}
          </HStack>
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
  )
}
