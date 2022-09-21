import * as React from "react";

/* global console, Excel */

interface IState {
  formula: string;
}

export default class FormulaBot extends React.Component<{}, IState> {
  constructor(props) {
    super(props);
    this.state = { formula: "" };
  }

  async onSubmit() {
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.getSelectedRange();
        range.load("values");
        await context.sync();
        const values = range.values[0][0] as string;
        console.log(values);
        const message =
          'Provide the Excel formulas for the following prompts:\n\nPrompt:Concatenate all duplicate cell values from column A into a single cell separated by \', \'.\nFormula:=TEXTJOIN(", ",TRUE,IF(COUNTIF(A:A,A:A)>1,A:A,""))\n\nPrompt:sum of column b when column a starts with "hello".\nFormula:=SUMIFS(B:B,A:A,"hello*")\n\nPrompt:\nFormula:NA\nPrompt:' +
          values +
          "\nFormula:";
        const content = JSON.stringify({
          model: "code-davinci-002",
          prompt: message,
          temperature: 0,
          max_tokens: 300,
          top_p: 1,
          frequency_penalty: 0,
          presence_penalty: 0,
          stop: ["Prompt:", "\n"],
        });
        // eslint-disable-next-line no-undef
        const response = await fetch("https://api.openai.com/v1/completions", {
          method: "post",
          body: content,
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: "Bearer " + "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",
          }),
        }).then((res) => res.json());
        range.values = [[response.choices[0].text]];
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <div>
        {/* <textarea id="description" placeholder="input your description"></textarea> */}
        <button onClick={this.onSubmit}>submmit</button>
        {/* <textarea id="formula">{this.state.formula}</textarea> */}
        {/* <button>copy</button> */}
      </div>
    );
  }
}
