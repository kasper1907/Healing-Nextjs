import {
  deleteRequest,
  getOne,
  patchRequest,
  postRequest,
  updateRequest,
} from "@/services/service";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Selection,
} from "@nextui-org/react";
import React from "react";
import { toast } from "sonner";
import useSWR, { mutate } from "swr";

const AssignAssistant = ({ isOpen, onOpen, onOpenChange, item }: any) => {
  const [loading, setLoading] = React.useState(false);
  const { data: Assistants } = useSWR(`Users/GetByUserStatus/4`, getOne);
  const { data: GroupAssistants } = useSWR(
    `Dashboard/getGroupAssistants/${item?.id}`,
    getOne
  );
  const [selectedAssistant, setSelectedAssistant] = React.useState<any>("");
  const [value, setValue] = React.useState<Selection>(new Set([]));

  let assistantIds = GroupAssistants?.data?.map(
    (therapist: any) => therapist.assistantId
  );
  const handleMakeAnAction = async () => {
    if (!selectedAssistant) return toast.warning("Please Select A Therapist");

    setLoading(true);

    const res = await postRequest(
      `Groups/AssignAssistant/${item?.id}/${selectedAssistant}`,
      {}
    );
    console.log(res);
    if (res.status == "200") {
      toast.success("Assistant Assigned Successfully");
      mutate(`Groups/GetAllGroups`);
      mutate(`Dashboard/getGroupAssistants/${item?.id}`);
      setSelectedAssistant("");
      onOpenChange();
    } else {
      toast.error(res?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="text-primary">
                Assign Assistant To Group #{item?.group_name}
              </h3>
            </ModalHeader>
            <ModalBody>
              <Select
                label="Therapists"
                variant="bordered"
                placeholder="Select A Therapists"
                selectedKeys={value}
                className="w-full"
                onSelectionChange={setValue}
                onChange={(e) => {
                  setSelectedAssistant(e.target.value);
                }}
              >
                {Assistants?.data.map((assistant: any) => (
                  <SelectItem
                    isDisabled={assistantIds?.includes(assistant.id)}
                    key={assistant.id}
                    textValue={assistant.user_name}
                  >
                    {assistant.user_name}
                    {assistantIds?.includes(assistant.id) ? (
                      <span className="text-danger"> (Already Assigned)</span>
                    ) : (
                      ""
                    )}
                  </SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                onClick={handleMakeAnAction}
                isLoading={loading}
                color="primary"
              >
                {<span className="text-white">Submit</span>}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default AssignAssistant;
