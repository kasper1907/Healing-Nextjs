import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import styles from "@/styles/sass/Dashboard/UserMain/usermain.module.scss";

const Recommended = () => {
  const randomArray = Array.from({ length: 7 }, () =>
    Math.floor(Math.random() * 6)
  );
  return (
    <div>
      <Grid container spacing={2}>
        {randomArray?.map((item, index) => (
          <Grid key={index} item xs={12} lg={4}>
            <Box
              sx={{
                height: "370px",
                background: "#FFF",
                borderRadius: "10px",
                padding: "15px",
                width: "100%",
              }}
            >
              <Typography color={"#838383"} sx={{ ml: 2, mb: 2 }}>
                Healing from diabetes1
              </Typography>
              <iframe
                style={{
                  width: "100%",
                  height: "90%",
                  borderRadius: "16px",
                }}
                className={styles.videoIframe}
                allowFullScreen
                src="https://customer-7ral3pe3959xe832.cloudflarestream.com/737b67dbf506017e02fd8039f213b5f0/iframe?poster=https%3A%2F%2Fcustomer-7ral3pe3959xe832.cloudflarestream.com%2F737b67dbf506017e02fd8039f213b5f0%2Fthumbnails%2Fthumbnail.jpg%3Ftime%3D%26height%3D600"
              ></iframe>
            </Box>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Recommended;
