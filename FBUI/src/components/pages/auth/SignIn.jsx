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
  Stack,
  Text,
} from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  DASHBOARD,
  DASHBOARD_URL,
  IS_AUTHENTICATED,
} from "@/components/common/constants/AppRouterConstant"
import { toast } from "@/components/common/Notification"
import { useAppRouterStore } from "@/components/store/AppRouterStore"
import { handleSignin } from "./AuthLogic"

import logo from "../../../assets/logo1.png"
import bg1 from "../../../assets/bg1.jpg"

import { BsGoogle } from "react-icons/bs"
import { ImAppleinc } from "react-icons/im"
import { IoLogoWindows } from "react-icons/io5"
import { LiaExternalLinkAltSolid } from "react-icons/lia"

export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const updateRouter = useAppRouterStore((state) => state.updateRouter)
  const navigate = useNavigate()

  const siginCallback = (status, message) => {
    if (!status) {
      toast.error(message)
    } else {
      updateRouter(DASHBOARD, true)
      updateRouter(IS_AUTHENTICATED, true)
      toast.success("Logged in!")
      navigate(DASHBOARD_URL)
    }
  }

  return (
    <Flex
      height="100vh"
      direction={{ base: "column", md: "row" }}
      bg="brand.bgDark"
      overflow="auto"
    >
      {/* Left side - form */}
      <Flex
        flex={{ base: "1 1 auto", md: "0 0 60%" }}
        align="center"
        justify="center"
        p={{ base: 6, md: 8 }}
      >
        <Box maxW={{ base: "100%", sm: "400px", md: "385px" }} width="100%" p={6}>
          {/* Email */}
          <Field.Root width="100%" color="brand.textLight" fontSize={{ base: "sm", md: "md" }} mb={6}>
            <Field.Label>Email</Field.Label>
            <Input
              placeholder="Email"
              bg="brand.bgDark"
              onChange={(e) => setEmail(e.target.value)}
              mb={2}
              borderColor="brand.border"
              borderWidth="1px"
              borderStyle="solid"
              _focus={{ borderColor: "brand.accent" }}
              fontSize={{ base: "sm", md: "md" }}
            />
            <Field.ErrorText fontSize={{ base: "xs", md: "sm" }}>This field is required</Field.ErrorText>
          </Field.Root>

          {/* Password */}
          <Field.Root width="100%" color="brand.textLight" fontSize={{ base: "sm", md: "md" }} mb={6}>
            <Field.Label>Password</Field.Label>
            <Input
              placeholder="Password"
              type="password"
              bg="brand.bgDark"
              onChange={(e) => setPassword(e.target.value)}
              mb={2}
              borderColor="brand.border"
              borderWidth="1px"
              borderStyle="solid"
              _focus={{ borderColor: "brand.accent" }}
              fontSize={{ base: "sm", md: "md" }}
            />
            <Field.ErrorText fontSize={{ base: "xs", md: "sm" }}>This field is required</Field.ErrorText>
          </Field.Root>

          {/* Links */}
          <HStack width="100%" justifyContent="space-between" mt={4} fontSize={{ base: "sm", md: "md" }}>
            <Text color="brand.accent" cursor="pointer" userSelect="none">
              Forgot password?
            </Text>
            <Text color="brand.accent" cursor="pointer" userSelect="none">
              Help <Icon as={LiaExternalLinkAltSolid} color="brand.accent" boxSize={{ base: 3, md: 4 }} />
            </Text>
          </HStack>

          {/* Sign in Button */}
          <Button
            mt={6}
            colorPalette="purple"
            width="100%"
            fontSize={{ base: "sm", md: "md" }}
            onClick={() => handleSignin(email, password, siginCallback)}
          >
            Sign In
          </Button>

          {/* Terms */}
          <Text mt={4} color="brand.accent" fontSize={{ base: "xs", md: "sm" }} textAlign="center">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </Text>

          {/* Checkbox */}
          <Checkbox.Root variant="solid" colorPalette="purple" mt={4}>
            <Checkbox.HiddenInput />
            <Checkbox.Control />
            <Checkbox.Label color="brand.textLight" fontSize={{ base: "sm", md: "md" }}>
              Keep me signed in
            </Checkbox.Label>
          </Checkbox.Root>

          {/* Divider */}
          <HStack width="100%" alignItems="center" mt={6}>
            <Box as="hr" flex="1" borderColor="brand.border" borderWidth="1px" />
            <Text color="brand.textLight" fontSize={{ base: "sm", md: "md" }} mx={2}>
              or continue with
            </Text>
            <Box as="hr" flex="1" borderColor="brand.border" borderWidth="1px" />
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
                borderColor="brand.border"
                borderRadius="md"
                boxSize={{ base: 8, md: 10 }}
                display="flex"
                alignItems="center"
                justifyContent="center"
                cursor="pointer"
                _hover={{ bg: "brand.accent", color: "white" }}
              >
                <Icon as={icon} color="brand.textLight" boxSize={{ base: 4, md: 6 }} />
              </Box>
            ))}
          </HStack>
        </Box>
      </Flex>

      {/* Right-side Image (hide on mobile) */}
      <Box
        flex={{ base: "0 0 0", md: "0 0 40%" }}
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
