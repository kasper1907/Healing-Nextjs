import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { HiDotsVertical } from "react-icons/hi";

import useDownloader from "react-use-downloader";
import useCookie from "react-use-cookie";
import DeleteDialog from "../GroupsList/Delete";
import AssignTherapist from "../GroupsList/AssignTherapist";
import AssignAssistant from "../GroupsList/AssignAssitant";
import GroupUsers from "../GroupsList/GroupUsers";

export default function AllReportsActionsMenu({ item }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isOpen3,
    onOpen: onOpen3,
    onOpenChange: onOpenChange3,
  } = useDisclosure();
  const {
    isOpen: isOpenAssignTherapist,
    onOpen: OpenAssignTherapist,
    onOpenChange: onOpenChangeAssignTherapist,
  } = useDisclosure();
  const {
    isOpen: isOpenAssignAssistant,
    onOpen: OpenAssignAssistant,
    onOpenChange: onOpenChangeAssignAssistant,
  } = useDisclosure();
  const [currentAction, setCurrentAction] = React.useState("");
  const [userToken, setUserToken] = useCookie("SID");
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onOpenChange: onOpenChange2,
  } = useDisclosure();

  return (
    <>
      <Dropdown>
        <DropdownTrigger>
          <Button
            style={{
              userSelect: "none",
              background: "transparent",
              minWidth: 0,
              width: "fit-content",
              padding: 0,
            }}
            variant="light"
          >
            <HiDotsVertical />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Action event example">
          <DropdownItem
            key="edit"
            onClick={() => {
              onOpen();
            }}
          >
            View Questions
          </DropdownItem>

          <DropdownItem
            onClick={() => {
              onOpen2();
              setCurrentAction("suspend");
            }}
            key="deny"
            className="text-danger"
            color="danger"
          >
            Delete
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <DeleteDialog
        clientData={item}
        isOpen={isOpen2}
        onOpen={onOpen2}
        onOpenChange={onOpenChange2}
        action={currentAction}
      />
      <AssignTherapist
        item={item}
        isOpen={isOpenAssignTherapist}
        onOpen={OpenAssignTherapist}
        onOpenChange={onOpenChangeAssignTherapist}
      />
      <AssignAssistant
        item={item}
        isOpen={isOpenAssignAssistant}
        onOpen={OpenAssignAssistant}
        onOpenChange={onOpenChangeAssignAssistant}
      />

      <GroupUsers
        item={item}
        isOpen={isOpen3}
        onOpen={onOpen3}
        onOpenChange={onOpenChange3}
      />
    </>
  );
}
