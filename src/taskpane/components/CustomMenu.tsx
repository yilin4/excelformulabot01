import * as React from "react";
import { Pivot, PivotItem } from "@fluentui/react";
import FormulaBot from "./pages/FormulaBot";
import Archive from "./pages/Archive";
import { Consult } from "./interfaces";

interface IState {
  history: Consult[];
}

export default class CustomMenu extends React.Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = { history: [] };
    this.addToHistory.bind(this);
  }

  addToHistory(input: string, output: string) {
    this.setState({ history: Object.assign([], this.state.history, { input: input, output: output }) });
  }

  render() {
    return (
      <div>
        <Pivot>
          <PivotItem headerText="Formula Bot">
            <FormulaBot addToHistory={this.addToHistory} />
          </PivotItem>
          <PivotItem headerText="Archive">
            <Archive history={this.state.history} />
          </PivotItem>
        </Pivot>
      </div>
    );
  }
}
