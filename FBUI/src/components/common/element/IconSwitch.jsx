import { Box, Icon } from "@chakra-ui/react";
import React from "react";
import { AiFillMediumCircle } from "react-icons/ai";
import { BiLogoSquarespace } from "react-icons/bi";
import { BsLightningCharge, BsTwitterX } from "react-icons/bs";
import { FaBlog, FaInstagram, FaPodcast, FaRegNewspaper, FaTiktok, FaYoutube } from "react-icons/fa";
import { FaRegFileLines } from "react-icons/fa6";
import { FiCodesandbox, FiShield, FiShieldOff } from "react-icons/fi";
import { GiAbstract047 } from "react-icons/gi";
import { GoPerson } from "react-icons/go";
import { ImFacebook2 } from "react-icons/im";
import { IoNewspaperOutline, IoShareSocialOutline } from "react-icons/io5";
import { MdOutlineRssFeed } from "react-icons/md";
import { SiAwwwards } from "react-icons/si";
import { TbRefresh } from "react-icons/tb";
import { TfiCheckBox } from "react-icons/tfi";
import { TiSocialLinkedin } from "react-icons/ti";

function IconSwitch(props) {
  const type = props.type;
  const boxSize = props.boxSize;
  const color = props.color ?? "brand.pureWhiteTxt";
  const bgColor = props.bgColor;
  const offset = 3;


  // Map type to icon
  let iconMap = {
    article_blog: FaRegFileLines,
    podcast: FaPodcast,
    rssFeed: MdOutlineRssFeed,
    share: IoShareSocialOutline,
    facebook: ImFacebook2,
    linkedin: TiSocialLinkedin,
    tumbler: FaInstagram,
    medium: AiFillMediumCircle,
    squarespace: BiLogoSquarespace,
    checked: TfiCheckBox,
    container: FiCodesandbox,
    frequency: TbRefresh,
    lightning: BsLightningCharge,
    shield: FiShield,
    shieldOff: FiShieldOff,
    person: GoPerson,
    youtube: FaYoutube,
    x: BsTwitterX,
    tiktok: FaTiktok,
    blog: FaBlog,
    news: IoNewspaperOutline,
    website: SiAwwwards,

  };

  let SelectedIcon = iconMap[type] || GiAbstract047;

  return (
    <Box
      bg={bgColor} // Apply background color
      borderRadius="full" // Circular shape
      p={bgColor ? { base: 1, md: 2 } : 0} // Padding for background circle
      display="flex"
      alignItems="center"
      justifyContent="center"
      boxSize={{ base: typeof boxSize === "object" ? boxSize.base + offset : boxSize + offset, md: typeof boxSize === "object" ? boxSize.md + offset : boxSize + offset }} // Add padding to boxSize
    >
      <Icon
        as={SelectedIcon}
        boxSize={boxSize} // Icon size
        color={color}
      />
    </Box>
  );
}

export default React.memo(IconSwitch);