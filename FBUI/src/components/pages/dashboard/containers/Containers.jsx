import { ACTION, APP_CONFIG_KEYS, SIDEBAR_SWITCH_FLAG_KEY } from "@/components/common/constants/CommonConstant";
import CustomAddCard from "@/components/common/element/cards/CustomAddCard";
import CustomAddRow from "@/components/common/element/cards/CustomAddRow";
import CustomContainerDisplayCard from "@/components/common/element/cards/CustomContainerDisplayCard";
import CustomContainerDisplayRow from "@/components/common/element/cards/CustomContainerDisplayRow";
import { useAppConfigStore } from "@/components/store/AppConfigStore";
import { Wrap } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CARD_LAYOUT, LABELS, LIST_LAYOUT } from "../DashboardConstant";
import { containerBlogTopSidebarOptions, HOME, sidebarSwitch } from "../sidebars/SidebarUtil";
import ContainerDrawer from "./ContainerDrawer";
import AddEditBlogsContainer from "./blogs/AddEditBlogsContainer";

import { getHomeRoute } from "@/components/common/util/RouteUtil";
import { useNavigate } from "react-router-dom";
import CommonSearchHeader from "./headers/CommonSearchHeader";
import { CONTAINERS_BLOG_BASE, CONTAINERS_KEY } from "./ContainersConstant";
import { getContainers } from "@/components/client/EdgeFunctionRepository";
import { JWT_TOKEN } from "@/components/common/constants/AppRouterConstant";
import { getBlogContainerFromresponse } from "./ContainersUtil";
import { COMMA, splitString } from "@/components/common/util/StringUtil";
import CustomLoaderCard from "@/components/common/element/cards/CustomLoaderCard";
import CustomLoaderRow from "@/components/common/element/cards/CustomLoaderRow";
import { toast } from "@/components/common/Notification";


