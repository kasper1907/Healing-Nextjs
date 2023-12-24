import dayjs from "dayjs";

type SignUpForm = {
  firstName: string;
  lastName: string;
  email: string;
  countryCode: string;
  phone: string;
  dateOfBirth: dayjs;
  timeOfBirth: currentTime;
  placeOfBirth: string;
  Nationality: string;
  gender: string;
  hand: string;
  height: string;
  weight: string;
  maritalStatus: string;
  jobTitle: string;
  country: {
    label: string;
    value: string;
    flag: string;
  };
  boys: string;
  girls: string;
  colorTest: string[];
  shapeTest: string[];
  sessionType: string;
  expectations: string;
  //Medical Data:
  organic_Psychological_complaint: string;
  date_of_Organic_Psychological_complaint: dayjs;
  medical_diagnosis: string;
  type_of_complaint: string;
};
