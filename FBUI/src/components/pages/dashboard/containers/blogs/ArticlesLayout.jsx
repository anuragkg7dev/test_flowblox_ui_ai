import CustomArticleDisplayCard from "@/components/common/element/cards/CustomArticleDisplayCard";
import CustomArticleDisplayRow from "@/components/common/element/cards/CustomArticleDisplayRow";
import {
  LIST_LAYOUT
} from "../../DashboardConstant";
import { CONTENT_TYPE } from "@/components/client/EdgeConstant";

export default function ArticlesLayout(props) {
  const layoutStyle = props.layoutStyle
  const handlView = props.handlView
  const handlePublish = props.handlePublish
  const data = props.data
  let selectView = props.selectView;

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
          publishFlag={true}
          onClickView={handlView}
          onClickPublish={handlePublish}
          type={CONTENT_TYPE.ARTICLE_BLOG}
          data={data}
          selectView={selectView}
          cdate={data.created_at}
          sequence={data.sequence}
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
          publishFlag={true}
          onClickView={handlView}
          onClickPublish={handlePublish}
          type={CONTENT_TYPE.ARTICLE_BLOG}
          data={data}
          selectView={selectView}
          cdate={data.created_at}
          sequence={data.sequence}
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
