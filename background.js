chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "setName",
    title: "Set Custom Name for Address/Hash",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "setName") {
    const selectedText = info.selectionText;
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: promptAndSetName,
      args: [selectedText]
    }).catch(err => console.error("Error executing script:", err));
  }
});

function promptAndSetName(selectedText) {
  const customName = prompt("Enter a custom name for this address/hash:", selectedText);
  if (customName) {
    chrome.storage.sync.set({ [selectedText]: customName }, () => {
      location.reload();
    });
  }
}