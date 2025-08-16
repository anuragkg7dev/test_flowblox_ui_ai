import CustomBoldPricing from "@/components/common/element/CustomBoldPricing";
import CustomSelect from "@/components/common/element/CustomSelect";
import CustomSpinner from "@/components/common/element/CustomSpinner";
import CustomTag from "@/components/common/element/CustomTag";
import { CustomToggle } from "@/components/common/element/CustomToggle";
import {
  Box,
  Button,
  Field,
  Flex,
  HStack,
  Image,
  Input,
  List,
  Text
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { FaCheck } from "react-icons/fa";
import logo from "../../../assets/logo1.png";
import { handleCheckout } from "../stripe/StripeLogic";
import { calculateTotalPrice, currencyOption, getBundleOptions, getProductStripeBundleSubscription, getSelectedBundle, intervalOption } from "./ProductPricingLogic";

export default function ProductPricing() {

  let defaultPlan = "BASIC_ARTICLE_BLOG_PLAN"
  const [email, setEmail] = useState("")
  const [currency, setCurrency] = useState("gbp")
  const [interval, setInterval] = useState("month")
  const [selectedPlan, setSelectedPlan] = useState(defaultPlan)
  const [bundlePlans, setBundlePlans] = useState({})

  const [planOptions, setPlanOptions] = useState([])
  const [totalAmount, setTotalAmount] = useState(0)
  const [selectedPrice, setSelectPrice] = useState([])
  const [selectedBundle, setSelectBundle] = useState({})

  const [emailError, setEmailError] = useState("");
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    getProductStripeBundleSubscription(initializeBundlePlans);
  }, []);


  function updateTotalAmtSelectedPrice(result) {
    setTotalAmount(result?.total)
    setSelectPrice(result?.priceIds)
  }

  function initializeBundlePlans(flag, data) {
    //-- Data is bundlePlans
    if (flag) {
      setSelectedPlan(defaultPlan)

      setBundlePlans(data)

      setPlanOptions(getBundleOptions(data))

      let calResult = calculateTotalPrice(data, selectedPlan, currency, interval)
      updateTotalAmtSelectedPrice(calResult)

      setSelectBundle(getSelectedBundle(data, defaultPlan))


    } else {
      console.log("Something wennt wrong ", data)
    }
    setLoading(false)
  }

  function onSelectPlan(splan) {

    setSelectedPlan(splan)
    setSelectBundle(getSelectedBundle(bundlePlans, splan))

    let calResult = calculateTotalPrice(bundlePlans, splan, currency, interval);
    updateTotalAmtSelectedPrice(calResult)


  }

  const onChangeInterval = (sinterval) => {
    setInterval(sinterval)
    let calResult = calculateTotalPrice(bundlePlans, selectedPlan, currency, sinterval);
    updateTotalAmtSelectedPrice(calResult)

  }

  const onChangeCurrency = (scurrency) => {
    setCurrency(scurrency)
    let calResult = calculateTotalPrice(bundlePlans, selectedPlan, scurrency, interval);
    updateTotalAmtSelectedPrice(calResult)

  }

  // Handle email input change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value)); // Validate on change
  };

  // Email validation function
  const validateEmail = (value) => {
    if (!value) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const getUsersDetails = () => {
    const user = {}
    user["email"] = email;
    return user;
  }

  const getPaymentDetails = () => {
    const paymentDetails = {}
    paymentDetails["totalAmount"] = totalAmount;
    paymentDetails["currency"] = currency;
    paymentDetails["frequency"] = interval;
    paymentDetails["promotekit_referral"] = window.promotekit_referral
    return paymentDetails
  }


  const getLineItems = () => {
    return selectedPrice.map(x => ({ price: x, quantity: 1 }));
  };


  return (
    <>
      {/* PromoKit Script */}
      <Helmet><script async src="https://cdn.promotekit.com/promotekit.js" data-promotekit="435148f0-10a0-4d01-bb7b-e49bff2f5c12"></script></Helmet>
      <Flex
        minHeight={{ base: "100vh", md: "100vh", lg: "100vh" }}
        direction={{ base: "column", md: "row" }}
        bg="brand.bgDark"
        userSelect={loading ? "none" : "auto"}
      >
        {/* Left Side Box */}
        <Flex
          flex={{ base: "1", md: "0 0 50%" }}
          align="center"
          justify="center"
          p={{ base: 6, md: 8 }}
          bg="brand.darkGrey"
        >
          <Box w="full" maxW={{ base: "100%", sm: "400px", md: "441px" }} p={6}>
            {/* LEFT BOX CONTENT GOES HERE */}

            <Box><CustomTag name="Launch Offer" /></Box>
            <HStack mt={6} spaceX={5}>
              <CustomToggle key="interval" defaultValue={interval} onChangeT={onChangeInterval} coptions={intervalOption} />
              <CustomToggle key="currency" defaultValue={currency} onChangeT={onChangeCurrency} coptions={currencyOption} />
            </HStack>


            <Field.Root required invalid={!!emailError} mt={6} width="100%" color="brand.textLight" fontSize={{ base: "sm", md: "md" }} mb={6}>
              <Field.Label>Email</Field.Label>
              <Input
                placeholder="Email"
                bg="brand.bgDark"
                onChange={(e) => handleEmailChange(e)}
                mb={2}
                borderColor="brand.border"
                borderWidth="1px"
                borderStyle="solid"
                _focus={{ borderColor: "brand.accent" }}
                fontSize={{ base: "sm", md: "md" }}
                required
              />
              <Field.ErrorText fontSize={{ base: "xs", md: "sm" }}>This field is required</Field.ErrorText>
            </Field.Root>

            <Box mt={6}> <CustomBoldPricing currency={currency.toUpperCase()} price={totalAmount} billingPeriod={"per month"} />  </Box>

            <Text mt={6} fontSize={{ base: "xl", md: "2xl" }} fontWeight="semibold" color={"brand.textLight"}>
              {selectedBundle?.configuration?.planDetails?.heading}
            </Text>

            <Text mt={6} fontSize={{ base: "16px", md: "16px" }} color={"brand.textLight"}>
              {selectedBundle?.configuration?.planDetails?.description}
            </Text>

            <Box mt={6} maxW="388px">
              <CustomSelect
                sdata={planOptions}
                slabel={""}
                splaceholder={"Select"}
                defaultSelected={selectedPlan}
                cselectCallback={(data) => { onSelectPlan(data) }}
                cwidth={{ base: "200px", md: "300px", lg: "388px" }}
              />
            </Box>

            <Text mt={4} fontSize={{ base: "xs", md: "sm" }} color={"brand.accent"}>
              {selectedBundle?.configuration?.planDetails?.sub_description}
            </Text>


            <Button
              disabled={!!emailError || !email}
              mt={8}
              colorPalette="purple"
              width="100%"
              fontSize={{ base: "sm", md: "md" }}
              onClick={() => handleCheckout(getUsersDetails(), getLineItems(), getPaymentDetails())}
            > Buy Now </Button>

          </Box>
        </Flex>

        {/* Right Side Box — Always Visible */}
        <Flex
          flex={{ base: "1", md: "0 0 50%" }}
          align="center"
          justify="center"
          p={{ base: 6, md: 8 }}
          bg="brand.darkAccent"
        >
          <Box
            p={6}
            rounded="md"
            textAlign="start"
            color="brand.textLight"
            maxW="400px"
            w="full"
          >
            <Image
              src={logo}
              alt="Logo"
              w={{ base: "200px", md: "300px", lg: "426px" }}
              h="auto"
              objectFit="contain"
              mx="auto"
              mb={6}
            />

            <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="semibold">
              {selectedBundle?.configuration?.planIncludes?.heading}
            </Text>

            <Text mt={4} fontSize={{ base: "16px", md: "16px" }}>
              {selectedBundle?.configuration?.planIncludes?.description}
            </Text>


            <List.Root mt={6} spacing={3} >
              {(selectedBundle?.configuration?.planIncludes?.features ?? []).map((item, idx) => (
                <List.Item key={idx} style={{ listStyleType: "none" }}>
                  <HStack align="start" spacing={3} mt={2}>
                    <List.Indicator asChild color="brand.accent">
                      <FaCheck />
                    </List.Indicator>
                    <Text color="brand.textLight" fontSize={{ base: "16px", md: "16px" }}>
                      {item}
                    </Text>
                  </HStack>
                </List.Item>
              ))}
            </List.Root>
          </Box>
        </Flex>
      </Flex>


      <CustomSpinner show={loading} />

    </>
  );
}
