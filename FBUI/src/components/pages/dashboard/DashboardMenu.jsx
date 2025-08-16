import { splitString } from "@/components/common/util/StringUtil";
import {
  Button,
  Menu,
  Portal
} from "@chakra-ui/react";
import { handleSignOut } from "../auth/AuthLogic";
import { toast } from "@/components/common/Notification";
import { useNavigate } from "react-router-dom";
import { SIGN_IN } from "@/components/common/constants/AppRouterConstant";

export default function DashboardMenu(props) {
  let user = props.user == undefined ? "User" : splitString(props.user, "@")[0]
  const navigate = useNavigate()

  const signoutCallback = (status, message) => {
    console.log("AKG 22 signoutCallback --> ", status, message)
    if (!status) {
      toast.error(message)
    } else {
      toast.success(message)
      navigate(SIGN_IN);
    }
  }

  return (<>
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button variant="outline" size="sm">
          {user}
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.Item value="signOut" onClick={() => handleSignOut(signoutCallback)} >Sign Out</Menu.Item>
            <Menu.Item value="new-win">Action 2</Menu.Item>
            <Menu.Item value="open-file">Action 3</Menu.Item>
            <Menu.Item value="export">Action 4</Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  </>);
}
