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

export default function ActionsMenu({ item }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentAction, setCurrentAction] = React.useState("");
  const [userToken, setUserToken] = useCookie("SID");
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onOpenChange: onOpenChange2,
  } = useDisclosure();

  const handleDownloadFile = async (filename: string) => {
    let fileUrl = `${
      process.env.NEXT_PUBLIC_BASE_URL
    }download.php?filename=${filename.replace(
      "files/imgs/",
      ""
    )}&accessToken=${userToken}`;
    const res = await download(fileUrl, filename);
  };
  const { size, elapsed, percentage, download, cancel, error, isInProgress } =
    useDownloader();
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
          disabledKeys={[!item?.BCTS ? "download" : ""]}
          aria-label="Action event example"
          //   onAction={(key) => alert(key)}
        >
          {item?.permission == "Pending" ? (
            <DropdownItem
              onClick={() => {
                onOpen2();
                setCurrentAction("accept");
              }}
              key="accept"
            >
              Accept
            </DropdownItem>
          ) : (
            <DropdownItem
              onClick={() => {
                onOpen2();
                setCurrentAction("suspend");
              }}
              key="deny"
              className="text-danger"
              color="danger"
            >
              Suspend
            </DropdownItem>
          )}

          <DropdownItem
            key="show"
            onClick={() => {
              onOpen();
            }}
          >
            Show Client Credentials
          </DropdownItem>

          {/* <DropdownItem
            onClick={(e) => {
              handleDownloadFile(item?.file);
            }}
            key="download"
          >
            Download Attachment
          </DropdownItem> */}
        </DropdownMenu>
      </Dropdown>

      <ClientCredentials
        clientData={item}
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />

      <Accept_RejectClient
        clientData={item}
        isOpen={isOpen2}
        onOpen={onOpen2}
        onOpenChange={onOpenChange2}
        action={currentAction}
      />
    </>
  );
}
