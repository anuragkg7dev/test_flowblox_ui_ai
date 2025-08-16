import { Box, Button, Flex, Heading, Image, Input, Text, } from '@chakra-ui/react'
import { useState } from 'react'
import logo from '../../../assets/blogPilot.png'
import { handleForgotPassword } from './AuthLogic'


export default function ForgotPassword() {
  const [email, setEmail] = useState('')  

  const forgotPasswordCallback = (status, message) => {
    console.log("forgotPasswordCallback", status, message)
    if (!status) {
      toast.error(message);
    }
    else {
      toast.success(message)
    }
  }

  return (
    <Flex height="100vh" direction={{ base: 'column', md: 'row' }}>

      <Box
        flex="1"
        bg="gray.100"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        p={8}
        //backgroundImage={`url(${logo})`}
        backgroundSize="cover"
        backgroundPosition="center"
      >
        {/* Overlay */}
        <Box  p={6} rounded="md" textAlign="center">
          <Image src={logo} alt="Logo" boxSize="80px" mx="auto" mb={4} />
          <Heading size="lg">Need a Password Reset?</Heading>
          <Text mt={2} color="gray.600">
          We’ve got you covered — just enter your email and we’ll send reset instructions.
          </Text>
        </Box>
      </Box>

      <Flex flex="1" align="center" justify="center" p={8}>
        <Box p={6}>
          <Heading mb={4}>Reset Your Password</Heading>
          <Input placeholder="Email" variant={"fbloxD"} onChange={e => setEmail(e.target.value)} mb={2} />         
          <Button onClick={() => { handleForgotPassword(email, forgotPasswordCallback) }}>Sign Up</Button>

        </Box>
      </Flex>
    </Flex>
  )
}
