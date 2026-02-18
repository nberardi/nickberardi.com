# nickberardi.com

Nick Berardi's personal blog, migrated from Ghost 0.5.7 to Hugo with the PaperMod theme.

## Stats

- **Posts:** 327 (2007-2014)
- **Tags:** 394
- **Images:** 1,468 files
- **Generator:** Hugo
- **Theme:** PaperMod
- **Hosting:** GitHub Pages

## Migration

This site was migrated from Ghost 0.5.7 using a custom Python script that:
- Converted HTML content to Markdown
- Preserved all metadata (dates, tags, descriptions)
- Maintained original URL structure for backward compatibility
- Migrated all images to static assets

## Development

```bash
# Install dependencies
brew install hugo

# Run local server
hugo server -D

# Build production site
hugo --minify
```

## Deployment

Automatic deployment via GitHub Actions on push to `main` branch.

## Custom Domain

Configured for `nickberardi.com` (DNS records need to be updated separately).

## License

Content © Nick Berardi
