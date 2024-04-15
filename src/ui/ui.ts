(() => {
  const createButton = document.getElementById("create");
  const cancelButton = document.getElementById("cancel");

  if (!createButton || !cancelButton) {
    return;
  }

  createButton.onclick = () => {
    parent.postMessage({ pluginMessage: { type: "create-variables" } }, "*");
  };

  cancelButton.onclick = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };
})();
