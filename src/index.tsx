import * as React from "react";
import { render } from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

render(<App dataSource="./data/data.json" />, document.getElementById("root"));
registerServiceWorker();
