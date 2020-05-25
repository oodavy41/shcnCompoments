import React, { Component } from "react";
import { Table } from "antd";
import "antd/dist/antd.css";
import "./NcovTable.css";

import data from "../assets/ncovData.json";
const columns = [
  {
    title: "企业名单",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "企业地址",
    dataIndex: "addr",
    key: "addr"
  },
  {
    title: "统一社会信用代码",
    dataIndex: "code",
    key: "code"
  }
];

export default function NcovTable(props) {
  const { children } = props;
  return (
    <div className="ncov-table">
      <Table columns={columns} dataSource={data} />
      {children}
    </div>
  );
}
