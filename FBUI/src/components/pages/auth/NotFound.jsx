import { Box, Flex, Heading, Text, Link, VStack, HStack } from "@chakra-ui/react";
import { CustomBrandLogo } from "@/components/common/element/CustomBrandLogo";
import { CustomFooter } from "@/components/common/element/CusromFooter";
import bg1 from "../../../assets/bg1.jpg";
import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle, FaCubes, FaPlug, FaClock, FaHome, FaEnvelope, FaRobot } from "react-icons/fa";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Flex
        minHeight={{ base: "100vh", md: "100vh", lg: "100vh" }}
        direction={{ base: "column", md: "row" }}
        bg="brand.pureBlackBg"
      >
        {/* Left Side Box */}
        <Flex
          flex={{ base: "1", md: "0 0 50%" }}
          align="center"
          justify="center"
          p={{ base: 6, md: 8 }}
          bg="brand.OffBlackBg"
        >
          <Box w="full" maxW={{ base: "100%", sm: "450px", md: "500px" }} p={6}>
            <Flex align="center" mb={4}>
              <FaExclamationTriangle size="40px" color="brand.primaryErrorBg" />
              <Heading
                as="h1"
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                fontWeight="bold"
                color="brand.pureWhiteTxt"
                ml={3}
              >
                404: This Blox Is Missing
              </Heading>
            </Flex>
            <Text
              fontSize={{ base: "xl", sm: "2xl", md: "2xl" }}
              fontWeight="semibold"
              color="brand.pureWhiteTxt"
              mb={4}
            >
              You’ve wandered out of the Flow.
            </Text>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="brand.pureWhiteTxt"
              mb={6}
            >
              This page doesn’t exist — or it’s still in beta… or in a meeting.
            </Text>
          </Box>
        </Flex>

        {/* Right Side Box */}
        <Flex
          flex={{ base: "1", md: "0 0 50%" }}
          align="center"
          justify="center"
          p={{ base: 6, md: 8 }}
          bg="brand.darkBrandBg"
          backgroundImage={`url(${bg1})`}
        >
          <Box
            rounded="md"
            textAlign="start"
            color="brand.pureWhiteTxt"
            maxW={{ base: "100%", sm: "400px", md: "550px", lg: "630px" }}
            minH={{ base: "600px", sm: "700px", md: "800px", lg: "900px" }}
            minW={{ base: "100%", sm: "350px", md: "450px", lg: "500px" }}
            w="full"
            display="flex"
            flexDirection="column"
            alignItems="start"

          >
            <CustomBrandLogo
              cw={{
                base: "150px",
                sm: "200px",
                md: "250px",
                lg: "300px",
                xl: "350px",
              }}
              cmx="auto"
              cmt={14}
            />
            <Text
              mt={6}
              fontSize={{ base: "xl", md: "2xl" }}
              fontWeight="semibold"
              color="brand.pureWhiteTxt"
              mb={4}
            >
              Here’s what probably happened:
            </Text>
            <VStack alignItems="flex-start" mb={4}>
              <HStack justifyContent="flex-start">
                <FaCubes size="24px" color="brand.pureWhiteBg" />
                <Text fontSize={{ base: "md", md: "lg" }} color="brand.pureWhiteTxt" ml={2}>
                  The Blox fell off the conveyor
                </Text>
              </HStack>
              <HStack justifyContent="flex-start">
                <FaPlug size="24px" color="brand.pureWhiteBg" />
                <Text fontSize={{ base: "md", md: "lg" }} color="brand.pureWhiteTxt" ml={2}>
                  The automation tripped over a wire
                </Text>
              </HStack>
              <HStack justifyContent="flex-start">
                <FaClock size="24px" color="brand.pureWhiteBg" />
                <Text fontSize={{ base: "md", md: "lg" }} color="brand.pureWhiteTxt" ml={2}>
                  You clicked something from the year 2042
                </Text>
              </HStack>
            </VStack>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              color="brand.pureWhiteTxt"
              mb={4}
            >
              But don’t worry — the Flow is strong with you.
            </Text>
            <VStack alignItems="flex-start" mb={4}>
              <HStack justifyContent="flex-start">
                <FaHome size="24px" color="brand.pureWhiteBg" />
                <Link href="https://flowblox.ai" isExternal
                  fontSize={{ base: "md", md: "lg" }}
                  color="brand.subBrandTxt"

                >
                  Back to Home
                </Link>
              </HStack>
              <HStack justifyContent="flex-start">
                <FaEnvelope size="24px" color="brand.pureWhiteBg" />
                <Link
                  href="mailto:info@flowblox.ai"
                  isExternal
                  fontSize={{ base: "md", md: "lg" }}                 
                  color="brand.subBrandTxt"
                >
                  Contact Support (we promise it’s a human… probably)
                </Link>
              </HStack>
            </VStack>
            <HStack alignItems="center">
              <FaRobot size="24px" color="brand.pureWhiteBg" />
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="brand.pureWhiteTxt"
                ml={2}
              >
                Stay in Flow. Break less stuff. Automation resumes shortly… assuming no more user errors.
              </Text>
            </HStack>
          </Box>
        </Flex>
      </Flex>

      {/* Bottom Component */}
      <CustomFooter />
    </>
  );
}