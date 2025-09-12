
import { COMMON_STATUS, CONTENT_TYPE } from "@/components/client/EdgeConstant";
import { createAndUpdateSourceAndDestination, getSourceAndDestination } from "@/components/client/EdgeFunctionRepository";
import { ACTION, APP_CONFIG_KEYS, UX } from "@/components/common/constants/CommonConstant";
import CustomAddCard from "@/components/common/element/cards/CustomAddCard";
import CustomAddRow from "@/components/common/element/cards/CustomAddRow";
import CustomDestinationDisplayCard from "@/components/common/element/cards/CustomDestinationDisplayCard";
import CustomDestinationDisplayRow from "@/components/common/element/cards/CustomDestinationDisplayRow";
import CustomLoaderCard from "@/components/common/element/cards/CustomLoaderCard";
import CustomLoaderRow from "@/components/common/element/cards/CustomLoaderRow";
import { toast } from "@/components/common/Notification";
import { useAppConfigStore } from "@/components/store/AppConfigStore";
import { Button, HStack, Wrap } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CARD_LAYOUT, LABELS, LIST_LAYOUT } from "../../DashboardConstant";
import ContainerDrawer from "../ContainerDrawer";
import { CONTAINERS_KEY, DESTINATION_BASE, SOURCE_DESTINATION_KEY } from "../ContainersConstant";
import CommonSearchHeader from "../headers/CommonSearchHeader";
import AddEditDestination from "./AddEditDestination";
import { useAuthStore } from "@/components/store/AuthStateStore";

