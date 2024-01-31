import {
  deleteRequest,
  getOne,
  patchRequest,
  postRequest,
  updateRequest,
} from "@/services/service";
import { isArabic } from "@/utils/checkLanguage";
import {
  Button,
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { toast } from "sonner";
import useSWR, { mutate } from "swr";

const ViewQuestions = ({
  isOpen,
  onOpen,
  onOpenChange,
  clientData,
  action,
}: any) => {
  const [loading, setLoading] = React.useState(false);

  const { data, isLoading } = useSWR(
    `TherapyReports/getQuestionsByReportId/${clientData?.id}`,
    getOne
  );

  return (
    <Modal
      scrollBehavior={"outside"}
      size="5xl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <h3 className="">Report Questions And Answers</h3>
              <div className="flex flex-row items-center mb-2">
                <Image
                  width={30}
                  height={30}
                  className="border rounded-full border-gray-100 shadow-md mr-2 w-8 h-8"
                  alt="course Img"
                  src={process.env.NEXT_PUBLIC_BASE_URL2 + clientData?.logo}
                />
                <span className="font-[Tajawal] font-semibold">
                  {clientData?.course_name}
                </span>
              </div>
              <div className="flex flex-row items-center mb-2">
                <Image
                  width={30}
                  height={30}
                  className="border rounded-full border-gray-100 shadow-md mr-2 w-8 h-8"
                  alt="course Img"
                  src={
                    process.env.NEXT_PUBLIC_BASE_URL + clientData?.client_image
                  }
                />
                <span className="font-[Tajawal] font-semibold">
                  {clientData?.client_name}
                </span>
              </div>
              <div className="flex items-center gap-2  ">
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#e4d4f4]"></span>
                  <span className="!font-[Tajawal]">اسئله العميل</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-[#D1F4E0]"></span>
                  <span className="!font-[Tajawal]">اسئله المساعد</span>
                </div>
              </div>
            </ModalHeader>
            <ModalBody>
              <Table isStriped aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>ID</TableColumn>
                  <TableColumn>Question</TableColumn>
                  <TableColumn>Question For</TableColumn>
                  <TableColumn>Answer</TableColumn>
                </TableHeader>
                <TableBody
                  emptyContent={
                    isLoading ? <div>Loading...</div> : "No Questions found"
                  }
                >
                  {data?.data?.map((item: any, idx: number) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-[Roboto]">{idx + 1}</TableCell>
                      <TableCell
                        className={`${
                          isArabic(item.title)
                            ? "font-[Tajawal]"
                            : "font-[Roboto]"
                        }`}
                      >
                        {item.title}
                      </TableCell>
                      <TableCell
                        className={`${
                          isArabic(item.question_for)
                            ? "font-[Tajawal]"
                            : "font-[Roboto]"
                        }`}
                      >
                        {item?.question_for == "assistant" ? (
                          <Chip variant="flat" color="success">
                            <span className="!font-[Tajawal]">
                              سؤال للمساعد
                            </span>
                          </Chip>
                        ) : (
                          <Chip variant="flat" color="secondary">
                            <span className="!font-[Tajawal] text-[#000]">
                              سؤال للعميل
                            </span>
                          </Chip>
                        )}
                      </TableCell>
                      <TableCell
                        className={`${
                          isArabic(item.answer)
                            ? "font-[Tajawal]"
                            : "font-[Roboto]"
                        }`}
                      >
                        {item.answer ? (
                          item?.answer
                        ) : (
                          <span className="font-[Tajawal]">
                            {"لم يجاوب علي السؤال"}
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ViewQuestions;
