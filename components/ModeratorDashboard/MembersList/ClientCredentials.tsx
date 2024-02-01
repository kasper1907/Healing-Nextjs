"use client";
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
} from "@nextui-org/react";
import { postRequest } from "@/services/service";
import { toast } from "sonner";
import useCookie from "react-use-cookie";
import jwt from "jsonwebtoken";

export default function ClientCredentials({
  isOpen,
  onOpen,
  onOpenChange,
  clientData,
}: any) {
  const [userToken, setUserToken] = useCookie("SID");
  const [loading, setLoading] = useState(false);
  const [showClientCredentials, setShowClientCredentials] = useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const decodedToken = jwt.decode(userToken) as any;
  const handleLogIn = async (event: any) => {
    event?.preventDefault();
    setLoading(true);
    const res = await postRequest("Auth/login", data);
    if (res.status == 400) {
      toast.error(res.data.message);
      setLoading(false);
    } else {
      if (
        res.data.data.role == "Moderator"
        // res.data.data.user_id == decodedToken?.data?.user_id
      ) {
        setShowClientCredentials(true);
        toast.success("Logged in Successfully");
        setLoading(false);
      } else {
        toast.error("You are not authorized to view this data");
        setLoading(false);
      }
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              {showClientCredentials ? (
                <>
                  <ModalHeader className="flex ">
                    Client Credentials
                  </ModalHeader>
                  <p className="px-8 mb-4 text-danger text-sm">
                    *Please Do Not Share These Credentials With Anyone Else The
                    Client.
                  </p>
                  <div className="px-8 py-6">
                    <p>Username: {clientData?.UserName}</p>
                    <p>Password: {clientData?.Password}</p>
                  </div>
                </>
              ) : (
                <form onSubmit={handleLogIn}>
                  <ModalHeader className="flex flex-col gap-1">
                    Enter Your Email & Password To View Client Credentials
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      label="Email"
                      isRequired
                      placeholder="Enter your email"
                      variant="bordered"
                      value={data?.username}
                      onChange={(e) => {
                        setData({
                          ...data,
                          username: e.target.value,
                        });
                      }}
                    />
                    <Input
                      label="Password"
                      isRequired
                      placeholder="Enter your password"
                      type="password"
                      variant="bordered"
                      value={data?.password}
                      onChange={(e) => {
                        setData({
                          ...data,
                          password: e.target.value,
                        });
                      }}
                    />
                    {/* <div className="flex py-2 px-1 justify-between">
                      <Checkbox
                        classNames={{
                          label: "text-small",
                        }}
                      >
                        Remember me
                      </Checkbox>
                    </div> */}
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button isLoading={loading} color="primary" type="submit">
                      Submit
                    </Button>
                  </ModalFooter>
                </form>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
