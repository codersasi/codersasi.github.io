# Portfolio Website - Project Documentation

## Overview

This is a personal portfolio website for Sasidhar Chintapalli, built using vanilla HTML, CSS (Tailwind), and JavaScript with a JSON-based data architecture. All portfolio content is stored in a centralized data.json file, making it easy to update without touching code. The site dynamically loads content from JSON and fetches live data from external APIs (GitHub and Medium) to display the latest projects and articles.

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
- **Hero Section Redesign**: Simplified hero to match reference website style
  - Changed from full-width background to centered illustration (800x500px)
  - Now uses Unsplash coding workspace image (no CORS issues)
  - Clean centered layout: image, greeting, tagline, description
  - Removed Key Achievements card for simpler, cleaner design
- **Navigation Enhancements**: Improved navbar across all pages
  - Added "Home" link to navbar for easy return to main page
  - Renamed "Experience & Education" to "Career" for professional brevity
  - Updated page title from "Experience & Education - " to "Career - "
- **Hero Section Simplification**: Removed CTA buttons ("View My Work" and "My Experience")
  - Navigation only accessible through top navbar
  - Cleaner, more focused hero design
- **Section Reordering**: Restructured content hierarchy
  - New order: Hero → About → Projects → Blog → Certifications
  - About Me now appears immediately after hero section
  - Projects section follows About Me
  - Certifications moved to end as supporting credentials
  - Navigation menu updated to reflect new section order
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
- **Unsplash Image Integration**: Added professional stock photography
  - Hero section: Earth from space background (photo-1451187580459) with 20% opacity overlay
  - Projects section: 6 curated technology-themed images cycling through projects
  - Optimized loading: hero image loads eagerly, project images use lazy loading
  - Images properly sized (1600x900 for hero, 800x500 for projects) with crop fit
- **JSON-Based Data Architecture**: Restructured to load all content from data.json
  - Created comprehensive data.json with all portfolio content (personal, hero, about, experience, education, certifications, contact, social, config)
  - Rewrote script.js to dynamically load and render all sections from JSON
  - All content now editable in one centralized file - no need to edit HTML
  - Removed aboutme.md - all data now in data.json
  - Projects now loaded from JSON (6 curated projects with descriptions, images, and technologies)
  - Medium articles still fetched dynamically from API for latest content
  - Each page only renders sections that exist on that page (no errors on missing containers)
  - Updated hero background to coding workspace image with subtle 10% opacity

**October 13, 2025:**
- **Hero Section Layout Redesign**: Changed from centered to side-by-side layout matching reference screenshot
  - Implemented responsive grid layout: illustration on left (6 columns), text on right (6 columns)
  - Background changed from teal gradient to light gray (bg-gray-50) for cleaner aesthetic
  - Greeting text now styled in orange (text-secondary) for brand consistency
  - Moved developer illustration from center to left side using Freepik cartoon developer image
  - Added "View My Work" CTA button linking to #projects section
- **Navbar Redesign**: Complete overhaul to match "Sasi" branding
  - Background changed from dark gray (#1F2937) to white
  - Brand name changed from "Sasidhar Chintapalli" to "Sasi" in orange (#F97316)
  - Navigation links now gray text with orange hover effect
  - "About" renamed to "About Me" across all pages
  - Removed "Career" link from main navigation (simplified menu)
  - Applied consistent styling across index.html, experience.html, and contact.html
- **About Me Section Complete Redesign**: New layout with avatar and content side-by-side
  - Implemented 12-column grid: avatar on left (3 columns), content on right (9 columns)
  - Profile image changed to "SC" initials with blue background and orange border
  - Name and title now display with orange secondary color styling
  - Skills updated from teal to light blue chips (bg-blue-100 text-blue-800)
  - Added "Design & Development Approach" section with bullet points
  - Complete JSON-driven rendering with new renderAbout() function
  - Added approach array to data.json for easy content updates
- **Navigation Menu Refinement**: Simplified navigation structure
  - Main menu: Home → About Me → Projects → Blog → Contact
  - Removed "Career" from navbar (still accessible via experience.html page)
  - Consistent navigation order across all pages

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
- Multi-page application with centralized JSON data architecture
- All content stored in data.json for easy updates
- Mobile-first responsive design with sticky navigation
- Dynamic content loading via async/await patterns
- Conditional rendering based on page context (no errors on missing elements)

**Color Scheme:**
- Primary: Teal (#5EBBAD) - Subtle, professional shade
- Secondary: Orange (#F97316) - Brand color for "Sasi" and accents
- Navbar: White (#FFFFFF) with orange branding
- Background: Light Gray (#F9FAFB, bg-gray-50)
- Skill Tags: Light Blue (bg-blue-100 text-blue-800)

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