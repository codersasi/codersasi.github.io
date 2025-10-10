async function fetchGitHubProjects() {
    const username = 'codersasi';
    const projectsContainer = document.getElementById('github-projects');
    
    if (!projectsContainer) return;
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
        }
        
        const repos = await response.json();
        
        if (repos.length === 0) {
            projectsContainer.innerHTML = '<p class="text-center text-gray-600">No projects found.</p>';
            return;
        }
        
        projectsContainer.innerHTML = repos.map((repo, index) => {
            const isEven = index % 2 === 0;
            const unsplashImages = [
                '1451187580459-43490279c0fa',
                '1555066931-4365d14bab8c',
                '1558494949-ef010cbdcc31',
                '1504639725590-34d0984388bd',
                '1518432031352-d934b408fa37',
                '1526374965328-7f61d4dc18c5'
            ];
            const photoId = unsplashImages[index % unsplashImages.length];
            const imageUrl = `https://images.unsplash.com/photo-${photoId}?w=800&h=500&fit=crop`;
            
            return `
                <div class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden">
                    <div class="flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center">
                        <div class="md:w-1/2">
                            <img src="${imageUrl}" alt="${repo.name}" class="w-full h-64 object-cover">
                        </div>
                        <div class="md:w-1/2 p-8">
                            <h4 class="text-2xl font-bold text-primary mb-3">${repo.name}</h4>
                            <p class="text-gray-700 mb-4">${repo.description || 'No description available'}</p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                ${repo.language ? `<span class="bg-primary text-white px-3 py-1 rounded-lg text-sm shadow-md">${repo.language}</span>` : ''}
                                <span class="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm"><i class="fas fa-star text-secondary"></i> ${repo.stargazers_count}</span>
                                <span class="bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm"><i class="fas fa-code-branch text-secondary"></i> ${repo.forks_count}</span>
                            </div>
                            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="bg-secondary hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition shadow-md hover:shadow-lg inline-block">
                                View on GitHub <i class="fas fa-arrow-right ml-2"></i>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        projectsContainer.innerHTML = `
            <div class="text-center text-red-600 py-8">
                <p>Failed to load projects. Please try again later.</p>
            </div>
        `;
    }
}

async function fetchMediumArticles() {
    const username = 'sasidharc';
    const articlesContainer = document.getElementById('medium-articles');
    
    if (!articlesContainer) return;
    
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

async function loadAboutMe() {
    const bioElement = document.getElementById('about-bio');
    const skillsElement = document.getElementById('about-skills');
    
    if (!bioElement && !skillsElement) return;
    
    try {
        const response = await fetch('aboutme.md');
        if (!response.ok) {
            throw new Error(`Failed to load aboutme.md: ${response.status}`);
        }
        
        const markdown = await response.text();
        
        const lines = markdown.split('\n');
        let bio = '';
        let skills = [];
        let inSkillsSection = false;
        
        lines.forEach(line => {
            if (line.startsWith('# ')) {
                return;
            }
            if (line.startsWith('## Technical Expertise')) {
                inSkillsSection = true;
                return;
            }
            if (inSkillsSection && line.startsWith('- ')) {
                skills.push(line.substring(2).trim());
            } else if (line.trim() && !line.startsWith('#')) {
                bio += line + ' ';
            }
        });
        
        if (bioElement) {
            bioElement.textContent = bio.trim();
        }
        
        if (skillsElement) {
            skillsElement.innerHTML = skills.map(skill => 
                `<span class="bg-primary text-white px-4 py-2 rounded-lg text-sm shadow-md hover:shadow-lg transition-shadow">${skill}</span>`
            ).join('');
        }
    } catch (error) {
        console.error('Error loading About Me:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadAboutMe();
    fetchGitHubProjects();
    fetchMediumArticles();
    
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
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
