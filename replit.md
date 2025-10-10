# Portfolio Website - Project Documentation

## Overview

This is a personal portfolio website for Sasidhar Chintapalli, built as a single-page application (SPA) using vanilla HTML, CSS (Tailwind), and JavaScript. The site showcases professional experience, education, certifications, projects, and blog posts. It dynamically fetches data from external APIs (GitHub and Medium) to display the latest projects and articles.

## Recent Changes

**October 9, 2025:**
- Created complete portfolio website with teal (#14B8A6), orange (#F97316), and white color scheme
- Implemented all sections: hero, about, experience, education, certifications, projects, blog, and contact
- Added mobile-responsive navigation with hamburger menu toggle
- Integrated GitHub API to fetch repositories from 'codersasi' username
- Integrated Medium RSS feed to display articles from 'sasidharc' username
- Added security improvements: rel="noopener noreferrer" to all external links
- Enhanced error handling with response.ok checks in fetch calls
- Configured Python HTTP server workflow for local development
- **Material Design Update**: Applied Material Design principles with elevated cards, shadow effects, and light gray background
- Changed background to light grayish (bg-gray-100) for better visual hierarchy
- Added shadow-lg and shadow-xl effects to all cards with hover transitions
- Updated all sections to use white elevated cards with rounded corners
- **Teal Color Update**: Changed primary color from blue to teal (#14B8A6) for a fresh, modern look
- **Custom Favicon**: Created SVG favicon with "SC" initials in teal color
- **Section Titles Update**: Changed all section titles to dark gray (text-gray-900) for better readability and visual hierarchy
- **Production-Ready Tailwind**: Replaced CDN version with compiled Tailwind CSS v4 for production deployment
  - Installed Tailwind CSS v4 and @tailwindcss/cli via npm
  - Created custom theme with teal and orange colors using @theme directive
  - Set up build scripts: `npm run build:css` for production, `npm run watch:css` for development
  - Generated optimized, minified CSS file (16KB) at css/output.css
  - Updated .gitignore to exclude node_modules
  - Removed CDN warning from browser console
- Updated README.md with professional layout, badges, links, build instructions, and GitHub Pages deployment guide
- **Multi-Page Architecture**: Created separate experience.html page for professional experience and education
  - Moved professional experience and education sections to dedicated page
  - Updated navigation on both pages to link to Experience & Education page
  - Added Professional Journey header to experience page
- **Enhanced Hero Section**: Redesigned hero section with richer content
  - Added detailed role description and experience summary
  - Added "Key Achievements" card with three highlight points
  - Added two CTA buttons: "View My Work" and "My Experience"
  - Improved responsive layout with side-by-side content on desktop
- **Redesigned Projects Section**: Transformed projects into image-based cards
  - Implemented alternating left/right layout for visual interest
  - Added GitHub OpenGraph images for each project
  - Enhanced project cards with larger format and better spacing
  - Improved button styling with arrow icon

**October 10, 2025:**
- **Color Scheme Refinement**: Updated to more subtle and professional palette
  - Changed primary teal from #14B8A6 to #5EBBAD (softer, more subtle)
  - Changed navbar from teal to dark gray (#1F2937) for better contrast with light background
  - Updated navbar color across all pages (index.html, experience.html, contact.html)
- **Hero Section Simplification**: Removed CTA buttons ("View My Work" and "My Experience")
  - Navigation only accessible through top navbar
  - Cleaner, more focused hero design
- **Section Reordering**: Restructured content hierarchy
  - New order: Hero → Projects → About → Blog → Certifications
  - Projects now appear immediately after hero section for better impact
  - Certifications moved to end as supporting credentials
- **Contact Page**: Created separate contact.html page
  - Full contact form with name, email, subject, and message fields
  - Contact information and social media links
  - Updated all navigation menus to link to contact.html
- **Dynamic About Me**: Made About Me content editable via markdown file
  - Created aboutme.md for easy content updates
  - Added loadAboutMe() function in script.js to fetch and parse markdown
  - Simple markdown parser extracts bio and skills from aboutme.md
  - About section now dynamically populates from aboutme.md on page load
- **Script.js Improvements**: Added null checks to prevent runtime errors
  - fetchGitHubProjects(), fetchMediumArticles(), and loadAboutMe() check for element existence
  - Prevents errors on pages without specific sections (e.g., contact.html)
  - All pages now load cleanly without JavaScript errors

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- Vanilla HTML5 for structure
- Tailwind CSS v4 (compiled production build) for styling and responsive design
- Vanilla JavaScript for dynamic content and API interactions
- Font Awesome 6.4.0 for icons
- Node.js (for Tailwind CLI and build process)

**Design Pattern:**
- Single-page application with section-based navigation
- Mobile-first responsive design with sticky navigation
- Dynamic content loading via async/await patterns

**Color Scheme:**
- Primary: Teal (#5EBBAD) - Subtle, professional shade
- Secondary: Orange (#F97316)
- Navbar: Dark Gray (#1F2937)
- Accent: White (#FFFFFF)

### Responsive Design

**Navigation System:**
- Sticky top navigation bar
- Desktop: Horizontal menu
- Mobile: Hamburger menu with toggle functionality
- Smooth scrolling to sections using anchor links

### Dynamic Content Loading

**GitHub Integration:**
- Fetches latest 6 repositories sorted by update date
- Displays repository name, description, language, stars, and forks
- Direct links to GitHub repository pages
- Error handling for API failures

**Medium Blog Integration:**
- Fetches latest articles via RSS2JSON API
- Displays article titles, excerpts, and publication dates
- Direct links to Medium articles
- Error handling for feed failures

### Static and Dynamic Content Sections

The portfolio includes:
- Hero section with professional introduction and key achievements card
- **About section** - Dynamically loaded from aboutme.md file with profile and technical expertise tags
- Experience timeline with professional history (separate page: experience.html)
- Education background (on experience.html)
- Certifications section
- Contact form and information (separate page: contact.html)

## External Dependencies

### Third-Party Services

**GitHub API:**
- Endpoint: `https://api.github.com/users/{username}/repos`
- Purpose: Fetch user repositories
- Authentication: None (public API)
- Rate limits: Apply standard GitHub API limits

**RSS2JSON API:**
- Endpoint: `https://api.rss2json.com/v1/api.json`
- Purpose: Convert Medium RSS feed to JSON
- Authentication: None (free tier)
- Source: Medium RSS feed at `https://medium.com/feed/@{username}`

### Build Tools

**Tailwind CSS v4:**
- Installed via npm: `tailwindcss@^4.1.14` and `@tailwindcss/cli`
- Configuration: CSS-based theme using `@theme` directive in `src/input.css`
- Custom colors: Teal (#5EBBAD), Orange (#F97316), Dark Gray (#1F2937), White (#FFFFFF)
- Build scripts:
  - `npm run build:css` - Production build with minification (16KB output)
  - `npm run watch:css` - Development mode with auto-rebuild
- Output: `css/output.css` (minified, production-ready)

**Font Awesome:**
- Version: 6.4.0
- Delivered via: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`
- Purpose: Icon library for UI elements

### Deployment Platform

**GitHub Pages:**
- Hosting: Static site deployment
- Configuration: Deploy from main branch, root folder
- Build process: None required (static files)
- URL pattern: `https://{username}.github.io/{repo}/`

### Local Development

**Development Server:**
- Python HTTP server for local testing
- Command: `python3 -m http.server 5000`
- No build process or bundling required