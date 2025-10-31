import { Image } from "@chakra-ui/react";
import logo from "../../../assets/logo1.png";
import logoMini2 from "../../../assets/flowblox_mini_2.png";
import logoMini3 from "../../../assets/flowblox_mini_3.png";
import container1 from "../../../assets/container_1.png";
import sbTxtLogo from "../../../assets/sb_logo.png";
import fbTxtLogo from "../../../assets/flowblox_mini_3.png";

export const CustomBrandLogo = (props) => {
  return CustomIcon(props, logo, "Flowblox.ai")
};

export const CustomBrandLogoMini = (props) => {
  return CustomIcon(props, logoMini2, "Flowblox.ai")
};


export const CustomBrandLogoMiniBlackBG = (props) => {
  return CustomIcon(props, logoMini3, "Flowblox.ai")
};

export const CustomBrandFBTxtLogoMiniBlackBG = (props) => {
  return CustomIcon(props, fbTxtLogo, "Flowblox.ai")
};

export const CustomBrandSBTxtLogoMiniBlackBG = (props) => {
  return CustomIcon(props, sbTxtLogo, "Sendblox.ai")
};

export const CustomContainerLogo = (props) => {
  return CustomIcon(props, container1, "Containers")
};

export const CustomIcon = (props, imageStr, calt) => {

  let cw = props.cw ?? "auto"
  let ch = props.ch ?? "auto"
  let cmx = props.cmx
  let cmy = props.cmy

  let cmb = props.cmb
  let cmt = props.cmt

  let ccolor = props.ccolor

  return (
    <>
      <Image
        src={imageStr}
        alt={calt}
        w={cw}
        h={ch}
        mx={cmx}
        my={cmy}
        mb={cmb}
        mt={cmt}
        objectFit="contain"
        color={ccolor}
      />
    </>
  );
};



