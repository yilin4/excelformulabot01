import * as React from "react";

import CustomMenu from "./CustomMenu";

///* global console, Excel, require  */

export default class App extends React.Component {
  render() {
    return (
      <>
        <img src="D:\test\excelformulabot01\resources\excelformulabot.svg" /> {/* logo image */}
        <CustomMenu />
      </>
    );
  }
}
