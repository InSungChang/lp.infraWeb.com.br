// Função para validação do formulário
function validarFormulario(event) {
    event.preventDefault();
    
    const nome = document.querySelector('input[name="nome"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const telefone = document.querySelector('input[name="telefone"]').value;
    const mensagem = document.querySelector('textarea[name="mensagem"]').value;

    if (!nome || !email || !mensagem) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }

    if (!validarEmail(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    if (telefone && !validarTelefone(telefone)) {
        alert('Por favor, insira um número de telefone válido.');
        return;
    }

    // Aqui você pode adicionar o código para enviar o formulário
    console.log('Formulário enviado:', { nome, email, telefone, mensagem });
    alert('Obrigado pelo contato! Retornaremos em breve.');
    event.target.reset();
}

// Função para validar e-mail
function validarEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}

// Função para validar telefone
function validarTelefone(telefone) {
    const re = /^\+?[\d\s()-]{10,}$/;
    return re.test(telefone);
}

// Adicionar evento de submit ao formulário
document.getElementById('formulario-contato').addEventListener('submit', validarFormulario);

// Função para navegação suave
function scrollToSection(event) {
    if (event.target.hash) {
        event.preventDefault();
        const targetElement = document.querySelector(event.target.hash);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    }
}

// Adicionar evento de clique para links de navegação
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', scrollToSection);
});

// Função para animação de fade-in dos elementos
function fadeInElements() {
    const elements = document.querySelectorAll('.servico-card, #sobre p, #contato form');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Adicionar evento de scroll para animação de fade-in
window.addEventListener('scroll', fadeInElements);

// Chamar fadeInElements uma vez para elementos visíveis na carga inicial
fadeInElements();

// Função para registrar conversões (exemplo para Google Ads)
function registrarConversao() {
    // Substitua 'AW-CONVERSION_ID/CONVERSION_LABEL' pelo seu ID e rótulo de conversão
    gtag('event', 'conversion', {'send_to': 'AW-CONVERSION_ID/CONVERSION_LABEL'});
}

// Função para registrar eventos do Facebook Pixel
function registrarEventoFacebook(evento) {
    fbq('track', evento);
}

// Adicionar eventos de conversão ao formulário
document.getElementById('formulario-contato').addEventListener('submit', function() {
    registrarConversao();
    registrarEventoFacebook('Lead');
});

// Adicionar evento de clique no botão do WhatsApp
document.querySelector('#whatsapp-button a').addEventListener('click', function() {
    registrarEventoFacebook('Contact');
});

// Função para controlar o carrossel
function setupCarrossel() {
    const carrosseis = document.querySelectorAll('.carrossel-container');

    carrosseis.forEach(container => {
        const carrossel = container.querySelector('.carrossel');
        const prevButton = container.querySelector('.prev');
        const nextButton = container.querySelector('.next');
        let position = 0;

        function showSlides() {
            if (window.innerWidth <= 768) {
                carrossel.style.transform = 'translateX(0)';
                return;
            }

            const slideWidth = carrossel.querySelector('img').clientWidth;
            carrossel.style.transform = `translateX(${-position * slideWidth}px)`;
        }

        function nextSlide() {
            if (position < carrossel.children.length - 4) {
                position++;
                showSlides();
            }
        }

        function prevSlide() {
            if (position > 0) {
                position--;
                showSlides();
            }
        }

        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);

        // Atualizar carrossel quando a janela for redimensionada
        window.addEventListener('resize', showSlides);

        // Inicializar o carrossel
        showSlides();
    });
}

// Chamar a função setupCarrossel quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', setupCarrossel);