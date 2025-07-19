# Footer Component System

## Overview
The footer is now implemented as a reusable component that loads automatically on all pages.

## Files
- `components/footer.html` - The actual footer HTML content
- `components/footer.js` - Footer loading logic (integrated into script.js)
- `script.js` - Main script that includes the footer loader

## How It Works
1. Each HTML page has an empty `<footer></footer>` placeholder
2. When the page loads, `script.js` automatically fetches `components/footer.html`
3. The footer content is dynamically inserted into the placeholder

## Benefits
- ✅ **Single source of truth**: Update footer in one place (`components/footer.html`)
- ✅ **Consistent across all pages**: No risk of footer differences
- ✅ **Easy maintenance**: Change footer content without editing every HTML file
- ✅ **Fallback support**: If component fails to load, existing footer remains
- ✅ **SEO-friendly**: Footer content loads and is indexable

## Making Changes
To update the footer text, LinkedIn URL, or styling:
1. Edit `components/footer.html`
2. The changes will automatically appear on all pages

## Local Development
When developing locally, serve files through a web server (not file:// protocol) so the fetch() works:
```bash
python3 -m http.server 3000
```

## File Structure
```
/
├── components/
│   ├── footer.html    # Footer content
│   └── footer.js      # Footer loader (integrated into script.js)
├── script.js          # Main JavaScript (includes footer loading)
└── *.html            # All pages with footer placeholders
```
