import { getHomeRoute } from "@/components/common/util/RouteUtil";
import { containerBlogTopSidebarOptions, HOME, mainSidebarOptions, sidebarSwitch } from "./SidebarUtil";
import SidebarTemplate from "./SidebarTemplate";

export default function SidebarTopSwitch(props) {

    const flag = props.flag ?? sidebarSwitch.MAIN;

    const getSidebar = () => {

        let options = mainSidebarOptions
        if (flag == sidebarSwitch.CONTAINER) {
            options = containerBlogTopSidebarOptions

        }

        return (<>
            <SidebarTemplate options={options} />
        </>)

    }

    return (getSidebar());
}
