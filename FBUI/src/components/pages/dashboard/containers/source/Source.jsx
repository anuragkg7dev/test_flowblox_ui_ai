import CustomAddCard from "@/components/common/element/cards/CustomAddCard";
import CustomAddRow from "@/components/common/element/cards/CustomAddRow";
import CustomSourceDisplayCard from "@/components/common/element/cards/CustomSourceDisplayCard";
import CustomSourceDisplayRow from "@/components/common/element/cards/CustomSourceDisplayRow";
import { Button, HStack, Wrap } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CARD_LAYOUT, LABELS, LIST_LAYOUT, typeLabels } from "../../DashboardConstant";
import ContainerDrawer from "../ContainerDrawer";
import CommonSearchHeader from "../headers/CommonSearchHeader";
import AddEditSource from "./AddEditSource";
import { CONTAINERS_KEY, SOURCE_BASE, SOURCE_DESTINATION_KEY } from "../ContainersConstant";
import { ACTION, APP_CONFIG_KEYS, UX } from "@/components/common/constants/CommonConstant";
import { useAppConfigStore } from "@/components/store/AppConfigStore";
import { createAndUpdateSourceAndDestination, getSourceAndDestination } from "@/components/client/EdgeFunctionRepository";
import { COMMON_STATUS, CONTENT_TYPE } from "@/components/client/EdgeConstant";
import { JWT_TOKEN } from "@/components/common/constants/AppRouterConstant";
import { toast } from "@/components/common/Notification";
import CustomLoaderRow from "@/components/common/element/cards/CustomLoaderRow";
import CustomLoaderCard from "@/components/common/element/cards/CustomLoaderCard";

