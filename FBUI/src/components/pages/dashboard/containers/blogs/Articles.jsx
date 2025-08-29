import { getGeneratedArticles } from "@/components/client/EdgeFunctionRepository";
import { APP_CONFIG_KEYS } from "@/components/common/constants/CommonConstant";
import CustomLoaderCard from "@/components/common/element/cards/CustomLoaderCard";
import CustomLoaderRow from "@/components/common/element/cards/CustomLoaderRow";
import CustomSegmentGroup from "@/components/common/element/CustomSegmentGroup";
import CustomSwitch from "@/components/common/element/CustomSwitch";
import { toast } from "@/components/common/Notification";
import { useAppConfigStore } from "@/components/store/AppConfigStore";
import { HStack, Wrap } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  ALL,
  CARD_LAYOUT,
  filterOptions,
  LIST_LAYOUT
} from "../../DashboardConstant";
import ContainerDrawer from "../ContainerDrawer";
import { API_PARAM_KEY, CONTAINERS_KEY, SOURCE_DESTINATION_KEY } from "../ContainersConstant";
import CommonSearchHeader from "../headers/CommonSearchHeader";
import ArticlesLayout from "./ArticlesLayout";
import ArticleTemplate from "./ArticleTemplate";

export default function Articles(props) {
  const limit = props.limit ?? 50
  const selectView = props.selectView
  const hideFilter = props.hideFilter
  const setTotalArticle = props.setTotalArticle

  const [layoutStyle, setLayoutStyle] = useState(CARD_LAYOUT);
  const [articles, setArticles] = useState([]);
  const [loader, setLoader] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false)
  const [articleMaster, setArticleMaster] = useState()

  const { config, setConfig, updateConfig } = useAppConfigStore();
  const authkeyBearer = config[APP_CONFIG_KEYS.JWT_TOKEN];

  let container = config[APP_CONFIG_KEYS.CONTAINER_DATA]

  const [pageConfigParams, setPageConfigParams] = useState(new Map([
    [SOURCE_DESTINATION_KEY.CONTAINERS_ID, container[CONTAINERS_KEY.ID]],
    [API_PARAM_KEY.LIMIT, limit]
  ]));

  useEffect(() => {
    loadArticleData();
  }, []);

  const handlView = (data) => {
    setArticleMaster(data)
    setOpenDrawer(true)
  };

  const handlePublish = (e) => { };

  const loadArticleData = () => {
    setLoader(true)
    getGeneratedArticles(pageConfigParams,
      (flag, data) => {
        if (flag) {
          setArticles(data?.articles ?? []);

          setTotalArticle?.(data?.articles ? data?.articles[0]?.sequence : 0)

        } else {
          toast.error('Failed to load articles!!')
        }
        setLoader(false);
      },
      authkeyBearer)
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
        name={"Articles"}
      />

      {!hideFilter && (
        <HStack justify={"flex-end"} mb={12} mt={12}>
          <CustomSegmentGroup
            filterOptions={filterOptions}
            onChangeFilterOptions={(val) => {
              console.log(val);
            }}
            defaultValue={ALL}
          />

          <CustomSwitch
            label={"Auto Publish"}
            onSwitchChange={(val) => {
              console.log(val);
            }}
            defaultValue={true}
          />
        </HStack>
      )}

      <Wrap>

        {loader && (getLoader())}

        {articles?.map((article) => {
          return (<ArticlesLayout
            layoutStyle={layoutStyle}
            handlView={handlView}
            handlePublish={handlePublish}
            data={article}
            selectView={selectView}
          />)
        })}
      </Wrap>

      <ContainerDrawer open={openDrawer} setOpen={setOpenDrawer} csize="xl">
        <ArticleTemplate
          articleMaster={articleMaster}
          setOpenDrawer={setOpenDrawer} />


      </ContainerDrawer>
    </>
  );
}
