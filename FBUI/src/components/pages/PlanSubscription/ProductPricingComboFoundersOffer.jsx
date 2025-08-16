import CustomBoldPricing from "@/components/common/element/CustomBoldPricing";
import CustomSpinner from "@/components/common/element/CustomSpinner";
import CustomTag from "@/components/common/element/CustomTag";
import {
  Box,
  Button,
  Field,
  Flex,
  HStack,
  Input,
  List,
  Text
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import bg1 from "../../../assets/bg1.jpg";
import { handleCheckout } from "../stripe/StripeLogic";
import {
  calculateTotalPriceComboProduct,
  getProductStripeComboSubscription
} from "./ProductPricingLogic";

import { verifyRegistration } from "@/components/client/EdgeFunctionRepository";
import { CustomFooter } from "@/components/common/element/CusromFooter";
import { CustomBrandLogo } from "@/components/common/element/CustomBrandLogo";
import CustomDialogMessage from "@/components/common/element/CustomDialogMessage";
import CustomHTMLBoldParser from "@/components/common/element/CustomHTMLBoldParser";
import { validateName } from "@/components/common/element/CustomValidation";
import { clone } from "@/components/common/util/JsonUtil";
import { replacePlaceholders } from "@/components/common/util/StringUtil";
import { FaCheck } from "react-icons/fa";

export default function ProductPricingComboFoundersOffer(props) {

  let productId = props.productId;
  let initialCurrency = "gbp"

  const [email, setEmail] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [currency, setCurrency] = useState(initialCurrency);
  const [interval, setInterval] = useState("one-time");

  const [comboPlans, setComboPlans] = useState({});

  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedPrice, setSelectPrice] = useState([]);
  const [selectedCombo, setSelectCombo] = useState({});

  const [emailError, setEmailError] = useState("");
  const [fnameError, setFnameError] = useState("");
  const [lnameError, setLnameError] = useState("");
  const [loading, setLoading] = useState(true);

  const [showMsg, setShowMsg] = useState(false);

  const placeHolderData = {
    placeHolderArray_gbp: [
      { replaceKey: "save-cost", replaceValue: "£109.99" },
      { replaceKey: "actual-cost", replaceValue: "£359.99" },
    ],
    placeHolderArray_usd: [
      { replaceKey: "save-cost", replaceValue: "$150" },
      { replaceKey: "actual-cost", replaceValue: "$450" },
    ],
  };

  const [placeholderArray, setPlaceholderArray] = useState(placeHolderData.placeHolderArray_gbp);

  useEffect(() => {
    const detectCurrency = () => {

      const userLocale = navigator.language || navigator.languages[0] || "en-US";
      console.log("navigator.language ", navigator.language, navigator.languages)
      console.log("userLocale ", userLocale)
      const isUK = userLocale.toLowerCase().includes("gb");
      initialCurrency = isUK ? "gbp" : "usd";
      setCurrency(initialCurrency);

      console.log("initialCurrency ", initialCurrency)

      setPlaceholderArray(placeHolderData[`placeHolderArray_${initialCurrency}`]);
      getProductStripeComboSubscription(productId, initializeBundlePlans);
    };

    detectCurrency();

  }, []);


  function initializeBundlePlans(flag, data) {
    //-- Data is bundlePlans
    if (flag) {
      setComboPlans(data);

      let priceRecords = data?.priceRecords?.[0];
      let comboPlan = data?.comboPlans?.[0];

      setSelectCombo(comboPlan);

      let calResult = calculateTotalPriceComboProduct(priceRecords, initialCurrency);
      updateTotalAmtSelectedPrice(calResult);
    } else {
      console.log("Something wennt wrong ", data);
    }
    setLoading(false);
  }

  function updateTotalAmtSelectedPrice(result) {

    setTotalAmount(result?.total);
    setSelectPrice(result?.priceIds);

    setPlaceholderArray([]);

    let cplaceHolderArray = clone(
      placeHolderData["placeHolderArray_" + result?.currency]
    );
    let cost = {
      replaceKey: "cost",
      replaceValue: (result?.currency == "usd" ? "$" : "£") + result?.total,
    };
    cplaceHolderArray.push(cost);
    setPlaceholderArray(cplaceHolderArray);
  }

  const onChangeCurrency = (scurrency) => {
    setCurrency(scurrency);
    let priceRecords = comboPlans?.priceRecords?.[0];
    let calResult = calculateTotalPriceComboProduct(priceRecords, scurrency);
    updateTotalAmtSelectedPrice(calResult);
  };

  // Handle email input change
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value)); // Validate on change
  };

  const handleFnameChange = (e) => {
    const value = e.target.value;
    setFname(value);
    setFnameError(validateName(value, "First Name")); // Validate on change
  };


  const handleLnameChange = (e) => {
    const value = e.target.value;
    setLname(value);
    if (value) {
      setLnameError(validateName(value, "Last Name")); // Validate on change if Last name is present.Otherwise Lname is optional
    } else {
      setLnameError("")
    }

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
    const user = {};
    user["email"] = email;
    return user;
  };

  const getPaymentDetails = () => {
    const paymentDetails = {};
    paymentDetails["totalAmount"] = totalAmount;
    paymentDetails["currency"] = currency;
    paymentDetails["frequency"] = interval;
    paymentDetails["promotekit_referral"] = window.promotekit_referral;
    paymentDetails["fname"] = fname;
    paymentDetails["lname"] = lname;
    return paymentDetails;
  };

  const getLineItems = () => {
    return selectedPrice.map((x) => ({ price: x, quantity: 1 }));
  };

  const verifyRegistrationAndHandleCheckout = () => {
    verifyRegistration({ email }, handleStripeCheckOut)
  };

  const handleStripeCheckOut = (flag, data) => {
    if (data?.exists == true) {
      setShowMsg(true)
    } else {
      handleCheckout(getUsersDetails(), getLineItems(), getPaymentDetails())
    }

  }

  return (
    <>
      {/* PromoKit Script */}
      <Helmet>
        <script
          async
          src="https://cdn.promotekit.com/promotekit.js"
          data-promotekit="435148f0-10a0-4d01-bb7b-e49bff2f5c12"
        ></script>
      </Helmet>
      <Flex
        minHeight={{ base: "100vh", md: "100vh", lg: "100vh" }}
        direction={{ base: "column", md: "row" }}
        bg="brand.pureBlackBg"
        userSelect={loading ? "none" : "auto"}
      >
        {/* Left Side Box */}
        <Flex
          flex={{ base: "1", md: "0 0 50%" }}
          align="center"
          justify="center"
          p={{ base: 6, md: 8 }}
          bg="brand.OffBlackBg"

        >
          <Box w="full" maxW={{ base: "100%", sm: "400px", md: "441px" }} p={6}>
            {/* LEFT BOX CONTENT GOES HERE */}

            <Box>
              <CustomTag name="Pre-Launch Offer" />
            </Box>
            <HStack>
              <Field.Root
                required
                invalid={!!fnameError}
                mt={6}
                width="100%"
                color="brand.pureWhiteTxt"
                fontSize={{ base: "sm", md: "md" }}

              >
                <Field.Label>First Name</Field.Label>
                <Input
                  placeholder="First Name"
                  onChange={(e) => handleFnameChange(e)}
                  mb={2}
                  variant={"fbloxD"}
                  required
                />
                <Field.ErrorText fontSize={{ base: "xs", md: "sm" }} >
                  {fnameError}
                </Field.ErrorText>
              </Field.Root>

              <Field.Root
                required
                invalid={!!lnameError}
                mt={6}
                width="100%"
                color="brand.pureWhiteTxt"
                fontSize={{ base: "sm", md: "md" }}

              >
                <Field.Label>Last Name</Field.Label>
                <Input
                  placeholder="Last Name"
                  variant={"fbloxD"}
                  onChange={(e) => handleLnameChange(e)}
                  mb={2}
                  required
                />
                <Field.ErrorText fontSize={{ base: "xs", md: "sm" }}>
                  {lnameError}
                </Field.ErrorText>
              </Field.Root>

            </HStack>

            <Field.Root
              required
              invalid={!!emailError}
              mt={2}
              width="100%"
              color="brand.pureWhiteTxt"
              fontSize={{ base: "sm", md: "md" }}
              mb={6}
            >
              <Field.Label>Email</Field.Label>
              <Input
                placeholder="Email"
                variant={"fbloxD"}
                onChange={(e) => handleEmailChange(e)}
                mb={2}              
                required
              />
              <Field.ErrorText fontSize={{ base: "xs", md: "sm" }}>
                This field is required. Please provide valid email address.
              </Field.ErrorText>
            </Field.Root>

            <Text
              alignSelf={"center"}
              fontSize={{ base: "xl", sm: "2xl", md: "2xl" }}
              fontWeight="semibold"
              color="brand.pureWhiteTxt" >
              {replacePlaceholders(selectedCombo?.configuration?.planDetails?.["heading"], placeholderArray)}
            </Text>

            <Box mt={6}>
              <CustomBoldPricing
                currency={currency.toUpperCase()}
                price={totalAmount}
                billingPeriod={""}
                ccolor={"#a855f7"}
                cfontSize={"38px"}
                cfontSizeBP={"md"}
              />
            </Box>

            <CustomHTMLBoldParser
              cmt={6}
              cfontSize={{ base: "16px", md: "16px" }}
              cfontWeight={"semibold"}
              ccolor={"brand.pureWhiteTxt"}
              replaceArr={placeholderArray}
              htext={selectedCombo?.configuration?.planDetails?.["description1"]}
            />

            <CustomHTMLBoldParser
              cmt={6}
              cfontSize={{ base: "16px", md: "16px" }}
              cfontWeight={"semibold"}
              ccolor={"brand.pureWhiteTxt"}
              replaceArr={placeholderArray}
              htext={selectedCombo?.configuration?.planDetails?.["description2"]}
            />

            <CustomHTMLBoldParser
              cmt={6}
              cfontSize={{ base: "16px", md: "16px" }}
              cfontWeight={"semibold"}
              ccolor={"brand.pureWhiteTxt"}
              replaceArr={placeholderArray}
              htext={selectedCombo?.configuration?.planDetails?.["description3"]}
            />

            <Button
              disabled={!!emailError || !email}
              mt={8}
              variant={"fblox"}
              width="100%"
              fontSize={{ base: "sm", md: "md" }}
              onClick={() => verifyRegistrationAndHandleCheckout()}
            >
              {" "}
              PRE-ORDER NOW{" "}
            </Button>
          </Box>
        </Flex>

        {/* Right Side Box — Always Visible */}
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
          <Box
            id="imagebox"
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
            />

            <Text
              alignSelf={"start"}
              fontSize={{ base: "xl", sm: "2xl", md: "2xl" }}
              fontWeight="semibold" >
              {selectedCombo?.configuration?.offer?.toUpperCase() ?? ""}
            </Text>

            <CustomHTMLBoldParser
              cmt={6}
              cfontSize={{ base: "16px", md: "16px" }}
              cfontWeight={"semibold"}
              ccolor={"brand.pureWhiteTxt"}
              replaceArr={placeholderArray}
              htext={selectedCombo?.configuration?.planIncludes?.["heading1"]}
            />



            <Box>
              <List.Root mt={2} spacing={3} >
                {(selectedCombo?.configuration?.planIncludes?.features1 ?? []).map((item, idx) => (
                  <List.Item key={idx} style={{ listStyleType: "none" }}>
                    <HStack align="start" spacing={3} mt={2}>
                      <List.Indicator asChild color="brand.subBrandBg">
                        <FaCheck />
                      </List.Indicator>
                      <Text color="brand.pureWhiteTxt" fontSize={{ base: "16px", md: "16px" }}>
                        {replacePlaceholders(item, placeholderArray)}

                      </Text>
                    </HStack>
                  </List.Item>
                ))}
              </List.Root>
            </Box>

            <Text
              mt={6}
              fontSize={{ base: "16px", md: "16px" }}
              color={"brand.pureWhiteTxt"}>{selectedCombo?.configuration?.planIncludes?.["features1Heading"]}</Text>



            <Text
              mt={4}
              fontSize={{ base: "16px", md: "16px" }}
              color={"brand.pureWhiteTxt"}>{selectedCombo?.configuration?.planIncludes?.["heading2"]}</Text>

            <Text
              mt={4}
              fontSize={{ base: "16px", md: "16px" }}
              color={"brand.pureWhiteTxt"}>{selectedCombo?.configuration?.planIncludes?.["heading3"]}</Text>
          </Box>
        </Flex>
      </Flex>

      {/* Bottom Component */}

      <CustomFooter />

      <CustomSpinner show={loading} />

      <CustomDialogMessage
        show={showMsg}
        setShow={setShowMsg}
        description={"You've already registered with Flowblox."}
        onClose={() => { setShowMsg(false) }}
        closeLabel={"Close"}
        placement={"center"}
      />

    </>
  );
}
