import {
  deleteRequest,
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
} from "@nextui-org/react";
import React from "react";
import { toast } from "sonner";
import { mutate } from "swr";

const DeleteDialog = ({ isOpen, onOpen, onOpenChange, item, action }: any) => {
  const [loading, setLoading] = React.useState(false);
  const handleMakeAnAction = async () => {
    setLoading(true);

    const res = await deleteRequest({
      id: item?.id,
      endpoint: `Appointments/Delete`,
    });
    if (res.status == "200") {
      toast.success("Appointment Deleted Successfully");
      mutate(`Dashboard/getAllAppointments`);
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
              <h3 className="text-danger">Delete Appointment</h3>
            </ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to delete this Appointment? once deleted,
                it cannot be recovered.
              </p>
            </ModalBody>
            <ModalFooter>
              <Button
                color="danger"
                variant="light"
                onClick={() => {
                  onOpenChange();
                }}
              >
                Close
              </Button>
              <Button
                onClick={handleMakeAnAction}
                isLoading={loading}
                color={action == "accept" ? "success" : "danger"}
              >
                {
                  <span className="text-white">
                    {action == "accept" ? "Accept" : "Delete"}
                  </span>
                }
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteDialog;
