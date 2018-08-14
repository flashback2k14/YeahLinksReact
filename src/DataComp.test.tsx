import * as React from "react";
import * as ReactDOM from "react-dom";
import DataComp from "./DataComp";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<DataComp />, div);
});
