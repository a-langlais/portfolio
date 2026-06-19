(function () {
  const script = document.currentScript;
  const basePath = script && script.dataset.base ? script.dataset.base : "";
  const path = (value) => `${basePath}${value}`;

  class SiteHeader extends HTMLElement {
    connectedCallback() {
      if (this.dataset.rendered) {
        return;
      }

      this.dataset.rendered = "true";
      this.innerHTML = `
        <header id="header">
          <div id="head" class="parallax" parallax-speed="2">
            <h1 id="logo" class="text-center">
              <a href="${path("index.html")}">
                <img class="img-circle" src="${path("images/profile-pic.png")}" alt="Photo d'Alexandre Langlais">
              </a>
              <span class="title">Alexandre LANGLAIS<br></span>
              <span class="tagline">Ingénieur écologue & Biostatisticien</span>
            </h1>
          </div>
        </header>
      `;
    }
  }

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      if (this.dataset.rendered) {
        return;
      }

      this.dataset.rendered = "true";
      const year = new Date().getFullYear();
      this.innerHTML = `
        <footer id="footer">
          <div class="container">
            <div class="row">
              <div class="col-md-3 widget">
                <h3 class="widget-title">Contact</h3>
                <div class="widget-body">
                  <p><a href="mailto:langlais.alexandre03@gmail.com">langlais.alexandre03@gmail.com</a><br>
                    Niort, France
                  </p>
                </div>
              </div>

              <div class="col-md-3 widget">
                <h3 class="widget-title">Mes réseaux</h3>
                <div class="widget-body">
                  <p class="follow-me-icons">
                    <a href="https://www.linkedin.com/in/alexlanglais/" aria-label="LinkedIn"><i class="fab fa-linkedin fa-2"></i></a>
                    <a href="https://github.com/a-langlais" aria-label="GitHub"><i class="fab fa-github fa-2"></i></a>
                  </p>
                </div>
              </div>

              <div class="col-md-6 widget">
                <h3 class="widget-title">A propos du site</h3>
                <div class="widget-body">
                  <p>Site web codé à la sueur de mon front lors de froides soirées hivernales.</p>
                  <p>Site web statique léger, à faible utilisation énergétique pour un impact environnemental minimal.</p>
                  <p>Modèle de site web open-source, libre de copie et modification par quiconque le souhaite. Hébergé et déployé sur mon GitHub en public.</p>
                </div>
              </div>
            </div>
          </div>
        </footer>

        <footer id="underfooter">
          <div class="container">
            <div class="row">
              <div class="col-md-6 widget">
                <div class="widget-body">
                  <p>Niort, France</p>
                </div>
              </div>

              <div class="col-md-6 widget">
                <div class="widget-body">
                  <p class="text-right">
                    Copyright &copy; ${year}, Alexandre LANGLAIS<br>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      `;
    }
  }

  if (!customElements.get("site-header")) {
    customElements.define("site-header", SiteHeader);
  }

  if (!customElements.get("site-footer")) {
    customElements.define("site-footer", SiteFooter);
  }

  const markProjectPage = () => {
    if (
      document.querySelector(".maincontent") &&
      document.querySelector(".sidebar")
    ) {
      document.body.classList.add("project-page");
    }
  };

  const initDeferredFrames = () => {
    document.querySelectorAll("[data-iframe-src]").forEach((wrapper) => {
      const button = wrapper.querySelector("[data-load-iframe]");
      if (!button) {
        return;
      }

      button.addEventListener(
        "click",
        () => {
          const iframe = document.createElement("iframe");
          iframe.className = "interactive-iframe";
          iframe.src = wrapper.dataset.iframeSrc;
          iframe.title = wrapper.dataset.iframeTitle || "Visualisation interactive";
          iframe.loading = "lazy";

          wrapper.replaceChildren(iframe);
          wrapper.classList.add("is-loaded");
        },
        { once: true }
      );
    });
  };

  const initPage = () => {
    markProjectPage();
    initDeferredFrames();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initPage);
  } else {
    initPage();
  }
})();
