/*
Create all the context menu items.
*/
browser.contextMenus.create({
  id: "llOpenLocalLink",
  title: browser.i18n.getMessage("llOpenLocalLink"),
  contexts: ["link"]
});

browser.contextMenus.create({
  parentId: "llOpenLocalLink",
  id: "llOpenInThisTab",
  title: browser.i18n.getMessage("llOpenInThisTab"),
  contexts: ["link"]
});

browser.contextMenus.create({
  parentId: "llOpenLocalLink",
  id: "llOpenInNewTab",
  title: browser.i18n.getMessage("llOpenInNewTab"),
  contexts: ["link"]
});

browser.contextMenus.create({
  parentId: "llOpenLocalLink",
  id: "llOpenInNewWindow",
  title: browser.i18n.getMessage("llOpenInNewWindow"),
  contexts: ["link"]
});

/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
browser.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "llOpenInThisTab":
      browser.tabs.update({url: info.linkUrl}); // openLinkInThisTab(event)
      break;
    case "llOpenInNewTab":
      browser.tabs.create({url: info.linkUrl}); // openLinkInNewTab(event)
      break;
    case "llOpenInNewWindow":
      window.open(info.linkUrl, "_blank"); // openLinkInNewWindow(event)
      break;
  }
});
