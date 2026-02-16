const fs = require('fs');
const path = '/home/.openvscode-server/product.json';

try {
    const data = fs.readFileSync(path, 'utf8');
    const product = JSON.parse(data);

    if (product.webviewContentExternalBaseUrlTemplate) {
        console.log('Removing webviewContentExternalBaseUrlTemplate...');
        delete product.webviewContentExternalBaseUrlTemplate;
        fs.writeFileSync(path, JSON.stringify(product, null, 2));
        console.log('Successfully removed CDN configuration.');
    } else {
        console.log('Configuration not found or already removed.');
    }
} catch (e) {
    console.error('Error modifying product.json:', e);
    process.exit(1);
}
