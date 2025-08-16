import { verifyStripePreTransaction } from "@/components/client/EdgeFunctionRepository";
import { NOT_FOUND_404 } from "@/components/common/constants/AppRouterConstant";
import { CustomFooter } from "@/components/common/element/CusromFooter";
import { CustomBrandLogo, CustomBrandLogoMini } from "@/components/common/element/CustomBrandLogo";
import CustomSpinner from "@/components/common/element/CustomSpinner";
import { Box, Flex, Heading, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaDiscord, FaMap, FaRocket, FaUsers } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import bg1 from "../../../assets/bg1.jpg";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const ptid = searchParams.get("ptid");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const verifyStriprTransction = () => {
      verifyStripePreTransaction(
        { "ptansactionId": ptid }, ((flag, data) => {
          if (!flag) { navigate(NOT_FOUND_404) }
          setLoading(false)
        }));
    };

    verifyStriprTransction();

  }, []);

  return (
    <>
      <Flex
        minHeight={{ base: "100vh", md: "100vh", lg: "100vh" }}
        direction={{ base: "column", md: "row" }}
        bg="brand.bgDark"
      >
        {/* Left Side Box */}
        <Flex
          flex={{ base: "1", md: "0 0 50%" }}
          align="center"
          justify="center"
          p={{ base: 6, md: 8 }}
          bg="brand.darkGrey"
        >
          {loading == false && (<>
            <Box w="full" maxW={{ base: "100%", sm: "400px", md: "441px" }} p={6}>
              <Flex align="center" mb={4}>
                <FaCheckCircle size="40px" color="#a855f7" />
                <Heading
                  as="h1"
                  fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                  fontWeight="bold"
                  color="brand.textLight"
                  ml={3}
                >
                  Payment Successful
                </Heading>
              </Flex>
              <Text
                fontSize={{ base: "xl", sm: "2xl", md: "2xl" }}
                fontWeight="semibold"
                color="brand.textLight"
                mb={4}
              >
                Thank You for Your Purchase!
              </Text>
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="brand.textLight"
                mb={4}
              >
                Your founder offer has been secured — welcome to FlowBlox. We’re excited to have you on board as one of our first users.
              </Text>

              <HStack mb={8}>
                <Text fontSize={{ base: "md", md: "lg" }} color="brand.textLight">
                  Your payment has been processed, and a confirmation email will be sent to you shortly with everything you need to know. If you don’t see it, check your spam folder or reach out to us at{" "}

                  <Link
                    href="mailto:info@flowblox.ai"
                    color="brand.accent"
                    textDecoration="underline"
                    _hover={{ color: "brand.purpleLight" }}
                  >
                    info@flowblox.ai
                  </Link>{" "}

                </Text>
              </HStack>
              
              {ptid && (
                <Text
                  fontSize={{ base: "md", md: "lg" }}
                  color="brand.textLight"
                  mb={4}
                >
                  Transaction ID: {ptid}
                </Text>
              )}
              <Text
                fontSize={{ base: "md", md: "lg" }}
                color="brand.textLight"
                mb={8}
              >
                You’re officially part of the content automation revolution. 🎉
              </Text>
            </Box>
          </>)}
        </Flex>

        {/* Right Side Box */}
        <Flex
          flex={{ base: "1", md: "0 0 50%" }}
          align="center"
          justify="center"
          p={{ base: 6, md: 8 }}
          bg="brand.darkAccent"
          backgroundImage={`url(${bg1})`}
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
        >
          {loading == false && (<>
            <Box
              rounded="md"
              textAlign="start"
              color="brand.textLight"
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
                cmt={12}
              />
              <Text
                mt={6}
                fontSize={{ base: "xl", md: "2xl" }}
                fontWeight="semibold"
                color="brand.textLight"
                mb={4}
              >
                You’re In. Here’s What You Can Do Next:
              </Text>
              <Flex justifyContent="flex-start" mb={3}>
                <VStack alignItems="flex-start">
                  <HStack justifyContent="flex-start">
                    <FaDiscord size="24px" color="brand.bgLight" />
                    <Link href="https://discord.gg/XhgpW5wCw3" isExternal>
                      <Text fontSize={{ base: "md", md: "lg" }} color="brand.textLight" ml={2}>
                        Join the Founders Discord
                      </Text>
                    </Link>
                  </HStack>
                  <Text ml={10} fontSize={{ base: "md", md: "lg" }} color="brand.textLight">
                    Connect with the team and other early users.
                  </Text>
                </VStack>
              </Flex>
              <Flex justifyContent="flex-start" mb={3}>
                <VStack alignItems="flex-start">
                  <HStack justifyContent="flex-start">
                    <FaMap size="24px" color="brand.bgLight" />
                    <Link href="https://portal.productboard.com/flowblox-ai/1-flowblox-ai-product-portal" isExternal color="brand.purple" textDecoration="underline" _hover={{ color: "brand.purpleLight" }}>
                      <Text fontSize={{ base: "md", md: "lg" }} color="brand.textLight" ml={2}>
                        View Our Roadmap
                      </Text>
                    </Link>
                  </HStack>
                  <Text ml={10} fontSize={{ base: "md", md: "lg" }} color="brand.textLight">
                    See what’s coming across the next 12 months.
                  </Text>
                </VStack>
              </Flex>
              <Flex justifyContent="flex-start" mb={3}>
                <VStack alignItems="flex-start">
                  <HStack justifyContent="flex-start">
                    <FaUsers size="24px" color="brand.bgLight" />
                    <Link href="https://affiliates.flowblox.ai/" isExternal color="brand.purple" textDecoration="underline" _hover={{ color: "brand.purpleLight" }}>
                      <Text fontSize={{ base: "md", md: "lg" }} color="brand.textLight" ml={2}>
                        Explore the Affiliate Program
                      </Text>
                    </Link>
                  </HStack>
                  <Text ml={10} fontSize={{ base: "md", md: "lg" }} color="brand.textLight">
                    Earn by sharing FlowBlox with your network.
                  </Text>
                </VStack>
              </Flex>
              <Flex justifyContent="flex-start" mb={3}>
                <VStack alignItems="flex-start">
                  <HStack justifyContent="flex-start">
                    <FaRocket size="24px" color="brand.bgLight" />
                    <Link href="https://www.flowblox.ai" isExternal color="brand.purple" textDecoration="underline" _hover={{ color: "brand.purpleLight" }}>
                      <Text fontSize={{ base: "md", md: "lg" }} color="brand.textLight" ml={2}>
                        On the launch day!
                      </Text>
                    </Link>
                  </HStack>
                  <Text ml={10} fontSize={{ base: "md", md: "lg" }} color="brand.textLight">
                    You’ll get early access, your login, and unlock the platform before the public.
                  </Text>
                </VStack>
              </Flex>
              <Flex justifyContent="flex-start" mb={3}>
                <VStack alignItems="flex-start">
                  <HStack justifyContent="flex-start">
                    <CustomBrandLogoMini ch="24px" cw="24px" ccolor="brand.bgLight" />
                    <Link href="https://www.flowblox.ai" isExternal color="brand.purple" textDecoration="underline" _hover={{ color: "brand.purpleLight" }}>
                      <Text fontSize={{ base: "md", md: "lg" }} color="brand.textLight" ml={2}>
                        Visit flowblox.ai
                      </Text>
                    </Link>
                  </HStack>
                  <Text ml={10} fontSize={{ base: "md", md: "lg" }} color="brand.textLight">
                    Find updates, support, or revisit anything anytime.
                  </Text>
                </VStack>
              </Flex>
            </Box>
          </>)}
        </Flex >
      </Flex >

      {/* Bottom Component */}
      < CustomFooter />

      <CustomSpinner show={loading} />
    </>
  );
}