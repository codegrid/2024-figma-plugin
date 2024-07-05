import { COLOR_PRIMITIVES, COLOR_SEMANTICS } from "./constants/collectionNames";

import { createPrimitiveVariables } from "./lib/createVariables/createPrimitiveVariables";
import { createSemanticVariables } from "./lib/createVariables/createSemanticVariables";
import { getDuplicateCollectionNames } from "./lib/createVariables/getDuplicateCollectionNames";

import { replaceVariables } from "./lib/replaceVariables/replaceVariables";

figma.showUI(__html__);

figma.ui.onmessage = async (msg: { type: string; count: number }) => {
  if (msg.type === "create-variables") {
    const COLLECTION_NAMES = [COLOR_PRIMITIVES, COLOR_SEMANTICS];
    const duplicateCollectionNames = await getDuplicateCollectionNames(COLLECTION_NAMES);
    if (duplicateCollectionNames.length > 0) {
      figma.notify(`コレクション：${duplicateCollectionNames.join(", ")} が既に存在しています。`, {
        timeout: 5000,
        error: true,
      });
      return;
    }
    createPrimitiveVariables();
    await createSemanticVariables();
  }

  if (msg.type === "replace-variables") {
    await replaceVariables();
  }

  figma.closePlugin();
};
