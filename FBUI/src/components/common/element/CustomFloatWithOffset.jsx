import { Box, Circle, Float } from "@chakra-ui/react"

export const CustomFloatWithOffset = (props) => {

  let value = props?.value;
  let offset = props?.offset;
  let placement = props?.placement;

  const getComponent = () => {

    if (!value) {
      return (<></>)
    }

    return (<>
      <Float offset={offset} placement={placement} color={'brand.primaryBrandTxt'}>
        {value}
      </Float>

    </>)
  }

  return (getComponent())

}
