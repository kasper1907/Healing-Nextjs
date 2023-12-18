import { Grid, Skeleton } from "@mui/material";
import React from "react";

const CardsSkeleton = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6]?.map((_, idx) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          key={idx}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: "10px", width: "90%" }}
            height={10}
          />
          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: "10px", width: "90%" }}
            height={10}
          />
          <Skeleton
            variant="rectangular"
            sx={{ borderRadius: "10px", width: "90%" }}
            height={10}
          />
          <Skeleton
            sx={{ borderRadius: "10px", width: "90%" }}
            variant="rounded"
            height={60}
          />
        </Grid>
      ))}
    </>
  );
};

export default CardsSkeleton;
