import { Image } from "@chakra-ui/react";
import logo from "../../../assets/logo1.png";
import logoMini2 from "../../../assets/flowblox_mini_2.png";

export const CustomBrandLogo = (props) => {

  let cw = props.cw ?? "auto"
  let ch = props.ch ?? "auto"
  let cmx = props.cmx
  let cmy = props.cmy

  let cmb = props.cmb
  let cmt = props.cmt

  return (
    <>
      <Image
        src={logo}
        alt="Flowblox.ai"
        w={cw}
        h={ch}
        mx={cmx}
        my={cmy}
        mb={cmb}
        mt={cmt}
        objectFit="contain"
      />
    </>
  );
};

export const CustomBrandLogoMini = (props) => {

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
        src={logoMini2}
        alt="Flowblox.ai"
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



