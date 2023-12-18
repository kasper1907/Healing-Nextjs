import Dropzone from "@/utils/Dropzone";
import React, { useEffect, useState } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import styles from "@/styles/sass/Dashboard/UserMain/attachments.module.scss";
import signUpStyles from "@/styles/sass/Dashboard/Forms/main.module.scss";

import { Button, Grid } from "@mui/material";
import ActionsButtons from "./ActionsButtons";
import AttachFiles from "./AttachFiles";
import { postRequest } from "@/services/service";
import { useSearchParams } from "next/navigation";

const Upload = ({
  handleNext,
  steps,
  setSteps,
  currentIndex,
  handleBack,
  formData,
  setFormData,
}: any) => {
  useEffect(() => {
    Aos.init();
  }, []);

  const [files, setFiles] = useState<any>([]);
  const searchParams = useSearchParams();
  const handleSubmit = async () => {
    // steps[currentIndex].isCompleted = true;
    // handleNext();

    // console.log(formData);
    delete formData["countryCode"];
    delete formData["countryOfLiving"];
    const formDataObj: any = new FormData();
    for (let key in formData) {
      if (key == "phone") {
        formDataObj.append(key, `${formData["countryCode"]} ${formData[key]} `);
      }

      formDataObj.append(key, formData[key]);
    }

    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        formDataObj.append("file", files[i]);
      }
    }

    formDataObj.append("courseId", searchParams.get("sessionId")!);

    // for (var pair of formDataObj) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    const res = await postRequest("users/createUser", formDataObj);
    // console.log(res);
    if (res.status == 201) {
      steps[currentIndex].isCompleted = true;
      handleNext();
    }
  };

  return (
    <div data-aos="fade-right" className={styles.pageWrapper}>
      <div className={styles.dropZoneWrapper}>
        <AttachFiles files={files} setFiles={setFiles} />
      </div>

      <ActionsButtons
        handleBack={handleBack}
        handleSubmit={handleSubmit}
        currentIndex={currentIndex}
        steps={steps}
      />
    </div>
  );
};

export default Upload;
