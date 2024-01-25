"use client";
import { endPoints } from "@/services/endpoints";
import { getOne, postRequest } from "@/services/service";
import { isArabic } from "@/utils/checkLanguage";
import { Grid, Typography } from "@mui/material";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Chip,
  Select,
  SelectItem,
  SelectedItems,
} from "@nextui-org/react";
import e from "express";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import useSWR from "swr";

const Page = () => {
  const [loading, setLoading] = React.useState(false);
  const [groupAssistants, setGroupAssistants] = React.useState<any>([]);
  const [groupUsers, setGroupUsers] = React.useState<any>([]);
  const [clientQuestions, setClientQuestions] = React.useState<any>([]);
  const [assistantQuestions, setAssistantQuestions] = React.useState<any>([]);
  const [report, setReport] = React.useState<any>({
    user_id: "",
    group_id: "",
    assistant_id: "0",
  });
  const router = useRouter();
  const { data: Groups } = useSWR(`Groups`, getOne);
  const { data: Therapists, isLoading } = useSWR(
    `Dashboard/GetTherapists`,
    getOne
  );
  const { data: Assistants } = useSWR(`Users/GetByUserStatus/4`, getOne);
  const { data: Questions } = useSWR(`Dashboard/getQuestions`, getOne);

  const { data: Clients, isLoading: LoadingClients } = useSWR(
    `Dashboard/`,
    getOne
  );

  const handleGetGroupAssistants = async (id: any) => {
    const res = await getOne(`Dashboard/GetGroupAssistants/${id}`);
    if (res.status == "success") {
      let arrayWithKeys = res.data.map((item: any) => {
        return {
          key: item.assistantId,
          ...item,
        };
      });

      setGroupAssistants(arrayWithKeys);
    } else {
      setGroupAssistants([]);
    }
  };
  const handleGetGroupUsers = async (id: any) => {
    const res = await getOne(endPoints.getGroupUsers(id));
    if (res.status == "success") {
      let arrayWithKeys = res.data.map((item: any) => {
        return {
          key: item.id,
          ...item,
        };
      });
      setGroupUsers(arrayWithKeys);
    } else {
      setGroupUsers([]);
    }
  };
  const handleCreateReport = async (e: any) => {
    e.preventDefault();
    if (!report?.user_id || !report?.group_id || !report?.assistant_id) {
      toast.error("Please Fill All Fields");
      return;
    }

    if (!clientQuestions.length || !assistantQuestions.length) {
      toast.error("Please Select Questions");
      return;
    }
    let modifiedClientQuestions = clientQuestions.map((item: any) => {
      return {
        id: item,
        question_for: "client",
      };
    });

    let modifiedAssistantQuestions = assistantQuestions.map((item: any) => {
      return {
        id: item,
        question_for: "assistant",
      };
    });

    let combinedQuestions = [
      ...modifiedClientQuestions,
      ...modifiedAssistantQuestions,
    ];

    // return;

    setLoading(true);
    const res = await postRequest(`Dashboard/create_report`, {
      ...report,
      questions_ids: combinedQuestions,
    });

    if (res.status == "201") {
      toast.success("Report Created Successfully");
      setReport(null);
      router.refresh;
      setLoading(false);
    } else {
      toast.error(res.data.message || "Something Went Wrong");
      setLoading(false);
    }
  };

  if (isLoading || LoadingClients) return <div>Loading...</div>;
  return (
    <form onSubmit={handleCreateReport}>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            color={"primary"}
            variant="h6"
            sx={{ mb: 2, ml: 2, fontWeight: "400" }}
          >
            Create Report For Client
          </Typography>{" "}
        </Grid>

        <Grid item xs={12} md={12} sx={{ mt: 3 }}>
          <Autocomplete
            className="h-12"
            label="Select a Group"
            labelPlacement="outside"
            aria-label="Search By Group Name..."
            classNames={{}}
            placeholder="Search By Group Name..."
            defaultItems={Groups?.data}
            value={report?.group_id || ""}
            onSelectionChange={(e) => {
              handleGetGroupAssistants(e);
              handleGetGroupUsers(e);
              setReport({
                ...report,
                group_id: e,
              });
            }}
          >
            {(item: any) => (
              <AutocompleteItem
                key={item.id}
                textValue={item.group_name}
                value={item.id}
              >
                {item.group_name}
              </AutocompleteItem>
            )}
          </Autocomplete>
        </Grid>

        <Grid item xs={12} md={12} sx={{ mt: 3 }}>
          <Select
            aria-label="Search for a Assistant"
            items={groupAssistants}
            label="Select an Assistant"
            // selectedKeys={new Set([report.assistant_id])}
            placeholder="Select an Assistant"
            value={report?.assistant_id || ""}
            onChange={(e) => {
              setReport({
                ...report,
                assistant_id: e.target.value,
              });
            }}
            labelPlacement="outside"
            classNames={{
              base: "w-full",
              trigger: "h-12",
            }}
            renderValue={(items) => {
              return items.map((item: any) => (
                <div key={item.key} className="flex items-center gap-2">
                  <Avatar
                    alt={item.data.user_name}
                    className="flex-shrink-0"
                    size="sm"
                    src={
                      process.env.NEXT_PUBLIC_BASE_URL +
                      "files/static_assets/male-av.jpg"
                    }
                  />
                  <div className="flex flex-col">
                    <span>{item.data.user_name}</span>
                  </div>
                </div>
              ));
            }}
          >
            {(user: any) => (
              <SelectItem key={user.id} textValue={user.user_name}>
                <div className="flex gap-2 items-center">
                  <Avatar
                    alt={user.user_name}
                    className="flex-shrink-0"
                    size="sm"
                    src={
                      process.env.NEXT_PUBLIC_BASE_URL +
                      "files/static_assets/male-av.jpg"
                    }
                  />
                  <div className="flex flex-col">
                    <span className="text-small">{user.user_name}</span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        </Grid>
        <Grid item xs={12} md={12} sx={{ mt: 3 }}>
          <div className="h-12 flex w-full flex-wrap md:flex-nowrap gap-4">
            <Autocomplete
              className="h-12"
              aria-label="Search for a Client"
              classNames={{}}
              labelPlacement="outside"
              placeholder="Search for a Client"
              label="Search for a Client"
              defaultItems={groupUsers}
              value={report?.user_id || ""}
              onSelectionChange={(e) => {
                setReport({
                  ...report,
                  user_id: e,
                });
              }}
            >
              {(item: any) => (
                <AutocompleteItem
                  key={item.id}
                  textValue={item.full_name}
                  value={item.id}
                >
                  {item.full_name}
                </AutocompleteItem>
              )}
            </Autocomplete>
          </div>
        </Grid>

        <Grid item xs={12} md={12} sx={{ mt: 3 }}>
          <Select
            items={Questions?.data}
            aria-label="Select Client Questions"
            placeholder="Select Client Questions"
            label="Select Client Questions"
            labelPlacement="outside"
            isMultiline={true}
            value={clientQuestions}
            onSelectionChange={(e) => {
              setClientQuestions(Array.from(new Set(e)));
            }}
            selectionMode="multiple"
            classNames={{
              base: "w-full",
              trigger: "h-12",
            }}
            renderValue={(items: SelectedItems<any>) => {
              return (
                <div className="flex flex-wrap gap-2">
                  {items.map((item: any) => (
                    <Chip
                      style={{
                        fontFamily: "Tajawal",
                      }}
                      key={item.key}
                    >
                      {item.data.title}
                    </Chip>
                  ))}
                </div>
              );
            }}
          >
            {(question: any) => (
              <SelectItem key={question.id} textValue={question.title}>
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col">
                    <span className="text-small !font-[Tajawal]">
                      {question.title}
                    </span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        </Grid>

        <Grid item xs={12} md={12} sx={{ mt: 3 }}>
          <Select
            items={Questions?.data}
            aria-label="Select Assistant Questions"
            placeholder="Select Assistant Questions"
            label="Select Assistant Questions"
            labelPlacement="outside"
            isMultiline={true}
            value={assistantQuestions}
            onSelectionChange={(e) => {
              setAssistantQuestions(Array.from(new Set(e)));
            }}
            selectionMode="multiple"
            classNames={{
              base: "w-full",
              trigger: "h-12",
            }}
            renderValue={(items: SelectedItems<any>) => {
              return (
                <div className="flex flex-wrap gap-2">
                  {items.map((item: any) => (
                    <Chip
                      style={{
                        fontFamily: "Tajawal",
                      }}
                      key={item.key}
                    >
                      {item.data.title}
                    </Chip>
                  ))}
                </div>
              );
            }}
          >
            {(question: any) => (
              <SelectItem key={question.id} textValue={question.title}>
                <div className="flex gap-2 items-center">
                  <div className="flex flex-col">
                    <span className="text-small !font-[Tajawal]">
                      {question.title}
                    </span>
                  </div>
                </div>
              </SelectItem>
            )}
          </Select>
        </Grid>

        <Grid
          item
          md={12}
          xs={12}
          sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
        >
          <Button
            isLoading={loading}
            type="submit"
            color="primary"
            style={{ width: "200px" }}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Page;
