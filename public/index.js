const navContainer = document.querySelector(".nav-container");
const navBtn = document.querySelector(".nav-btn");
const navList = document.querySelector(".nav-list");
const footerList = document.querySelector(".footer-list");
const ctaLink = document.querySelectorAll(".cta-link");
const questionContainer = document.querySelector(".question-container");
const benefit = document.querySelectorAll(".hidden-element");
const slides = document.querySelectorAll(".scroll-slide");
const slideBtn = document.querySelector(".next-slide");
const dotContainer = document.querySelector(".dot-container");
function Grand_Function() {
  const toggleNav = function () {
    navContainer.classList.toggle("-translate-x-1/4");
    navContainer.classList.toggle("-translate-x-full");
  };

  navBtn.addEventListener("click", function (e) {
    const closeNav = e.currentTarget.querySelector(".close-nav");
    const openNav = e.currentTarget.querySelector(".open-nav");
    const toggleBtn = function () {
      openNav?.classList.toggle("hidden");
      closeNav?.classList.toggle("hidden");
    };
    if (e.target.classList.contains("open-nav")) {
      toggleNav();
      toggleBtn();
    }
    if (e.target.classList.contains("close-nav")) {
      toggleNav();
      toggleBtn();
    }
  });

  navList.addEventListener("click", function (e) {
    e.preventDefault();
    const links = e.target.closest("a");

    if (!links) return;
    e.currentTarget
      .querySelectorAll("a")
      .forEach((link) => link.classList.remove("font-bold"));
    const id = links.href.split("#")[1];
    if (links) {
      document.getElementById(`${id}`).scrollIntoView({ behavior: "smooth" });
      navBtn
        .querySelectorAll("svg")
        .forEach((btn) => btn.classList.toggle("hidden"));
      toggleNav();
      // links.classList.add("font-bold");
    }
  });
  footerList.addEventListener("click", function (e) {
    e.preventDefault();
    const links = e.target.closest("a");
    if (!links) return;
    e.currentTarget
      .querySelectorAll("a")
      .forEach((link) => link.classList.remove("font-bold"));
    const id = links.href.split("#")[1];
    if (links) {
      document.getElementById(`${id}`).scrollIntoView({ behavior: "smooth" });
    }
  });

  ctaLink.forEach((link) =>
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const id = link.href.split("#")[1];
      document.getElementById(`${id}`).scrollIntoView({ behavior: "smooth" });
    })
  );

  questionContainer.addEventListener("click", function (e) {
    const question = e.target.closest(".question");
    e.currentTarget.querySelectorAll(".answer").forEach((ans) => {
      ans.classList.add("hidden");
      ans.classList.remove("border-b-2");
    });
    if (!question) return;
    const answer = question.nextElementSibling;
    if (question) {
      answer.classList.toggle("hidden");
    }
  });

  const courseBenefictObserver = function (entry, observer) {
    entry.forEach((en) => {
      setTimeout(() => {
        if (en.isIntersecting) {
          const el = en.target.querySelector("p");
          en.target.classList.add("active-benefit");
          el.classList.remove("hidden");
        }
      }, 3000);
      // observer.unobserve(en.target);
    });
  };
  const observer = new IntersectionObserver(courseBenefictObserver, {
    threshold: [0.12, 0],
    rootMargin: "0px",
  });

  benefit.forEach((el) => observer.observe(el));
  const gotoSlide = function (sl) {
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - sl) * 100}%)`;
    });
    slides[0].style.position = "initial";
  };
  const getDot = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button
    class="h-4 w-4 rounded-full cursor-pointer bg-neutral-400  slide-dot"
    data-slide=${i}
  ></button>`
      );
    });
  };
  const activateDot = function (slide) {
    const dots = dotContainer.querySelectorAll(".slide-dot");
    dots.forEach((dot) => dot.classList.remove("active-slide"));
    dots[slide].classList.add("active-slide");
  };

  getDot();
  gotoSlide(0);
  activateDot(0);
  let currSlide = 0;
  const slideNum = slides.length - 1;
  const nextSlide = function () {
    if (slideNum > currSlide) {
      currSlide++;
    } else {
      currSlide = 0;
    }
    gotoSlide(currSlide);
    activateDot(currSlide);
  };

  slideBtn.addEventListener("click", nextSlide);
  dotContainer.addEventListener("click", function (e) {
    if (!e.target.classList.contains("slide-dot")) return;
    const slide = Number(e.target.dataset.slide);
    if (!Number) return;
    gotoSlide(slide);
    activateDot(slide);
  });
  setInterval(nextSlide, 5000);
}
Grand_Function();
