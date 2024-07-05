(() => {
  const createButton = document.getElementById("create");
  const replaceButton = document.getElementById("replace");
  const cancelButton = document.getElementById("cancel");

  if (!createButton || !replaceButton || !cancelButton) {
    return;
  }

  createButton.onclick = () => {
    parent.postMessage({ pluginMessage: { type: "create-variables" } }, "*");
  };

  replaceButton.onclick = () => {
    parent.postMessage({ pluginMessage: { type: "replace-variables" } }, "*");
  };

  cancelButton.onclick = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };
})();
