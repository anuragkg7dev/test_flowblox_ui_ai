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
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "@/components/common/Notification"
import { handleSignup } from "./AuthLogic"

import logo from "../../../assets/logo1.png"
import bg1 from "../../../assets/bg1.jpg"

import { BsGoogle } from "react-icons/bs"
import { ImAppleinc } from "react-icons/im"
import { IoLogoWindows } from "react-icons/io5"

export default function SignUp() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const signupCallback = (status, message) => {
  
    if (!status) {
      toast.error(message)
    } else {
      toast.success(message)
      navigate("/signIn")
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

          {/* Sign up Button */}
          <Button
            mt={4}
            variant={"fblox"}
            width="100%"
            fontSize={{ base: "sm", md: "md" }}
            onClick={() => handleSignup(email, password, signupCallback)}
          >
            Sign Up
          </Button>

          {/* Terms */}
          <Text mt={4} color="brand.subBrandBg" fontSize={{ base: "xs", md: "sm" }} textAlign="center">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </Text>

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
