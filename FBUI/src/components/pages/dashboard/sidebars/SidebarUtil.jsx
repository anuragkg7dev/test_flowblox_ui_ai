import {
    DASHBOARD_ACCOUNTS_PREFERENCE,
    DASHBOARD_ACCOUNTS_PREFERENCE_URL,
    DASHBOARD_ANALYTICS,
    DASHBOARD_ANALYTICS_URL,
    DASHBOARD_CBSTORE,
    DASHBOARD_CBSTORE_URL,
    DASHBOARD_CONTAINER_ARTICLE_BLOGS,
    DASHBOARD_CONTAINER_ARTICLE_BLOGS_URL,
    DASHBOARD_CONTAINER_DESTINATION,
    DASHBOARD_CONTAINER_DESTINATION_URL,
    DASHBOARD_CONTAINER_MANAGE_BLOGS,
    DASHBOARD_CONTAINER_MANAGE_BLOGS_URL,
    DASHBOARD_CONTAINER_SETTINGS_BLOGS,
    DASHBOARD_CONTAINER_SETTINGS_BLOGS_URL,
    DASHBOARD_CONTAINER_SOURCE,
    DASHBOARD_CONTAINER_SOURCE_URL,
    DASHBOARD_CONTAINERS,
    DASHBOARD_CONTAINERS_URL,
    DASHBOARD_URL,
} from "@/components/common/constants/AppRouterConstant";
import { APP_CONFIG_KEYS } from "@/components/common/constants/CommonConstant";
import { CommonLabels } from "@/components/common/constants/CommonLabelConstants";
import { CiShare2 } from "react-icons/ci";
import { FiCodesandbox } from "react-icons/fi";
import { GiSettingsKnobs } from "react-icons/gi";
import { IoIosPaper } from "react-icons/io";
import { LuChartPie, LuServer } from "react-icons/lu";
import { PiSignOutBold } from "react-icons/pi";
import { RxDashboard } from "react-icons/rx";
import { TbCloudUpload } from "react-icons/tb";

export const PREVIOUS = "previous"
export const HOME = "home"

export const mainSidebarOptions = [
    {
        to: `${DASHBOARD_URL}/${DASHBOARD_CONTAINERS_URL}`,
        key: DASHBOARD_CONTAINERS,
        label: CommonLabels.MY_BLOX,
        icon: FiCodesandbox,
        type: HOME,
    },
    {
        to: `${DASHBOARD_URL}/${DASHBOARD_ANALYTICS_URL}`,
        key: DASHBOARD_ANALYTICS,
        label: "Analytics",
        icon: LuChartPie,
        hidden: true,
    },
];

export const mainSidebarBottomOptions = [
    {
        to: `${DASHBOARD_URL}/${DASHBOARD_CBSTORE_URL}`,
        key: DASHBOARD_CBSTORE,
        label: "Containers & Bolt On Store",
        icon: LuServer,
        hidden: true,
    },
    {
        to: `${DASHBOARD_URL}/${DASHBOARD_ACCOUNTS_PREFERENCE_URL}`,
        key: DASHBOARD_ACCOUNTS_PREFERENCE,
        label: "Account & Preferences",
        icon: PiSignOutBold,
    }
];


export const containerBlogTopSidebarOptions = [
    {
        to: `${DASHBOARD_URL}/${DASHBOARD_CONTAINERS_URL}`,
        key: DASHBOARD_CONTAINERS,
        label: CommonLabels.MY_BLOX,
        icon: RxDashboard,
        type: PREVIOUS,
    },
    {
        to: `${DASHBOARD_URL}/${DASHBOARD_CONTAINERS_URL}/${DASHBOARD_CONTAINER_MANAGE_BLOGS_URL}`,
        key: DASHBOARD_CONTAINER_MANAGE_BLOGS,
        label: "Dashboard",
        icon: RxDashboard,
        type: HOME,
    },
    {
        to: `${DASHBOARD_URL}/${DASHBOARD_CONTAINERS_URL}/${DASHBOARD_CONTAINER_ARTICLE_BLOGS_URL}`,
        key: DASHBOARD_CONTAINER_ARTICLE_BLOGS,
        label: "Article",
        icon: IoIosPaper,
    },
    {
        to: `${DASHBOARD_URL}/${DASHBOARD_CONTAINERS_URL}/${DASHBOARD_CONTAINER_SOURCE_URL}`,
        key: DASHBOARD_CONTAINER_SOURCE,
        label: "Source",
        icon: CiShare2,
    },
    {
        to: `${DASHBOARD_URL}/${DASHBOARD_CONTAINERS_URL}/${DASHBOARD_CONTAINER_DESTINATION_URL}`,
        key: DASHBOARD_CONTAINER_DESTINATION,
        label: "Destination",
        icon: TbCloudUpload,
    },
    {
        to: `${DASHBOARD_URL}/${DASHBOARD_CONTAINERS_URL}/${DASHBOARD_CONTAINER_SETTINGS_BLOGS_URL}`,
        key: DASHBOARD_CONTAINER_SETTINGS_BLOGS,
        label: "Settings",
        icon: GiSettingsKnobs,
    },
];

export const sidebarSwitch = {
    MAIN: "main",
    CONTAINER: "container",
}

export const getSBarButtonStyles = (type, currentSelection) => {

    return {
        bg:
            type === currentSelection
                ? "brand.primaryBrandButton"
                : "brand.pureBlackButton",
        color: type === currentSelection ? "white" : "brand.pureWhiteTxt",
        _hover: {
            bg:
                type === currentSelection
                    ? "brand.primaryBrandButton"
                    : "brand.pureBlackButton",
        },
    };
};



export const getCurrentSelection = (config) => {
    return config[APP_CONFIG_KEYS.CURRENT_SELECTION]??DASHBOARD_CONTAINERS;
};


