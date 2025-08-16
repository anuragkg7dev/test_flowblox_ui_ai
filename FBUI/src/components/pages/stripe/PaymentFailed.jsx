import { verifyStripePreTransaction } from "@/components/client/EdgeFunctionRepository";
import { NOT_FOUND_404 } from "@/components/common/constants/AppRouterConstant";
import { CustomFooter } from "@/components/common/element/CusromFooter";
import { CustomBrandLogo } from "@/components/common/element/CustomBrandLogo";
import { Box, Button, Flex, Heading, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCreditCard, FaExclamationCircle, FaPhone, FaRedo } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import bg1 from "../../../assets/bg1.jpg";

export default function PaymentFailure() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ptid = searchParams.get("ptid");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const verifyStriprTransction = () => {
      verifyStripePreTransaction(
        { "ptansactionId": ptid }, ((flag, data) => {
          if (!flag) {
            navigate(NOT_FOUND_404)
          }
          setLoading(false)
        }));
    };

    verifyStriprTransction();

  }, []);

  const handleTryAgain = () => {
    window.location.href = "https://www.flowblox.ai/"; // Using window.location.href for external redirect
  };

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
          {loading == false && (<>
            <Box w="full" maxW={{ base: "100%", sm: "450px", md: "500px" }} p={6}>
              <Flex align="center" mb={4}>
                <FaExclamationCircle size="40px" color="brand.primaryErrorBg" />
                <Heading
                  as="h1"
                  fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
                  fontWeight="bold"
                  color="brand.pureWhiteTxt"
                  ml={3}
                  whiteSpace="nowrap"
                >
                  Payment Didn’t Go Through
                </Heading>
              </Flex>
              <Text
                fontSize={{ base: "xl", sm: "2xl", md: "2xl" }}
                fontWeight="semibold"
                color="brand.pureWhiteTxt"
                mb={4}
              >
                Don’t Worry, Let’s Fix This!
              </Text>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="brand.pureWhiteTxt"
                mb={4}
              >
                Your payment attempt wasn’t successful, but you haven’t been charged. You can try again or reach out for assistance.
              </Text>
              {ptid && (
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color="brand.pureWhiteTxt"
                  mb={4}
                >
                  Transaction ID: {ptid}
                </Text>
              )}
              <HStack mb={8}>
                <Text fontSize={{ base: "md", md: "lg" }} color="brand.pureWhiteTxt">
                  If the issue persists, contact us at{" "}
                  <Link
                    href="mailto:info@flowblox.ai"
                    color="brand.subBrandTxt"
                    textDecoration="underline"                    
                  >
                    info@flowblox.ai
                  </Link>{" "}
                  or check your spam folder for any related emails.
                </Text>
              </HStack>
              <Flex direction={{ base: "column", sm: "row" }} gap={4}>
                <Button
                  variant="fbloxD"                  
                  width={{ base: "100%", sm: "auto" }}
                  fontSize={{ base: "sm", md: "md" }}
                  onClick={handleTryAgain}
                >
                  Try Again
                </Button>
                <Button
                  as="a"
                  href="mailto:support@flowblox.ai"                  
                  variant={"fblox"}
                  width={{ base: "100%", sm: "auto" }}
                  fontSize={{ base: "sm", md: "md" }}
                >
                  Contact Support
                </Button>
              </Flex>
            </Box>
          </>)}
        </Flex>

        {/* Right Side Box */}
        <Flex
          flex={{ base: "1", md: "0 0 50%" }}
          align="center"
          justify="center"
          p={{ base: 6, md: 8 }}
          bg="brand.darkBrandBg"
          backgroundImage={`url(${bg1})`}
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
        >
          {loading == false && (<>
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
                Why This Might Have Happened & What To Do
              </Text>
              <Flex justifyContent="flex-start" mb={3}>
                <VStack alignItems="flex-start">
                  <HStack justifyContent="flex-start">
                    <FaCreditCard size="24px" color="brand.pureWhiteBg" />
                    <Text fontSize={{ base: "md", md: "lg" }} color="brand.pureWhiteTxt" ml={2}>
                      Incorrect Card Details
                    </Text>
                  </HStack>
                  <Text ml={10} fontSize={{ base: "md", md: "lg" }} color="brand.pureWhiteTxt">
                    Double-check your card number, CVV, or expiration date.
                  </Text>
                </VStack>
              </Flex>
              <Flex justifyContent="flex-start" mb={3}>
                <VStack alignItems="flex-start">
                  <HStack justifyContent="flex-start">
                    <FaCreditCard size="24px" color="brand.pureWhiteBg" />
                    <Text fontSize={{ base: "md", md: "lg" }} color="brand.pureWhiteTxt" ml={2}>
                      Insufficient Funds or Expired Card
                    </Text>
                  </HStack>
                  <Text ml={10} fontSize={{ base: "md", md: "lg" }} color="brand.pureWhiteTxt">
                    Ensure your card has enough balance or try a different card.
                  </Text>
                </VStack>
              </Flex>
              <Flex justifyContent="flex-start" mb={3}>
                <VStack alignItems="flex-start">
                  <HStack justifyContent="flex-start">
                    <FaCreditCard size="24px" color="brand.pureWhiteBg" />
                    <Text fontSize={{ base: "md", md: "lg" }} color="brand.pureWhiteTxt" ml={2}>
                      Bank Restrictions
                    </Text>
                  </HStack>
                  <Text ml={10} fontSize={{ base: "md", md: "lg" }} color="brand.pureWhiteTxt">
                    Contact your bank to authorize the transaction.
                  </Text>
                </VStack>
              </Flex>
              <Flex justifyContent="flex-start" mb={3}>
                <VStack alignItems="flex-start">
                  <HStack justifyContent="flex-start">
                    <FaRedo size="24px" color="brand.pureWhiteBg" />
                    <Text fontSize={{ base: "md", md: "lg" }} color="brand.pureWhiteTxt" ml={2}>
                      Temporary Issue
                    </Text>
                  </HStack>
                  <Text ml={10} fontSize={{ base: "md", md: "lg" }} color="brand.pureWhiteTxt">
                    Wait a few minutes and try again.
                  </Text>
                </VStack>
              </Flex>
              <Flex justifyContent="flex-start" mb={3}>
                <VStack alignItems="flex-start">
                  <HStack justifyContent="flex-start">
                    <FaPhone size="24px" color="brand.pureWhiteBg" />
                    <Link href="mailto:support@flowblox.ai" isExternal color="brand.subBrandTxt" textDecoration="underline" >
                      <Text fontSize={{ base: "md", md: "lg" }} color="brand.pureWhiteTxt" ml={2}>
                        Still Stuck? Contact Support
                      </Text>
                    </Link>
                  </HStack>
                  <Text ml={10} fontSize={{ base: "md", md: "lg" }} color="brand.pureWhiteTxt">
                    Our team is here to help you get back on track.
                  </Text>
                </VStack>
              </Flex>
            </Box>
          </>)}
        </Flex>
      </Flex>

      {/* Bottom Component */}
      <CustomFooter />
    </>
  );
}