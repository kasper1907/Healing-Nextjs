import { getOne } from "@/services/service";
import React, { useEffect } from "react";
import useSWR from "swr";
import Card from "./Card";
import { Dialog, Grid, Slide } from "@mui/material";
import {
  Button,
  CircularProgress,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useCreateReport } from "@/hooks/useCreateReport";
import { useSearchParams } from "next/navigation";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { CiSearch } from "react-icons/ci";
import "@/styles/reports/main.css";
import ReviewTable from "./ReviewTable";
import { TransitionProps } from "react-transition-group/Transition";
import { toast } from "sonner";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Content = ({
  tableName,
  isLoading,
  Table,
  userSelections,
  setUserSelections,
}: any) => {
  const [open, setOpen] = React.useState(false);
  const {
    createReport,
    loading,
    error: CreateError,
    success,
  } = useCreateReport({
    userSelections,
    tableName,
    setOpen,
    setUserSelections,
  });

  const handleClickOpen = () => {
    let selectedValuesOnly = userSelections.filter((item: any) => {
      return item.status?.length > 0 || item.place?.length > 0;
    });
    if (selectedValuesOnly.length == 0) {
      toast.warning("برجاء اختيار البيانات المراد تقريرها");
      return;
    }
    if (userSelections.length == 0) {
      toast.warning("يجب اختيار عنصر واحد على الأقل");
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-row items-center justify-center">
        <CircularProgress aria-label="Loading..." />
      </div>
    );
  }

  if (Table == "No Results") {
    return (
      <div className="w-full h-full flex flex-row items-center justify-center">
        <CiSearch />
        <h1>لا يوجد نتائج</h1>
      </div>
    );
  }
  return (
    <form onSubmit={createReport}>
      <Grid container spacing={2}>
        {Table?.length > 0
          ? Table?.map((item: any, idx: number) => {
              return (
                <Grid key={idx} item xs={12} md={6} lg={4}>
                  <Card
                    userSelections={userSelections}
                    setUserSelections={setUserSelections}
                    currentIndex={idx}
                    key={idx}
                    item={item}
                  />
                </Grid>
              );
            })
          : null}
      </Grid>
      <Grid container sx={{ mt: 2 }}>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{ background: "#BAA179", color: "#FFF", width: "200px" }}
            // type="submit"
            onClick={handleClickOpen}
          >
            استمرار
          </Button>
        </Grid>
      </Grid>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <ReviewTable
          Table={Table}
          tableName={tableName}
          userSelections={userSelections}
          setUserSelections={setUserSelections}
        />

        <div className="w-full flex justify-center items-center gap-2 bg-white mt-4">
          <Button
            style={{ background: "#BAA179", color: "#FFF", width: "200px" }}
            isLoading={loading}
            onClick={createReport}
          >
            حفظ
          </Button>
          <Button
            style={{
              background: "#FFF",
              border: "1px solid #BAA179",
              width: "200px",
            }}
            onClick={handleClose}
          >
            تعديل
          </Button>
        </div>
      </Dialog>{" "}
    </form>
  );
};

export default Content;
