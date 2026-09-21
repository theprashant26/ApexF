(() => {
  const AX = window.AX = window.AX || {};
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const heroSessionKey = "ax-hero-motion-played";

  const finalise = (targets) => {
    if (!window.gsap || !targets) return;
    window.gsap.set(targets, { clearProps: "all" });
  };

  const initHero = () => {
    const hero = document.querySelector(".ax-home-hero");
    if (!hero || !window.gsap) return;
    const copy = hero.querySelector(".ax-home-hero__copy");
    const kicker = hero.querySelector(".ax-home-hero__kicker");
    const title = hero.querySelector("h1");
    const diagonal = hero.querySelector(".ax-home-hero__diagonal");
    const media = hero.querySelectorAll(".ax-home-hero__media .ax-media");
    if (reducedMotion || sessionStorage.getItem(heroSessionKey)) {
      finalise([copy, kicker, title, diagonal, media]);
      return;
    }
    sessionStorage.setItem(heroSessionKey, "true");
    const timeline = window.gsap.timeline({ defaults: { ease: "power2.out" } });
    timeline.fromTo(kicker, { autoAlpha: 0, y: -12 }, { autoAlpha: 1, y: 0, duration: .35 })
      .fromTo(title, { clipPath: "inset(100% 0 0 0)", y: 20 }, { clipPath: "inset(0% 0 0 0)", y: 0, duration: .8 }, "<.1")
      .fromTo(copy.querySelector(".ax-home-hero__lead"), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: .35 }, "<.2")
      .fromTo(copy.querySelectorAll(".ax-button"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: .3, stagger: .09 }, "<.05")
      .fromTo(diagonal, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: .9 }, "<.05")
      .fromTo(media, { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: .6, stagger: .1 }, "<.05");
  };

  const initMarquee = () => {
    const track = document.querySelector(".ax-marquee__track");
    if (!track || !window.gsap) return;
    if (reducedMotion) {
      track.classList.add("ax-marquee--reduced");
      window.gsap.set(track, { x: 0 });
      return;
    }
    track.classList.add("ax-marquee--gsap");
    const loop = window.gsap.to(track, { xPercent: -50, duration: 38, ease: "none", repeat: -1, paused: true });
    const observer = new IntersectionObserver(([entry]) => entry.isIntersecting ? loop.play() : loop.pause(), { threshold: .05 });
    observer.observe(track);
    track.addEventListener("mouseenter", () => loop.pause());
    track.addEventListener("mouseleave", () => loop.play());
    track.addEventListener("focusin", () => loop.pause());
    track.addEventListener("focusout", () => loop.play());
  };

  const initPathways = () => {
    const section = document.querySelector(".ax-home-pathways");
    const rows = section?.querySelectorAll(".ax-pathway-row");
    if (!section || !rows?.length || !window.gsap || !window.ScrollTrigger || reducedMotion) return;
    window.gsap.set(rows, { autoAlpha: 0, x: -18 });
    window.gsap.to(rows, { autoAlpha: 1, x: 0, stagger: .18, duration: .45, ease: "power2.out", scrollTrigger: { trigger: section, start: "top top", end: "+=150%", scrub: .5, pin: true, anticipatePin: 1 } });
  };

  const initProgrammeBatch = () => {
    const cards = document.querySelectorAll(".ax-programme-card");
    if (!cards.length || !window.gsap || !window.ScrollTrigger) return;
    if (reducedMotion) { finalise(cards); return; }
    window.ScrollTrigger.batch(cards, { start: "top 88%", onEnter: (batch) => window.gsap.fromTo(batch, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: .4, stagger: .02, overwrite: true }) });
  };

  const initRules = () => {
    const rules = document.querySelectorAll(".ax-section__rule");
    if (!rules.length || !window.gsap || !window.ScrollTrigger) return;
    if (reducedMotion) { finalise(rules); return; }
    window.gsap.fromTo(rules, { scaleX: 0 }, { scaleX: 1, duration: .5, stagger: .05, ease: "power2.out", scrollTrigger: { trigger: rules[0], start: "top 85%" } });
  };

  const initHeaderMotion = () => {
    const header = document.querySelector("[data-ax-header]");
    if (!header || !window.gsap) return;
    const update = () => window.gsap.to(header, { duration: .2, paddingBlock: window.scrollY > 80 ? 0 : 0, overwrite: true });
    window.addEventListener("scroll", update, { passive: true });
  };

  const init = () => {
    if (!window.gsap) return;
    window.gsap.ticker.lagSmoothing(0);
    if (window.ScrollTrigger) window.gsap.registerPlugin(window.ScrollTrigger);
    initHero();
    initMarquee();
    initPathways();
    initProgrammeBatch();
    initRules();
    initHeaderMotion();
    let resizeTimer;
    window.addEventListener("resize", () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => window.ScrollTrigger?.refresh(), 180);
    }, { passive: true });
  };

  AX.motion = { init, reducedMotion };
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