export default function Destination() {
  const [layoutStyle, setLayoutStyle] = useState(CARD_LAYOUT);
  const [openDrawer, setOpenDrawer] = useState(false)
  const [drawerLabel, setDrawerLabel] = useState();
  const [destinationMaster, setDestinationMaster] = useState();
  const [destinationList, setDestinationList] = useState([]);
  const [action, setAction] = useState();

  const [loader, setLoader] = useState(false);

  const MAX_LIMIT = 5

  const { config: xconfig, setConfig, updateConfig, updateConfigObj } = useAppConfigStore();
  const { jwt: authkeyBearer } = useAuthStore();
  let container = xconfig[APP_CONFIG_KEYS.CONTAINER_DATA]

  const [pageConfigParams, setPageConfigParams] = useState(new Map([
    [SOURCE_DESTINATION_KEY.KIND, CONTENT_TYPE.DESTINATION],
    [SOURCE_DESTINATION_KEY.CONTAINERS_ID, container[CONTAINERS_KEY.ID]],
  ]));

  useEffect(() => {
    setLoader(true)
    loadDestinationDataList();
  }, []);

  const loadDestinationDataList = () => {
    if (xconfig?.[APP_CONFIG_KEYS.DESTINATION_DATA_LIST]) {
      setDestinationList(xconfig?.[APP_CONFIG_KEYS.DESTINATION_DATA_LIST] ?? []);
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
        } else {
          toast.error('Failed to load destinations!!')
        }
        setLoader(false);
      },
      authkeyBearer)
  }

  const onClickAdd = () => {
    setDestinationMaster({ ...DESTINATION_BASE })
    setAction(ACTION.ADD)
    setDrawerLabel(LABELS.ADD_DESTINATION)
    setOpenDrawer(true)
  }

  const onClickEdit = (val) => {
    setDestinationMaster({ ...val })
    setAction(ACTION.EDIT)
    setDrawerLabel(LABELS.EDIT_DESTINATION)
    setOpenDrawer(true)
  }
  const onSwitchChange = (val, data) => {
    setDestinationList(updatedDestinationListById(data.id, SOURCE_DESTINATION_KEY.PROCESSING, true))
    let tempDestination = { ...data }
    tempDestination[SOURCE_DESTINATION_KEY.KIND] = CONTENT_TYPE.DESTINATION
    tempDestination[SOURCE_DESTINATION_KEY.STATUS] = getSwitchStringFlag(val)

    createAndUpdateSourceAndDestination(
      tempDestination,
      (xflag, respData) => onSwitchChangeCallback(xflag, respData, data, val), // Inline function
      authkeyBearer)
  }

  const onSwitchChangeCallback = (flag, respData, data, val) => {
    let id = data.id

    if (flag) {
      setDestinationList(updatedDestinationListById(id, SOURCE_DESTINATION_KEY.STATUS, getSwitchStringFlag(val)));
      toast.success(`Turned ${COMMON_STATUS.ACTIVE == getSwitchStringFlag(val) ? "on " : "Off "} destination ${data[SOURCE_DESTINATION_KEY.TITLE]}`)
    } else {
      toast.error(`Failed to update destination ${data[SOURCE_DESTINATION_KEY.TITLE]} !!`)
    }

    setDestinationList(updatedDestinationListById(id, SOURCE_DESTINATION_KEY.PROCESSING, false))
    updateConfigObj({ [APP_CONFIG_KEYS.SOURCE_DATA_LIST]: undefined, [APP_CONFIG_KEYS.CONTAINER_MODIFIED]: undefined }) // to enable reload

    setLoader?.(false)

  }

  const getSwitchStringFlag = (boolFlag) => {
    return (boolFlag == undefined || boolFlag == false) ? COMMON_STATUS.INACTIVE : COMMON_STATUS.ACTIVE
  }

  const getSwitchBooleanFlag = (val) => {
    return (val == undefined || val == COMMON_STATUS.INACTIVE) ? false : true
  }

  const updatedDestinationListById = (id, key, value) => {
    return destinationList.map(x => {
      if (x.id == id) {
        x[key] = value
      }
      return x;
    })
  }


  const getCardLayout = (data) => {
    return (
      <>
        <CustomDestinationDisplayCard
          cKey={"k1" + data[SOURCE_DESTINATION_KEY.ID]}
          key={"k1" + data[SOURCE_DESTINATION_KEY.ID]}
          heading={data[SOURCE_DESTINATION_KEY.TITLE]}
          subHeading={undefined}
          description={data[SOURCE_DESTINATION_KEY.DESCRIPTION]}
          onClickEdit={onClickEdit}
          onChangeSwitch={onSwitchChange}
          type={data[SOURCE_DESTINATION_KEY.TYPE]}
          enabled={getSwitchBooleanFlag(data[SOURCE_DESTINATION_KEY.STATUS])}
          data={data}
          isProcessing={data[SOURCE_DESTINATION_KEY.PROCESSING]}
        />
      </>
    );
  };

  const getListLayout = (data) => {
    return (
      <>
        <CustomDestinationDisplayRow
          cKey={"k1" + data[SOURCE_DESTINATION_KEY.ID]}
          key={"k1" + data[SOURCE_DESTINATION_KEY.ID]}
          heading={data[SOURCE_DESTINATION_KEY.TITLE]}
          subHeading={undefined}
          description={data[SOURCE_DESTINATION_KEY.DESCRIPTION]}
          onClickEdit={onClickEdit}
          onChangeSwitch={onSwitchChange}
          type={data[SOURCE_DESTINATION_KEY.TYPE]}
          enabled={getSwitchBooleanFlag(data[SOURCE_DESTINATION_KEY.STATUS])}
          data={data}
          isProcessing={data[SOURCE_DESTINATION_KEY.PROCESSING]}
        />
      </>
    );
  };

  const getLayout = (data) => {
    if (layoutStyle == LIST_LAYOUT) {
      return getListLayout(data);
    }
    return getCardLayout(data);
  };

  const getAddLayout = () => {
    if (layoutStyle == LIST_LAYOUT) {
      return (<CustomAddRow clabel="Add Destination" onClickAdd={onClickAdd} />)
    }
    return (<CustomAddCard clabel="Add Destination" onClickAdd={onClickAdd} />)
  }

  const getLoader = () => {
    if (layoutStyle == LIST_LAYOUT) {
      return (<CustomLoaderRow />)
    }
    return (<CustomLoaderCard />)
  }

  return (
    <>
      <CommonSearchHeader
        layoutStyle={layoutStyle}
        setLayoutStyle={setLayoutStyle}
        name={"Destination"}
        enableSelect={false}
      />
      <HStack justify={"flex-end"} mr={UX.global_right_padding} mt={"10px"} mb={"20px"}>
        <Button
          mt={1}

          key={`btm_addSource`}
          variant={"fblox"}
          width="auto"
          height={"34px"}
          aria-label="Add Destination"
          onClick={() => onClickAdd()}

        >
          Add Destination
        </Button>


      </HStack>

      <Wrap pl={UX.global_left_padding} pr={layoutStyle == CARD_LAYOUT ? "0px" : UX.global_right_padding} gap={layoutStyle == LIST_LAYOUT ? "8px" : "20px"}>


        {loader && (getLoader())}

        {destinationList?.map((x) => {
          return getLayout(x);
        })}

        {destinationList?.length < MAX_LIMIT && getAddLayout()}
      </Wrap>

      <ContainerDrawer open={openDrawer} setOpen={setOpenDrawer} >
        <AddEditDestination
          setOpenDrawer={setOpenDrawer}
          drawerHeader={drawerLabel}
          destinationMaster={destinationMaster}
          setDestinationMaster={setDestinationMaster}
          containerId={container?.id}
          action={action}
          loader={loader}
          setLoader={setLoader}
          loadDestinationData={loadDestinationData}
        />
      </ContainerDrawer>


    </>
  );
}