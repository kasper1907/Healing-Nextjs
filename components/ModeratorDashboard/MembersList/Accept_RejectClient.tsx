import { patchRequest, postRequest, updateRequest } from "@/services/service";
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

const Accept_RejectClient = ({
  isOpen,
  onOpen,
  onOpenChange,
  clientData,
  action,
}: any) => {
  const [loading, setLoading] = React.useState(false);
  const handleMakeAnAction = async () => {
    const endpoint = action == "accept" ? "AcceptClient" : "SuspendClient";
    setLoading(true);
    console.log(clientData?.id);
    const res = await patchRequest({
      id: clientData?.id,
      endpoint: `Dashboard/${endpoint}`,
      data: {},
    });
    if (res.status == "201") {
      toast.success(
        action == "accept"
          ? "Client Accepted Successfully"
          : "Client Suspended Successfully"
      );
      mutate(`Dashboard`);
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
              {action == "accept" ? (
                <h3 className="text-gray-800">Accept Client</h3>
              ) : (
                <h3 className="text-danger">Suspend Client</h3>
              )}
            </ModalHeader>
            <ModalBody>
              <p>
                {action == "accept"
                  ? "Are you sure you want to accept this client?"
                  : "Are you sure you want to suspend this client?"}
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                onClick={handleMakeAnAction}
                isLoading={loading}
                color={action == "accept" ? "success" : "danger"}
              >
                {
                  <span className="text-white">
                    {action == "accept" ? "Accept" : "Suspend"}
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

export default Accept_RejectClient;
