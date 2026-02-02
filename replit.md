# Shopify Theme

## Overview
This is a Shopify theme project containing Liquid templates, JSON configuration, and static assets. The theme is designed to be deployed to a Shopify store.

## Project Structure
- `layout/` - Main theme layout files (theme.liquid, password.liquid)
- `sections/` - Shopify section templates
- `snippets/` - Reusable Liquid snippets
- `templates/` - Page template JSON files
- `assets/` - JavaScript, CSS, and image assets
- `locales/` - Translation files (multiple languages)
- `config/` - Theme settings and schema

## Development Server
The project includes a simple Node.js file browser (`server.js`) that runs on port 5000 to preview and browse theme files.

## Deployment
This theme must be deployed to a Shopify store using:
1. Shopify Admin (upload as ZIP)
2. Shopify CLI (`shopify theme push`)
3. GitHub integration in Shopify

## Key Files
- `server.js` - Development file browser
- `layout/theme.liquid` - Main theme layout
- `config/settings_schema.json` - Theme settings configuration
