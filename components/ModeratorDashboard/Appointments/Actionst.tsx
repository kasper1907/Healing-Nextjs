import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { HiDotsVertical } from "react-icons/hi";

const Actions = ({ item, openDialog, openDeleteDialog }: any) => {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  return (
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
            openDialog();
          }}
        >
          Edit
        </DropdownItem>

        <DropdownItem
          onClick={() => {
            openDeleteDialog();
          }}
          key="deny"
          className="text-danger"
          color="danger"
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Actions;
