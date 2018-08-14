import React from "react";
import ReactDOM from "react-dom";
import DataComp from "./DataComp";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(<DataComp />, document.getElementById("root"));
registerServiceWorker();
