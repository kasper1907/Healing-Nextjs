import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { ArrowUpTrayIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Box, Button, Grid } from "@mui/material";
import styles from "@/styles/sass/Dashboard/UserMain/attachments.module.scss";
import { CiCircleRemove } from "react-icons/ci";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
const AttachFiles = ({ className, files, setFiles }: any) => {
  const [rejected, setRejected] = useState<any>([]);
  const { t } = useTranslation();
  const onDrop = useCallback((acceptedFiles: any, rejectedFiles: any) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles: any) => [
        ...previousFiles,
        ...acceptedFiles.map((file: any) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ]);
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles: any) => [...previousFiles, ...rejectedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/": [".svg"],
    },
    maxSize: 1024 * 1000,
    onDrop,
  });

  useEffect(() => {
    // Revoke the data uris to avoid memory leaks
    return () =>
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  const removeFile = (name: any) => {
    setFiles((files: any) => files.filter((file: any) => file.name !== name));
  };

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
    toast.success("All Files Removed Successfully");
  };

  const removeRejected = (name: any) => {
    setRejected((files: any) =>
      files.filter(({ file }: any) => file.name !== name)
    );
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!files?.length) return;

    const formData = new FormData();
    files.forEach((file: any) => formData.append("file", file));
    formData.append("upload_preset", "friendsbook");

    const URL: any = process.env.NEXT_PUBLIC_CLOUDINARY_URL;
    const data = await fetch(URL, {
      method: "POST",
      body: formData,
    }).then((res) => res.json());

  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: { xs: "15px", md: "0px 40px" },
        position: "relative",
      }}
    >
      <form
        style={{
          width: "100%",
        }}
        onSubmit={handleSubmit}
      >
        <div
          {...getRootProps({
            className: className,
          })}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4">
            <Image
              src={"/images/Dashboard/upload-icon.svg"}
              width={47}
              height={42}
              alt="uploadIcon"
            />
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p className={styles.dropZone__text}>
                <span className={styles.dropZone__mainText}>
                  {" "}
                  {t("Drag & drop files here")}
                </span>
                <span>{t("OR")}</span>
                <Button
                  className={styles.browseButton}
                  sx={{ backgroundColor: "#10458C" }}
                >
                  {t("Browse Files")}
                </Button>
              </p>
            )}
          </div>
        </div>
        {files?.length > 0 && (
          <Grid
            container
            columnSpacing={2}
            rowSpacing={1}
            sx={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              marginTop: "10px",
            }}
          >
            <Grid
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-end" },
              }}
              item
              xs={12}
              md={6}
            >
              <Button
                type="button"
                onClick={removeAll}
                className={styles.browseButton}
                sx={{ backgroundColor: "#10458C" }}
                style={{
                  border: "1px solid #c33a3a",
                  background: "transparent",
                  color: "#c33a3a",
                }}
              >
                Remove All Files
              </Button>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: { xs: "center", md: "flex-start" },
              }}
              item
              xs={12}
              md={6}
            >
              <Button
                type="button"
                onClick={() => {
                  toast.success("Files Uploaded Successfully");
                }}
                className={styles.browseButton}
                sx={{ backgroundColor: "#10458C" }}
                style={{
                  border: "1px solid #10458C",
                  background: "transparent",
                  color: "#10458C",
                }}
              >
                Submit And Upload
              </Button>
            </Grid>
          </Grid>
        )}
        {/* Preview */}
        <Box className="mt-20" sx={{ marginTop: { xs: "145px", md: "84px" } }}>
          {/* Accepted files */}

          <Grid container rowSpacing={2}>
            {files.map((file: any) => (
              <Grid
                className={styles.uploadedImgsGrid}
                key={file.name}
                xs={12}
                md={3}
                sx={{ boxSizing: "border-box" }}
              >
                <Box
                  sx={{
                    width: { xs: "100%", lg: "95%" },
                    height: "100%",
                  }}
                >
                  <Image
                    src={file.preview}
                    alt={file.name}
                    width={150}
                    height={150}
                    onLoad={() => {
                      URL.revokeObjectURL(file.preview);
                    }}
                    style={{
                      width: "150px",
                      height: "150px",
                    }}
                    className="object-contain rounded-md"
                  />
                  <CiCircleRemove
                    size={25}
                    className={styles.removeIcon}
                    onClick={() => removeFile(file.name)}
                  />

                  <p className="text-center mt-2 text-neutral-500 text-[12px] font-medium">
                    {file.name}
                  </p>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* Rejected Files
        <h3 className="title text-lg font-semibold text-neutral-600 mt-24 border-b pb-3">
          Rejected Files
        </h3>
        <ul className="mt-6 flex flex-col">
          {rejected.map(({ file, errors }: any) => (
            <li key={file.name} className="flex items-start justify-between">
              <div>
                <p className="mt-2 text-neutral-500 text-sm font-medium">
                  {file.name}
                </p>
                <ul className="text-[12px] text-red-400">
                  {errors.map((error: any) => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>
              </div>
              <button
                type="button"
                className="mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
                onClick={() => removeRejected(file.name)}
              >
                remove
              </button>
            </li>
          ))}
        </ul> */}
        </Box>
      </form>
    </Box>
  );
};

export default AttachFiles;
