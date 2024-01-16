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
import ClientCredentials from "./ClientCredentials";
import Accept_RejectClient from "./Accept_RejectClient";
import useDownloader from "react-use-downloader";
import useCookie from "react-use-cookie";
import DeleteDialog from "../GroupsList/Delete";
import AssignTherapist from "../GroupsList/AssignTherapist";
import AssignAssistant from "../GroupsList/AssignAssitant";

export default function GroupsTableActions({ item }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
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
        <DropdownMenu disabledKeys={["edit"]} aria-label="Action event example">
          <DropdownItem
            key="edit"
            onClick={() => {
              onOpen();
            }}
          >
            Edit
          </DropdownItem>
          <DropdownItem
            key="assign_therapist"
            onClick={() => {
              OpenAssignTherapist();
            }}
          >
            Assign Therapist
          </DropdownItem>
          <DropdownItem
            key="assign_assistant"
            onClick={() => {
              OpenAssignAssistant();
            }}
          >
            Assign Assistant
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
    </>
  );
}
