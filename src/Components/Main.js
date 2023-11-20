import React from "react";
import Graph from "./Graph";
import Map from "./Map";
import WarehouseCard from "./WarehouseCard";
import FpsCard from "./FpsCard";
import QrmChat from "./QrmChat";
import Upload from "./upload";
function Main() {
  return (
    <div>
      <Upload />
      <div
        style={{
          display: "flex",
          width: "60vw",
          justifyContent: "space-between",
          margin: 20,
        }}
      >
        <WarehouseCard />
        <FpsCard />
      </div>
      <Graph />
      <Map />
      <QrmChat />
    </div>
  );
}

export default Main;
