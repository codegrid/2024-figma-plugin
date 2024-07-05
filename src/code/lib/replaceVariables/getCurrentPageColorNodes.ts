export const getCurrentPageColorNodes = () => {
  return figma.currentPage.findAllWithCriteria({
    types: [
      // "COMPONENT", コンポーネント
      // "ELLIPSE", 楕円
      "FRAME",
      // "LINE", // 線
      // "POLYGON", // 多角形
      // "RECTANGLE", // 長方形
      "TEXT",
    ],
  });
};
