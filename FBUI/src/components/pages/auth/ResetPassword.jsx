import { toast } from '@/components/common/Notification'
import { Box, Button, Flex, Heading, Image, Input, Text, } from '@chakra-ui/react'
import { useState } from 'react'
import logo from '../../../assets/blogPilot.png'
import { handleResetPassword } from './AuthLogic'

export default function ResetPassword() {
    
    const [password, setPassword] = useState('')

    const siginCallback = (status, message) => {
        console.log("siginCallback", status, message)
        if (!status) {
            toast.error(message);
        }
        else {
            toast.success('Logged in!')
        }
    }

    return (<>
        <Flex height="100vh" direction={{ base: 'column', md: 'row' }}>

            <Box
                flex="1"
                bg="gray.100"
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                p={8}
                //backgroundImage="url('/your-image.jpg')"
                backgroundSize="cover"
                backgroundPosition="center"
            >
                {/* Overlay */}
                <Box  p={6} rounded="md" textAlign="center">
                    <Image src={logo} alt="Logo" boxSize="80px" mx="auto" mb={4} />
                    <Heading size="lg">Create a New Password</Heading>
                    <Text mt={2} color="gray.600">
                    Almost there! Just choose a new password to secure your account.
                    </Text>
                </Box>
            </Box>

            <Flex flex="1" align="center" justify="center" p={8}>
                <Box p={6}>
                    <Heading mb={4}>Sign In to Your Account</Heading>                  
                    <Input placeholder="Password" variant={"fbloxD"} type="password" onChange={e => setPassword(e.target.value)} mb={2} />
                    <Button onClick={() => { handleResetPassword( password, siginCallback) }}>Sign In</Button>
                  
                </Box>
            </Flex>
        </Flex>
    </>
    )
}
