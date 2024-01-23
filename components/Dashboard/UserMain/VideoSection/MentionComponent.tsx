import React, { useState, useEffect } from "react";
import { Mention, MentionSearchEvent } from "primereact/mention";
import { CustomerService } from "./CustomerService";
import useSWR from "swr";
import { getOne } from "@/services/service";

export default function MentionComponent() {
  const [value, setValue] = useState<string>("");
  const [customers, setCustomers] = useState<any>([]);
  const [suggestions, setSuggestions] = useState<any>([]);

  const { data: Users, isLoading } = useSWR(`Dashboard/`, getOne, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    onSuccess: (data) => {
      setCustomers(data?.data);
    },
  });

  const onSearch = (event: MentionSearchEvent) => {
    //in a real application, make a request to a remote url with the query and return suggestions, for demo we filter at client side
    setTimeout(() => {
      const query = event.query;
      let suggestions;

      if (!query.trim().length) {
        suggestions = [...customers];
      } else {
        suggestions = customers.filter((customer: any) => {
          return customer.full_name
            .toLowerCase()
            .startsWith(query.toLowerCase());
        });
      }

      setSuggestions(suggestions);
    }, 250);
  };

  const itemTemplate = (suggestion: any) => {
    const src = `${process.env.NEXT_PUBLIC_BASE_URL}${suggestion?.image}`;

    return (
      <div className="flex align-items-center w-full">
        <img alt={suggestion.full_name} src={src} width="32" />
        <span className="flex flex-column ml-2">
          {suggestion.full_name}
          <small
            style={{ fontSize: ".75rem", color: "var(--text-color-secondary)" }}
          >
            @{suggestion.full_name}
          </small>
        </span>
      </div>
    );
  };

  return (
    <div className="card text-area-parent flex justify-content-center w-full">
      <Mention
        value={value}
        //@ts-ignore
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          setValue(e.target.value);
        }}
        suggestions={suggestions}
        onSearch={onSearch}
        field="nickname"
        placeholder="Enter @ to mention people"
        rows={3}
        cols={40}
        style={{ width: "100% !important" }}
        itemTemplate={itemTemplate}
      />
    </div>
  );
}
