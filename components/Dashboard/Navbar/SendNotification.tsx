import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import useSWR from "swr";
import { getOne, postRequest } from "@/services/service";
import { toast } from "sonner";

export default function SendNotification({
  isOpen,
  onOpen,
  onOpenChange,
  user,
}: any) {
  const { data: ModeratorGroups, isLoading } = useSWR(
    `Groups/getThirapistGroups/${user?.course_id}`,
    getOne
  );
  const [loading, setLoading] = useState(false);
  const [Notification, setNotification] = useState({
    header: "",
    body: "",
    groupId: "",
    courseId: user?.course_id,
  });

  const handleSendNotification = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await postRequest(`Notifications/Send`, Notification);
    if (res.status == 201) {
      onOpenChange();
      setNotification({
        header: "",
        body: "",
        groupId: "",
        courseId: user?.course_id,
      });
      toast.success("Notification Sent Successfully");
    } else {
      toast.error(res?.data?.message);
    }
    setLoading(false);
  };
  return (
    <div className="test">
      {/* <Button onPress={onOpen} color="primary">
    Open Modal
    </Button> */}
      <Modal
        className="send_notification_modal"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleSendNotification}>
              <ModalHeader className="flex flex-col gap-1">
                Send A Custom Notification
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="header"
                  placeholder="Enter Notification Header"
                  variant="bordered"
                  value={Notification?.header}
                  onChange={(e) => {
                    setNotification({
                      ...Notification,
                      header: e.target.value,
                    });
                  }}
                />

                <Textarea
                  label="Description"
                  variant="bordered"
                  placeholder="Enter your description"
                  disableAnimation
                  disableAutosize
                  classNames={{
                    input: "resize-y min-h-[80px]",
                  }}
                  value={Notification?.body}
                  onChange={(e) => {
                    setNotification({
                      ...Notification,
                      body: e.target.value,
                    });
                  }}
                />

                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Select
                    label={
                      ModeratorGroups?.status == "error"
                        ? ModeratorGroups?.message
                        : "Select A Group"
                    }
                    className=""
                    value={Notification?.groupId}
                    onChange={(e) => {
                      setNotification({
                        ...Notification,
                        groupId: e.target.value,
                      });
                    }}
                  >
                    {ModeratorGroups?.data?.map((group: any) => (
                      <SelectItem key={group.id} value={group.id}>
                        {group?.group_name}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button type="submit" color="primary" isLoading={loading}>
                  Send
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}