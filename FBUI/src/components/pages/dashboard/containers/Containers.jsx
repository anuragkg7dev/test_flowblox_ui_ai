import { ACTION, APP_CONFIG_KEYS, UX } from "@/components/common/constants/CommonConstant";
import CustomAddCard from "@/components/common/element/cards/CustomAddCard";
import CustomAddRow from "@/components/common/element/cards/CustomAddRow";
import CustomContainerDisplayCard from "@/components/common/element/cards/CustomContainerDisplayCard";
import CustomContainerDisplayRow from "@/components/common/element/cards/CustomContainerDisplayRow";
import { useAppConfigStore } from "@/components/store/AppConfigStore";
import { Wrap } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { CARD_LAYOUT, LABELS, LIST_LAYOUT } from "../DashboardConstant";
import { containerBlogTopSidebarOptions, HOME, sidebarSwitch } from "../sidebars/SidebarUtil";
import ContainerDrawer from "./ContainerDrawer";
import AddEditBlogsContainer from "./blogs/AddEditBlogsContainer";

import { getContainers } from "@/components/client/EdgeFunctionRepository";
import { toast } from "@/components/common/Notification";
import { JWT_TOKEN } from "@/components/common/constants/AppRouterConstant";
import CustomPageScrollObserverBottom from "@/components/common/element/CustomPageScrollObserverBottom";
import CustomPageScrollObserverTop from "@/components/common/element/CustomPageScrollObserverTop";
import CustomLoaderCard from "@/components/common/element/cards/CustomLoaderCard";
import CustomLoaderRow from "@/components/common/element/cards/CustomLoaderRow";
import { getHomeRoute } from "@/components/common/util/RouteUtil";
import { COMMA, splitString } from "@/components/common/util/StringUtil";
import { useNavigate } from "react-router-dom";
import { API_PARAM_KEY, CONTAINERS_BLOG_BASE, CONTAINERS_KEY } from "./ContainersConstant";
import { getBlogContainerFromresponse } from "./ContainersUtil";
import CommonSearchHeader from "./headers/CommonSearchHeader";


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

  const limit = 20
  const status = ''

  let initUrlParam = new Map([
    [API_PARAM_KEY.LIMIT, limit],
    [API_PARAM_KEY.PAGE, 1],
    [API_PARAM_KEY.STATUS, status],
    [API_PARAM_KEY.TAGS, undefined],
    [API_PARAM_KEY.NAME, undefined],
  ])

  const [showLoadMore, setShowLoadMore] = useState(false);
  const [pageMetadata, setPageMetadata] = useState({});
  const [pageConfigParams, setPageConfigParams] = useState(new Map());
  const [isFetching, setIsFetching] = useState(false);

  const loadMoreRef = useRef(null);

  useEffect(() => {
    cleanUp();
    updateConfig(APP_CONFIG_KEYS.SIDEBAR_SWITCH_FLAG_KEY, sidebarSwitch.MAIN);
    setPageConfigParams(initUrlParam)
    loadAllContainerData(initUrlParam);
  }, []);

  const loadAllContainerData = (urlParam) => {
    if (config?.[APP_CONFIG_KEYS.CONTAINER_MODIFIED] == true || config?.[APP_CONFIG_KEYS.CONTAINER_MODIFIED] == undefined) {
      loadContainerData(urlParam);
    } else {
      let cpageMetadata = config?.[APP_CONFIG_KEYS.CONTAINER_PAGE_METADATA]
      setContainerList(config?.[APP_CONFIG_KEYS.CONTAINER_DATA_LIST]);
      setPageConfigParams(config?.[APP_CONFIG_KEYS.CONTAINER_PAGE_CONFIG_PARAMS] ?? initUrlParam)
      setPageMetadata(cpageMetadata)
      updateShowLoadMore(cpageMetadata)
      setLoader(false)
    }

  }

  const loadContainerData = (urlParam) => {
    setLoader(true)
    getContainers(urlParam, loadContainerDataCallback, authkeyBearer)
  }

  const loadContainerDataOnSaveUpdate = () => {
    loadContainerData(pageConfigParams)
  }

  const loadContainerDataCallback = (flag, data) => {
    
    if (flag) {
      const cpageMetadat = { [API_PARAM_KEY.CURRENT_PAGE]: data?.[API_PARAM_KEY.CURRENT_PAGE], [API_PARAM_KEY.TOTAL_COUNT]: data?.[API_PARAM_KEY.TOTAL_COUNT], [API_PARAM_KEY.TOTAL_PAGES]: data?.[API_PARAM_KEY.TOTAL_PAGES] }

      setContainerList(prev => [...prev, ...(data?.containers ?? [])]);
      setConfig({
        ...config,
        [APP_CONFIG_KEYS.CONTAINER_DATA_LIST]: [...(config[APP_CONFIG_KEYS.CONTAINER_DATA_LIST] ?? []), ...(data?.containers ?? [])],
        [APP_CONFIG_KEYS.CONTAINER_MODIFIED]: false,
        [APP_CONFIG_KEYS.CONTAINER_PAGE_METADATA]: { ...cpageMetadat },
        [APP_CONFIG_KEYS.CONTAINER_PAGE_CONFIG_PARAMS]: pageConfigParams
      });

      setPageMetadata(cpageMetadat)
      updateShowLoadMore(data)
    } else {
      updateShowLoadMore(data)
      toast.error('Failed to load container!!')
    }
    setLoader(false);
    setIsFetching(false);
  }

  const updateShowLoadMore = (data) => {
    setShowLoadMore(data?.[API_PARAM_KEY.CURRENT_PAGE] < data?.[API_PARAM_KEY.TOTAL_PAGES])
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

  const cleanUp = () => {
    setConfig({
      ...config,
      [APP_CONFIG_KEYS.CONTAINER_DATA]: undefined,
      [APP_CONFIG_KEYS.SOURCE_DATA_LIST]: undefined,
      [APP_CONFIG_KEYS.DESTINATION_DATA_LIST]: undefined,
    });
  }

  return (
    <>
      <CustomPageScrollObserverTop
        disableScrollLoad={false}
        showLoadMore={showLoadMore}
        cloadMoreRef={loadMoreRef}
        pageMetadata={pageMetadata}
        isFetching={isFetching}
        setIsFetching={setIsFetching}
        pageConfigParams={pageConfigParams}
        setPageConfigParams={setPageConfigParams}
        loadData={loadContainerData}
        setShowLoadMore={setShowLoadMore}
      />

      <CommonSearchHeader
        layoutStyle={layoutStyle}
        setLayoutStyle={setLayoutStyle}
        
      />

      <Wrap pl={UX.global_left_padding} pr={layoutStyle == CARD_LAYOUT ? "0px" : UX.global_right_padding} gap={layoutStyle == LIST_LAYOUT ? "8px" : "20px"}>

        {loader && (getLoader())}

        {containerList?.map(x => getBlogContainerFromresponse(x)).map((x) => {
          return (getLayout(x))
        })}

        {getAddLayout()}

      </Wrap>

      <CustomPageScrollObserverBottom
        cloadMoreRef={loadMoreRef}
        showLoadMore={showLoadMore}
        isFetching={isFetching}
      />

      <ContainerDrawer open={openDrawer} setOpen={setOpenDrawer} >
        <AddEditBlogsContainer
          setOpenDrawer={setOpenDrawer}
          drawerHeader={drawerLabel}
          containerMaster={containerMaster}
          setContainerMaster={setContainerMaster}
          action={action}
          loadContainerData={loadContainerDataOnSaveUpdate}
          setLoader={setLoader}
          loader={loader}
        />
      </ContainerDrawer>

    </>
  );
}
