import { ITextFieldStyles, List, mergeStyles, TextField } from "@fluentui/react";
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
  constructor(props) {
    super(props);

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
        <List items={items} />
      </>
    );
  }

  private _onFilter = (_ev: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, text: string): void => {
    this.setState({
      items: text ? this.props.history.filter((i) => i.input.toLowerCase().indexOf(text) > -1) : this.props.history,
    });
  };
}
