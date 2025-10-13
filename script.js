// Global data variable
let portfolioData = null;

// Load portfolio data from JSON
async function loadPortfolioData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`Failed to load data.json: ${response.status}`);
        }
        portfolioData = await response.json();
        return portfolioData;
    } catch (error) {
        console.error('Error loading portfolio data:', error);
        return null;
    }
}

// Render hero section
function renderHero(data) {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection || !data) return;
    
    const hero = data.hero;
    heroSection.innerHTML = `
        <div class="container mx-auto px-6 py-20">
            <div class="grid md:grid-cols-2 gap-12 items-center">
                <div class="order-2 md:order-1">
                    <img src="${hero.backgroundImage}" alt="Developer illustration" class="w-full max-w-md mx-auto" loading="eager">
                </div>
                <div class="order-1 md:order-2">
                    <h1 class="text-4xl md:text-5xl font-bold mb-6 text-secondary">${hero.greeting}</h1>
                    <p class="text-lg md:text-xl mb-8 text-gray-700">${hero.tagline}</p>
                    <a href="#projects" class="inline-block bg-secondary hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition">View My Work</a>
                </div>
            </div>
        </div>
    `;
}

// Render about section
function renderAbout(data) {
    const aboutSection = document.getElementById('about');
    if (!aboutSection || !data) return;
    
    const approachList = data.about.approach ? data.about.approach.map(item => 
        `<li class="text-gray-700">${item}</li>`
    ).join('') : '';
    
    const aboutContent = `
        <div class="container mx-auto px-6">
            <h3 class="text-4xl font-bold mb-12 text-gray-900">About Me</h3>
            <div class="bg-white rounded-xl shadow-xl p-8">
                <div class="grid md:grid-cols-12 gap-8">
                    <div class="md:col-span-3 text-center">
                        <img src="${data.personal.profileImage}" alt="${data.personal.name}" class="rounded-full mx-auto mb-4 w-48 h-48 border-4 border-secondary shadow-lg">
                    </div>
                    <div class="md:col-span-9">
                        <h4 class="text-3xl font-bold mb-2">${data.personal.name}</h4>
                        <p class="text-secondary text-lg mb-2">${data.personal.title}</p>
                        <p class="text-gray-600 mb-6">${data.personal.location}</p>
                        <p class="text-gray-700 mb-6">${data.about.bio}</p>
                        
                        <div class="mb-6">
                            <h5 class="text-xl font-bold mb-3">Technical Expertise</h5>
                            <div class="flex flex-wrap gap-2">
                                ${data.about.skills.map(skill => 
                                    `<span class="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm">${skill}</span>`
                                ).join('')}
                            </div>
                        </div>
                        
                        ${approachList ? `
                        <div>
                            <h5 class="text-xl font-bold mb-3">Design & Development Approach</h5>
                            <ul class="list-disc list-inside space-y-2">
                                ${approachList}
                            </ul>
                        </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
    
    aboutSection.innerHTML = aboutContent;
}

// Legacy about rendering (fallback)
function renderAboutLegacy(data) {
    const aboutBio = document.getElementById('about-bio');
    const aboutSkills = document.getElementById('about-skills');
    const profileImage = document.querySelector('.rounded-full');
    const profileName = document.querySelector('#about h4');
    const profileTitle = document.querySelector('#about .text-gray-600');
    const profileLocation = document.querySelector('#about .text-gray-500');
    
    if (!data) return;
    
    if (aboutBio) {
        aboutBio.textContent = data.about.bio;
    }
    
    if (aboutSkills) {
        aboutSkills.innerHTML = data.about.skills.map(skill => 
            `<span class="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-sm">${skill}</span>`
        ).join('');
    }
    
    if (profileImage) {
        profileImage.src = data.personal.profileImage;
        profileImage.alt = data.personal.name;
    }
    
    if (profileName) {
        profileName.textContent = data.personal.name;
    }
    
    if (profileTitle) {
        profileTitle.textContent = data.personal.title;
    }
    
    if (profileLocation) {
        profileLocation.textContent = data.personal.location;
    }
}

