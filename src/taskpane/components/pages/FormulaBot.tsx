import * as React from "react";
import { DefaultButton, IStackTokens, Stack } from "@fluentui/react";
import { Consult } from "../interfaces";

/* global console, Excel */

const prefixForGenerate =
  'Provide the Excel formulas for the following prompts:\n\nPrompt:Concatenate all duplicate cell values from column A into a single cell separated by \', \'.\nFormula:=TEXTJOIN(", ",TRUE,IF(COUNTIF(A:A,A:A)>1,A:A,""))\n\nPrompt:sum of column b when column a starts with "hello".\nFormula:=SUMIFS(B:B,A:A,"hello*")\n\nPrompt:\nFormula:NA\nPrompt:';
const sufixForGenerate = "\nFormula:";
const prefixForTranslate =
  'Describe the Excel formula below:\n\nFormula:=TEXTJOIN(", ",TRUE,IF(COUNTIF(A:A,A:A)>1,A:A,""))\nDescription:Concatenate all duplicate cell values from column A into a single cell separated by \', \'.\n\nFormula:=IF(ISBLANK(A1),24,ROUND(A1,0))\nDescription:If cell A1 is blank, return 24. If cell A1 is not blank, round the value in cell A1 to the nearest whole number.\n\nnFormula:';
const sufixForTranslate = "Description:";

interface IState {
  formula: string;
}

interface IProps {
  addToHistory;
  history: Consult[];
}

export default class FormulaBot extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = { formula: "" };
  }

  async onSubmit(prefix, sufix) {
    try {
      await Excel.run(async (context) => {
        const range = context.workbook.getSelectedRange();
        range.load("values");
        await context.sync();
        const input = range.values[0][0] as string;
        const message = prefix + input + sufix;
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
        const output = [[response.choices[0].text]];
        range.values = output;
        this.props.addToHistory(input, output);
      });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    const stackTokens: IStackTokens = { childrenGap: 40 };
    return (
      <div>
        <Stack horizontal tokens={stackTokens}>
          <DefaultButton
            text="generate formula"
            onClick={() => this.onSubmit(prefixForGenerate, sufixForGenerate)}
            allowDisabledFocus
          />
          <DefaultButton
            text="translate formula"
            onClick={() => this.onSubmit(prefixForTranslate, sufixForTranslate)}
            allowDisabledFocus
          />
        </Stack>
      </div>
    );
  }
}
