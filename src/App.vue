<script setup>
import Navbar from "./components/layout/Navbar.vue";
import Footer from "./components/layout/Footer.vue";
import ScrollToTop from "./components/ui/ScrollToTop.vue";
import SideDecorations from "./components/layout/SideDecorations.vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";

const isNavbarOpen = ref(false);
const route = useRoute();

function updateNavbar() {
  isNavbarOpen.value = !isNavbarOpen.value;
  document.body.classList.toggle("lock-scroll", isNavbarOpen.value);

  const progress = document.getElementById("progress-wrap");
  if (!progress) return;

  if (!isNavbarOpen.value && window.scrollY > 0) {
    progress.classList.add("active-progress");
  } else {
    progress.classList.remove("active-progress");
  }
}

watch(
  () => route.fullPath,
  () => {
    if (isNavbarOpen.value) {
      isNavbarOpen.value = false;
      document.body.classList.remove("lock-scroll");
    }
  }
);
</script>

<template>
  <SideDecorations />
  <Navbar @update-navbar="updateNavbar" />

  <div class="body-div">
    <RouterView :key="$route.fullPath" />
  </div>

  <ScrollToTop />
  <Footer />
</template>
