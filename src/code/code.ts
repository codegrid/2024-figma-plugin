import { createVariables } from "./lib/createVariables";

figma.showUI(__html__);

figma.ui.onmessage = (msg: { type: string; count: number }) => {
  if (msg.type === "create-variables") {
    createVariables();
  }
  figma.closePlugin();
};
