import {
  Box,
  Button,
  Field,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { toast } from "@/components/common/Notification"
import { supabase } from "@/components/client/SuperbasClient"
import { getUsersPersonalDetails } from "@/components/client/EdgeFunctionRepository"
import { useAppRouterStore } from "@/components/store/AppRouterStore"
import { useAppConfigStore } from "@/components/store/AppConfigStore"
import { useUserDetailStore } from "@/components/store/UserDetailStore"
import { useAuthStore } from "@/components/store/AuthStateStore"
//import { } from "@/components/common/constants/CommonConstant"
import logo from "../../../assets/logo1.png"
import bg1 from "../../../assets/bg1.jpg"
import { BsGoogle } from "react-icons/bs"
import { ImAppleinc } from "react-icons/im"
import { IoLogoWindows } from "react-icons/io5"
import { APP_CONFIG_KEYS, SIDEBAR_SWITCH_FLAG_DEFAULT, SIDEBAR_SWITCH_FLAG_KEY, THEME, THEME_DARK } from "@/components/common/constants/CommonConstant"
import { DASHBOARD_URL, HOME_URL } from "@/components/common/constants/AppRouterConstant"
import CustomLoaderButton from "@/components/common/element/CustomLoaderButton"
import CustomTermsNConditions from "@/components/common/element/CustomTermsNConditions"

const googleClientId = import.meta.env.VITE_APP_GOOGLE_CLIENT_ID

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [loader, setLoader] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const updateRouterAtSignIn = useAppRouterStore((state) => state.updateRouterAtSignIn)
  const { config, setConfig } = useAppConfigStore()
  const { user, setUser } = useUserDetailStore()
  const { setAuth, user: xuser, jwt: authkeyBearer } = useAuthStore()

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
              await signupCallbackWithProvider(true, "Signed up with Google!", 'google')

            } catch (error) {
              console.error('Google One-Tap error:', error)
              toast.error(error.message || 'Failed to sign up with Google One-Tap.')
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

  const signupCallback = async (status, message) => {
    signupCallbackWithProvider(status, message, 'email')
  }
  const signupCallbackWithProvider = async (status, message, provider) => {
    if (!status) {
      toast.error(message)
    } else {
      const { data: { session } } = await supabase.auth.getSession()
      setAuth(session?.user, session)
      updateRouterAtSignIn()
      let initConfig = { [THEME]: THEME_DARK, [SIDEBAR_SWITCH_FLAG_KEY]: SIDEBAR_SWITCH_FLAG_DEFAULT }
      let nconfig = config ? { ...config, ...initConfig } : initConfig
      setConfig(nconfig)
      toast.success("Signed up!")
      if (provider == 'google') {
        await getUserDetails(session?.access_token)
        navigate(DASHBOARD_URL, { replace: true })
      } else {
        navigate(HOME_URL, { replace: true })
      }


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
      toast.error('Failed to fetch user details!')
    } else {
      setUser({ ...data })
    }
  }

  const handleEmailSignup = async () => {
    setLoader(true)
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      })
      if (error) throw error
      signupCallback(true, null)
    } catch (error) {
      console.error('Email signup error:', error)
      signupCallback(false, error.message || 'Failed to sign up with email.')
    }
  }

  const handleGoogleSignup = async () => {
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
      console.error('Google signup error:', error)
      toast.error(error.message || 'Failed to sign up with Google.')
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
          <HStack>
            {/* First Name */}
            <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6}>
              <Field.Label>First Name</Field.Label>
              <Input
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                mb={2}
                variant={"fbloxD"}
              />
              <Field.ErrorText fontSize={{ base: "xs", md: "sm" }}>This field is required</Field.ErrorText>
            </Field.Root>

            {/* Last Name */}
            <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mb={6}>
              <Field.Label>Last Name</Field.Label>
              <Input
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                mb={2}
                variant={"fbloxD"}
              />
              <Field.ErrorText fontSize={{ base: "xs", md: "sm" }}>This field is required</Field.ErrorText>
            </Field.Root>
          </HStack>
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

          <HStack mt={6} justify={'center'}>
            <Text fontSize={{ base: "xs", md: "sm" }} color={"brand.pureWhiteTxt"}>Already on Flowblox?</Text>
            <Link variant="underline" to="/signIn"  > <Text fontSize={{ base: "xs", md: "sm" }} color={"brand.primaryBrandTxt"}> Sign in</Text></Link>
          </HStack>

          {/* Email Sign Up Button */}
          <CustomLoaderButton
            cwidth="100%"
            cmt={6}
            cvariant={"fblox"}
            cloadingText={'Sign Up'}
            loader={loader}
            onClickBtn={handleEmailSignup}
            clabel={'Sign Up'}
          />


          {/* Terms */}

          <CustomTermsNConditions purpose={"By signing up"} />


          {/* Divider */}
          <HStack width="100%" alignItems="center" mt={6}>
            <Box as="hr" flex="1" borderColor="brand.greyBrandBorder" borderWidth="1px" />
            <Text color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mx={2}>
              or sign up with
            </Text>
            <Box as="hr" flex="1" borderColor="brand.greyBrandBorder" borderWidth="1px" />
          </HStack>

          {/* Social Icons */}
          <HStack width="100%" justifyContent="center" mt={4}>
            {[
              // { icon: IoLogoWindows, onClick: () => { } },
              { icon: BsGoogle, onClick: handleGoogleSignup },
              // { icon: ImAppleinc, onClick: () => { } },
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