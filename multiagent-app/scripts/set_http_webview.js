const fs = require('fs');
const path = '/home/.openvscode-server/product.json';

try {
    const data = fs.readFileSync(path, 'utf8');
    const product = JSON.parse(data);

    // Force HTTP local URL
    product.webviewContentExternalBaseUrlTemplate = "http://localhost:3001/stable-{{commit}}/out/vs/workbench/contrib/webview/browser/pre/";

    // Also clear extensions gallery if needed, but focus on webview
    // product.extensionsGallery = { ... };

    fs.writeFileSync(path, JSON.stringify(product, null, 2));
    console.log('Successfully updated webviewContentExternalBaseUrlTemplate to HTTP.');
} catch (e) {
    console.error('Error modifying product.json:', e);
    process.exit(1);
}
