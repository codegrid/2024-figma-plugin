import { primitiveColorResource } from "../../resource/primitiveColor";

interface PrimitiveColor {
  name: string;
  rgbValue: RGB;
}

function loadPrimitiveColors(): PrimitiveColor[] {
  const colors: PrimitiveColor[] = [];
  const resourceList = primitiveColorResource.split("\n");
  for (const resourceRow of resourceList) {
    if (!resourceRow) continue;
    const [name, hexColor] = resourceRow.split(/[\t\s]/);
    const rgbValue = figma.util.rgb(hexColor);
    colors.push({ name, rgbValue });
  }
  return colors;
}

export function createPrimitiveVariables(): void {
  const primitivesCollection = figma.variables.createVariableCollection("Primitives");
  const modeId = primitivesCollection.modes[0].modeId;
  const primitiveColors = loadPrimitiveColors();
  for (const primitiveColor of primitiveColors) {
    const colorVariable = figma.variables.createVariable(primitiveColor.name, primitivesCollection, "COLOR");
    colorVariable.setValueForMode(modeId, primitiveColor.rgbValue);
  }
}
