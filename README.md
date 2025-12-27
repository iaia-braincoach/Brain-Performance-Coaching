# Iaia Brain Coaching Website

## Project Description
This is a professional website for Iaia Colella, a Brain Performance Coach specializing in helping athletes optimize their mental performance. The site showcases coaching services, the 8-Dimension Assessment method, client testimonials, and provides essential legal pages (Privacy Policy, Terms & Conditions, Cookies Policy).

Built with modern web standards, the site features responsive design, smooth animations, interactive elements, and GDPR-compliant cookie consent management.

## Features
- **Responsive Design**: Fully responsive layout that works on desktop, tablet, and mobile devices.
- **Interactive Elements**: Testimonials carousel, service modals, mobile navigation menu, and smooth scrolling.
- **Cookie Consent**: Comprehensive cookie banner with detailed management modal, supporting analytics, personalization, and advertising preferences.
- **Personalization**: Dynamic content based on user cookie preferences (e.g., personalized welcome pop-ups).
- **SEO Optimized**: Proper meta tags, semantic HTML, and accessible navigation.
- **Performance Focused**: Optimized images, lazy loading, and efficient CSS/JS.

## Project Structure
```
iaiabraincoaching/
├── index.html                    # Main homepage with all sections
├── assets/
│   ├── pages/                    # Subpages
│   │   ├── terms-conditions.html
│   │   ├── privacy-policy.html
│   │   └── cookies-policy.html
│   ├── images/                   # All image assets
│   ├── fonts/                    # Custom fonts (CODE_Bold, CODE_Light)
│   └── data/
│       └── testimonials.json     # Testimonials data for carousel
├── css/
│   ├── style.css                 # Main stylesheet with responsive design
│   └── swiper-bundle.min.css     # Swiper library for testimonials
├── js/
│   ├── main.js                   # Main JavaScript for interactions, cookie consent, etc.
│   └── swiper-bundle.min.js      # Swiper library JavaScript
├── CNAME                         # Custom domain configuration
└── README.md                     # This file
```

## Technologies Used
- **HTML5**: Semantic markup for structure and accessibility.
- **CSS3**: Custom properties (CSS variables), Flexbox, Grid, animations, and responsive design.
- **JavaScript (ES6+)**: DOM manipulation, event handling, cookie management, and dynamic content loading.
- **Libraries**:
  - Swiper.js: For the testimonials carousel.
  - EmailJS: For contact form submissions.
  - Font Awesome & Remixicon: For icons.
- **Tools**: Local development with Python HTTP server.

## Setup Instructions

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge).
- Python 3 installed (for local server).

### Installation
1. **Clone the Repository**
   ```bash
   git clone https://github.com/ksaesthetix/iaiabraincoaching.git
   cd iaiabraincoaching
   ```

2. **Run Local Server**
   Start a local HTTP server to serve the files (necessary for proper asset loading and cookie functionality):
   ```bash
   python3 -m http.server 8000
   ```

3. **View the Website**
   Open your browser and navigate to `http://localhost:8000` to view the homepage.
   - Subpages: `http://localhost:8000/assets/pages/terms-conditions.html`, etc.

### Development
- **Edit Styles**: Modify `css/style.css` for visual changes.
- **Add Functionality**: Update `js/main.js` for new features.
- **Update Content**: Edit HTML files and `assets/data/testimonials.json` for content changes.
- **Images**: Add new images to `assets/images/` and update references in HTML/CSS.

## Cookie Consent System
The site includes a comprehensive cookie management system:
- **Banner**: Appears on first visit with options to Accept All, Reject, or Manage.
- **Modal**: Detailed preferences for Performance/Analytics, Personalization, and Advertising.
- **Persistence**: Preferences stored in localStorage and applied across sessions.
- **Integration**: Conditionally loads Google Analytics and other scripts based on consent.

To test:
1. Clear browser localStorage.
2. Reload the page to see the banner.
3. Use the modal to set preferences.

## Deployment
- The site is configured for GitHub Pages with a custom domain via `CNAME`.
- Ensure all assets are committed and push to the `main` branch.
- For other hosting, upload all files maintaining the directory structure.

## Contributing
1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Make changes and test locally.
4. Commit: `git commit -m 'Add feature'`.
5. Push and create a pull request.

## License
This project is proprietary. All rights reserved.

## Contact
For inquiries about the coaching services, contact Iaia Colella via the website's contact form or email.

Link: `http://brainperformancecoaching.com/`

---
*Built with ❤️ for peak mental performance.*