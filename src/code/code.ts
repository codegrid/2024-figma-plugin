import { COLOR_PRIMITIVES, COLOR_SEMANTICS } from "./constants/collectionNames";
import { createPrimitiveVariables } from "./lib/createPrimitiveVariables";
import { createSemanticVariables } from "./lib/createSemanticVariables";
import { getDuplicateCollectionNames } from "./lib/getDuplicateCollectionNames";

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
  figma.closePlugin();
};
