(() => {
  const createButton = document.getElementById("create");
  const cancelButton = document.getElementById("cancel");
  const textbox = document.getElementById("count") as HTMLInputElement;

  if (!createButton || !cancelButton || !textbox) {
    return;
  }

  createButton.onclick = () => {
    const count = parseInt(textbox.value, 10);
    parent.postMessage({ pluginMessage: { type: "create-rectangles", count } }, "*");
  };

  cancelButton.onclick = () => {
    parent.postMessage({ pluginMessage: { type: "cancel" } }, "*");
  };
})();
