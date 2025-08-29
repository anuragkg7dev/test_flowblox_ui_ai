import { Button, Spinner } from "@chakra-ui/react";
import { memo } from "react";
import { BeatLoader } from "react-spinners";

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
  let loaderType = props.loaderType

  const getLoader = () => {
    if (loaderType == 'beat') {
      return (<BeatLoader size={5} color="white" />)
    }
    return (<Spinner size="sm" />)
  }


  return (
    <>
      {loader && (
        <Button
          height={cheight}
          width={cwidth}
          mt={cmt}
          variant={cvariant}
          loading
          spinner={getLoader()}
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
