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

const AssignTherapist = ({ isOpen, onOpen, onOpenChange, item }: any) => {
  const [loading, setLoading] = React.useState(false);
  const { data: Therapists } = useSWR(`Dashboard/GetTherapists/`, getOne);
  const { data: GroupTherapists } = useSWR(
    `Dashboard/getGroupTherapists/${item?.id}`,
    getOne
  );
  const [selectedTherapist, setSelectedTherapist] = React.useState<any>("");
  const [value, setValue] = React.useState<Selection>(new Set([]));

  let therapistsIds = GroupTherapists?.data?.map(
    (therapist: any) => therapist.therapistId
  );
  const handleMakeAnAction = async () => {
    if (!selectedTherapist) return toast.warning("Please Select A Therapist");
    // console.log(selectedTherapist);
    // return;
    setLoading(true);

    const res = await postRequest(
      `Groups/AssignTherapist/${item?.id}/${selectedTherapist}`,
      {}
    );

    console.log(res);
    if (res.status == "200") {
      toast.success("Therapist Assigned Successfully");
      mutate(`Groups/GetAllGroups`);
      mutate(`Dashboard/getGroupTherapists/${item?.id}`);
      setSelectedTherapist("");
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
                Assign Therapist To Group #{item?.group_name}
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
                  setSelectedTherapist(e.target.value);
                }}
              >
                {Therapists?.data.map((therapist: any) => (
                  <SelectItem
                    isDisabled={therapistsIds?.includes(therapist.id)}
                    key={therapist.id}
                    textValue={therapist.user_name}
                  >
                    {therapist.user_name}
                    {therapistsIds?.includes(therapist.id) ? (
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

export default AssignTherapist;
