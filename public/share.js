// Progressive enhancement only: content and WhatsApp work without JavaScript.
(() => {
  const trigger = document.querySelector("#share-open");
  const dialog = document.querySelector("#share-dialog");
  if (!trigger || !dialog || typeof dialog.showModal !== "function") return;
  const field = document.querySelector("#share-url");
  const status = document.querySelector("#share-status");
  const copy = document.querySelector("#share-copy");
  const meta = (name) =>
    document.querySelector(`meta[property="${name}"]`)?.content;
  const endpoint = (base, params) => {
    const url = new URL(base);
    for (const [key, value] of Object.entries(params))
      url.searchParams.set(key, value);
    return url.href;
  };
  trigger.hidden = false;
  trigger.addEventListener("click", () => {
    const url =
      document.querySelector('link[rel="canonical"]')?.href || location.href;
    const title = meta("og:title") || document.title;
    const image = new URL(meta("og:image") || "/og/gf10.jpg", url).href;
    const text = `${title}\n${url}`;
    const links = {
      WhatsApp: endpoint("https://wa.me/", { text }),
      Facebook: endpoint("https://www.facebook.com/sharer/sharer.php", {
        u: url,
      }),
      X: endpoint("https://x.com/intent/tweet", { text: title, url }),
      Pinterest: endpoint("https://www.pinterest.com/pin/create/button/", {
        url,
        media: image,
        description: title,
      }),
      LinkedIn: endpoint("https://www.linkedin.com/sharing/share-offsite/", {
        url,
      }),
      Threads: endpoint("https://www.threads.com/intent/post", { text }),
    };
    for (const link of dialog.querySelectorAll("[data-network]"))
      link.href = links[link.dataset.network];
    field.value = url;
    status.textContent = "";
    copy.disabled = false;
    document.querySelector("#share-page-title").textContent = title;
    dialog.showModal();
  });
  document
    .querySelector("#share-close")
    .addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => trigger.focus());
  dialog.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;
    const focusable = [
      ...dialog.querySelectorAll("a[href],button:not([disabled]),input"),
    ];
    const first = focusable[0],
      last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  copy.addEventListener("click", async () => {
    copy.disabled = true;
    status.textContent = "";
    try {
      if (!navigator.clipboard?.writeText)
        throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(field.value);
      status.textContent = "Link copiado.";
    } catch {
      field.focus();
      field.select();
      status.textContent =
        "Não foi possível copiar automaticamente. O link está selecionado: use Copiar no seu dispositivo ou Ctrl+C / Command+C.";
    } finally {
      copy.disabled = false;
    }
  });
  const dock = document.querySelector(".floating-actions");
  const reserve = () =>
    document.documentElement.style.setProperty(
      "--dock-height",
      `${dock.getBoundingClientRect().height}px`,
    );
  reserve();
  if (typeof ResizeObserver === "function")
    new ResizeObserver(reserve).observe(dock);
})();
(() => {
  const section = document.querySelector(".journey");
  if (!section) return;
  const steps = [...section.querySelectorAll(".journey-steps li")];
  const prev = section.querySelector("#journey-prev");
  const next = section.querySelector("#journey-next");
  let current = 0;
  section.querySelector(".journey-controls").hidden = false;
  const update = () => {
    steps.forEach((step, i) => {
      if (i === current) step.setAttribute("aria-current", "step");
      else step.removeAttribute("aria-current");
    });
    prev.disabled = current === 0;
    next.disabled = current === steps.length - 1;
    section.querySelector("#journey-status").textContent =
      `Etapa ${current + 1} de ${steps.length}: ${steps[current].querySelector("h3").textContent}`;
  };
  prev.addEventListener("click", () => {
    if (current > 0) {
      current--;
      update();
    }
  });
  next.addEventListener("click", () => {
    if (current < steps.length - 1) {
      current++;
      update();
    }
  });
})();
