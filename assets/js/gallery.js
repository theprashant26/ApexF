const initGallery = () => {
  document.querySelectorAll("[data-gallery]").forEach((gallery) => {
    const items = [...gallery.querySelectorAll("[data-gallery-item]")];
    const lightbox = gallery.querySelector("[data-lightbox]");
    const lightboxImage = lightbox?.querySelector("[data-lightbox-image]");
    const close = lightbox?.querySelector("[data-lightbox-close]");
    const previous = lightbox?.querySelector("[data-lightbox-previous]");
    const next = lightbox?.querySelector("[data-lightbox-next]");
    let activeIndex = 0;
    let returnFocus = null;
    let touchStartX = 0;

    if (!lightbox || !lightboxImage || !close || !previous || !next) return;
    const visibleItems = () => items.filter((item) => !item.hidden);
    const show = (item) => {
      const visible = visibleItems();
      activeIndex = Math.max(0, visible.indexOf(item));
      const image = item.querySelector("img");
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightbox.hidden = false;
      close.focus();
    };
    const move = (direction) => {
      const visible = visibleItems();
      activeIndex = (activeIndex + direction + visible.length) % visible.length;
      show(visible[activeIndex]);
    };
    const hide = () => {
      lightbox.hidden = true;
      returnFocus?.focus();
    };
    items.forEach((item) => item.addEventListener("click", () => { returnFocus = item; show(item); }));
    close.addEventListener("click", hide);
    previous.addEventListener("click", () => move(-1));
    next.addEventListener("click", () => move(1));
    lightbox.addEventListener("touchstart", (event) => { touchStartX = event.changedTouches[0].screenX; }, { passive: true });
    lightbox.addEventListener("touchend", (event) => { const delta = event.changedTouches[0].screenX - touchStartX; if (Math.abs(delta) > 40) move(delta > 0 ? -1 : 1); }, { passive: true });
    document.addEventListener("keydown", (event) => {
      if (lightbox.hidden) return;
      if (event.key === "Escape") hide();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    });

    gallery.querySelectorAll("[data-gallery-filter]").forEach((filter) => filter.addEventListener("click", () => {
      const category = filter.dataset.galleryFilter;
      gallery.querySelectorAll("[data-gallery-filter]").forEach((button) => button.setAttribute("aria-pressed", String(button === filter)));
      items.forEach((item) => { item.hidden = Boolean(category && item.dataset.category !== category); });
    }));
  });
};

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initGallery);
else initGallery();
