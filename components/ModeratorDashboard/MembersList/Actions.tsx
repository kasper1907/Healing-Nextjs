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

export default function ActionsMenu({ item }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
        <DropdownMenu
          disabledKeys={[
            item?.permission == "Accepted" ? "accept" : "deny",
            !item?.BCTS ? "download" : "",
          ]}
          aria-label="Action event example"
          //   onAction={(key) => alert(key)}
        >
          {/* <DropdownItem key="new">New file</DropdownItem>
        <DropdownItem key="copy">Copy link</DropdownItem>
        <DropdownItem key="edit">Edit file</DropdownItem> */}

          <DropdownItem key="deny" className="text-danger" color="danger">
            Suspend
          </DropdownItem>

          <DropdownItem key="accept">Accept</DropdownItem>
          <DropdownItem
            key="show"
            onClick={() => {
              onOpen();
            }}
          >
            Show Client Credentials
          </DropdownItem>

          <DropdownItem key="download">Download BCT Scan</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <ClientCredentials
        clientData={item}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
    </>
  );
}
