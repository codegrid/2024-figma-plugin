export const getDuplicateCollectionNames = async (collectionNames: string[]) => {
  const variableCollections = await figma.variables.getLocalVariableCollectionsAsync();
  return collectionNames.filter((name) => {
    return variableCollections.some((item) => {
      return item.name === name;
    });
  });
};