// Render experience section
function renderExperience(data) {
    const experienceContainer = document.querySelector('#experience .space-y-6');
    if (!experienceContainer || !data) return;
    
    experienceContainer.innerHTML = data.experience.map(job => `
        <div class="bg-white rounded-lg shadow-lg p-6 border-l-4 border-secondary hover:shadow-xl transition-shadow duration-300">
            <h4 class="text-2xl font-bold text-primary">${job.title}</h4>
            <p class="text-gray-600 mb-2">${job.company} | ${job.period}</p>
            ${job.responsibilities.length > 1 ? `
                <ul class="list-disc list-inside space-y-2 text-gray-700">
                    ${job.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                </ul>
            ` : `
                <p class="text-gray-700">${job.responsibilities[0]}</p>
            `}
        </div>
    `).join('');
}

// Render education section
function renderEducation(data) {
    const educationContainer = document.querySelector('#education .grid');
    if (!educationContainer || !data) return;
    
    educationContainer.innerHTML = data.education.map(edu => `
        <div class="bg-gray-50 p-6 rounded-lg shadow-lg border-t-4 border-secondary hover:shadow-xl transition-shadow duration-300">
            <h4 class="text-2xl font-bold text-primary mb-2">${edu.degree}</h4>
            <p class="text-gray-600 mb-2">${edu.field}</p>
            <p class="text-gray-700">${edu.institution}</p>
            <p class="text-gray-500">${edu.period}</p>
        </div>
    `).join('');
}

// Render certifications section
function renderCertifications(data) {
    const certsContainer = document.querySelector('#certifications .grid');
    if (!certsContainer || !data) return;
    
    certsContainer.innerHTML = data.certifications.map(cert => `
        <div class="bg-white p-6 rounded-lg shadow-lg border-t-4 border-secondary hover:shadow-xl transition-shadow duration-300">
            <h4 class="text-xl font-bold text-primary mb-2">${cert.title}</h4>
            <p class="text-gray-600 mb-2">${cert.issuer}</p>
            <p class="text-gray-700">${cert.description}</p>
        </div>
    `).join('');
}

// Render contact section
function renderContact(data) {
    const contactHeading = document.querySelector('.py-24 h2');
    const contactSubheading = document.querySelector('.py-24 p');
    const emailLink = document.querySelector('a[href^="mailto:"]');
    const locationText = document.querySelector('.fa-map-marker-alt + div p');
    
    if (!data) return;
    
    if (contactHeading) {
        contactHeading.textContent = data.contact.heading;
    }
    
    if (contactSubheading) {
        contactSubheading.textContent = data.contact.subheading;
    }
    
    if (emailLink) {
        emailLink.href = `mailto:${data.contact.email}`;
        emailLink.textContent = data.contact.email;
    }
    
    if (locationText) {
        locationText.textContent = data.contact.location;
    }
}

// Render social links
function renderSocialLinks(data) {
    const socialContainer = document.querySelector('.flex.flex-wrap.gap-4');
    if (!socialContainer || !data) return;
    
    socialContainer.innerHTML = data.social.map(social => `
        <a href="${social.url}" target="_blank" rel="noopener noreferrer" 
           class="flex items-center gap-2 ${social.color} text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg hover:shadow-xl">
            <i class="${social.icon} text-xl"></i>${social.name}
        </a>
    `).join('');
}

// Render projects from JSON
function renderProjects(data) {
    const projectsContainer = document.getElementById('github-projects');
    
    if (!projectsContainer || !data || !data.projects) return;
    
    const projects = data.projects;
    
    if (projects.length === 0) {
        projectsContainer.innerHTML = '<p class="text-center text-gray-600">No projects found.</p>';
        return;
    }
    
    projectsContainer.innerHTML = projects.map((project, index) => {
        const isEven = index % 2 === 0;
        
        return `
            <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                <div class="flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center">
                    <div class="md:w-1/2">
                        <img src="${project.image}" alt="${project.name}" class="w-full h-64 object-cover" loading="lazy">
                    </div>
                    <div class="md:w-1/2 p-8">
                        <h4 class="text-2xl font-bold text-primary mb-3">${project.name}</h4>
                        <p class="text-gray-700 mb-4">${project.description}</p>
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${project.technologies.map(tech => 
                                `<span class="bg-primary text-white px-3 py-1 rounded-lg text-sm shadow-md">${tech}</span>`
                            ).join('')}
                        </div>
                        <a href="${project.link}" target="_blank" rel="noopener noreferrer" class="bg-secondary hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition shadow-md hover:shadow-lg inline-block">
                            View Details <i class="fas fa-arrow-right ml-2"></i>
                        </a>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// Fetch Medium articles
async function fetchMediumArticles() {
    const articlesContainer = document.getElementById('medium-articles');
    
    if (!articlesContainer || !portfolioData) return;
    
    const username = portfolioData.projectsConfig.mediumUsername;
    
    try {
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`);
        
        if (!response.ok) {
            throw new Error(`RSS2JSON API error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (data.status !== 'ok' || !data.items || data.items.length === 0) {
            articlesContainer.innerHTML = '<p class="text-center text-gray-600">No articles found.</p>';
            return;
        }
        
        const articles = data.items.slice(0, 3);
        
        articlesContainer.innerHTML = articles.map(article => {
            const pubDate = new Date(article.pubDate);
            const formattedDate = pubDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
            
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = article.description;
            const excerpt = tempDiv.textContent.substring(0, 200) + '...';
            
            return `
                <div class="bg-white p-6 rounded-lg shadow-lg border-l-4 border-secondary hover:shadow-xl transition-shadow duration-300">
                    <div class="flex justify-between items-start mb-4">
                        <h4 class="text-2xl font-bold text-primary flex-1">${article.title}</h4>
                    </div>
                    <p class="text-gray-600 text-sm mb-3">${formattedDate}</p>
                    <p class="text-gray-700 mb-4">${excerpt}</p>
                    <a href="${article.link}" target="_blank" rel="noopener noreferrer" class="bg-secondary hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold transition shadow-md hover:shadow-lg inline-block">
                        Read Article
                    </a>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error fetching Medium articles:', error);
        articlesContainer.innerHTML = `
            <div class="text-center text-red-600">
                <p>Failed to load articles. Please try again later.</p>
            </div>
        `;
    }
}

// Initialize portfolio
async function initPortfolio() {
    // Load data first
    await loadPortfolioData();
    
    if (!portfolioData) {
        console.error('Failed to load portfolio data');
        return;
    }
    
    // Render all sections that exist on current page
    renderHero(portfolioData);
    renderAbout(portfolioData);
    renderProjects(portfolioData);
    renderExperience(portfolioData);
    renderEducation(portfolioData);
    renderCertifications(portfolioData);
    renderContact(portfolioData);
    renderSocialLinks(portfolioData);
    
    // Fetch dynamic content (Medium articles only)
    fetchMediumArticles();
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('hidden');
        });
        
        mobileNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.add('hidden');
            });
        });
    }
}

// Smooth scrolling
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    initPortfolio();
    initMobileMenu();
    initSmoothScroll();
});
