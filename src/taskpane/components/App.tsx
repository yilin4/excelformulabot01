import * as React from "react";

import { PATHS } from "../constant";
import FormulaBot from "./pages/FormulaBot";
import CustomMenu from "./CustomMenu";
import Main from "./Main";
import Archive from "./pages/Archive";

///* global console, Excel, require  */

const pages: { [key: string]: React.ComponentType } = {
  [PATHS.FormulaBot]: FormulaBot,
  [PATHS.Archive]: Archive,
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <CustomMenu menulist={Object.keys(pages)} />
        <Main pages={pages} defaultPath={PATHS.FormulaBot} />
      </>
    );
  }
}
