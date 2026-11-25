/* Medicinal Co — Preloader, subtle scroll reveals, live search, doctor modal & WhatsApp form */
(function () {
  /* 1. Frosted Preloader (smooth exit after load) */
  var preloader = document.getElementById("preloader");
  if (preloader) {
    var hideLoader = function () {
      preloader.classList.add("is-hidden");
      setTimeout(function () {
        if (preloader.parentNode) preloader.setAttribute("aria-hidden", "true");
      }, 600);
    };
    window.addEventListener("load", function () {
      setTimeout(hideLoader, 420);
    });
    /* Safety fallback in case load event already fired or slow asset */
    setTimeout(hideLoader, 2400);
  }

  /* 2. Subtle Scroll-Reveal Animations (IntersectionObserver) */
  var revealEls = document.querySelectorAll("[data-reveal]");
  if (revealEls.length) {
    if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -36px 0px" });
      revealEls.forEach(function (el) { io.observe(el); });
    } else {
      revealEls.forEach(function (el) { el.classList.add("is-visible"); });
    }
  }

  /* 3. Mobile navigation toggle */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* 4. Live Service Search in Utility Bar */
  var services = [
    { name: "Ultrasound-Doppler", cat: "Diagnostics", href: "services.html#ultrasound-doppler" },
    { name: "X-Rays", cat: "Diagnostics", href: "services.html#x-rays" },
    { name: "CMC X-Ray / USG Home Services", cat: "Home Care", href: "services.html#home-imaging" },
    { name: "MOT – Minor Operation Theater", cat: "Emergency", href: "services.html#mot" },
    { name: "General Surgery", cat: "Emergency", href: "services.html#general-surgery" },
    { name: "Dentistry", cat: "Dental", href: "services.html#dentistry" },
    { name: "Derma, Aesthetics & Laser", cat: "Skin", href: "services.html#derma-aesthetics-laser" },
    { name: "Plastic Surgery", cat: "Skin", href: "services.html#plastic-surgery" },
    { name: "Medical Specialist (Family Medicine)", cat: "OPD", href: "services.html#medical-specialist" },
    { name: "CMC Home Care Nursing", cat: "Home Care", href: "services.html#home-care-nursing" },
    { name: "Physiotherapy & Spine Center", cat: "OPD", href: "services.html#physiotherapy" },
    { name: "Ophthalmology (Eye Care)", cat: "OPD", href: "services.html#ophthalmology" },
    { name: "Pediatrics & Neonatal", cat: "OPD", href: "services.html#pediatrics" },
    { name: "Gynecology", cat: "OPD", href: "services.html#gynecology" },
    { name: "Diet & Nutrition", cat: "OPD", href: "services.html#diet-nutrition" },
    { name: "Urology", cat: "OPD", href: "services.html#urology" },
    { name: "ENT (Ear, Nose & Throat)", cat: "OPD", href: "services.html#ent" },
    { name: "Psychiatrist (Mental Health)", cat: "OPD", href: "services.html#psychiatrist" },
    { name: "Orthopedics (Bones & Joints)", cat: "OPD", href: "services.html#orthopedics" },
    { name: "Gastroenterology", cat: "OPD", href: "services.html#gastroenterology" },
    { name: "Neurology", cat: "OPD", href: "services.html#neurology" },
    { name: "Cardiology (Heart)", cat: "OPD", href: "services.html#cardiology" },
    { name: "In-House Pharmacy", cat: "Pharmacy", href: "services.html#pharmacy" }
  ];

  var searchInput = document.getElementById("service-search");
  var searchResults = document.getElementById("search-results");
  var searchForm = document.getElementById("service-search-form");

  function renderResults(query) {
    if (!searchResults) return;
    var q = query.trim().toLowerCase();
    if (!q) {
      searchResults.innerHTML = "";
      searchResults.classList.remove("is-open");
      return;
    }
    var matches = services.filter(function (s) {
      return s.name.toLowerCase().indexOf(q) !== -1 || s.cat.toLowerCase().indexOf(q) !== -1;
    }).slice(0, 7);

    if (matches.length === 0) {
      searchResults.innerHTML = '<li class="no-hit">No matching service. <a href="services.html">Browse all services</a></li>';
    } else {
      searchResults.innerHTML = matches.map(function (m) {
        return '<li><a href="' + m.href + '"><span>' + m.name + '</span><span class="cat">' + m.cat + '</span></a></li>';
      }).join("");
    }
    searchResults.classList.add("is-open");
  }

  if (searchInput && searchResults) {
    searchInput.addEventListener("input", function () { renderResults(searchInput.value); });
    searchInput.addEventListener("focus", function () { if (searchInput.value.trim()) renderResults(searchInput.value); });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".search-box")) searchResults.classList.remove("is-open");
    });
  }

  if (searchForm && searchInput) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var firstLink = searchResults && searchResults.querySelector("li a");
      window.location.href = firstLink ? firstLink.getAttribute("href") : "services.html";
    });
  }

  /* 5. Doctor Profile Modal (on about.html) */
  var modal = document.getElementById("doctor-modal");
  if (modal) {
    var mName = document.getElementById("modal-doc-name");
    var mDept = document.getElementById("modal-doc-dept");
    var mRole = document.getElementById("modal-doc-role");
    var mBio = document.getElementById("modal-doc-bio");
    var mClose = modal.querySelector(".modal-close");

    document.querySelectorAll(".btn-readmore").forEach(function (btn) {
      btn.addEventListener("click", function () {
        mName.textContent = btn.getAttribute("data-name") || "";
        mDept.textContent = btn.getAttribute("data-dept") || "";
        mRole.textContent = btn.getAttribute("data-role") || "";
        mBio.textContent = btn.getAttribute("data-bio") || "";
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
      });
    });

    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
    }

    if (mClose) mClose.addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });
  }

  /* 6. Contact form -> WhatsApp / optional mailto */
  var form = document.getElementById("visit-form");
  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var name = form.name.value.trim();
      var phone = form.phone.value.trim();
      var message = form.message.value.trim();
      var status = document.getElementById("form-status");

      if (name.length < 2 || phone.length < 7 || message.length < 5) {
        status.textContent = "Please add your name, a reachable phone number, and a short message.";
        return;
      }

      var text = "Hello Medicinal Co. My name is " + name + ". Phone: " + phone + ". Message: " + message.slice(0, 500);
      var wa = "https://wa.me/923170070079?text=" + encodeURIComponent(text);
      status.textContent = "Opening WhatsApp with your message.";

      var email = form.getAttribute("data-email") || "";
      var opened = window.open(wa, "_blank", "noopener,noreferrer");
      if (!opened) window.location.href = wa;
      if (email.indexOf("@") !== -1 && email.indexOf("PLACEHOLDER") === -1) {
        window.location.href = "mailto:" + email + "?subject=" + encodeURIComponent("Visit enquiry from " + name) + "&body=" + encodeURIComponent(text);
      }
    });
  }

  /* 7. Back to top */
  var topBtn = document.querySelector(".to-top");
  if (topBtn) {
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();