export default function Containers() {
  const [layoutStyle, setLayoutStyle] = useState(CARD_LAYOUT);
  const [openDrawer, setOpenDrawer] = useState(false)
  const { config, setConfig, updateConfig } = useAppConfigStore();
  const [action, setAction] = useState();
  const [drawerLabel, setDrawerLabel] = useState();
  const [containerMaster, setContainerMaster] = useState({});
  const [containerList, setContainerList] = useState([]);
  const [loader, setLoader] = useState(false);

  const navigate = useNavigate()

  const authkeyBearer = config[JWT_TOKEN];

  useEffect(() => {
    cleanUp();
    setLoader(true)

    updateConfig(APP_CONFIG_KEYS.SIDEBAR_SWITCH_FLAG_KEY, sidebarSwitch.MAIN);
    loadAllContainerData();
  }, []);

  const loadAllContainerData = () => {
    if (config?.[APP_CONFIG_KEYS.CONTAINER_MODIFIED] == true || config?.[APP_CONFIG_KEYS.CONTAINER_MODIFIED] == undefined) {
      loadContainerData();
    } else {
      setContainerList(config?.[APP_CONFIG_KEYS.CONTAINER_DATA_LIST]);
      setLoader(false)
    }

  }

  const loadContainerData = () => {
    getContainers(undefined,
      (flag, data) => {
        if (flag) {
          setContainerList(data?.containers ?? []);
          setConfig({
            ...config,
            [APP_CONFIG_KEYS.CONTAINER_DATA_LIST]: data?.containers ?? [],
            [APP_CONFIG_KEYS.CONTAINER_MODIFIED]: false
          });

        } else {
          toast.error('Failed to load container!!')
        }
        setLoader(false);
      },
      authkeyBearer)
  }


  const handleEdit = (data) => {
    setAction(ACTION.EDIT)
    setContainerMaster({ ...data })
    setDrawerLabel(LABELS.EDIT_CONTAINER)
    setOpenDrawer(true)
  }

  const handleAdd = (e) => {
    setContainerMaster({ ...CONTAINERS_BLOG_BASE })
    setAction(ACTION.ADD)
    setDrawerLabel(LABELS.ADD_CONTAINER)
    setOpenDrawer(true)
  }

  const handleManage = (containerData) => {
    let hroute = getHomeRoute(containerBlogTopSidebarOptions, HOME)

    setAction(ACTION.MANAGE)

    setConfig({
      ...config,
      [APP_CONFIG_KEYS.SIDEBAR_SWITCH_FLAG_KEY]: sidebarSwitch.CONTAINER,
      [APP_CONFIG_KEYS.CONTAINER_DATA]: containerData,
      [APP_CONFIG_KEYS.CURRENT_SELECTION]: hroute?.key
    });

    navigate(hroute?.to)
  }

  const getCardLayout = (container) => {
    return (
      <>
        <CustomContainerDisplayCard
          cKey={"k1" + container[CONTAINERS_KEY.ID]}
          key={"k1" + container[CONTAINERS_KEY.ID]}
          heading={container[CONTAINERS_KEY.NAME]}
          subHeading={undefined}
          badges={splitString(container[CONTAINERS_KEY.TAGS], COMMA)}
          description={container[CONTAINERS_KEY.DESCRIPTION]}
          data={container}
          badgesColor="purple"
          editFlag={true}
          manageFlag={true}
          onClickEdit={handleEdit}
          onClickManage={handleManage}
          type={container[CONTAINERS_KEY.CONTENT_TYPE]}
        />
      </>
    );

  }


  const getListLayout = (container) => {
    return (
      <>
        <CustomContainerDisplayRow
          cKey={"k1" + container[CONTAINERS_KEY.ID]}
          key={"k1" + container[CONTAINERS_KEY.ID]}
          heading={container[CONTAINERS_KEY.NAME]}
          subHeading={undefined}
          badges={splitString(container[CONTAINERS_KEY.TAGS], COMMA)}
          description={container[CONTAINERS_KEY.DESCRIPTION]}
          data={container}
          badgesColor="purple"
          editFlag={true}
          manageFlag={true}
          onClickEdit={handleEdit}
          onClickManage={handleManage}
          type={container[CONTAINERS_KEY.CONTENT_TYPE]}
        />
      </>
    )
  }

  const getLoader = () => {
    if (layoutStyle == LIST_LAYOUT) {
      return (<CustomLoaderRow />)
    }
    return (<CustomLoaderCard />)
  }

  const getLayout = (data) => {

    if (layoutStyle == LIST_LAYOUT) {
      return getListLayout(data)
    }
    return getCardLayout(data)
  }

  const getAddLayout = () => {
    if (layoutStyle == LIST_LAYOUT) {
      return (<CustomAddRow clabel="Create New Container" onClickAdd={handleAdd} />)
    }
    return (<CustomAddCard clabel="Create New Container" onClickAdd={handleAdd} />)
  }

  const cleanUp=()=>{
        setConfig({
      ...config,     
      [APP_CONFIG_KEYS.CONTAINER_DATA]: undefined,
      [APP_CONFIG_KEYS.SOURCE_DATA_LIST]: undefined,
      [APP_CONFIG_KEYS.DESTINATION_DATA_LIST]: undefined,     
    });
  }

  return (
    <>
      <CommonSearchHeader
        layoutStyle={layoutStyle}
        setLayoutStyle={setLayoutStyle}
      />

      <Wrap gap={layoutStyle == LIST_LAYOUT ? "8px" : "20px"}>

        {loader && (getLoader())}

        {containerList?.map(x => getBlogContainerFromresponse(x)).map((x) => {
          return (getLayout(x))
        })}

        {getAddLayout()}

      </Wrap>

      <ContainerDrawer open={openDrawer} setOpen={setOpenDrawer} >
        <AddEditBlogsContainer
          setOpenDrawer={setOpenDrawer}
          drawerHeader={drawerLabel}
          containerMaster={containerMaster}
          setContainerMaster={setContainerMaster}
          action={action}
          loadContainerData={loadContainerData}
          setLoader={setLoader}
          loader={loader}
        />
      </ContainerDrawer>

    </>
  );
}
