import React from "react";
import "@/styles/reports/main.css";
import { Radio, RadioGroup } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";

const Card = ({
  item,
  userSelections,
  currentIndex,
  setUserSelections,
}: any) => {
  const handleSelectStatus = (e: any) => {
    let newArr = [...userSelections];
    newArr[currentIndex].status = e.target.value;
    setUserSelections(newArr);
  };
  const handleSelectPlace = (e: any) => {
    let newArr = [...userSelections];
    const currentElement = newArr.find((el) => el.B_id == item.B_id);
    newArr[currentIndex].place = e.target.value;
    setUserSelections(newArr);
  };
  return (
    <div className="bg-white w-full flex flex-col rounded-lg p-5">
      <h3 className="title">{item?.name_texture}</h3>
      <RadioGroup
        onChange={handleSelectStatus}
        value={userSelections[currentIndex]?.status}
        label=""
        className="card-radio-main"
      >
        <Radio value="نشطه">نشطه</Radio>
        <Radio value="تراخي اول">تراخي اول</Radio>
        <Radio value="دائبه">دائبه </Radio>
        <Radio value="مزمنه">مزمنه</Radio>
        <Radio value="تراخي تاني">تراخي تاني</Radio>
      </RadioGroup>

      <Divider
        orientation="vertical"
        style={{
          width: "100%",
          height: "1px",
          margin: "20px 0px",
        }}
      />

      <h3 className="title">الفص</h3>

      <RadioGroup
        onChange={handleSelectPlace}
        value={userSelections[currentIndex]?.place}
        label=""
        className="card-radio-main secondary"
      >
        <Radio value="يمين">يمين</Radio>
        <Radio value="يسار">يسار</Radio>
      </RadioGroup>
    </div>
  );
};

export default Card;
