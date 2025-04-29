import { Empty } from "antd";
import React from "react";

const EmptyPage = ({ topic }) => {
  return (
    <Empty
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
      }}
      description={topic ? `No blogs found related to "${topic}"` : "There is no blog created yet"}
    />
  );
};

export default EmptyPage;
