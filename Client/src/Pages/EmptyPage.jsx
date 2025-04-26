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
      description={`No blogs found related to "${topic}"`}
    />
  );
};

export default EmptyPage;
