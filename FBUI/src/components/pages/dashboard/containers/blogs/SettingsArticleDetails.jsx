import CustomSegmentGroup from "@/components/common/element/CustomSegmentGroup";
import { Heading, HStack, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { blogSettingOptions, FREQUENCY } from "../../DashboardConstant";

export default function Settings() {
  const navigate = useNavigate();

  return (
    <>

      <HStack justify={"space-between"}>

        <Heading size="lg" color={"brand.pureWhiteTxt"}>Container Settings</Heading>
        <CustomSegmentGroup
          filterOptions={blogSettingOptions}
          onChangeFilterOptions={(val) => {
            console.log(val);
          }}
          defaultValue={FREQUENCY}
        />

      </HStack>


    </>
  );
}