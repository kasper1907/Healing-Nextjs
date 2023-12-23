import { Button } from "@nextui-org/react";
import Link from "next/link";

function NotFoundPage() {
  return (
    <main
      style={{
        padding: "0",
        margin: "0",
        background: "#FFF",
        overflowX: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <h1
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="w-fit h-screen flex items-center justify-center"
      >
        Page Not Found
      </h1>

      <h1
        style={{
          fontSize: "10rem",
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        {" "}
        404{" "}
      </h1>

      <Link
        href="/"
        style={{
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Go To Home Page
      </Link>
    </main>
  );
}

export default NotFoundPage;
