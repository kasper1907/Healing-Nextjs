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
  const handleLogIn = async () => {
    setLoading(true);
    const res = await postRequest("Auth/login", data);
    if (res.status == 400) {
      toast.error(res.data.message);
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
                <div className="p-10">
                  <ModalHeader className="flex ">
                    Client Credentials
                  </ModalHeader>
                  <p>Username: {clientData?.UserName}</p>
                  <p>Password: {clientData?.Password}</p>
                </div>
              ) : (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    Log in
                  </ModalHeader>
                  <ModalBody>
                    <Input
                      autoFocus
                      label="Email"
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
                    <div className="flex py-2 px-1 justify-between">
                      <Checkbox
                        classNames={{
                          label: "text-small",
                        }}
                      >
                        Remember me
                      </Checkbox>
                      <Link color="primary" href="#" size="sm">
                        Forgot password?
                      </Link>
                    </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button color="danger" variant="flat" onPress={onClose}>
                      Close
                    </Button>
                    <Button
                      isLoading={loading}
                      color="primary"
                      onClick={handleLogIn}
                    >
                      Sign in
                    </Button>
                  </ModalFooter>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
