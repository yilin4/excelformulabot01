//import express, { Application } from "express";
import * as React from "react";
//import cors from "cors";

///* global console */
//const app: Application = express();

//app.use(cors());
export default class FormulaBot extends React.Component {
  // async onSubmit() {
  //   app.get("https://www.baidu.com", (req, resp) => {
  //     console.log(req);
  //     console.log(resp);
  //   });
  // }

  render() {
    return (
      <div>
        <textarea id="description" placeholder="input your description"></textarea>
        <button>submmit</button>
        <textarea id="formula" placeholder="formula"></textarea>
        <button>copy</button>
      </div>
    );
  }
}
