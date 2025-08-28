import { Button } from "@chakra-ui/react";
import { memo } from "react";

function CustomLoaderButton(props) {
  let cwidth = props.cwidth;
  let cheight = props.cheight;
  let cmt = props.cmt;
  let cvariant = props.cvariant;
  let cloadingText = props.cloadingText;
  let loader = props.loader;
  let onClickBtn = props.onClickBtn;
  let clabel = props.clabel;
  let cdisabled = props.cdisabled ?? false

  return (
    <>
      {loader && (
        <Button
          height={cheight}
          width={cwidth}
          mt={cmt}
          variant={cvariant}
          loading
          loadingText={cloadingText}
          disabled={cdisabled}
        >
          {clabel}
        </Button>
      )}

      {!loader && (
        <Button
          mt={cmt}
          variant={cvariant}
          height={cheight}
          width={cwidth}
          fontSize={{ base: "sm", md: "md" }}
          onClick={() => { onClickBtn() }}
          type="button"
          disabled={cdisabled}
        >
          {clabel}

        </Button>

      )}
    </>

  );
}

export default memo(CustomLoaderButton);
