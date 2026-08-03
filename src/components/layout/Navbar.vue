<script setup>
import { RouterLink } from "vue-router";
import NavbarMobile from "./NavbarMobile.vue";
import LanguageSwitcher from "../ui/LanguageSwitcher.vue";
import { ref, onMounted, onUnmounted } from "vue";
import { useI18n } from "@/i18n/useI18n";

const emit = defineEmits(["updateNavbar"]);
const { t } = useI18n();

const isMobile = ref(false);
let mediaQuery;

function syncMobile() {
  isMobile.value = mediaQuery.matches;
}

onMounted(() => {
  mediaQuery = window.matchMedia("(max-width: 991.98px)");
  syncMobile();
  mediaQuery.addEventListener("change", syncMobile);
});

onUnmounted(() => {
  mediaQuery?.removeEventListener("change", syncMobile);
});

function switchMobileNavbar() {
  emit("updateNavbar");
}

function closeMobileNavbar() {
  emit("updateNavbar");
  const collapse = document.querySelector(".navbar-collapse");
  const toggler = document.querySelector(".navbar-toggler");
  if (toggler && window.getComputedStyle(toggler).display !== "none" && collapse) {
    collapse.classList.remove("show");
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="navbar-inner">
      <RouterLink class="navbar-brand" to="/" aria-label="Svaštaonica">
        <img
          class="brand-logo"
          src="/assets/img/brand/svastaonica-logo-1.png"
          alt="Svaštaonica"
          width="200"
          height="133"
        />
      </RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="switchMobileNavbar()"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <NavbarMobile
          v-if="isMobile"
          @close-mobile-navbar="closeMobileNavbar"
        />

        <template v-else>
          <div class="navbar-nav navbar-links">
            <RouterLink class="nav-link site-link" to="/">{{
              t("nav.home")
            }}</RouterLink>
            <RouterLink class="nav-link site-link" to="/gallery">{{
              t("nav.gallery")
            }}</RouterLink>
            <RouterLink class="nav-link site-link" to="/aboutus">{{
              t("nav.about")
            }}</RouterLink>
            <RouterLink class="nav-link site-link" to="/contact">{{
              t("nav.contact")
            }}</RouterLink>
          </div>
          <div class="navbar-end">
            <LanguageSwitcher />
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
  padding: 0.55rem 0.85rem;
  background-color: rgba(237, 228, 242, 0.92);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 1px 0 rgba(80, 50, 100, 0.08);
}

.navbar-inner {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1320px;
  margin: 0 auto;
  gap: 0.5rem;
}

.navbar-brand {
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  text-decoration: none;
  line-height: 0;
  flex-shrink: 0;
}

.brand-logo {
  display: block;
  height: 42px;
  width: auto;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 1px 4px rgba(80, 50, 100, 0.12);
}

.navbar-toggler {
  border: none;
  box-shadow: none;
  padding: 0.35rem 0.45rem;
  margin-left: auto;
}

.navbar-toggler:focus {
  box-shadow: 0 0 0 0.15rem rgba(205, 180, 219, 0.55);
}

.navbar-collapse {
  flex-basis: 100%;
}

.navbar-links {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.85rem 1.25rem;
  flex: 1;
}

.navbar-end {
  display: flex;
  align-items: center;
  flex-shrink: 0;
}

.nav-link {
  display: flex !important;
  justify-content: center;
  margin: 0;
  padding: 0.35rem 0.4rem;
  font-size: 1.35rem !important;
  color: var(--color-text-muted) !important;
  white-space: nowrap;
}

@media (min-width: 992px) {
  .navbar {
    padding: 0.65rem 1.25rem;
  }

  .navbar-inner {
    flex-wrap: nowrap;
    min-height: 64px;
  }

  .brand-logo {
    height: 52px;
    border-radius: 12px;
  }

  .navbar-collapse {
    display: flex !important;
    flex-basis: auto;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  .navbar-links {
    justify-content: center;
  }

  .nav-link {
    font-size: 1.45rem !important;
  }
}

@media (max-width: 991.98px) {
  .navbar-collapse.show {
    margin-top: 0.35rem;
  }
}
</style>
