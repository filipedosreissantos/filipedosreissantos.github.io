// ====================================
// Inicializar AOS (Animate On Scroll)
// ====================================
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// ====================================
// Efeito de Digitação
// ====================================
const typedElement = document.getElementById('typed');
const phrases = [
    'Analista de Sistemas',
    'Engenheiro de Software',
    'Desenvolvedor Full-Stack',
    'Solucionador de Problemas',
    'Entusiasta de Tecnologia'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2000; // Pausa no final
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500; // Pausa antes de iniciar nova frase
    }
    
    setTimeout(type, typingSpeed);
}

// Iniciar efeito de digitação
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(type, 1000);
});

// ====================================
// Navegação
// ====================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Efeito de scroll para navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Alternar menu mobile
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu mobile ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Link ativo no scroll
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ====================================
// Rolagem Suave
// ====================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ====================================
// Animação de Contador para Estatísticas
// ====================================
const statNumbers = document.querySelectorAll('.stat-number');
let hasAnimated = false;

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (target === 100 ? '%' : '+');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
        }
    }, 16);
}

window.addEventListener('scroll', () => {
    const statsSection = document.querySelector('.stats-container');
    
    if (statsSection && !hasAnimated) {
        const rect = statsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            hasAnimated = true;
            statNumbers.forEach(stat => animateCounter(stat));
        }
    }
});

// ====================================
// Animação das Barras de Habilidade
// ====================================
const skillBars = document.querySelectorAll('.skill-bar');
let skillsAnimated = false;

function animateSkillBars() {
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level + '%';
    });
}

window.addEventListener('scroll', () => {
    const skillsSection = document.querySelector('.skills');
    
    if (skillsSection && !skillsAnimated) {
        const rect = skillsSection.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
        
        if (isVisible) {
            skillsAnimated = true;
            animateSkillBars();
        }
    }
});

// ====================================
// Buscar Projetos do GitHub
// ====================================
async function fetchGitHubProjects() {
    const username = 'filipedosreissantos';
    const projectsContainer = document.getElementById('projectsContainer');
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        const repos = await response.json();
        
        // Filtrar repos bifurcados e pegar os mais relevantes
        const filteredRepos = repos
            .filter(repo => !repo.fork)
            .slice(0, 5);
        
        filteredRepos.forEach((repo, index) => {
            const projectCard = createProjectCard(repo, index);
            projectsContainer.insertAdjacentHTML('beforeend', projectCard);
        });
        
        // Re-inicializar AOS para novos elementos
        AOS.refresh();
    } catch (error) {
        console.error('Erro ao buscar projetos do GitHub:', error);
    }
}

function createProjectCard(repo, index) {
    const topics = repo.topics || [];
    const tagsHTML = topics.slice(0, 5).map(tag => 
        `<span class="tag">${tag}</span>`
    ).join('');
    
    const languages = repo.language ? `<span class="tag">${repo.language}</span>` : '';
    
    return `
        <div class="project-card glass-card" data-aos="fade-up" data-aos-delay="${(index + 1) * 100}">
            <div class="project-image">
                <img src="https://via.placeholder.com/600x400/${getColorForProject(repo.language)}/ffffff?text=${encodeURIComponent(repo.name)}" alt="${repo.name}">
                <div class="project-overlay">
                    <div class="project-links">
                        <a href="${repo.html_url}" target="_blank" class="project-link-btn" title="Ver no GitHub">
                            <i class="fab fa-github"></i>
                        </a>
                        ${repo.homepage ? `
                            <a href="${repo.homepage}" target="_blank" class="project-link-btn" title="Demo ao Vivo">
                                <i class="fas fa-external-link-alt"></i>
                            </a>
                        ` : ''}
                    </div>
                </div>
            </div>
            <div class="project-content">
                <h3 class="project-title">${repo.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</h3>
                <p class="project-description">
                    ${repo.description || 'Um projeto fantástico demonstrando práticas modernas de desenvolvimento e arquitetura de código limpo.'}
                </p>
                <div class="project-tags">
                    ${languages}
                    ${tagsHTML}
                </div>
            </div>
        </div>
    `;
}

function getColorForProject(language) {
    const colors = {
        'JavaScript': 'f7df1e',
        'Python': '3776ab',
        'PHP': '777bb4',
        'HTML': 'e34c26',
        'CSS': '1572b6',
        'Java': 'b07219',
        'C++': '00599c',
        'Ruby': 'cc342d',
        'Go': '00add8',
        'TypeScript': '2b7489'
    };
    return colors[language] || '009c3b';
}

// Buscar projetos quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', fetchGitHubProjects);

// ====================================
// Manipulação do Formulário de Contato
// ====================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Obter valores do formulário
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Criar link mailto
    const mailtoLink = `mailto:miguelfilipedosreissantos@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`)}`;
    
    // Abrir cliente de email
    window.location.href = mailtoLink;
    
    // Mostrar mensagem de sucesso
    alert('Obrigado pela sua mensagem! Seu cliente de email abrirá em breve.');
    
    // Resetar formulário
    contactForm.reset();
});

// ====================================
// Botão Voltar ao Topo
// ====================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ====================================
// Efeito Parallax para Seção Hero
// ====================================
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const heroSection = document.querySelector('.hero');
    
    if (heroSection) {
        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }
});

// ====================================
// Adicionar efeito hover aos cartões de projeto
// ====================================
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }, 2000);
});

// ====================================
// Carregamento Preguiçoso de Imagens
// ====================================
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// ====================================
// Adicionar animação aos cartões no hover
// ====================================
const glassCards = document.querySelectorAll('.glass-card');

glassCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ====================================
// Preloader (opcional)
// ====================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ====================================
// Easter Egg: Código Konami
// ====================================
let konamiCode = [];
const konamiPattern = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiPattern.join(',')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 2s infinite';
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.style.animation = '';
        style.remove();
    }, 10000);
}

// ====================================
// Monitoramento de Performance
// ====================================
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Página carregada em ${pageLoadTime}ms`);
    });
}

// ====================================
// Mensagem no Console
// ====================================
console.log('%c👋 Olá, Desenvolvedor!', 'font-size: 20px; font-weight: bold; color: #009c3b;');
console.log('%cProcurando o código fonte? Confira meu GitHub!', 'font-size: 14px; color: #002776;');
console.log('%chttps://github.com/filipedosreissantos', 'font-size: 14px; color: #009c3b; text-decoration: underline;');
