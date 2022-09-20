import * as React from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

interface IProps {
  pages: { [key: string]: React.ComponentType };
  defaultPath: string;
}
const Main = ({ pages, defaultPath }: IProps) => (
  // eslint-disable-next-line react/jsx-no-undef
  <HashRouter>
    <Switch>
      {Object.keys(pages).map((path) => (
        <Route exact path={path} component={pages[path]} key={path} />
      ))}
      <Route component={pages[defaultPath]} />
    </Switch>
  </HashRouter>
);

export default Main;
