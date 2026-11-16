(function () {
  var root = document.documentElement;

  // Ano no rodapé
  document.getElementById("ano-atual").textContent = new Date().getFullYear();

  // Tema claro/escuro (lembrado no navegador)
  function currentTheme() {
    if (root.dataset.theme) return root.dataset.theme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.getElementById("theme-toggle").addEventListener("click", function () {
    var next = currentTheme() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // Atalhos de teclado: P, G, L
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;
    var tag = (e.target.tagName || "").toLowerCase();
    if (tag === "input" || tag === "textarea") return;
    var link = document.querySelector('a[data-key="' + e.key.toLowerCase() + '"]');
    if (!link) return;
    if (link.target === "_blank") window.open(link.href, "_blank", "noopener");
    else window.location.href = link.href;
  });

  // Status: último push público no GitHub
  function ago(date) {
    var days = Math.floor((Date.now() - date.getTime()) / 86400000);
    if (days < 1) return "hoje";
    if (days === 1) return "ontem";
    if (days < 30) return "há " + days + " dias";
    var months = Math.floor(days / 30);
    if (months < 12) return months === 1 ? "há 1 mês" : "há " + months + " meses";
    var years = Math.floor(days / 365);
    return years === 1 ? "há 1 ano" : "há " + years + " anos";
  }

  fetch("https://api.github.com/users/rillis/repos?per_page=100&sort=pushed")
    .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
    .then(function (repos) {
      var latest = repos.filter(function (r) { return r.name !== "rillis"; })[0];
      if (!latest) return;
      var el = document.getElementById("status");
      el.textContent = "último push: " + latest.name + " · " + ago(new Date(latest.pushed_at));
      el.title = new Date(latest.pushed_at).toLocaleString("pt-BR");
    })
    .catch(function () { /* mantém o texto padrão */ });
})();
