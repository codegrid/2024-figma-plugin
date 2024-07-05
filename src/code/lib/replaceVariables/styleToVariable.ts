import { getCurrentPageColorNodes } from "./getCurrentPageColorNodes";

type ColorNode = ReturnType<typeof getCurrentPageColorNodes>[number];

const clone = (val: unknown) => {
  return JSON.parse(JSON.stringify(val));
};

const getVariableFromStyleId = async (
  styleId: string,
  styleToVariableMapping: { [name: string]: string },
  semanticColorVariables: Variable[],
) => {
  const style = await figma.getStyleByIdAsync(styleId);
  if (!style) {
    return;
  }
  const variableName = styleToVariableMapping[style.name];
  const variable = semanticColorVariables.find((item) => item.name === variableName);
  return variable;
};

const fillMixedText = async (
  node: TextNode,
  styleToVariableMapping: { [name: string]: string },
  semanticColorVariables: Variable[],
) => {
  const fillSegments = node.getStyledTextSegments(["fills", "fillStyleId"]);
  for (const segment of fillSegments) {
    const rangeFillStyleId = node.getRangeFillStyleId(segment.start, segment.end);
    if (typeof rangeFillStyleId !== "string") {
      continue;
    }
    const fillVariable = await getVariableFromStyleId(rangeFillStyleId, styleToVariableMapping, semanticColorVariables);
    const rangeFills = node.getRangeFills(segment.start, segment.end);
    const fillsCopy = clone(rangeFills);
    fillsCopy[0] = figma.variables.setBoundVariableForPaint(
      fillsCopy[0] as SolidPaint,
      "color",
      fillVariable as Variable,
    );
    node.setRangeFills(segment.start, segment.end, fillsCopy);
  }
};

export const fillStyleToVariable = async (
  node: ColorNode,
  styleToVariableMapping: { [name: string]: string },
  semanticColorVariables: Variable[],
) => {
  if (node.fillStyleId === figma.mixed) {
    if (node.type === "TEXT") {
      fillMixedText(node, styleToVariableMapping, semanticColorVariables);
    }
    return;
  }
  const fillVariable = await getVariableFromStyleId(node.fillStyleId, styleToVariableMapping, semanticColorVariables);
  if (!fillVariable) {
    return;
  }

  const fillsCopy = clone(node.fills);
  fillsCopy[0] = figma.variables.setBoundVariableForPaint(
    fillsCopy[0] as SolidPaint,
    "color",
    fillVariable as Variable,
  );

  node.fills = fillsCopy;
};

export const strokeStyleToVariable = async (
  node: ColorNode,
  styleToVariableMapping: { [name: string]: string },
  semanticColorVariables: Variable[],
) => {
  const strokeVariable = await getVariableFromStyleId(
    node.strokeStyleId,
    styleToVariableMapping,
    semanticColorVariables,
  );
  if (!strokeVariable) {
    return;
  }

  const strokesCopy = clone(node.strokes);
  strokesCopy[0] = figma.variables.setBoundVariableForPaint(
    strokesCopy[0] as SolidPaint,
    "color",
    strokeVariable as Variable,
  );

  node.strokes = strokesCopy;
};
