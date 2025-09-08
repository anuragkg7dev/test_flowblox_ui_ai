import { COMMON_STATUS } from "@/components/client/EdgeConstant";
import { getGeneratedArticles, updateArticleStatus, updateContainerAutoPublish } from "@/components/client/EdgeFunctionRepository";
import { APP_CONFIG_KEYS, STATUS, UX } from "@/components/common/constants/CommonConstant";
import { actions } from "@/components/common/constants/CommonUtilityAndOptions";
import CustomLoaderCard from "@/components/common/element/cards/CustomLoaderCard";
import CustomLoaderRow from "@/components/common/element/cards/CustomLoaderRow";
import ConfirmationDialog from "@/components/common/element/ConfirmationDialog";
import CustomPageScrollObserverBottom from "@/components/common/element/CustomPageScrollObserverBottom";
import CustomSegmentGroup from "@/components/common/element/CustomSegmentGroup";
import CustomSwitch from "@/components/common/element/CustomSwitch";
import { toast } from "@/components/common/Notification";
import { useAppConfigStore } from "@/components/store/AppConfigStore";
import { Box, HStack, Wrap } from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ALL,
  CARD_LAYOUT,
  DRAFT,
  filterOptions,
  GENERATED,
  LIST_LAYOUT,
  UNPUBLISHED
} from "../../DashboardConstant";
import ContainerDrawer from "../ContainerDrawer";
import { API_PARAM_KEY, CONTAINERS_KEY } from "../ContainersConstant";
import CommonSearchHeaderWithPublish from "../headers/CommonSearchHeaderWithPublish";
import ArticlesLayout from "./ArticlesLayout";
import ArticleTemplate from "./ArticleTemplate";
import CustomPageScrollObserverTop from "@/components/common/element/CustomPageScrollObserverTop";

