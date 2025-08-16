import CustomAddCard from "@/components/common/element/cards/CustomAddCard";
import CustomAddRow from "@/components/common/element/cards/CustomAddRow";
import CustomContainerDisplayCard from "@/components/common/element/cards/CustomContainerDisplayCard";
import CustomContainerDisplayRow from "@/components/common/element/cards/CustomContainerDisplayRow";
import { LIST_LAYOUT } from "../DashboardConstant";

export default function ContainersLayout(props) {
  const layoutStyle = props.layoutStyle
  const handleEdit = props.handleEdit
  const handleManage = props.handleManage
  const data = props.data

  const getCardLayout = (data) => {
    return (
      <>
        <CustomContainerDisplayCard
          cKey={"k1" + data}
          key={"k1" + data}
          heading="Container Name"
          subHeading={undefined}
          badges={["travel", "games", "sea", "tree"]}
          description="Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas faucibus mollis interdum. Nullam id dolor id nibh ultricies vehicula ut id elit."
          data={"hii"}
          badgesColor="purple"
          editFlag={true}
          manageFlag={true}
          onClickEdit={handleEdit}
          onClickManage={handleManage}
          type={"blog"}
        />
      </>
    );

  }


  const getListLayout = (data) => {
    return (
      <>
        <CustomContainerDisplayRow
          cKey={"k1" + data}
          heading="Container Name"
          subHeading={undefined}
          badges={["travel", "games", "sea", "tree"]}
          description="Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas faucibus mollis interdum. Nullam id dolor id nibh ultricies vehicula ut id elit."
          data={"hii"}
          badgesColor="purple"
          editFlag={true}
          manageFlag={true}
          onClickEdit={handleEdit}
          onClickManage={handleManage}
          type={"blog"}
        />
      </>
    )
  }

  const getLayout = () => {
    if (layoutStyle == LIST_LAYOUT) {
      return getListLayout(data)
    }
    return getCardLayout(data)
  }



  return (
    <>
      {getLayout()}
    </>
  );
}
