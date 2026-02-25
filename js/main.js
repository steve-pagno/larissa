// Marca o link ativo e lida com formulários
(function () {
    const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
    document.querySelectorAll('a[data-nav]').forEach((a) => {
        const href = (a.getAttribute('href') || '').toLowerCase();
        if (href === path) a.setAttribute('aria-current', 'page');
    });

    document.querySelectorAll('[data-form]').forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const original = btn?.textContent;
            if (btn) {
                btn.textContent = 'Enviado ✓';
                btn.disabled = true;
            }
            setTimeout(() => {
                form.reset();
                if (btn) {
                    btn.textContent = original || 'Enviar';
                    btn.disabled = false;
                }
            }, 1600);
        });
    });
})();

class DommeHeader extends HTMLElement {
    connectedCallback() {
        const path = window.location.pathname;
        const page = path.split("/").pop() || "index.html";

        this.innerHTML = `
        <header>
            <div class="overlay" data-overlay></div>
            <nav>
                <div class="logo">
                    <a href="index.html" style="text-decoration: none; color: #000;">Estúdio Domme</a>
                </div>
                <button class="burger" data-burger aria-expanded="false" aria-label="Abrir menu">
                    <span class="burger-icon" aria-hidden="true"></span>
                </button>
                <div class="nav-links" data-drawer>
                    <a href="index.html" data-nav class="${page === 'index.html' ? 'selecionada' : ''}">Home</a>
                    <a href="lancamentos.html" data-nav class="${page === 'lancamentos.html' ? 'selecionada' : ''}">Lançamentos</a>
                    <a href="produtos.html" data-nav class="${page === 'produtos.html' ? 'selecionada' : ''}">Produtos</a>
                    <a href="videos.html" data-nav class="${page === 'videos.html' ? 'selecionada' : ''}">Vídeos</a>
                    <a href="sobre.html" data-nav class="${page === 'sobre.html' ? 'selecionada' : ''}">Marca</a>
                    <a href="projetos.html" data-nav class="${page === 'projetos.html' ? 'selecionada' : ''}">Projetos</a>
                    <a href="corporativo.html" data-nav class="${page === 'corporativo.html' ? 'selecionada' : ''}">Corporativo</a>
                    <a href="contato.html" data-nav class="${page === 'contato.html' ? 'selecionada' : ''}">Contato</a>
                    <div class="search-wrapper" id="searchWrapper">
                        <form id="searchForm" class="search-form-inline">
                            <input type="text" id="searchInput" placeholder="Buscar..." autocomplete="off">
                            <button type="button" id="searchToggle" aria-label="Abrir pesquisa">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </button>
                        </form>
                    </div>
                    <a href="#" class="insta-link"><i class="fa-brands fa-instagram"></i></a>
                </div>
            </nav>
        </header>`;
        this.initMobileMenu();
        this.initSearch();
    }

    initSearch() {
        const wrapper = this.querySelector('#searchWrapper');
        const toggleBtn = this.querySelector('#searchToggle');
        const icon = toggleBtn?.querySelector('i');
        const input = this.querySelector('#searchInput');
        const form = this.querySelector('#searchForm');
        if (!toggleBtn || !wrapper) return;

        toggleBtn.addEventListener('click', (e) => {
            if (!wrapper.classList.contains('active')) {
                e.preventDefault();
                wrapper.classList.add('active');
                icon?.classList.replace('fa-magnifying-glass', 'fa-xmark');
                setTimeout(() => input?.focus(), 100);
            } else if (input?.value.trim() === "") {
                wrapper.classList.remove('active');
                icon?.classList.replace('fa-xmark', 'fa-magnifying-glass');
            } else {
                form?.dispatchEvent(new Event('submit'));
            }
        });

        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target) && wrapper.classList.contains('active')) {
                wrapper.classList.remove('active');
                icon?.classList.replace('fa-xmark', 'fa-magnifying-glass');
            }
        });

        form?.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = input?.value.trim();
            if (query) window.location.href = `produtos.html?search=${encodeURIComponent(query)}`;
        });
    }

    initMobileMenu() {
        const burger = this.querySelector('[data-burger]');
        const drawer = this.querySelector('[data-drawer]');
        const overlay = this.querySelector('[data-overlay]');
        if (!burger || !drawer || !overlay) return;

        const closeDrawer = () => {
            drawer.classList.remove('open');
            overlay.classList.remove('open');
            burger.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('no-scroll');
        };

        const openDrawer = () => {
            drawer.classList.add('open');
            overlay.classList.add('open');
            burger.setAttribute('aria-expanded', 'true');
            document.body.classList.add('no-scroll');
        };

        burger.addEventListener('click', () => {
            const isOpen = drawer.classList.contains('open');
            isOpen ? closeDrawer() : openDrawer();
        });

        overlay.addEventListener('click', closeDrawer);
        drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeDrawer));
    }
}
customElements.define('domme-header', DommeHeader);

