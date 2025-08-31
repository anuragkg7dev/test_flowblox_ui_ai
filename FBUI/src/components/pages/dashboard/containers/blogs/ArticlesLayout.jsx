import { COMMON_STATUS, CONTENT_TYPE } from "@/components/client/EdgeConstant";
import CustomArticleDisplayCard from "@/components/common/element/cards/CustomArticleDisplayCard";
import CustomArticleDisplayRow from "@/components/common/element/cards/CustomArticleDisplayRow";
import {
  LIST_LAYOUT
} from "../../DashboardConstant";

export default function ArticlesLayout(props) {
  const layoutStyle = props.layoutStyle
  const handlView = props.handlView
  const handleStatusChange = props.handleStatusChange
  const data = props.data
  const selectView = props.selectView;
  const publishFlag = data.status == COMMON_STATUS.PUBLISHED
  const isProcessing = data[COMMON_STATUS.PROCESSING]
  const showPublishButton = !(data.status == COMMON_STATUS.PUBLISHED || data.status == COMMON_STATUS.ARCHIVED)

  const getCardLayout = (data) => {

    return (
      <>
        <CustomArticleDisplayCard
          cKey={"k1" + data.id}
          key={"k1" + data.id}
          heading={data?.heading ?? ''}
          subHeading={undefined}
          description={data?.generated_content?.introduction ?? ''}
          viewFlag={true}
          publishFlag={publishFlag}
          onClickView={handlView}
          handleStatusChange={handleStatusChange}
          type={CONTENT_TYPE.ARTICLE_BLOG}
          data={data}
          selectView={selectView}
          cdate={data.created_at}
          sequence={data.sequence}
          isProcessing={isProcessing}
          showPublishButton={showPublishButton}
          status={data.status}
        />
      </>
    );
  };

  const getListLayout = (data) => {
    return (
      <>
        <CustomArticleDisplayRow
          cKey={"k1" + data.id}
          key={"k1" + data.id}
          heading={data?.heading ?? ''}
          subHeading={undefined}
          description={data?.generated_content?.introduction ?? ''}
          viewFlag={true}
          publishFlag={publishFlag}
          onClickView={handlView}
          handleStatusChange={handleStatusChange}
          type={CONTENT_TYPE.ARTICLE_BLOG}
          data={data}
          selectView={selectView}
          cdate={data.created_at}
          sequence={data.sequence}
          isProcessing={isProcessing}
          showPublishButton={showPublishButton}
          status={data.status}
        />
      </>
    );
  };

  const getLayout = () => {
    if (layoutStyle == LIST_LAYOUT) {
      return getListLayout(data);
    }
    return getCardLayout(data);
  };

  return (
    <>
      {getLayout()}
    </>
  );
}