export default function Articles(props) {
  const limit = props.limit ?? 20
  const selectView = props.selectView
  const hideFilter = props.hideFilter
  const loadPublishCount = props.loadPublishCount
  const showAutoPublish = props.showAutoPublish

  const disableScrollLoad = props.disableScrollLoad ?? false

  const { config, setConfig, updateConfig, updateConfigObj } = useAppConfigStore();
  const authkeyBearer = config[APP_CONFIG_KEYS.JWT_TOKEN];
  let container = config[APP_CONFIG_KEYS.CONTAINER_DATA]

  const [layoutStyle, setLayoutStyle] = useState(CARD_LAYOUT);
  const [autoPublish, setAutoPublish] = useState(container?.[CONTAINERS_KEY.AUTO_PUBLISH]);
  const [articles, setArticles] = useState([]);

  const [openDrawer, setOpenDrawer] = useState(false)
  const [articleMaster, setArticleMaster] = useState()

  const [action, setAction] = useState()
  const [selectedItemForAction, setSelectedItemForAction] = useState()
  const [statusFilter, setStatusFilter] = useState(ALL)

  const [showConfirmation, setShowsConfirmation] = useState(false)
  const [loader, setLoader] = useState(false);
  const [autoPublishloader, setautoPublishLoader] = useState(false);


  let initUrlParam = new Map([
    [API_PARAM_KEY.CONTAINERS_ID, container[CONTAINERS_KEY.ID]],
    [API_PARAM_KEY.LIMIT, limit],
    [API_PARAM_KEY.PAGE, 1],
    [API_PARAM_KEY.STATUS, statusFilter],
    [API_PARAM_KEY.HEADING, undefined],
  ])

  const [showLoadMore, setShowLoadMore] = useState(false);
  const [pageMetadata, setPageMetadata] = useState({});
  const [pageConfigParams, setPageConfigParams] = useState(new Map());
  const [isFetching, setIsFetching] = useState(false);

  const loadMoreRef = useRef(null);

  useEffect(() => {
    reset(initUrlParam)
    loadArticleData(initUrlParam);
  }, []);

  const handlView = (data) => {
    setArticleMaster(data)
    setOpenDrawer(true)
  };

  const handleStatusChange = (data, iaction) => {
    setAction(iaction)
    setSelectedItemForAction(data)
    setShowsConfirmation(true)
  }


  let onConfirmationOk = () => {
    let status = confirmationData?.[action]?.dbStatus
    let id = selectedItemForAction?.id
    let oldStatus = selectedItemForAction?.status

    if (id && status) {
      setShowsConfirmation(false)

      updatedArticleListById(id, COMMON_STATUS.PROCESSING, true)

      updateArticleStatus({ id, status }, (flag, data) => {
        handleStatusChangeCallback(flag, data, status, oldStatus, id)
      }, authkeyBearer)

    }
  }

  const handleStatusChangeCallback = (flag, data, status, oldStatus, id) => {
    if (flag) {
      setArticles(updatedArticleListById(id, 'status', status))
      toast.success(confirmationData?.[action]?.success)
      loadPublishCount?.()
    } else {
      setArticles(updatedArticleListById(id, 'status', oldStatus))
      toast.error('Failed to update !!')
    }

  }

  const updatedArticleListById = (id, key, value) => {
    let tempArticle = articles.map(x => {
      if (x.id == id) {
        x[key] = value;
        if (key && COMMON_STATUS.PROCESSING != String(key)) {
          x[COMMON_STATUS.PROCESSING] = false;
        }
      }
      return x;
    });

    return tempArticle.filter(article => article.status !== COMMON_STATUS.DELETED && getFilterCondition(statusFilter, article.status));

  };

  const getFilterCondition = (statusFilter, articleStatus) => {
    if (statusFilter == ALL) {
      return true
    } else if (statusFilter == DRAFT) {
      return articleStatus == GENERATED || articleStatus == UNPUBLISHED
    }
    return articleStatus == statusFilter
  }

  const loadArticleData = (pConfigParams) => {
    setLoader(true)
    getGeneratedArticles(pConfigParams, loadArticleDataCallback, authkeyBearer)
  }

  const loadArticleDataCallback = (flag, data) => {
    if (flag) {

      setArticles(prev => [...prev, ...(data?.articles ?? [])])

      setPageMetadata({ [API_PARAM_KEY.CURRENT_PAGE]: data?.[API_PARAM_KEY.CURRENT_PAGE], [API_PARAM_KEY.TOTAL_COUNT]: data?.[API_PARAM_KEY.TOTAL_COUNT], [API_PARAM_KEY.TOTAL_PAGES]: data?.[API_PARAM_KEY.TOTAL_PAGES] })

      setShowLoadMore(data?.[API_PARAM_KEY.CURRENT_PAGE] < data?.[API_PARAM_KEY.TOTAL_PAGES])

    } else {
      setShowLoadMore(data?.[API_PARAM_KEY.CURRENT_PAGE] < data?.[API_PARAM_KEY.TOTAL_PAGES])
      toast.error('Failed to load articles!!')
    }
    setLoader(false);
    setIsFetching(false);
  }

  const getLoader = () => {
    if (layoutStyle == LIST_LAYOUT) {
      return (<CustomLoaderRow />)
    }
    return (<CustomLoaderCard />)
  }

  const addStatusToPageConfigParams = (status) => {
    let tempMap = new Map(pageConfigParams.set(API_PARAM_KEY.STATUS, status).set(API_PARAM_KEY.PAGE, 1))
    setPageConfigParams(tempMap);
    return tempMap
  };

  const onAutoPublishSwitchChange = (val) => {
    console.log(val)
    setAutoPublish(val)
    setautoPublishLoader(true)
    updateContainerAutoPublish({ id: container.id, autoPublish: val },
      (flag, data) => { onAutoPublishSwitchChangeCallback(flag, data, val) },
      authkeyBearer)
  }

  const onAutoPublishSwitchChangeCallback = (flag, data, val) => {
    if (flag) {
      updateConfigObj({
        [APP_CONFIG_KEYS.CONTAINER_DATA]: { ...container, auto_publish: val }, // update current container data in context
        [APP_CONFIG_KEYS.CONTAINER_MODIFIED]: true  // This will reload the container list data
      });
      toast.success('Updated')
    } else {
      setAutoPublish(!val)
      toast.error('Failed to updated autopublish !!')
    }
    setautoPublishLoader(false)
  }

  const reset = (paramMap) => {
    setArticles([])
    setPageConfigParams(paramMap)
    setShowLoadMore(false)
    setPageMetadata(undefined)
  }

  const confirmationData = {
    [actions.PUBLISH]: {
      header: 'Publish',
      description: 'Would you like to publish this article?',
      okLabel: 'Yes',
      cancelLabel: 'Cancel',
      status: STATUS.WARNING,
      success: "Article published successfully.",
      dbStatus: COMMON_STATUS.PUBLISHED
    },
    [actions.UNPUBLISH]: {
      header: 'Unpublish',
      description: 'Unpublish this article? It will no longer be visible to users.',
      okLabel: 'Yes',
      cancelLabel: 'Cancel',
      status: STATUS.WARNING,
      success: "Article unpublished successfully.",
      dbStatus: COMMON_STATUS.UNPUBLISHED
    },
    [actions.UNARCHIVE]: {
      header: 'Unarchive',
      description: 'Unarchive this article?',
      okLabel: 'Yes',
      cancelLabel: 'Cancel',
      status: STATUS.WARNING,
      success: "Article unarchived successfully.",
      dbStatus: COMMON_STATUS.UNPUBLISHED
    },
    [actions.DELETE]: {
      header: 'Delete',
      description: 'Delete this item? This action cannot be undone.',
      okLabel: 'Delete',
      cancelLabel: 'Cancel',
      status: STATUS.WARNING,
      success: 'Article successfully deleted.',
      dbStatus: COMMON_STATUS.DELETED,
      okVariant: 'delete'
    },
    [actions.ARCHIVE]: {
      header: 'Archive',
      description: 'Are you sure you want to archive this article?',
      okLabel: 'Archive',
      cancelLabel: 'Cancel',
      status: STATUS.WARNING,
      success: 'Article archived successfully.',
      dbStatus: COMMON_STATUS.ARCHIVED
    }
  }


  return (
    <>
      <CustomPageScrollObserverTop
        disableScrollLoad={disableScrollLoad}
        showLoadMore={showLoadMore}
        cloadMoreRef={loadMoreRef}
        pageMetadata={pageMetadata}
        isFetching={isFetching}
        setIsFetching={setIsFetching}
        pageConfigParams={pageConfigParams}
        setPageConfigParams={setPageConfigParams}
        loadData={loadArticleData}
        setShowLoadMore={setShowLoadMore}
      />

      <CommonSearchHeaderWithPublish
        layoutStyle={layoutStyle}
        setLayoutStyle={setLayoutStyle}
        name={"Articles"}
        onAutoPublishSwitchChange={onAutoPublishSwitchChange}
        autoPublishloader={autoPublishloader}
        autoPublish={autoPublish}
        setAutoPublish={setAutoPublish}
        showAutoPublish={showAutoPublish}

      />

      {!hideFilter && (
        <HStack pl={UX.global_left_padding} justify={"flex-end"} mr={UX.global_right_padding} mt={"10px"}>
          <Wrap>
          <CustomSegmentGroup
            filterOptions={filterOptions}
            onChangeFilterOptions={(val) => {
              console.log(val)
              let paramMap = addStatusToPageConfigParams(val)
              reset(paramMap)
              setStatusFilter(val)
              loadArticleData(paramMap)
            }}
            defaultValue={statusFilter}
            value={statusFilter}
            setValue={setStatusFilter}

          />
          <Box userSelect="none" position="relative">

            <CustomSwitch
              label={"Auto Publish"}
              onSwitchChange={(val) => { onAutoPublishSwitchChange(val) }}
              defaultValue={autoPublish}
              cheight={'57px'}
              switchLoader={autoPublishloader}
              checked={autoPublish}
              setChecked={setAutoPublish}
            />

          </Box>
          </Wrap>

        </HStack>
      )}

      <Wrap pl={UX.global_left_padding} pr={layoutStyle == CARD_LAYOUT ? "0px" : UX.global_right_padding} gap={layoutStyle == LIST_LAYOUT ? "8px" : "20px"} mt={!hideFilter ? "60px" : "30px"}>

        {loader && (getLoader())}

        {articles?.map((article) => {
          return (<ArticlesLayout
            layoutStyle={layoutStyle}
            handlView={handlView}
            handleStatusChange={handleStatusChange}
            data={article}
            selectView={selectView}

          />)
        })}
      </Wrap>

      <CustomPageScrollObserverBottom
        cloadMoreRef={loadMoreRef}
        showLoadMore={showLoadMore}
        isFetching={isFetching}
      />

      <ContainerDrawer open={openDrawer} setOpen={setOpenDrawer} csize="xl">
        <ArticleTemplate
          articleMaster={articleMaster}
          setOpenDrawer={setOpenDrawer} />
      </ContainerDrawer>

      <ConfirmationDialog
        show={action && showConfirmation}
        setShow={setShowsConfirmation}
        header={confirmationData?.[action]?.header}
        description={confirmationData?.[action]?.description}
        onOk={onConfirmationOk}
        closeLabel={confirmationData?.[action]?.cancelLabel}
        okLabel={confirmationData?.[action]?.okLabel}
        status={confirmationData?.[action]?.status}
        okVariant={confirmationData?.[action]?.okVariant}
      />
    </>
  );
}
