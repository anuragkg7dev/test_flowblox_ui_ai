import { FormatNumber, HStack, Stat } from "@chakra-ui/react";
import { memo, useEffect } from "react";

function CustomBoldPricing(props) {
  let currency = props.currency;
  let price = props.price;
  let billingPeriod = props.billingPeriod;
  let ccolor = props.ccolor ?? "brand.subBrandBg";
  let cfontSize = props.cfontSize ?? "48px";
  let cfontSizeBP = props.cfontSizeBP ?? "md";


  if (!currency || price === undefined || billingPeriod === undefined) {
    return null;
  }

 

  return (
    <Stat.Root>
      <HStack>
        <Stat.ValueText color={ccolor} fontSize={cfontSize} fontWeight="bold">
          <FormatNumber value={price} style="currency" currency={currency} />
        </Stat.ValueText>
        <Stat.Label pt={3} color={ccolor} fontSize={cfontSizeBP}>
          {billingPeriod}
        </Stat.Label>
      </HStack>
    </Stat.Root>
  );
}

export default memo(CustomBoldPricing);