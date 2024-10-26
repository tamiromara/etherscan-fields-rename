function replaceText(element, fullAddress, replacementText) {
  const shortAddressPattern = `${fullAddress.slice(0, 10)}[.…]{1,3}${fullAddress.slice(-8)}`;
  const regexFull = new RegExp(escapeRegExp(fullAddress), "gi");
  const regexShort = new RegExp(shortAddressPattern, "gi");

  if (element.nodeType === Node.TEXT_NODE) {
    if (regexFull.test(element.nodeValue) || regexShort.test(element.nodeValue)) {
      element.nodeValue = element.nodeValue
        .replace(regexFull, replacementText)
        .replace(regexShort, replacementText);
    }
  } else if (element.nodeType === Node.ELEMENT_NODE) {
    Array.from(element.childNodes).forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        const newText = child.nodeValue
          .replace(regexFull, replacementText)
          .replace(regexShort, replacementText);
        if (newText !== child.nodeValue) {
          child.nodeValue = newText;
        }
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        replaceText(child, fullAddress, replacementText);
      }
    });
  }
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function applyReplacements() {
  chrome.storage.sync.get(null, (replacements) => {
    if (Object.keys(replacements).length > 0) {
      Object.entries(replacements).forEach(([fullAddress, customName]) => {
        replaceText(document.body, fullAddress, customName);
      });
      
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.type === 'childList' || mutation.type === 'characterData') {
            Object.entries(replacements).forEach(([fullAddress, customName]) => {
              replaceText(mutation.target, fullAddress, customName);
            });
          }
        });
      });

      observer.observe(document.body, { childList: true, subtree: true, characterData: true });
    }
  });
}

applyReplacements();

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync') {
    applyReplacements();
  }
});