import * as React from "react";
import { Menu, MenuItem } from "@progress/kendo-react-layout";

interface IProps {
  menulist: string[];
}

export default class CustomMenu extends React.Component<IProps> {
  render() {
    //const { menulist } = this.props;
    // eslint-disable-next-line prettier/prettier
    return (
      <div>
        <Menu vertical={true} style={{ display: "inline-block" }}>
          <MenuItem text="Item1" />
          <MenuItem text="Item3" />
        </Menu>
      </div>
    );
  }
}
