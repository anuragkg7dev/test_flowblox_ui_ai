import { CONTENT_TYPE } from "@/components/client/EdgeConstant";
import { getSourceAndDestination } from "@/components/client/EdgeFunctionRepository";
import { APP_CONFIG_KEYS } from "@/components/common/constants/CommonConstant";
import SquarespaceIntegration from "@/components/integration/SquareSapceIntegration";
import { useAppConfigStore } from "@/components/store/AppConfigStore";
import { useEffect, useState } from "react";
import { CONTAINERS_KEY, SOURCE_DESTINATION_KEY } from "../ContainersConstant";
import { useAuthStore } from "@/components/store/AuthStateStore";

export default function SettingsConfigurable() {
  const [selectedDestination, setSelectedDestination] = useState();
  const [loader, setLoader] = useState(false);
  const [destinationList, setDestinationList] = useState([]);

  const [destinationOptionsList, setDestinationOptionsList] = useState([]);

  const { config: xconfig, setConfig, updateConfig } = useAppConfigStore();
  const { jwt: authkeyBearer } = useAuthStore();
  let container = xconfig[APP_CONFIG_KEYS.CONTAINER_DATA]
  let containerId = container?.id
  let hostUrl = 'https://tsdnwkcetuysrzhdhpsj.supabase.co/functions/v1/getArticlesExt' // to do.. move to env

  const [pageConfigParams, setPageConfigParams] = useState(new Map([
    [SOURCE_DESTINATION_KEY.KIND, CONTENT_TYPE.DESTINATION],
    [SOURCE_DESTINATION_KEY.CONTAINERS_ID, container[CONTAINERS_KEY.ID]],
  ]));

  const fieldMargin = 7
  const fieldWidth = "90%"
  const labelIconSize = 20
  const cvariant = "fbloxD"


  useEffect(() => {
    console.log('AKG loading SettingsConfigurable')
    //setLoader(true)
    // loadDestinationDataList();
  }, []);

  const loadDestinationDataList = () => {
    if (xconfig?.[APP_CONFIG_KEYS.DESTINATION_DATA_LIST]) {
      setDestinationList(xconfig?.[APP_CONFIG_KEYS.DESTINATION_DATA_LIST]);
      setLoader(false);
    } else {
      loadDestinationData();
    }
  }
  const loadDestinationData = () => {
    getSourceAndDestination(pageConfigParams,
      (flag, data) => {
        if (flag) {
          setDestinationList(data?.[CONTENT_TYPE.DESTINATION] ?? []);
          updateConfig(APP_CONFIG_KEYS.DESTINATION_DATA_LIST, data?.[CONTENT_TYPE.DESTINATION] ?? [])
          updateDestinationOptions(data?.[CONTENT_TYPE.DESTINATION] ?? [])

        } else {
          toast.error('Failed to load destinations!!')
        }
        setLoader(false);
      },
      authkeyBearer)
  }

  const updateDestinationOptions = (destList) => {
    let options = destList?.map((x) => ({
      label: x.title,
      value: x.type,
      description: x.type,
    })) || [];
    setDestinationOptionsList(options)
  };



  return (
    <>
      {/* <Flex>
        <Field.Root width="100%" color="brand.pureWhiteTxt" fontSize={{ base: "sm", md: "md" }} mt={6} >
          <Field.Label>
            <HStack>
              <GiOnTarget size={labelIconSize} color="inherit" />
              <Text>Destination</Text>
            </HStack>
          </Field.Label>
          <CustomSelect
            sdata={destinationOptionsList}
            defaultSelected={selectedDestination}
            slabel=""
            splaceholder="Select"
            cselectCallback={(data) => setSelectedDestination(data)}
            cml={fieldMargin}
            cwidth={fieldWidth} />
          <Field.ErrorText fontSize={{ base: "xs", md: "sm" }}>This field is required</Field.ErrorText>
        </Field.Root>
      </Flex> */}


      <SquarespaceIntegration
        containerId={containerId}
        hostUrl={hostUrl}
      />


    </>
  );
}