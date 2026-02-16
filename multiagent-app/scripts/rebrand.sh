#!/bin/sh
# script/rebrand.sh
# Run this inside the Docker container to apply aggressive rebranding

TARGET="/home/.openvscode-server"

echo "Starting aggressive rebranding in $TARGET..."

# Replace "Visual Studio Code" -> "Alloy IDE"
echo "Replacing 'Visual Studio Code'..."
find "$TARGET" -type f \( -name "*.js" -o -name "*.json" -o -name "*.html" \) -exec sed -i 's/Visual Studio Code/Alloy IDE/g' {} +

# Replace "VS Code" -> "Alloy"
echo "Replacing 'VS Code'..."
find "$TARGET" -type f \( -name "*.js" -o -name "*.json" -o -name "*.html" \) -exec sed -i 's/VS Code/Alloy/g' {} +

# Replace "Code - OSS" -> "Alloy IDE"
echo "Replacing 'Code - OSS'..."
find "$TARGET" -type f \( -name "*.js" -o -name "*.json" -o -name "*.html" \) -exec sed -i 's/Code - OSS/Alloy IDE/g' {} +

# Replace "OpenVSCode Server" -> "Alloy IDE" (Cover leftovers)
echo "Replacing 'OpenVSCode Server'..."
find "$TARGET" -type f \( -name "*.js" -o -name "*.json" -o -name "*.html" \) -exec sed -i 's/OpenVSCode Server/Alloy IDE/g' {} +

# Re-apply strict branding to product.json
sed -i 's/"nameShort": ".*"/"nameShort": "Alloy"/g' "$TARGET/product.json"
sed -i 's/"nameLong": ".*"/"nameLong": "Alloy IDE"/g' "$TARGET/product.json"
sed -i 's/"applicationName": ".*"/"applicationName": "alloy"/g' "$TARGET/product.json"

# Fix Mixed Content: Force Webviews to use HTTP Localhost
sed -i 's/"nameShort": "Alloy"/"nameShort": "Alloy", "webviewContentExternalBaseUrlTemplate": "http:\/\/localhost:3001\/stable-{{commit}}\/out\/vs\/workbench\/contrib\/webview\/browser\/pre\/"/g' "$TARGET/product.json"

echo "Rebranding complete! Please restart the container."
