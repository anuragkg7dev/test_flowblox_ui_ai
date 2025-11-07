import { getUsersPersonalDetails } from "@/components/client/EdgeFunctionRepository"
import { supabase } from "@/components/client/SuperbasClient"
import {
  DASHBOARD_URL,
  FORGET_PASSWORD_URL
} from "@/components/common/constants/AppRouterConstant"
import { SIDEBAR_SWITCH_FLAG_DEFAULT, SIDEBAR_SWITCH_FLAG_KEY, THEME, THEME_DARK } from "@/components/common/constants/CommonConstant"
import CustomLoaderButton from "@/components/common/element/CustomLoaderButton"
import { toast } from "@/components/common/Notification"
import { useAppConfigStore } from "@/components/store/AppConfigStore"
import { useAppRouterStore } from "@/components/store/AppRouterStore"
import { useAuthStore } from "@/components/store/AuthStateStore"
import { useUserDetailStore } from "@/components/store/UserDetailStore"
import {
  Box,
  Button,
  Checkbox,
  Field,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Text,
  Wrap
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { BsGoogle } from "react-icons/bs"
import { ImAppleinc } from "react-icons/im"
import { IoLogoWindows } from "react-icons/io5"
import { LiaExternalLinkAltSolid } from "react-icons/lia"
import { Link, useLocation, useNavigate } from "react-router-dom"
import bg1 from "../../../assets/bg1.jpg"
import logo from "../../../assets/logo1.png"
import { handleSignin } from "./AuthLogic"
import CustomTermsNConditions from "@/components/common/element/CustomTermsNConditions"
import CustomHelpLink from "@/components/common/element/CustomHelpLink"

const googleClientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loader, setLoader] = useState(false)
  const updateRouterAtSignIn = useAppRouterStore((state) => state.updateRouterAtSignIn)
  const { config, setConfig } = useAppConfigStore()
  const { user, setUser } = useUserDetailStore()
  const navigate = useNavigate()
  const location = useLocation()
  const { setAuth, user: xuser, jwt: authkeyBearer } = useAuthStore()

  const help_link = "https://superblox.ai"

  // Redirect if already signed in
  useEffect(() => {
    if (xuser) {
      navigate(DASHBOARD_URL, { replace: true })
    }
  }, [xuser, navigate])

  // Google One-Tap initialization
  useEffect(() => {
    if (!xuser) {
      const script = document.createElement('script')
      script.src = 'https://accounts.google.com/gsi/client'
      script.async = true
      document.body.appendChild(script)

      window.onGoogleLibraryLoad = () => {
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: async (response) => {
            try {
              const { data, error } = await supabase.auth.signInWithIdToken({
                provider: 'google',
                token: response.credential,
              })
              if (error) throw error

              await siginCallback(true, "Logged in with Google!")

            } catch (error) {
              console.error('Google One-Tap error:', error)
              toast.error(error.message || 'Failed to sign in with Google One-Tap.')
            }
          },
          ux_mode: 'popup',
          auto_select: true,
        })
        window.google.accounts.id.prompt()
      }

      return () => {
        document.body.removeChild(script)
      }
    }
  }, [navigate, setAuth, updateRouterAtSignIn, setConfig, config, xuser])

  const siginCallback = async (status, message) => {
    if (!status) {
      toast.error(message)
    } else {
      const { data: { session } } = await supabase.auth.getSession()
      setAuth(session?.user, session)
      updateRouterAtSignIn()
      let initConfig = { [THEME]: THEME_DARK, [SIDEBAR_SWITCH_FLAG_KEY]: SIDEBAR_SWITCH_FLAG_DEFAULT }
      let nconfig = config ? { ...config, ...initConfig } : initConfig
      setConfig(nconfig)
      await getUserDetails(session?.access_token)
      toast.success("Logged in!")
      navigate(DASHBOARD_URL, { replace: true })
    }
    setLoader(false)
  }

  const getUserDetails = async (jwtToken) => {
    if (jwtToken) {
      getUsersPersonalDetails(getUsersPersonalDetailsCallback, jwtToken)
    } else {
      console.log('No active session')
      toast.error('Unable to get user details')
    }
  }

  const getUsersPersonalDetailsCallback = async (status, data) => {
    if (!status) {
      toast.error('Failed to fetch user details !!')
    } else {
      setUser({ ...data })
    }
  }

  const handleEmailSignin = () => {
    setLoader(true)
    handleSignin(email, password, siginCallback)
  }

  const handleGoogleSignin = async () => {
    setLoader(true)
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          state: { from: location.pathname },
        },
      })
      if (error) throw error
    } catch (error) {
      console.error('Google login error:', error)
      toast.error(error.message || 'Failed to sign in with Google.')
      setLoader(false)
    }
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
            <Text color="brand.primaryBrandTxt" userSelect="none">
              <Link as={Link} to={FORGET_PASSWORD_URL}>Forgot password?</Link>
            </Text>
            <CustomHelpLink />
          </HStack>

          {/* Email Sign in Button */}
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
          <CustomTermsNConditions purpose={"By signing in"} />

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
              // { icon: IoLogoWindows, onClick: () => {} },
              { icon: BsGoogle, onClick: handleGoogleSignin },
              // { icon: ImAppleinc, onClick: () => {} },
            ].map(({ icon, onClick }, idx) => (
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
                onClick={onClick}
              >
                <Icon as={icon} color="brand.pureWhiteTxt" boxSize={{ base: 4, md: 6 }} />
              </Box>
            ))}
          </HStack>

          <HStack mt={6} justify={'center'}>
            <Text fontSize={{ base: "xs", md: "sm" }} color={"brand.pureWhiteTxt"}>New to Flowblox?</Text>
            <Link variant="underline" to="/signUp"  > <Text fontSize={{ base: "xs", md: "sm" }} color={"brand.primaryBrandTxt"}>  Join now</Text></Link>
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