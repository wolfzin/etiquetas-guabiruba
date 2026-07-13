/* =========================================================================
   ETIQUETAS GUABIRUBA — Scripts do site (versão final)
   ========================================================================= */

/* ┌──────────────────────────────────────────────────────────────────────┐
   │  ⚙️  CONFIGURAÇÃO — EDITE APENAS AQUI                                   │
   │  Troque pelos dados reais da empresa. É o único lugar a ser alterado.  │
   └──────────────────────────────────────────────────────────────────────┘ */
const CONFIG = {
  // Mensagem automática enviada ao abrir o WhatsApp
  mensagem: "Olá! Vim pelo site da Etiquetas Guabiruba e gostaria de solicitar um orçamento.",

  // Número de WhatsApp. "numero": só dígitos (país + DDD + número).
  // "rotulo": texto que aparece no botão.
  whatsapps: [
    { rotulo: "WhatsApp vendas", numero: "5547999408590" },
  ],

  // Dois e-mails da empresa
  emails: [
    "produção@etiquetasguabiruba.com.br",
    "vendas@etiquetasguabiruba.com.br",
  ],

  // Instagram da empresa
  instagram: {
    rotulo: "@etiquetasguabiruba",
    url: "https://www.instagram.com/etiquetasguabiruba",
  },
};

/* ======================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  montarContatos();
  ativarHeaderAoRolar();
  ativarMenuMobile();
  ativarRevelacaoAoRolar();
  ativarLinkAtivo();
  gerarFolhas();
  definirAno();
});

/* Monta o link do WhatsApp com a mensagem automática */
function linkWhatsApp(numero) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(CONFIG.mensagem)}`;
}

/* Formata um número brasileiro: 5547999999999 -> (47) 99999-9999 */
function formatarNumero(numero) {
  const d = numero.replace(/\D/g, "").replace(/^55/, ""); // remove país
  const ddd = d.slice(0, 2);
  const resto = d.slice(2);
  const meio = resto.length > 8 ? 5 : 4; // celular (9) ou fixo (8)
  return `(${ddd}) ${resto.slice(0, meio)}-${resto.slice(meio)}`;
}

/* ---------------------------------------------------------------
   1. Preenche todos os pontos de contato a partir do CONFIG.
--------------------------------------------------------------- */
function montarContatos() {
  const principal = CONFIG.whatsapps[0].numero;

  // CTAs gerais de WhatsApp (menu, hero, sobre, botão flutuante) → número principal
  document.querySelectorAll(".js-wa").forEach((el) => {
    el.href = linkWhatsApp(principal);
    el.target = "_blank";
    el.rel = "noopener";
  });

  // Botões da seção de contato → um número para cada
  document.querySelectorAll(".js-wa-num").forEach((el) => {
    const i = Number(el.dataset.waIndex) || 0;
    const wa = CONFIG.whatsapps[i];
    if (!wa) { el.hidden = true; return; }
    el.href = linkWhatsApp(wa.numero);
    el.target = "_blank";
    el.rel = "noopener";
    const label = el.querySelector(".js-wa-label");
    const num = el.querySelector(".js-wa-number");
    if (label) label.textContent = wa.rotulo;
    if (num) num.textContent = formatarNumero(wa.numero);
  });

  // E-mails
  document.querySelectorAll(".js-email").forEach((el) => {
    const i = Number(el.dataset.emailIndex) || 0;
    const email = CONFIG.emails[i];
    if (!email) { el.closest("li")?.remove(); return; }
    el.href = `mailto:${email}`;
    el.textContent = email;
  });

  // Instagram
  document.querySelectorAll(".js-instagram").forEach((el) => {
    const ig = CONFIG.instagram;
    if (!ig || !ig.url) { el.closest("li")?.remove(); return; }
    el.href = ig.url;
    el.target = "_blank";
    el.rel = "noopener";
    el.textContent = ig.rotulo;
  });
}

/* ---------------------------------------------------------------
   2. Cabeçalho fica sólido ao rolar.
--------------------------------------------------------------- */
function ativarHeaderAoRolar() {
  const header = document.getElementById("header");
  const aoRolar = () => header.classList.toggle("is-scrolled", window.scrollY > 40);
  aoRolar();
  window.addEventListener("scroll", aoRolar, { passive: true });
}

/* ---------------------------------------------------------------
   3. Menu mobile: botão, backdrop, tecla Esc e trava de scroll.
--------------------------------------------------------------- */
function ativarMenuMobile() {
  const botao = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");
  const backdrop = document.getElementById("navBackdrop");
  if (!botao || !nav || !backdrop) return;

  const alternar = (abrir) => {
    const estado = abrir ?? !nav.classList.contains("is-open");
    nav.classList.toggle("is-open", estado);
    botao.classList.toggle("is-active", estado);
    backdrop.classList.toggle("is-open", estado);
    botao.setAttribute("aria-expanded", String(estado));
    botao.setAttribute("aria-label", estado ? "Fechar menu" : "Abrir menu");
    document.body.classList.toggle("no-scroll", estado);
  };

  botao.addEventListener("click", () => alternar());
  backdrop.addEventListener("click", () => alternar(false));
  nav.querySelectorAll("a").forEach((l) => l.addEventListener("click", () => alternar(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && nav.classList.contains("is-open")) alternar(false);
  });
  window.matchMedia("(min-width: 881px)").addEventListener("change", (e) => {
    if (e.matches) alternar(false);
  });
}

/* ---------------------------------------------------------------
   4. Revelação suave ao entrar na tela.
--------------------------------------------------------------- */
function ativarRevelacaoAoRolar() {
  const alvos = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    alvos.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const obs = new IntersectionObserver((entradas, o) => {
    entradas.forEach((e) => {
      if (!e.isIntersecting) return;
      const atraso = e.target.dataset.revealDelay || 0;
      setTimeout(() => e.target.classList.add("is-visible"), atraso);
      o.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -60px 0px" });
  alvos.forEach((el) => obs.observe(el));
}

/* ---------------------------------------------------------------
   5. Destaca no menu a seção visível (scrollspy).
--------------------------------------------------------------- */
function ativarLinkAtivo() {
  const secoes = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav__link");
  if (!secoes.length || !("IntersectionObserver" in window)) return;

  const obs = new IntersectionObserver((entradas) => {
    entradas.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === `#${e.target.id}`));
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  secoes.forEach((s) => obs.observe(s));
}

/* ---------------------------------------------------------------
   6. Folhas decorativas no hero (poucas e sutis; respeita reduced-motion).
--------------------------------------------------------------- */
function gerarFolhas() {
  const palco = document.getElementById("heroLeaves");
  if (!palco || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (let i = 0; i < 5; i++) {
    const folha = document.createElement("span");
    folha.className = "leaf";
    const tamanho = 14 + Math.random() * 18;
    folha.style.left = Math.random() * 100 + "%";
    folha.style.width = folha.style.height = tamanho + "px";
    folha.style.animationDuration = 16 + Math.random() * 12 + "s";
    folha.style.animationDelay = -Math.random() * 24 + "s";
    palco.appendChild(folha);
  }
}

/* ---------------------------------------------------------------
   7. Ano atual no rodapé.
--------------------------------------------------------------- */
function definirAno() {
  const alvo = document.getElementById("year");
  if (alvo) alvo.textContent = new Date().getFullYear();
}
