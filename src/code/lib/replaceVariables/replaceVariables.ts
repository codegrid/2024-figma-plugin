import { COLOR_SEMANTICS } from "../../constants/collectionNames";
import { semanticColorReplaceStyle } from "../../resource/semanticColorReplaceStyle";
import { fillStyleToVariable, strokeStyleToVariable } from "./styleToVariable";
import { getCurrentPageColorNodes } from "./getCurrentPageColorNodes";

const loadStyleNameToVariableNameMapping = () => {
  const mappings: { [styleName: string]: string } = {};
  const replaceStyles = semanticColorReplaceStyle.split("\n");
  for (const replaceStyle of replaceStyles) {
    const [styleName, variableName] = replaceStyle.split(/[\t]/);
    if (!styleName) continue;
    mappings[styleName] = variableName;
  }
  return mappings;
};

const loadSemanticColorVariables = async () => {
  const localVariables = await figma.variables.getLocalVariablesAsync();
  const semanticColorVariables: Variable[] = [];
  for (const variable of localVariables) {
    const variableCollection = await figma.variables.getVariableCollectionByIdAsync(variable.variableCollectionId);
    if (!variableCollection?.name) continue;
    if (variableCollection.name !== COLOR_SEMANTICS) continue;
    semanticColorVariables.push(variable);
  }
  return semanticColorVariables;
};

const replaceStyleToColorVariables = async (
  styleNameToVariableNameMapping: { [styleName: string]: string },
  semanticColorVariables: Variable[],
) => {
  const colorNodes = getCurrentPageColorNodes();
  for (const node of colorNodes) {
    if (node.strokeStyleId) {
      await strokeStyleToVariable(node, styleNameToVariableNameMapping, semanticColorVariables);
    }
    if (node.fillStyleId) {
      await fillStyleToVariable(node, styleNameToVariableNameMapping, semanticColorVariables);
    }
  }
};

export const replaceVariables = async () => {
  const styleNameToVariableNameMapping = loadStyleNameToVariableNameMapping();
  const semanticColorVariables = await loadSemanticColorVariables();
  const rootChildren = figma.root.children;
  for (const page of rootChildren) {
    await page.loadAsync();
    await figma.setCurrentPageAsync(page);
    await replaceStyleToColorVariables(styleNameToVariableNameMapping, semanticColorVariables);
  }

  return true;
};
