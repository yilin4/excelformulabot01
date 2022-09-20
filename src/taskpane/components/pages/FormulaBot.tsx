import * as React from "react";

///* global console */
const content = JSON.stringify({
  model: "code-davinci-002",
  prompt:
    'Provide the Excel formulas for the following prompts:\n\nPrompt:Concatenate all duplicate cell values from column A into a single cell separated by \', \'.\nFormula:=TEXTJOIN(", ",TRUE,IF(COUNTIF(A:A,A:A)>1,A:A,""))\n\nPrompt:sum of column b when column a starts with "hello".\nFormula:=SUMIFS(B:B,A:A,"hello*")\n\nPrompt:\nFormula:NA\nPrompt:sum of column c\nFormula:',
  temperature: 0,
  max_tokens: 300,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  stop: ["Prompt:", "\n"],
});
export default class FormulaBot extends React.Component {
  constructor(props) {
    super(props);
    this.state = { formula: "" };
  }

  async onSubmit() {
    // eslint-disable-next-line no-undef
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "post",
      body: content,
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + "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",
      }),
    }).then((res) => res.json());
    this.setState({ formula: response.choices[0].text });
  }

  render() {
    return (
      <div>
        <textarea id="description" placeholder="input your description"></textarea>
        <button onClick={this.onSubmit}>submmit</button>
        <textarea id="formula" placeholder="formula">
          {this.state}
        </textarea>
        <button>copy</button>
      </div>
    );
  }
}
