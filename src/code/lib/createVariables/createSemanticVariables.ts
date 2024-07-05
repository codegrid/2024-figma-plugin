import { semanticColorResource } from "../../resource/semanticColor";

interface SemanticColor {
  nameWithGroup: string;
  lightColor: VariableAlias;
  darkColor: VariableAlias;
}

async function createAlias(colorData: string): Promise<VariableAlias> {
  const localColorVariables = await figma.variables.getLocalVariablesAsync("COLOR");
  const colorVariable = localColorVariables.find((colorVariable) => {
    return colorVariable.name === colorData;
  });
  if (!colorVariable) {
    throw new Error(`Invalid color data: ${colorData}`);
  }
  return {
    type: "VARIABLE_ALIAS",
    id: colorVariable.id,
  };
}

async function loadSemanticColors(): Promise<SemanticColor[]> {
  const colors: SemanticColor[] = [];
  const resourceList = semanticColorResource.split("\n");
  let currentGroupName = "";
  for (const resourceRow of resourceList) {
    if (!resourceRow) continue;
    const [groupName, name, lightColor, darkColor] = resourceRow.split(/[\t]/);
    if (groupName) {
      currentGroupName = groupName;
    }
    const lightAlias = await createAlias(lightColor);
    const darkAlias = await createAlias(darkColor);
    colors.push({
      nameWithGroup: `${currentGroupName}/${name}`,
      lightColor: lightAlias,
      darkColor: darkAlias,
    });
  }
  return colors;
}

export async function createSemanticVariables(): Promise<void> {
  const semanticsCollection = figma.variables.createVariableCollection("Semantics");
  const lightMode = semanticsCollection.modes[0];
  semanticsCollection.renameMode(lightMode.modeId, "Light");
  semanticsCollection.addMode("Dark");
  const darkMode = semanticsCollection.modes[1];
  const semanticColors = await loadSemanticColors();

  for (const semanticColor of semanticColors) {
    const colorVariable = figma.variables.createVariable(semanticColor.nameWithGroup, semanticsCollection, "COLOR");
    colorVariable.setValueForMode(lightMode.modeId, semanticColor.lightColor);
    colorVariable.setValueForMode(darkMode.modeId, semanticColor.darkColor);
  }
}
