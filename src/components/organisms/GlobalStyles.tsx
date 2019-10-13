import * as React from "react";
import { Global, css } from "@emotion/core";

export const GlobalStyles = () => (
  <Global
    styles={css`
      @import url("https://rsms.me/inter/inter-ui.css");

      * {
        font-family: "Inter UI", sans-serif;
      }

      html,
      body {
        margin: 0;
        padding: 0;
        color: #00ffa2;
        background: #004466;
      }

      /* theming scrollbars */
      /* https://css-tricks.com/custom-scrollbars-in-webkit/ */
      ::-webkit-scrollbar {
        height: 4px;
        width: 6px;
      }

      /* Track */
      ::-webkit-scrollbar-track {
        -webkit-border-radius: 0px;
        border-radius: 0px;
        background: #004466;
        cursor: pointer;
      }

      /* Handle */
      ::-webkit-scrollbar-thumb {
        -webkit-border-radius: 0px;
        border-radius: 0px;
        background: #00ffa2;
      }

      ::-webkit-scrollbar-thumb:window-inactive {
        background: transparent;
      }
    `}
  />
);