class DommeFooter extends HTMLElement {
    connectedCallback() {
        const anoAtual = new Date().getFullYear();
        this.innerHTML = `
        <footer>
            <div class="footer-grid">
                <div class="footer-col">
                    <div class="logo" style="margin-bottom: 20px;">Estúdio Domme</div>
                    <p style="color: #999; font-size: 14px; max-width: 250px;">Criando espaços que inspiram desde 2010. Design brasileiro com alma global.</p>
                </div>
                <div class="footer-col">
                    <h4>Navegação</h4>
                    <ul>
                        <li><a href="index.html">Home</a></li>
                        <li><a href="sobre.html">Sobre a Marca</a></li>
                        <li><a href="produtos.html">Coleção Completa</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Atendimento</h4>
                    <ul>
                        <li><a href="contato.html">Contato</a></li>
                        <li><a href="faq.html">FAQ</a></li>
                        <li><a href="#">Garantia e Cuidados</a></li>
                    </ul>
                </div>
                <div class="footer-col">
                    <h4>Redes Sociais</h4>
                    <ul>
                        <li><a href="#">Instagram</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <span>&copy; ${anoAtual} Estúdio Domme</span>
                <span>Desenvolvido por Mellonry</span>
            </div>
        </footer>`;
    }
}
customElements.define('domme-footer', DommeFooter);

/* --- Carrossel de Ícones --- */
document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector('.carrossel-track');
    const items = document.querySelectorAll('.carrossel-item');
    const prevBtn = document.querySelector('.seta-esq');
    const nextBtn = document.querySelector('.seta-dir');
    const barraAtiva = document.querySelector('.barra-progresso-ativa');
    if (!track || items.length === 0) return;

    let currentIndex = 0;
    function updateCarousel() {
        let itemsVisible = (window.innerWidth <= 768) ? 2 : (window.innerWidth <= 1024 ? 4 : 6);
        const maxIndex = Math.max(0, items.length - itemsVisible);
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        const percentageToMove = (100 / itemsVisible) * currentIndex;
        track.style.transform = `translateX(-${percentageToMove}%)`;
        if (barraAtiva) {
            barraAtiva.style.width = `${(itemsVisible / items.length) * 100}%`;
            barraAtiva.style.left = `${(currentIndex / items.length) * 100}%`;
        }
    }

    function nextSlide() {
        let itemsVisible = (window.innerWidth <= 768) ? 2 : (window.innerWidth <= 1024 ? 4 : 6);
        if (currentIndex + itemsVisible < items.length) {
            currentIndex += itemsVisible;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }

    nextBtn?.addEventListener('click', () => { nextSlide(); resetTimer(); });
    prevBtn?.addEventListener('click', () => {
        let itemsVisible = (window.innerWidth <= 768) ? 2 : (window.innerWidth <= 1024 ? 4 : 6);
        currentIndex = (currentIndex - itemsVisible < 0) ? Math.max(0, items.length - itemsVisible) : currentIndex - itemsVisible;
        updateCarousel();
        resetTimer();
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
    let timer = setInterval(nextSlide, 5000);
    function resetTimer() { clearInterval(timer); timer = setInterval(nextSlide, 5000); }
});

/* --- Carrossel de Retratos (Autores/Designers) - Salto de 4 em 4 --- */
document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector('.carrossel-track-retratos');
    const items = document.querySelectorAll('.retrato-item-wrapper');
    const prevBtn = document.querySelector('.seta-esq-retratos');
    const nextBtn = document.querySelector('.seta-dir-retratos');
    const barraAtiva = document.querySelector('.barra-progresso-ativa-retratos');
    if (!track || items.length === 0) return;

    let currentIndex = 0;
    function updateCarousel() {
        // Agora sempre 4 itens visíveis (Desktop e Mobile)
        const itemsVisible = 4;
        const maxIndex = Math.max(0, items.length - itemsVisible);
        if (currentIndex > maxIndex) currentIndex = maxIndex;

        const moveAmount = (100 / itemsVisible) * currentIndex;
        track.style.transform = `translateX(-${moveAmount}%)`;

        if (barraAtiva) {
            const barraWidth = (itemsVisible / items.length) * 100;
            const barraPos = (currentIndex / items.length) * 100;
            barraAtiva.style.width = `${barraWidth}%`;
            barraAtiva.style.left = `${barraPos}%`;
        }
    }

    function nextSlide() {
        const itemsVisible = 4;
        // Se houver mais 4 itens à frente, salta 4. Se não, volta ao início.
        if (currentIndex + itemsVisible < items.length) {
            currentIndex += itemsVisible;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }

    nextBtn?.addEventListener('click', () => { nextSlide(); resetTimer(); });
    prevBtn?.addEventListener('click', () => {
        const itemsVisible = 4;
        if (currentIndex - itemsVisible >= 0) {
            currentIndex -= itemsVisible;
        } else {
            currentIndex = Math.max(0, items.length - itemsVisible);
        }
        updateCarousel();
        resetTimer();
    });

    window.addEventListener('resize', updateCarousel);
    updateCarousel();
    let timer = setInterval(nextSlide, 5000);
    function resetTimer() { clearInterval(timer); timer = setInterval(nextSlide, 5000); }
});

