import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select/async";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const CountrySelect = ({ formData, setFormData }: any) => {
  const { t } = useTranslation();
  const [allCountries, setAllCountries] = useState([]);
  const [selected, setSelected] = useState<any>("");

  const loadOptions = (inputValue: any, callback: any) => {
    // Filter the countries based on user input or return all countries if no input
    const filteredCountries = allCountries.filter((country: any) =>
      country.label.toLowerCase().includes(inputValue.toLowerCase())
    );

    callback(filteredCountries);
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

  useEffect(() => {
    // Fetch all countries when the component mounts
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const options = data.map((country: any) => ({
          label: country.name.common,
          value: country.cca2,
          flag: country.flags.png,
        }));

        setAllCountries(options);
      })
      .catch((error) => {
        console.error("Error fetching all countries:", error);
      });
  }, []);

  const memoizedCountries: any = useMemo(() => allCountries, [allCountries]);
  useEffect(() => {
    if (formData?.country !== "") {
      const country = Object.keys(memoizedCountries).find(
        (key) => memoizedCountries[key].label === formData?.country
      );
      setSelected(country);
    }
  }, []);

  return (
    <Select
      onChange={(e) => {
        setSelected(e);
        setFormData({ ...formData, country: e?.label });
      }}
      value={selected}
      className="countrySelectAB"
      // menuIsOpen={true}
      cacheOptions
      defaultOptions={memoizedCountries}
      loadOptions={loadOptions}
      placeholder={t("Enter your living country")}
      formatOptionLabel={formatOptionLabel}
    />
  );
};

export default CountrySelect;
