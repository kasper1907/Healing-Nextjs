import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { patchRequest, postRequest } from "@/services/service";
import { toast } from "sonner";
import { mutate } from "swr";

type Question = {
  title: string;
  type: "text" | "singleChoice" | "multipleChoice" | "";
};
export default function CreateQuestion({
  isOpen,
  onOpen,
  onClose,
  item,
}: {
  isOpen: boolean;
  onOpen: any;
  onClose: any;
  item: any;
}) {
  const handleOpen = (size: string) => {
    onOpen();
  };

  const [values, setValues] = React.useState<Question>({
    title: "",
    type: "",
  });
  const [selectedKeys, setSelectedKeys]: any = useState<any>([]);
  const copyOfValues = React.useMemo(() => {
    let test = {
      title: item?.title,
      type: item?.type,
    };

    return test;
  }, [item]);

  const [loading, setLoading] = useState(false);

  const questionTypes = [
    {
      label: "Text",
      value: "text",
    },
    {
      label: "Single Choice",
      value: "singleChoice",
    },
    {
      label: "Multiple Choice",
      value: "multipleChoice",
    },
  ];

  useEffect(() => {
    if (isOpen == true) {
      setValues({
        title: item.title,
        type: item.type,
      });
      setSelectedKeys([item?.type] as any);
    } else {
      setSelectedKeys([] as any);
    }
  }, [item, isOpen]);

  const handleSubmit = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await postRequest("Dashboard/CreateQuestion", values);
    if (res.status == 201) {
      toast.success("Question Created Successfully");
      setValues({
        title: "",
        type: "",
      });
      mutate("Dashboard/getQuestions");
      onClose();
    } else {
      toast.error(res.data.message || "Something Went Wrong!");
    }
    setLoading(false);
  };
  return (
    <>
      <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
        <form onSubmit={handleSubmit}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Create New Question
                </ModalHeader>
                <ModalBody>
                  <Input
                    style={{
                      fontFamily: "Tajawal",
                    }}
                    label="Question Title"
                    placeholder="Question Title"
                    required
                    value={values.title}
                    onChange={(e) =>
                      setValues({ ...values, title: e.target.value })
                    }
                  />
                  {selectedKeys?.length > 0 ? (
                    <Select
                      defaultSelectedKeys={selectedKeys}
                      value={values?.type}
                      onSelectionChange={(e: any) => {
                        setValues({ ...values, type: e as any });
                      }}
                      label="Select Question Type"
                      className="w-full"
                    >
                      {questionTypes?.map((type: any) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </Select>
                  ) : (
                    "Loading..."
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    isLoading={loading}
                    isDisabled={
                      JSON.stringify(values) === JSON.stringify(copyOfValues)
                    }
                    type="submit"
                    color="primary"
                  >
                    Submit
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
