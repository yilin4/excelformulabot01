import * as React from "react";
import { Pivot, PivotItem } from "@fluentui/react";
import FormulaBot from "./pages/FormulaBot";
import Archive from "./pages/Archive";
import { Consult } from "./interfaces";

/*  global console */

interface IState {
  history: Consult[];
}

export default class CustomMenu extends React.Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = { history: [] };
    this.addToHistory = this.addToHistory.bind(this);
  }

  addToHistory(input: string, output: string) {
    this.setState({ history: [...this.state.history, { input: input, output: output }] });
    console.log(this.state.history);
  }

  render() {
    return (
      <div>
        <Pivot>
          <PivotItem headerText="Formula Bot">
            <FormulaBot addToHistory={this.addToHistory} history={this.state.history} />
          </PivotItem>
          <PivotItem headerText="Archive">
            <Archive history={this.state.history} />
          </PivotItem>
        </Pivot>
      </div>
    );
  }
}
