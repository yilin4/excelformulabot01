import { DetailsList, DetailsListLayoutMode, IColumn, ITextFieldStyles, mergeStyles, TextField } from "@fluentui/react";
import * as React from "react";
import { Consult } from "../interfaces";

const exhibitChildClass = mergeStyles({
  display: "block",
  marginBottom: "10px",
});

const textFieldStyles: Partial<ITextFieldStyles> = { root: { maxWidth: "300px" } };

interface IState {
  items: Consult[];
}

export default class Archive extends React.Component<{ history: Consult[] }, IState> {
  private _columns: IColumn[];
  constructor(props) {
    super(props);

    this._columns = [
      { key: "column1", name: "Input", fieldName: "input", minWidth: 100, maxWidth: 200, isResizable: true },
      { key: "column2", name: "Output", fieldName: "output", minWidth: 100, maxWidth: 200, isResizable: true },
    ];
    this.state = {
      items: this.props.history,
    };
  }

  render() {
    const { items } = this.state;
    return (
      <>
        <TextField
          className={exhibitChildClass}
          label="Filter by input:"
          onChange={this._onFilter}
          styles={textFieldStyles}
        />
        <DetailsList items={items} columns={this._columns} layoutMode={DetailsListLayoutMode.justified} />
      </>
    );
  }

  private _onFilter = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
    this.setState({
      items: text ? this.props.history.filter((i) => i.input.toLowerCase().indexOf(text) > -1) : this.props.history,
    });
  };
}
