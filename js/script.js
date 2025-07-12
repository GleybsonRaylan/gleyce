// Função para inicializar o site
document.addEventListener("DOMContentLoaded", function () {
  // Menu Mobile
  const menuMobile = document.querySelector(".menu-mobile");
  const menu = document.querySelector(".menu");

  menuMobile.addEventListener("click", function () {
    this.setAttribute(
      "aria-expanded",
      this.getAttribute("aria-expanded") === "true" ? "false" : "true"
    );
    menu.classList.toggle("active");
  });

  // Fechar menu ao clicar em um link
  const menuLinks = document.querySelectorAll(".menu a");
  menuLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuMobile.setAttribute("aria-expanded", "false");
      menu.classList.remove("active");
    });
  });

  // Adicionar classe scrolled ao header quando rolar a página
  const header = document.querySelector(".header");
  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // FAQ Accordion
  const faqPerguntas = document.querySelectorAll(".faq-pergunta");
  faqPerguntas.forEach((pergunta) => {
    pergunta.addEventListener("click", () => {
      const item = pergunta.parentElement;
      const resposta = pergunta.nextElementSibling;
      const isOpen = pergunta.classList.contains("active");

      // Fechar todos os itens primeiro
      faqPerguntas.forEach((p) => {
        p.classList.remove("active");
        p.nextElementSibling.style.maxHeight = null;
      });

      // Abrir o item clicado se não estiver aberto
      if (!isOpen) {
        pergunta.classList.add("active");
        resposta.style.maxHeight = resposta.scrollHeight + "px";
      }
    });
  });

  // Formulário de Agendamento - Enviar para WhatsApp
  const formAgendamento = document.getElementById("form-agendamento");
  if (formAgendamento) {
    formAgendamento.addEventListener("submit", function (e) {
      e.preventDefault();

      const nome = document.getElementById("nome").value;
      const telefone = document.getElementById("telefone").value;
      const servico = document.getElementById("servico").value;
      const mensagem = document.getElementById("mensagem").value;

      // Formatar mensagem para WhatsApp
      let texto = `Olá Dra. Gleyce, gostaria de agendar uma consulta!\n\n`;
      texto += `*Nome:* ${nome}\n`;
      texto += `*Telefone:* ${telefone}\n`;
      texto += `*Serviço desejado:* ${servico}\n`;

      if (mensagem) {
        texto += `*Mensagem:* ${mensagem}\n`;
      }

      // Codificar mensagem para URL
      const textoCodificado = encodeURIComponent(texto);

      // Número de WhatsApp
      const numeroWhatsApp = "5581995029361";

      // Abrir WhatsApp
      window.open(
        `https://wa.me/${numeroWhatsApp}?text=${textoCodificado}`,
        "_blank"
      );

      // Resetar formulário
      formAgendamento.reset();
    });
  }

  // Máscara para telefone
  const inputTelefone = document.getElementById("telefone");
  if (inputTelefone) {
    inputTelefone.addEventListener("input", function (e) {
      let value = e.target.value.replace(/\D/g, "");

      // Limitar a 11 dígitos (DDD + número)
      if (value.length > 11) {
        value = value.substring(0, 11);
      }

      // Aplicar a máscara
      let formattedValue = "";
      if (value.length > 0) {
        formattedValue = `(${value.substring(0, 2)}`;

        if (value.length > 2) {
          formattedValue += `) ${value.substring(2, 7)}`;

          if (value.length > 7) {
            formattedValue += `-${value.substring(7, 11)}`;
          }
        }
      }

      e.target.value = formattedValue;
    });
  }

  // Slider de Depoimentos
  const slider = document.querySelector(".depoimentos-slider");
  const prevBtn = document.querySelector(".controle-btn.prev");
  const nextBtn = document.querySelector(".controle-btn.next");

  if (slider && prevBtn && nextBtn) {
    let currentIndex = 0;
    const cards = document.querySelectorAll(".depoimento-card");
    const cardWidth = cards[0].offsetWidth + 32; // Largura do card + gap

    function updateSlider() {
      slider.scrollTo({
        left: currentIndex * cardWidth,
        behavior: "smooth",
      });
    }

    prevBtn.addEventListener("click", () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });

    nextBtn.addEventListener("click", () => {
      if (currentIndex < cards.length - 1) {
        currentIndex++;
        updateSlider();
      }
    });

    // Atualizar índice ao rolar manualmente
    slider.addEventListener("scroll", () => {
      currentIndex = Math.round(slider.scrollLeft / cardWidth);
    });
  }

  // Animar elementos quando entram na viewport
  const animateOnScroll = function () {
    const elements = document.querySelectorAll(
      ".servico-card, .especializacao-item, .condicao-item, .local-card"
    );

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        element.style.opacity = "1";
        element.style.transform = "translateY(0)";
      }
    });
  };

  // Definir propriedades iniciais para animação
  const animateElements = document.querySelectorAll(
    ".servico-card, .especializacao-item, .condicao-item, .local-card"
  );
  animateElements.forEach((element) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "opacity 0.5s ease, transform 0.5s ease";
  });

  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll(); // Executar uma vez ao carregar a página
});
