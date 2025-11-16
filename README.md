# CultivateCrest - Static E-Commerce Website

A modern, fully responsive static website for CultivateCrest, built with HTML, CSS, and vanilla JavaScript. Products link directly to Amazon for purchases, with zero hosting costs using GitHub Pages.

## Features

- **Fully Static**: Pure HTML, CSS, and JavaScript - no backend required
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Amazon Integration**: All products link to Amazon for secure checkout
- **Fast & Lightweight**: Optimized for speed and performance
- **SEO Friendly**: Semantic HTML and proper meta tags
- **Product Search**: Client-side search with autocomplete
- **Mobile Menu**: Smooth drawer navigation for mobile users
- **Blog Section**: Educational content about superfoods
- **Contact Forms**: Integrated with Formspree (free tier)

## Project Structure

```
CultivateCrest_Website/
├── index.html              # Homepage
├── about.html              # About Us page
├── contact.html            # Contact page
├── blog.html               # Blog listing page
├── product-detail.html     # Product detail template
├── css/
│   ├── style.css           # Main styles & variables
│   ├── components.css      # Component styles
│   └── responsive.css      # Mobile & tablet styles
├── js/
│   ├── main.js             # General functionality
│   ├── products.js         # Product loading & display
│   ├── search.js           # Search functionality
│   └── mobile-menu.js      # Mobile navigation
├── data/
│   └── products.json       # Product data
├── images/
│   └── products/           # Product images
└── README.md
```

## Setup Instructions

### 1. Add Product Images

1. Add your product images to the `images/products/` folder
2. Update `products.json` with actual image paths
3. Replace placeholder icons with real product images in HTML

### 2. Configure Amazon Affiliate Links

