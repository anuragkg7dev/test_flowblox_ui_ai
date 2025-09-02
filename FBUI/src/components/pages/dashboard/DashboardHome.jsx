import { DASHBOARD_CONTAINERS } from "@/components/common/constants/AppRouterConstant";
import { CustomBrandLogoMiniBlackBG } from "@/components/common/element/CustomBrandLogo";
import { Box, Flex, IconButton, useBreakpointValue } from "@chakra-ui/react";
import { Suspense, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import CommonSidebar from "./sidebars/CommonSidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import { useAppConfigStore } from "@/components/store/AppConfigStore";

const DashboardHome = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Responsive breakpoints for sidebar width and padding
  const sidebarWidth = useBreakpointValue({
    base: "100%",
    sm: "250px",
    md: "300px",
  });
  const padding = useBreakpointValue({ base: 2, sm: 3, md: 4 });
  const isMobile = useBreakpointValue({ base: true, md: false });



  // Toggle sidebar for mobile
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);


  return (
    <Flex direction="column" minH="100vh" bg="brand.pureBlackBg">
      {/* Mobile Header */}
      {isMobile && (
        <Box
          bg="brand.pureBlackBg"
          p={padding}
          borderBottom="1px solid"
          borderColor="brand.greyBrandBorder"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <CustomBrandLogoMiniBlackBG
            ch="50px"
            cw="50px"
            ccolor="brand.pureWhiteBg"
          />
          <IconButton
            key="menu"
            aria-label={isSidebarOpen ? "Close sidebar" : "Open sidebar"}
            onClick={toggleSidebar}
            variant="solid"
            size="lg"
          >
            {isSidebarOpen ? (
              <GrClose colorPalette={"brand.pureWhiteBg"} />
            ) : (
              <GiHamburgerMenu colorPalette={"brand.pureWhiteBg"} />
            )}
          </IconButton>
        </Box>
      )}

      <Flex flex={1} direction={{ base: "column", md: "row" }}>
        {/* Sidebar */}
        <Box
          w={sidebarWidth}
          bg="brand.pureBlackBg"
          p={padding}
          color="brand.pureWhiteTxt"
          borderRight={"0.05px solid"}
          borderColor="brand.greyBrandBorder"
          fontFamily="heading"
          display={{ base: isSidebarOpen ? "block" : "none", md: "block" }}
          transition="all 0.3s ease"
          // Change: Use fixed positioning for sidebar on medium and larger screens to prevent scrolling
          position={{ base: "absolute", md: "fixed" }}
          zIndex={10}
          // Change: Ensure sidebar takes full viewport height on medium and larger screens
          h={{ base: "auto", md: "100vh" }}
          // Change: Prevent sidebar content from scrolling
          overflowY={{ base: "auto", md: "visible" }}
        >
          {!isMobile && (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100px"
            >
              <CustomBrandLogoMiniBlackBG
                ch="60px"
                cw="60px"
                ccolor="brand.pureWhiteBg"
              />
            </Box>
          )}
          <CommonSidebar/>
        </Box>

        {/* Main Content */}
        <Box
          flex={1}
          bg="brand.pureBlackBg"
          p={padding}
          borderLeft={{ base: "none", md: "0.2px solid" }}
          borderTop={{ base: isSidebarOpen ? "none" : "1px solid", md: "none" }}
          borderColor="brand.greyBrandBorder"
          fontFamily="body"
          // Change: Ensure main content is scrollable on all screen sizes
          overflowY="auto"
          // Change: Adjust margin-left on medium and larger screens to account for fixed sidebar width
          ml={{ base: 0, md: sidebarWidth }}
          // Change: Ensure main content takes full viewport height minus mobile header (if present)
          minH={{ base: "calc(100vh - 64px)", md: "100vh" }}
        >
          <Suspense fallback={<Box color="brand.pureWhiteTxt">Loading...</Box>}>
            <Outlet />
          </Suspense>
        </Box>
      </Flex>
    </Flex>
  );
};

export default DashboardHome;