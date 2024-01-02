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

export default function UploadVideo({ isOpen2, onOpenChange2, user }: any) {
  const { data: ModeratorGroups, isLoading } = useSWR(
    `Groups/getThirapistGroups/${user?.course_id}`,
    getOne
  );
  const [loading, setLoading] = useState(false);
  const [Session, setSession] = useState({
    title: "",
    date: "",
    group_id: "",
    link: "",
  });

  const handleUploadVideo = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const res = await postRequest(`Videos/uploadSessionVideo`, Session);
    console.log(res);
    if (res.status == 200) {
      onOpenChange2();
      setSession({
        title: "",
        date: "",
        group_id: "",
        link: "",
      });
      toast.success("Session Saved Successfully");
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
        isOpen={isOpen2}
        onOpenChange={onOpenChange2}
        placement="top-center"
      >
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleUploadVideo}>
              <ModalHeader className="flex flex-col gap-1">
                Upload A Session Video
              </ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  label="Video Title"
                  placeholder="Enter Video Title"
                  variant="bordered"
                  value={Session?.title}
                  onChange={(e) => {
                    setSession({
                      ...Session,
                      title: e.target.value,
                    });
                  }}
                />
                <Input
                  autoFocus
                  label="Video Date"
                  placeholder="Enter Video Date"
                  variant="bordered"
                  value={Session?.date}
                  onChange={(e) => {
                    setSession({
                      ...Session,
                      date: e.target.value,
                    });
                  }}
                />
                <Input
                  autoFocus
                  label="Video Link"
                  placeholder="Enter Video Link"
                  variant="bordered"
                  value={Session?.link}
                  onChange={(e) => {
                    setSession({
                      ...Session,
                      link: e.target.value,
                    });
                  }}
                />

                <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
                  <Select
                    label={
                      ModeratorGroups?.status == "error"
                        ? ModeratorGroups?.message
                        : "Choose A Group"
                    }
                    className=""
                    value={Session?.group_id}
                    onChange={(e) => {
                      setSession({
                        ...Session,
                        group_id: e.target.value,
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
