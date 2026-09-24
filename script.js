// ===== FUNCIONALIDADE DE NAVEGAÇÃO SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== ANIMAÇÃO DO DASHBOARD =====
function updateDashboard() {
  const co2Element = document.getElementById('co2-val');
  
  if (co2Element) {
    // Simula valores aleatórios de CO₂ com base em dados reais
    const baseValue = 412;
    const variation = Math.sin(Date.now() / 5000) * 20; // Variação suave
    const co2Value = Math.round(baseValue + variation);
    
    // Atualiza o valor
    co2Element.textContent = co2Value + ' ppm';
    
    // Muda a cor baseado no nível
    const statusElement = co2Element.nextElementSibling;
    if (co2Value < 400) {
      statusElement.textContent = 'Excelente';
      statusElement.className = 'status ok';
    } else if (co2Value < 450) {
      statusElement.textContent = 'Estável';
      statusElement.className = 'status ok';
    } else if (co2Value < 500) {
      statusElement.textContent = 'Atenção';
      statusElement.className = 'status warning';
    } else {
      statusElement.textContent = 'Crítico';
      statusElement.className = 'status alert';
    }
  }
}

// Atualiza o dashboard a cada 2 segundos
setInterval(updateDashboard, 2000);

// Atualiza imediatamente ao carregar
updateDashboard();

// ===== OBSERVADOR PARA ANIMAÇÕES AO ROLAR =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.animation = 'slideUp 0.6s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Aplica animação aos cards
document.querySelectorAll('.card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.animationDelay = `${index * 0.1}s`;
  observer.observe(card);
});

document.querySelectorAll('.metric').forEach((metric, index) => {
  metric.style.opacity = '0';
  metric.style.animationDelay = `${index * 0.1}s`;
  observer.observe(metric);
});

// ===== EFEITO DE SCROLL NO HEADER =====
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > lastScrollTop) {
    // Scroll para baixo
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.15)';
  } else {
    // Scroll para cima
    header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ===== CONTADOR DE NÚMEROS (ANIMAÇÃO) =====
function animateCounter(element, finalValue, duration = 2000) {
  const startValue = 0;
  const startTime = Date.now();
  
  function update() {
    const elapsed = Date.now() - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function para animação suave
    const easeOutQuad = progress => 1 - (1 - progress) * (1 - progress);
    const currentValue = Math.floor(startValue + (finalValue - startValue) * easeOutQuad(progress));
    
    element.textContent = currentValue;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  
  update();
}

// ===== DETECÇÃO DE VIEWPORT E ATIVAÇÃO DE ELEMENTOS =====
const activateElementsOnScroll = () => {
  const elements = document.querySelectorAll('.card, .metric');
  
  elements.forEach(element => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (elementPosition < screenPosition) {
      element.classList.add('active');
    }
  });
};

window.addEventListener('scroll', activateElementsOnScroll);

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
  console.log('NetZero - Sistema de Monitoramento de Emissões de Carbono carregado com sucesso!');
  
  // Ativa elementos já visíveis
  activateElementsOnScroll();
});

// ===== FUNCIONALIDADE DE RESPONSIVIDADE NO MENU =====
const addMobileMenuToggle = () => {
  const nav = document.querySelector('nav');
  const navContainer = document.querySelector('.nav-container');
  
  // Cria botão de menu (hamburger) se necessário
  if (window.innerWidth <= 768) {
    if (!document.querySelector('.menu-toggle')) {
      const menuToggle = document.createElement('button');
      menuToggle.className = 'menu-toggle';
      menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
      
      menuToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
      });
      
      navContainer.appendChild(menuToggle);
    }
  }
};

window.addEventListener('resize', addMobileMenuToggle);
addMobileMenuToggle();
