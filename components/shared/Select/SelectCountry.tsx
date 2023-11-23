// CountrySelect.js

import React from "react";
import Select from "react-select/async";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const CountrySelect = () => {
  const { t } = useTranslation();
  const loadOptions = (inputValue: any, callback: any) => {
    // Replace this with your actual API endpoint or data fetching logic
    fetch(`https://restcountries.com/v3.1/name/${inputValue}`)
      .then((response) => response.json())
      .then((data) => {
        const options = data.map((country: any) => ({
          label: country.name.common,
          value: country.cca2,
          flag: country.flags.png, // Add the URL of the country flag
        }));

        callback(options);
      })
      .catch((error) => {
        console.error("Error fetching country options:", error);
        callback([]);
      });
  };

  const formatOptionLabel = ({ label, flag }: any) => (
    <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <Image
        width={24}
        height={24}
        src={flag}
        alt={`Flag of ${label}`}
        style={{ width: "24px", marginRight: "8px" }}
      />
      {label}
    </div>
  );

  return (
    <Select
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      placeholder={t("Enter your living country")}
      formatOptionLabel={formatOptionLabel}
    />
  );
};

export default CountrySelect;
