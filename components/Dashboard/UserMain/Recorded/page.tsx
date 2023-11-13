import { Grid } from "@mui/material";
import React from "react";
import VideoSection from "../VideoSection/page";

const Recorded = () => {
  return (
    <div>
      <Grid container spacing={1}>
        {Array.from({ length: 7 }, () => Math.floor(Math.random() * 6))?.map(
          (el, idx) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={idx}>
                <VideoSection />
              </Grid>
            );
          }
        )}
      </Grid>
    </div>
  );
};

export default Recorded;
