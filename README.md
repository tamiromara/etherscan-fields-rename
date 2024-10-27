# Etherscan Fields Rename Chrome Extension

A Chrome extension that enhances your experience on Etherscan by allowing you to assign custom names to Ethereum addresses and contract hashes. This makes it easier to identify and navigate addresses and contracts on the Etherscan.

> [!NOTE]
> This extension has been developed with the extensive help of Chatgpt. This is my first time developing an extension. I therefore hope others would be inspired to contribute back to the extension by adding functionalities, fixing issues, and enhacing UI/UX.

## Features :

- Replace Ethereum addresses and contract hashes with custom names on Etherscan pages.
- Customize both full and abbreviated address formats.
- Easy-to-use context menu for assigning custom names directly on the page.
- Option to reset and clear all custom names.
  <br><br>

## Installation :

1. Clone the repository or download the ZIP file.

```bash
Copy code
git clone https://github.com/tamiromara/sepolia-etherscan-fields-rename.git
```

2. Open Chrome and go to chrome://extensions.
3. Enable Developer mode (toggle on at the top right).
4. Click Load unpacked and select the folder containing the extension files.
   <br><br>

## Usage :

1. Visit any Etherscan page.
2. Right-click on an Ethereum address or contract hash and choose Set Custom Name.
3. Enter your desired name, and the page will refresh to display your custom name in place of the original address or hash.
   <br><br>

## Customizing for Sepolia Etherscan or Mainnet Etherscan :

To use this extension on either the mainnet or Sepolia Etherscan domains, follow these steps:

1. Open the manifest.json file in the extension’s directory.
2. Locate the "permissions" section, specifically the host permissions:

```json
"permissions": [
"contextMenus",
"storage",
"scripting",
"https://etherscan.io/*",
"https://sepolia.etherscan.io/*"
],
```

3. To enable the extension for Sepolia Etherscan only, replace or remove the mainnet domain:

```json
"https://sepolia.etherscan.io/*"
```

For mainnet, use:

```json
"https://etherscan.io/*"
```

4. Save the changes to manifest.json and reload the extension on the Chrome Extensions page (chrome://extensions).
   <br><br>

## License :

This project is licensed under the MIT License with attribution. <br>[See the LICENSE file for details](LICENSE).
<br><br>

## Privacy :

Read the privacy policy [here](privacy-policy.md).

<br><br><br>
[Back to top](#etherscan-fields-rename-chrome-extension)
