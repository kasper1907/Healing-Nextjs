"use client";
import { getOne } from "@/services/service";
import { Grid, Typography } from "@mui/material";
import {
  Autocomplete,
  AutocompleteItem,
  Avatar,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import useSWR from "swr";

const Page = () => {
  const { data: Therapists, isLoading } = useSWR(
    `Dashboard/GetTherapists`,
    getOne
  );
  const { data: Clients, isLoading: LoadingClients } = useSWR(
    `Dashboard/`,
    getOne
  );

  if (isLoading || LoadingClients) return <div>Loading...</div>;
  return (
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

      <Grid item xs={12} md={10}>
        <Select
          items={Therapists?.data}
          placeholder="Select a Therapist"
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
      <Grid item xs={12} md={10} sx={{ mt: 3 }}>
        <div className="h-12 flex w-full flex-wrap md:flex-nowrap gap-4">
          <Autocomplete
            className="h-12"
            classNames={{}}
            placeholder="Search an Client"
            // className="w-full"
            defaultItems={Clients?.data}
          >
            {(item: any) => (
              <AutocompleteItem key={item.full_name}>
                {item.full_name}
              </AutocompleteItem>
            )}
          </Autocomplete>
        </div>
      </Grid>

      <Grid item xs={12} md={10} sx={{ mt: 3 }}>
        <Select
          items={Therapists?.data}
          placeholder="Select a Therapist"
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

      <Grid
        item
        md={10}
        xs={12}
        sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}
      >
        <Button color="primary" style={{ width: "200px" }}>
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default Page;
