<script setup>
import Hero from "../components/layout/HeroSection.vue";
import Slider from "../components/ui/Slider.vue";
import TopThreeProducts from "../components/layout/TopThreeProductsSection.vue";
import PreviewProducts from "../components/layout/PreviewProductsSection.vue";
import AboutUs from "../components/layout/AboutUsSection.vue";
import RealNumbers from "../components/layout/RealNumbersSection.vue";
import { useI18n } from "@/i18n/useI18n";

const { t } = useI18n();
</script>

<template>
  <div class="home">
    <h1 class="brand-title">Svaštaonica</h1>

    <Hero />

    <div class="container slider-wrap">
      <Slider />
    </div>

    <div class="container quote-block">
      <p class="quote-text">{{ t("home.quote1") }}</p>
    </div>

    <TopThreeProducts />

    <div class="container quote-block">
      <p class="quote-text">{{ t("home.quote2") }}</p>
    </div>

    <PreviewProducts />

    <div class="container quote-block quote-block--spacious">
      <p class="quote-text">{{ t("home.quote3") }}</p>
    </div>

    <AboutUs />

    <div class="container quote-block">
      <p class="quote-text">{{ t("home.quote4") }}</p>
    </div>

    <RealNumbers />
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
}

.brand-title {
  text-align: center;
  margin: 1.5rem 0 1.25rem;
  padding: 0 1rem;
  font-size: clamp(2.5rem, 6vw, 4.75rem);
  font-family: var(--font-body);
  font-weight: 300;
  letter-spacing: -0.02em;
}

.slider-wrap {
  display: flex;
  justify-content: center;
  padding: 0;
}

.quote-block {
  margin: 2rem auto;
  padding: 0 1.25rem;
  max-width: 900px;
}

.quote-block--spacious {
  margin-top: 3rem;
}

@media (min-width: 992px) {
  .brand-title {
    margin: 1.75rem 0 2rem;
  }

  .slider-wrap {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  .quote-block {
    margin: 2.5rem auto;
  }
}
</style>