export default function Source() {
  const [layoutStyle, setLayoutStyle] = useState(CARD_LAYOUT);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerLabel, setDrawerLabel] = useState();
  const [sourceMaster, setSourceMaster] = useState();
  const [sourceList, setSourceList] = useState([]);
  const [action, setAction] = useState();
  const [loader, setLoader] = useState(false);

  const MAX_LIMIT = 5

  const { config: xconfig, setConfig, updateConfig } = useAppConfigStore();
  const authkeyBearer = xconfig[JWT_TOKEN];
  let container = xconfig[APP_CONFIG_KEYS.CONTAINER_DATA];

  const [pageConfigParams, setPageConfigParams] = useState(new Map([
    [SOURCE_DESTINATION_KEY.KIND, CONTENT_TYPE.SOURCE],
    [SOURCE_DESTINATION_KEY.CONTAINERS_ID, container[CONTAINERS_KEY.ID]],
  ]));

  useEffect(() => {
    setLoader(true);
    loadSourceDataList();
  }, []);

  const loadSourceDataList = () => {
    if (xconfig?.[APP_CONFIG_KEYS.SOURCE_DATA_LIST]) {
      setSourceList(xconfig?.[APP_CONFIG_KEYS.SOURCE_DATA_LIST]);
      setLoader(false);
    } else {
      loadSourceData();
    }

  }

  const loadSourceData = () => {
    getSourceAndDestination(pageConfigParams,
      (flag, data) => {
        if (flag) {
          setSourceList(data?.[CONTENT_TYPE.SOURCE] ?? []);
          updateConfig(APP_CONFIG_KEYS.SOURCE_DATA_LIST, data?.[CONTENT_TYPE.SOURCE] ?? [])
        } else {
          toast.error('Failed to load sources!!');
        }
        setLoader(false);
      },
      authkeyBearer);
  };

  const onClickAdd = () => {
    setSourceMaster({ ...SOURCE_BASE });
    setAction(ACTION.ADD);
    setDrawerLabel(LABELS.ADD_SOURCE);
    setOpenDrawer(true);
  };

  const onClickEdit = (val) => {
    setSourceMaster({ ...val });
    setAction(ACTION.EDIT);
    setDrawerLabel(LABELS.EDIT_SOURCE);
    setOpenDrawer(true);
  };

  const onSwitchChange = (val, data) => {
    setSourceList(updatedSourceListById(data.id, SOURCE_DESTINATION_KEY.PROCESSING, true));
    let tempSource = { ...data };
    tempSource[SOURCE_DESTINATION_KEY.KIND] = CONTENT_TYPE.SOURCE;
    tempSource[SOURCE_DESTINATION_KEY.STATUS] = getSwitchStringFlag(val);

    createAndUpdateSourceAndDestination(
      tempSource,
      (xflag, respData) => onSwitchChangeCallback(xflag, respData, data, val),
      authkeyBearer);
  };

  const onSwitchChangeCallback = (flag, respData, data, val) => {
    let id = data.id
    if (flag) {
      setSourceList(updatedSourceListById(id, SOURCE_DESTINATION_KEY.STATUS, getSwitchStringFlag(val)));
      toast.success(`Turned ${COMMON_STATUS.ACTIVE == val ? "on " : "Off "} source `);
    } else {
      toast.error(`Failed to update source !!`);
    }

    setSourceList(updatedSourceListById(id, SOURCE_DESTINATION_KEY.PROCESSING, false));
    setConfig({ ...xconfig, [APP_CONFIG_KEYS.SOURCE_DATA_LIST]: undefined, [APP_CONFIG_KEYS.CONTAINER_MODIFIED]: undefined }) // to enable reload
   
    setLoader?.(false);
  };

  const getSwitchStringFlag = (boolFlag) => {
    return (boolFlag == undefined || boolFlag == false) ? COMMON_STATUS.INACTIVE : COMMON_STATUS.ACTIVE;
  };

  const getSwitchBooleanFlag = (val) => {
    return (val == undefined || val == COMMON_STATUS.INACTIVE) ? false : true;
  };

  const updatedSourceListById = (id, key, value) => {
    return sourceList.map(x => {
      if (x.id == id) {
        x[key] = value;
      }
      return x;
    });
  };

  const getCardLayout = (data) => {

    return (
      <CustomSourceDisplayCard
        cKey={"k1" + data[SOURCE_DESTINATION_KEY.ID]}
        key={"k1" + data[SOURCE_DESTINATION_KEY.ID]}
        heading={data[SOURCE_DESTINATION_KEY.TITLE]}
        subHeading={undefined}
        description={data[SOURCE_DESTINATION_KEY.DESCRIPTION]}
        onClickEdit={() => onClickEdit(data)}
        onChangeSwitch={onSwitchChange}
        type={data[SOURCE_DESTINATION_KEY.TYPE]}
        enabled={getSwitchBooleanFlag(data[SOURCE_DESTINATION_KEY.STATUS])}
        data={data}
        isProcessing={data[SOURCE_DESTINATION_KEY.PROCESSING]}
        typeLabel={typeLabels[data[SOURCE_DESTINATION_KEY.TYPE]] ?? data[SOURCE_DESTINATION_KEY.TYPE]}
      />
    );
  };

  const getListLayout = (data) => {
    return (
      <CustomSourceDisplayRow
        cKey={"k1" + data[SOURCE_DESTINATION_KEY.ID]}
        key={"k1" + data[SOURCE_DESTINATION_KEY.ID]}
        heading={data[SOURCE_DESTINATION_KEY.TITLE]}
        subHeading={undefined}
        description={data[SOURCE_DESTINATION_KEY.DESCRIPTION]}
        onClickEdit={() => onClickEdit(data)}
        onChangeSwitch={onSwitchChange}
        type={data[SOURCE_DESTINATION_KEY.TYPE]}
        enabled={getSwitchBooleanFlag(data[SOURCE_DESTINATION_KEY.STATUS])}
        data={data}
        isProcessing={data[SOURCE_DESTINATION_KEY.PROCESSING]}
        typeLabel={typeLabels[data[SOURCE_DESTINATION_KEY.TYPE]] ?? data[SOURCE_DESTINATION_KEY.TYPE]}
      />
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
      return (<CustomAddRow clabel="Add Source" onClickAdd={onClickAdd} />)
    }
    return (<CustomAddCard clabel="Add Source" onClickAdd={onClickAdd} />)
  };

  const getLoader = () => {
    if (layoutStyle == LIST_LAYOUT) {
      return <CustomLoaderRow />;
    }
    return <CustomLoaderCard />;
  };

  return (
    <>
      <CommonSearchHeader
        layoutStyle={layoutStyle}
        setLayoutStyle={setLayoutStyle}
        name={"Sources"}
        enableSelect={false}
      />
      <HStack justify={"flex-end"}  mr={UX.global_right_padding} mt={"10px"} mb={"20px"}>
        <Button
          mt={1}
          key={`btm_addSource`}
          variant={"fblox"}
          width="auto"
          height={"34px"}
          aria-label="Add"
          onClick={() => onClickAdd()}
        >
          Add Source
        </Button>
      </HStack>

       <Wrap pl={UX.global_left_padding} pr={layoutStyle == CARD_LAYOUT ? "0px" : UX.global_right_padding} gap={layoutStyle == LIST_LAYOUT ? "8px" : "20px"}>

        {loader && getLoader()}
        {sourceList?.map((x) => getLayout(x))}
        {sourceList.length < MAX_LIMIT && getAddLayout()}
        
      </Wrap>

      <ContainerDrawer open={openDrawer} setOpen={setOpenDrawer}>
        <AddEditSource
          setOpenDrawer={setOpenDrawer}
          drawerHeader={drawerLabel}
          sourceMaster={sourceMaster}
          setSourceMaster={setSourceMaster}
          containerId={container?.id}
          action={action}
          loader={loader}
          setLoader={setLoader}
          loadSourceData={loadSourceData}
        />
      </ContainerDrawer>
    </>
  );
}