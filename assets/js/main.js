(() => {
  const AX = window.AX = window.AX || {};
  AX.init = () => {
    document.documentElement.classList.add("ax-ready");
  };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", AX.init);
  else AX.init();
})();
