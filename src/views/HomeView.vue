<script setup>
import Hero from "../components/layout/HeroSection.vue";
import Slider from "../components/ui/Slider.vue";
import TopThreeProducts from "../components/layout/TopThreeProductsSection.vue";
import PreviewProducts from "../components/layout/PreviewProductsSection.vue";
import AboutUs from "../components/layout/AboutUsSection.vue";
import RealNumbers from "../components/layout/RealNumbersSection.vue";
import NewInStore from "../components/layout/NewInStoreSection.vue";
</script>

<template>
  <div class="d-flex flex-column">
    <p class="main-title text-center mt-4 mb-4 mb-lg-5 px-3">Svaštaonica</p>

    <Hero />

    <div class="container slider py-0 py-lg-5 p-0">
      <Slider />
    </div>

    <!-- <NewInStore /> -->

    <div class="container mb-5 px-4">
      <h1 class="text-center mt-5" style="font-family: Poiret_One">
        Ono što dobijemo od djetinjstva nisu igračke, već uspomene. A sretne
        uspomene bolje su od bilo koje igračke.
      </h1>
    </div>

    <TopThreeProducts />

    <div class="container mt-5 mb-5 px-4">
      <h1 class="text-center" style="font-family: Poiret_One">
        Darujte djeci igračke koje pokreće njihova mašta, a ne baterije.
      </h1>
    </div>

    <PreviewProducts />

    <div class="container pt-5 mt-lg-5 px-4">
      <h1 class="text-center" style="font-family: Poiret_One">
        Nitko nikada ne zaboravlja igračku koja ga je u djetinjstvu iznimno
        veselila.
      </h1>
    </div>

    <AboutUs />

    <div class="container mt-0 mt-lg-5 px-4">
      <h1 class="text-center" style="font-family: Poiret_One">
        Igračke su dječje riječi, a igra njihov jezik.
      </h1>
    </div>

    <RealNumbers />
  </div>
</template>

<style scoped>
.main-title {
  font-size: 76.28px;
  font-family: "Montserrat";
  font-weight: 300;
}

.slider {
  display: flex;
  justify-content: center;
}

@media (max-width: 991.98px) {
  .main-title {
    font-size: 48.83px;
  }
}
</style>
