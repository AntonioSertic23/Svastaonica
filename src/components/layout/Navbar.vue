<script setup>
import { RouterLink } from "vue-router";
import NavbarMobile from "./NavbarMobile.vue";
import { ref } from "vue";
import SearchBar from "../ui/SearchBar.vue";

// defining emits so we can call them from this script tags
const emit = defineEmits(["updateNavbar"]);

var isMobile = ref(false);

// we see screen width end set which navbar to use (desktop or mobile)
if ($(window).width() < 992) {
  isMobile.value = true;
} else {
  isMobile.value = false;
}
// when screen is resized we check screen width again to set right navbar
$(window).on("resize", function () {
  if ($(window).width() < 992) {
    isMobile.value = true;
  } else {
    isMobile.value = false;
  }
});

// if MOBILE navbar button is pressed we emit to update navbar
function switchMobileNavbar() {
  emit("updateNavbar");
}

// if link in MOBILE navbar is pressed this is function that is called after emit
function closeMobileNavbar() {
  emit("updateNavbar");
  if ($(".navbar-toggler").is(":visible")) {
    $(".navbar-collapse").collapse("toggle");
  }
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light py-4 px-3">
    <div class="container-fluid">
      <a
        class="navbar-brand"
        v-bind:class="isMobile ? 'navbar-brand-mobile' : ''"
        href="#"
        >Svaštaonica</a
      >
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

        <div v-if="!isMobile" class="navbar-nav mx-auto">
          <RouterLink class="nav-link" to="/">Početna</RouterLink>
          <RouterLink class="nav-link" to="/gallery">Galerija</RouterLink>
          <RouterLink class="nav-link" to="/aboutus">O nama</RouterLink>
          <RouterLink class="nav-link" to="/contact">Kontakt</RouterLink>
          <!-- <RouterLink class="nav-link" to="/blog">Blog</RouterLink> -->
        </div>
        <div
          v-if="!isMobile"
          class="ms-auto navbar-search-div d-flex me-lg-3 pe-4"
        >
          <SearchBar :isForNavbar="true" />
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  min-height: 62px;
  position: relative;
}

.navbar-brand {
  font-weight: 600;
  font-size: 25px;
  color: #222;
}
.navbar-brand-mobile {
  font-size: 20px;
}

.navbar-nav {
  gap: 1rem;
}

.nav-link {
  display: flex !important;
  justify-content: center;
  margin-top: 3px;
  margin-bottom: 3px;
  font-size: 25px !important;
  color: #444 !important;
}

/* kad je mobile */
@media (max-width: 992px) {
  .navbar {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
    background-color: #ede4f2;
  }
}

/* podigne lijevu i desnu stranu da bi ovo uzelo u sredini cijelu duzinu i onda postavi u sredinu */
@media (min-width: 992px) {
  .navbar-brand,
  .navbar-search-div {
    position: absolute;
  }

  .navbar-search-div {
    right: 0;
  }
}
</style>
