import { CONTENT_TYPE } from "@/components/client/EdgeConstant";
import { getSourceAndDestination } from "@/components/client/EdgeFunctionRepository";
import { JWT_TOKEN } from "@/components/common/constants/AppRouterConstant";
import { APP_CONFIG_KEYS } from "@/components/common/constants/CommonConstant";
import CustomSelect from "@/components/common/element/CustomSelect";
import { useAppConfigStore } from "@/components/store/AppConfigStore";
import { Field, Flex, HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { GiOnTarget } from "react-icons/gi";
import { CONTAINERS_KEY, SOURCE_DESTINATION_KEY } from "../ContainersConstant";

export default function SquarespaceIntegration() {


}