/* --- Carrossel de Destaque Central --- */
document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll('.destaque-item');
    const prevBtn = document.querySelector('.seta-esq-dest');
    const nextBtn = document.querySelector('.seta-dir-dest');
    const barraAtiva = document.querySelector('.barra-progresso-ativa-dest');
    if (items.length === 0) return;

    let current = 0;
    function update() {
        items.forEach((item, i) => {
            item.classList.remove('ativo', 'esq', 'dir', 'escondido');
            if (i === current) item.classList.add('ativo');
            else if (i === (current - 1 + items.length) % items.length) item.classList.add('esq');
            else if (i === (current + 1) % items.length) item.classList.add('dir');
            else item.classList.add('escondido');
        });
        if (barraAtiva) {
            barraAtiva.style.width = `${100 / items.length}%`;
            barraAtiva.style.left = `${(current / items.length) * 100}%`;
        }
    }

    function autoNext() { current = (current + 1) % items.length; update(); }
    nextBtn?.addEventListener('click', () => { autoNext(); resetTimer(); });
    prevBtn?.addEventListener('click', () => { current = (current - 1 + items.length) % items.length; update(); resetTimer(); });

    update();
    let timer = setInterval(autoNext, 5000);
    function resetTimer() { clearInterval(timer); timer = setInterval(autoNext, 5000); }
});

/* --- Galeria de Produtos --- */
document.addEventListener("DOMContentLoaded", () => {
    const mainImg = document.querySelector('.imagem-principal img');
    const thumbnails = document.querySelectorAll('.thumb');
    if (!mainImg) return;
    thumbnails.forEach(thumb => {
        thumb.addEventListener('click', () => {
            mainImg.src = thumb.src;
            thumbnails.forEach(t => t.classList.remove('ativa'));
            thumb.classList.add('ativa');
        });
    });
});

/* --- Menu de Compartilhamento --- */
document.addEventListener("DOMContentLoaded", () => {
    const btnShare = document.querySelector('#btnCompartilhar');
    const shareMenu = document.querySelector('#shareMenu');
    if (btnShare && shareMenu) {
        btnShare.addEventListener('click', (e) => { e.stopPropagation(); shareMenu.classList.toggle('active'); });
        document.addEventListener('click', () => shareMenu.classList.remove('active'));
    }
});

function sharePage(plataforma) {
    const url = encodeURIComponent(window.location.href);
    const titulo = encodeURIComponent(document.title);
    let link = "";
    switch (plataforma) {
        case 'whatsapp': link = `https://api.whatsapp.com/send?text=${titulo}%20${url}`; break;
        case 'facebook': link = `https://www.facebook.com/sharer/sharer.php?u=${url}`; break;
        case 'email': link = `mailto:?subject=${titulo}&body=${url}`; break;
        case 'copy': navigator.clipboard.writeText(window.location.href); return;
    }
    if (link) window.open(link, '_blank');
}

/* =========================================================
   BUSCA: lê ?search= e FILTRA os produtos em produtos.html
   ========================================================= */
document.addEventListener("DOMContentLoaded", () => {
    const page = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    if (page !== "produtos.html") return;

    const params = new URLSearchParams(window.location.search);
    const queryRaw = params.get("search") || "";
    const query = queryRaw.trim().toLowerCase();
    if (!query) return;

    // Preenche o input do header com o termo buscado (se o header já estiver na DOM)
    const headerSearchInput = document.querySelector("#searchInput");
    if (headerSearchInput) headerSearchInput.value = queryRaw;

    // Cards de produto (seletor principal)
    let items = Array.from(document.querySelectorAll(".produto-item-mini"));

    // Fallback caso em algum layout a classe seja diferente
    if (items.length === 0) {
        items = Array.from(document.querySelectorAll("[data-produto], .produto-item, .card-produto"));
    }
    if (items.length === 0) return;

    let visibleCount = 0;

    items.forEach((item) => {
        // Nome do produto (seletor principal + fallback)
        const name =
            item.querySelector(".produto-nome-mini")?.textContent ||
            item.querySelector(".produto-nome")?.textContent ||
            item.querySelector("h3, h4, h2")?.textContent ||
            "";

        // Complemento (alt da imagem, etc.)
        const alt = item.querySelector("img")?.alt || "";
        const haystack = (name + " " + alt).toLowerCase();

        const match = haystack.includes(query);
        item.style.display = match ? "" : "none";
        if (match) visibleCount++;
    });

    // Mensagem de estado ("Resultados" / "Nenhum resultado")
    const container =
        document.querySelector(".secao-grade-produtos .grade-container") ||
        document.querySelector(".secao-grade-produtos") ||
        document.querySelector(".grade-container") ||
        document.querySelector("main");

    if (container) {
        let empty = document.querySelector("#searchEmptyState");
        if (!empty) {
            empty = document.createElement("div");
            empty.id = "searchEmptyState";
            empty.style.padding = "18px 0";
            empty.style.opacity = "0.8";
            container.appendChild(empty);
        }

        empty.textContent =
            visibleCount === 0
                ? `Nenhum resultado para: "${queryRaw}"`
                : `Resultados para: "${queryRaw}" (${visibleCount})`;

        empty.style.display = "block";
    }
});