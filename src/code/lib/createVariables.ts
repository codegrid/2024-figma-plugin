export function createVariables() {
  // Primitives
  const primitivesCollection = figma.variables.createVariableCollection("Primitives");
  const whiteVariable = figma.variables.createVariable("white", primitivesCollection, "COLOR");
  const blackVariable = figma.variables.createVariable("black", primitivesCollection, "COLOR");
  const modeId = primitivesCollection.modes[0].modeId;
  whiteVariable.setValueForMode(modeId, {
    r: 1,
    g: 1,
    b: 1,
    a: 1,
  });
  blackVariable.setValueForMode(modeId, {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
  });

  // Semantics
  const semanticsCollection = figma.variables.createVariableCollection("Semantics");
  const lightMode = semanticsCollection.modes[0];
  semanticsCollection.renameMode(lightMode.modeId, "Light");
  semanticsCollection.addMode("Dark");
  const darkMode = semanticsCollection.modes[1];

  const textDefaultVariable = figma.variables.createVariable("text-default", semanticsCollection, "COLOR");
  textDefaultVariable.setValueForMode(lightMode.modeId, {
    type: "VARIABLE_ALIAS",
    id: blackVariable.id,
  });
  textDefaultVariable.setValueForMode(darkMode.modeId, {
    type: "VARIABLE_ALIAS",
    id: whiteVariable.id,
  });

  const backgroundVariable = figma.variables.createVariable("background", semanticsCollection, "COLOR");
  backgroundVariable.setValueForMode(lightMode.modeId, {
    type: "VARIABLE_ALIAS",
    id: whiteVariable.id,
  });
  backgroundVariable.setValueForMode(darkMode.modeId, {
    type: "VARIABLE_ALIAS",
    id: blackVariable.id,
  });
}
