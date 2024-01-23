import { getOne } from "@/services/service";
import { isArabic } from "@/utils/checkLanguage";
import {
  Button,
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
import React from "react";
import useSWR from "swr";

const GroupUsers = ({ item, isOpen, onOpen, onOpenChange }: any) => {
  const { data: groupUsers, isLoading } = useSWR(
    `users/getGroupUsers/${item?.id}`,
    getOne
  );
  return (
    <Modal size={"3xl"} isOpen={isOpen} onClose={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Group Users
            </ModalHeader>
            <ModalBody>
              <Table aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>ID</TableColumn>
                  <TableColumn>Name</TableColumn>
                  <TableColumn>Email</TableColumn>
                  <TableColumn>Country</TableColumn>
                  <TableColumn>Status</TableColumn>
                </TableHeader>
                <TableBody
                  emptyContent={isLoading ? "Loading..." : "No data found"}
                >
                  {groupUsers?.data?.map((user: any) => (
                    <TableRow key={user.id}>
                      <TableCell
                        style={{
                          fontFamily: isArabic(user.id) ? "Tajawal" : "Roboto",
                        }}
                      >
                        {user.id}
                      </TableCell>
                      <TableCell
                        style={{
                          fontFamily: isArabic(user.full_name)
                            ? "Tajawal"
                            : "Roboto",
                        }}
                      >
                        {user.full_name}
                      </TableCell>
                      <TableCell
                        style={{
                          fontFamily: isArabic(user.email)
                            ? "Tajawal"
                            : "Roboto",
                        }}
                      >
                        {user.email}
                      </TableCell>
                      <TableCell
                        style={{
                          fontFamily: isArabic(user.country)
                            ? "Tajawal"
                            : "Roboto",
                        }}
                      >
                        {user.country}
                      </TableCell>
                      <TableCell
                        style={{
                          fontFamily: isArabic(user.status)
                            ? "Tajawal"
                            : "Roboto",
                        }}
                      >
                        {user.status}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default GroupUsers;
