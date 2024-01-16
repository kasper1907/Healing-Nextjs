import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export default function UpdateDialog({
  isOpen,
  onOpen,
  onClose,
  title,
  Form,
  item,
  handleSubmit,
  values,
  setValues,
}: {
  isOpen: boolean;
  onOpen: any;
  onClose: any;
  title: string;
  Form: any;
  item: any;
  handleSubmit: any;
  values: any;
  setValues: any;
}) {
  return (
    <>
      <Modal isDismissable={false} isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>
                <Form values={values} setValues={setValues} item={item} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button onClick={handleSubmit} color="primary">
                  Submit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
