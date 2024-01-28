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

const DeleteDialog = ({
  isOpen,
  onOpen,
  onOpenChange,
  clientData,
  action,
}: any) => {
  const [loading, setLoading] = React.useState(false);
  const handleMakeAnAction = async () => {
    setLoading(true);

    console.log(clientData);
    const res = await deleteRequest({
      id: clientData?.id,
      endpoint: `TherapyReports/Delete`,
    });
    console.log(res);
    if (res.status == "200") {
      toast.success("Report Deleted Successfully");
      mutate(`Dashboard/getAllReports`);
      onOpen();
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
              <h3 className="text-danger">Delete Report</h3>
            </ModalHeader>
            <ModalBody>
              <p>
                Are you sure you want to delete this Report? once deleted, it
                cannot be recovered.
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