1. Sign up for [Amazon Associates](https://affiliate-program.amazon.in/)
2. Get your affiliate tracking ID
3. Update product links in `data/products.json`:

```json
{
  "amazonLink": "https://www.amazon.in/dp/YOUR_PRODUCT_ID?tag=YOUR_AFFILIATE_ID"
}
```

### 3. Setup Contact Forms (Optional)

The contact and newsletter forms use Formspree for handling submissions.

1. Sign up at [Formspree.io](https://formspree.io) (free tier: 50 submissions/month)
2. Create a new form and get your endpoint URL
3. Update the endpoint in `js/main.js`:

```javascript
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';
```

**Alternative Free Form Services:**
- [Web3Forms](https://web3forms.com/) - 250 submissions/month
- [Getform](https://getform.io/) - 50 submissions/month
- [FormSubmit](https://formsubmit.co/) - Unlimited, email-based

### 4. Customize Content

1. **Update Contact Information**: Search for `+91 123-456-7890` and `info@cultivatecrest.in` and replace with your actual contact details
2. **Update WhatsApp Link**: Replace `https://wa.me/1234567890` with your WhatsApp number
3. **Add Logo**: Replace text logo with actual logo image in header
4. **Social Media Links**: Update Facebook, Instagram, Twitter URLs in footer
5. **Products**: Edit `data/products.json` to add/modify products

## GitHub Pages Deployment

### Method 1: GitHub Web Interface

1. **Create GitHub Repository**:
   - Go to [GitHub](https://github.com) and create a new repository
   - Name it `cultivatecrest-website` (or any name)
   - Keep it public (required for free GitHub Pages)

2. **Upload Files**:
   - Click "uploading an existing file"
   - Drag and drop all project files
   - Commit the changes

3. **Enable GitHub Pages**:
   - Go to repository Settings
   - Scroll to "Pages" section
   - Source: Select "main" branch
   - Folder: Select "/ (root)"
   - Click Save

4. **Access Your Site**:
   - Your site will be available at: `https://yourusername.github.io/repository-name/`
   - It may take 2-5 minutes to deploy

### Method 2: Command Line (Git)

```bash
# Navigate to project directory
cd CultivateCrest_Website

# Initialize Git repository
git init

# Add all files
git add .

# Commit files
git commit -m "Initial commit: CultivateCrest website"

# Add remote repository (replace with your repo URL)
git remote add origin https://github.com/yourusername/repository-name.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Then enable GitHub Pages in repository settings as described above.

## Custom Domain Setup

To use your own domain (cultivatecrest.in):

1. **Add CNAME file**:
   ```bash
   echo "cultivatecrest.in" > CNAME
   git add CNAME
   git commit -m "Add custom domain"
   git push
   ```

2. **Configure DNS** (at your domain registrar):
   - Add A records pointing to GitHub Pages IPs:
     - `185.199.108.153`
     - `185.199.109.153`
     - `185.199.110.153`
     - `185.199.111.153`
   - Or add CNAME record: `yourusername.github.io`

3. **Enable HTTPS** (in GitHub Pages settings):
   - Check "Enforce HTTPS"
   - Wait for SSL certificate generation

## Product Management

### Adding New Products

Edit `data/products.json`:

```json
{
  "id": 13,
  "name": "Your Product Name",
  "category": "seeds",
  "price": 299,
  "originalPrice": 499,
  "description": "Product description here",
  "icon": "fa-seedling",
  "amazonLink": "https://www.amazon.in/dp/YOUR_PRODUCT",
  "variants": ["250g", "500g"],
  "benefits": [
    "Benefit 1",
    "Benefit 2"
  ]
}
```

### Updating Product Prices

Simply edit the `price` and `originalPrice` fields in `products.json`. Changes reflect immediately after refreshing the page.

### Categories

Current categories:
- `seeds` - Seeds (chia, flax, pumpkin, etc.)
- `dry-fruits` - Dry fruits (almonds, cashews, etc.)
- `combo` - Combo packs

Add new categories as needed.

## Performance Optimization

### Image Optimization

1. Compress images using:
   - [TinyPNG](https://tinypng.com/)
   - [ImageOptim](https://imageoptim.com/)
   - [Squoosh](https://squoosh.app/)

2. Use WebP format for better compression:
   ```html
   <picture>
     <source srcset="image.webp" type="image/webp">
     <img src="image.jpg" alt="Product">
   </picture>
   ```

### Minification

Minify CSS and JS files for production:
- [CSS Minifier](https://cssminifier.com/)
- [JavaScript Minifier](https://javascript-minifier.com/)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Cost Breakdown

**Total Monthly Cost: ₹0** 🎉

- Hosting: GitHub Pages (FREE)
- Forms: Formspree free tier (FREE - 50/month)
- Domain: Point existing domain to GitHub Pages (NO ADDITIONAL COST)
- SSL: GitHub Pages automatic HTTPS (FREE)

**Revenue**: Earn 4-10% commission on Amazon sales through affiliate links

## Maintenance

### Regular Updates

1. **Update Products**: Edit `products.json` monthly
2. **Add Blog Posts**: Add new articles to `blog.html`
3. **Monitor Forms**: Check Formspree dashboard for submissions
4. **Update Affiliate Links**: Refresh Amazon product links if needed

### Analytics (Optional)

Add Google Analytics to track visitors:

1. Get tracking code from [Google Analytics](https://analytics.google.com)
2. Add before closing `</head>` tag in all HTML files:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## Troubleshooting

### Products Not Loading

- Check browser console for errors (F12)
- Verify `products.json` is valid JSON
- Ensure file paths are correct (case-sensitive on Linux)

### Forms Not Working

- Verify Formspree endpoint is correct
- Check Formspree dashboard for errors
- Test with different email addresses

### GitHub Pages Not Updating

- Check GitHub Actions tab for build status
- Clear browser cache (Ctrl+Shift+R)
- Wait 5-10 minutes for changes to propagate

## Support

For issues or questions:
- Open an issue on GitHub repository
- Check browser console for JavaScript errors
- Verify all file paths are correct

## License

This project is created for CultivateCrest. Modify and use as needed.

---

**Built with ❤️ using HTML, CSS, and JavaScript**

**Zero backend. Zero cost. Maximum performance.**
