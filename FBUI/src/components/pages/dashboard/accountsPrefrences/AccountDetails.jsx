import { JWT_TOKEN } from "@/components/common/constants/AppRouterConstant";
import { useAppConfigStore } from "@/components/store/AppConfigStore";
import { Button, Field, HStack, Input, InputGroup, Text, Textarea, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { getUsersPersonalDetails, updatePersonalDetails } from "@/components/client/EdgeFunctionRepository";
import { APP_CONFIG_KEYS, USERS_KEY } from "@/components/common/constants/CommonConstant";
import CustomCountry from "@/components/common/element/CustomCountry";
import CustomLoaderButton from "@/components/common/element/CustomLoaderButton";
import { FiHome, FiPhone, FiShield } from "react-icons/fi";
import { GoGlobe, GoPerson } from "react-icons/go";
import { MdOutlineMail } from "react-icons/md";
import CommonHeader from "../containers/headers/CommonHeader";
import { usersValidationSchema } from "../containers/validation/userValidation";
import { validate } from "@/components/validation/ValidationUtil";
import CustomSelect from "@/components/common/element/CustomSelect";
import { countries } from "@/components/common/constants/Country";
import { toast } from "@/components/common/Notification";

export default function AccountDetails(props) {
  const isModified = props.isModified
  const setIsModified = props.setIsModified;

  const { config, setConfig, updateConfig } = useAppConfigStore();
  const authkeyBearer = config[APP_CONFIG_KEYS.JWT_TOKEN];
  const user = config[APP_CONFIG_KEYS.USER_DATA];



  const [fname, setFname] = useState(user?.fname || '');
  const [lname, setLname] = useState(user?.lname || '');
  const [email, setEmail] = useState(user?.email || '');
  const [contact, setContact] = useState(user?.contact || '');
  const [address, setAddress] = useState(user?.address || '');
  const [country, setCountry] = useState(user?.country || '');
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState({});

  const fieldMargin = 7;
  const fieldWidth = "90%";
  const labelIconSize = 20;
  const cvariant = "fbloxD";

  const updateIsModified = (flag) => {
    if (flag != isModified) {
      setIsModified(flag)
    }
  };

  const onSubmit = () => {
    const requestPayload = { fname, lname, country, address, contact, email };
    const errorFlag = validateFields();
    if (!errorFlag) {
      setLoader(true);
      updatePersonalDetails(requestPayload, onSubmitCallback, authkeyBearer);
    }
  };

  const onSubmitCallback = (flag, data) => {
    if (flag) {
      updateIsModified(false);
      getUsersPersonalDetails(getUsersPersonalDetailsCallback, authkeyBearer);
    } else {
      toast.error("Failed to update !!");
      setLoader(false);
    }
  };

  const getUsersPersonalDetailsCallback = async (status, data) => {
    if (!status) {
      toast.error('Failed to refresh user details !!')
    } else {
      updateConfig(APP_CONFIG_KEYS.USER_DATA, data);
      toast.success("Updated");
    }
    setLoader(false);
  }

  const validateFname = () => {
    const err = validate(usersValidationSchema, USERS_KEY.FNAME, fname);
    setError((prev) => ({ ...prev, [USERS_KEY.FNAME]: err }));
  };

  const validateLname = () => {
    const err = validate(usersValidationSchema, USERS_KEY.LNAME, lname);
    setError((prev) => ({ ...prev, [USERS_KEY.LNAME]: err }));
  };

  const validateContact = () => {
    const err = validate(usersValidationSchema, USERS_KEY.CONTACT, contact);
    setError((prev) => ({ ...prev, [USERS_KEY.CONTACT]: err }));
  };

  const validateAddress = () => {
    const err = validate(usersValidationSchema, USERS_KEY.ADDRESS, address);
    setError((prev) => ({ ...prev, [USERS_KEY.ADDRESS]: err }));
  };

  const validateFields = () => {
    const fnameErr = validate(usersValidationSchema, USERS_KEY.FNAME, fname);
    const lnameErr = validate(usersValidationSchema, USERS_KEY.LNAME, lname);
    const contactErr = validate(usersValidationSchema, USERS_KEY.CONTACT, contact);
    const addressErr = validate(usersValidationSchema, USERS_KEY.ADDRESS, address);

    setError({
      [USERS_KEY.FNAME]: fnameErr,
      [USERS_KEY.LNAME]: lnameErr,
      [USERS_KEY.CONTACT]: contactErr,
      [USERS_KEY.ADDRESS]: addressErr,
    });

    return fnameErr || lnameErr || contactErr || addressErr;
  };

  const onLnameChange = (value) => {
    updateIsModified(true);
    setLname(value);
  };

  const onFnameChange = (value) => {
    updateIsModified(true);
    setFname(value);
  };

  const onAddressChange = (value) => {
    updateIsModified(true);
    setAddress(value);
  };

  const onContactChange = (value) => {
    updateIsModified(true);
    setContact(value);
  };

  const onCountryChange = (value) => {
    updateIsModified(true);
    setCountry(value);
  };

  return (
    <>
      <CommonHeader
        cboxSize={{ base: 5, md: 6, lg: 7 }}
        showIcon={true}
        iconType={"person"}
        cmt={{ base: 2, md: 3, lg: 4 }}
        name="Personal Details"
      />

      <VStack
        w="100%"
        minH="100vh"
        spacing={{ base: 4, md: 6, lg: 8 }}
        p={{ base: 2, md: 4, lg: 6 }}
        align="flex-start"
        justify="flex-start"
      >
        <VStack
          w={"90%"}
          spacing={{ base: 4, md: 6, lg: 8 }}
        >
          <HStack
            w="100%"
            flexDirection={{ base: "column", md: "row" }}
            spacing={{ base: 4, md: 6 }}
            align="flex-start"
          >
            <Field.Root
              w="100%"
              color="brand.pureWhiteTxt"
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              invalid={error[USERS_KEY.FNAME]}
            >
              <Field.Label>
                <HStack>
                  <GoPerson size={labelIconSize} color="inherit" />
                  <Text>First Name</Text>
                </HStack>
              </Field.Label>
              <Input
                placeholder="First Name"
                onChange={(e) => onFnameChange(e.target.value)}
                mb={2}
                ml={fieldMargin}
                w={fieldWidth}
                variant={cvariant}
                value={fname}
                onBlur={validateFname}
                size={{ base: "sm", md: "md" }}
              />
              <Field.ErrorText ml={fieldMargin} fontSize={{ base: "xs", md: "sm" }}>
                {error[USERS_KEY.FNAME]}
              </Field.ErrorText>
            </Field.Root>

            <Field.Root
              w="100%"
              color="brand.pureWhiteTxt"
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              invalid={error[USERS_KEY.LNAME]}
            >
              <Field.Label>
                <HStack>
                  <GoPerson size={labelIconSize} color="inherit" />
                  <Text>Last Name</Text>
                </HStack>
              </Field.Label>
              <Input
                placeholder="Last Name"
                onChange={(e) => onLnameChange(e.target.value)}
                mb={2}
                ml={fieldMargin}
                w={fieldWidth}
                variant={cvariant}
                value={lname}
                onBlur={validateLname}
                size={{ base: "sm", md: "md" }}
              />
              <Field.ErrorText ml={fieldMargin} fontSize={{ base: "xs", md: "sm" }}>
                {error[USERS_KEY.LNAME]}
              </Field.ErrorText>
            </Field.Root>

            <Field.Root
              w="100%"
              color="brand.pureWhiteTxt"
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
            >
              <Field.Label>
                <HStack>
                  <MdOutlineMail size={labelIconSize} color="inherit" />
                  <Text>Email</Text>
                </HStack>
              </Field.Label>
              <Input
                placeholder="Email"
                disabled
                mb={2}
                ml={fieldMargin}
                w={fieldWidth}
                variant={cvariant}
                value={email}
                size={{ base: "sm", md: "md" }}
              />
              <Field.ErrorText ml={fieldMargin} fontSize={{ base: "xs", md: "sm" }}>
                This field is required
              </Field.ErrorText>
            </Field.Root>
          </HStack>

          <HStack
            w="100%"
            flexDirection={{ base: "column", md: "row" }}
            spacing={{ base: 4, md: 6 }}
            align="flex-start"
          >

            <Field.Root
              w="100%"
              color="brand.pureWhiteTxt"
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              invalid={error[USERS_KEY.CONTACT]}
            >
              <Field.Label>
                <HStack>
                  <FiPhone size={labelIconSize} color="inherit" />
                  <Text>Contact Number</Text>
                </HStack>
              </Field.Label>
              <Input
                placeholder="Contact Number"
                onChange={(e) => onContactChange(e.target.value)}
                mb={2}
                ml={fieldMargin}
                w={fieldWidth}
                variant={cvariant}
                value={contact}
                onBlur={validateContact}
                size={{ base: "sm", md: "md" }}
              />
              <Field.ErrorText ml={fieldMargin} fontSize={{ base: "xs", md: "sm" }}>
                {error[USERS_KEY.CONTACT]}
              </Field.ErrorText>
            </Field.Root>

            <Field.Root
              w="100%"
              color="brand.pureWhiteTxt"
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              invalid={error[USERS_KEY.ADDRESS]}
            >
              <Field.Label>
                <HStack>
                  <FiHome size={labelIconSize} color="inherit" />
                  <Text>Address</Text>
                </HStack>
              </Field.Label>
              <Textarea
                w={fieldWidth}
                placeholder="Address..."
                variant={cvariant}
                ml={fieldMargin}
                value={address}
                onChange={(e) => onAddressChange(e.target.value)}
                onBlur={validateAddress}
                size={{ base: "sm", md: "md" }}
                maxH={{ base: "150px", md: "200px" }}
                resize="vertical"
              />
              <Field.ErrorText ml={fieldMargin} fontSize={{ base: "xs", md: "sm" }}>
                {error[USERS_KEY.ADDRESS]}
              </Field.ErrorText>
            </Field.Root>

            <Field.Root
              w="100%"
              color="brand.pureWhiteTxt"
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              invalid={error[USERS_KEY.COUNTRY]}
            >
              <Field.Label>
                <HStack>
                  <GoGlobe size={labelIconSize} color="inherit" />
                  <Text>Country</Text>
                </HStack>
              </Field.Label>
              {/* <CustomCountry
                selected={country}
                setSelected={onCountryChange}
                cwidth={fieldWidth}
                cml={fieldMargin}
              /> */}


              <CustomCountry
                sdata={countries}
                defaultSelected={'IN'}
                slabel=""
                splaceholder="Select"
                cselectCallback={(data) => { setCountry(data); console.log(data); }}
                cml={fieldMargin}
                cwidth={fieldWidth} />


              <Field.ErrorText ml={fieldMargin} fontSize={{ base: "xs", md: "sm" }}>
                {error[USERS_KEY.COUNTRY]}
              </Field.ErrorText>
            </Field.Root>
          </HStack>

          <HStack
            w="100%"
            justify="flex-end"
            spacing={{ base: 2, md: 4 }}
            flexDirection={{ base: "column", md: "row" }}
          >
            <Field.Root
              w={{ base: "100%", md: "auto" }}
              color="brand.pureWhiteTxt"
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
            >
              <Field.Label>
                <HStack>
                  <FiShield size={labelIconSize} color="inherit" />
                  <Text>Set Changes</Text>
                </HStack>
              </Field.Label>
              <HStack
                ml={fieldMargin}
                justifyContent={{ base: "center", md: "flex-end" }}
                spacing={{ base: 2, md: 4 }}
              >
                <Button
                  height={{ base: "35px", md: "40px" }}
                  variant={cvariant}
                  fontSize={{ base: "sm", md: "md" }}
                  w={{ base: "100%", sm: "120px" }}
                  onClick={() => { }}
                >
                  Cancel
                </Button>
                <CustomLoaderButton
                  cheight={{ base: "35px", md: "40px" }}
                  cvariant="fblox"
                  cloadingText="Set"
                  loader={loader}
                  onClickBtn={onSubmit}
                  clabel="set"
                  w={{ base: "100%", sm: "120px" }}
                />
              </HStack>
            </Field.Root>
          </HStack>
        </VStack>
      </VStack>
    </>
  );
}