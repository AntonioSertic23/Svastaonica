<script setup>
import Hero from "../components/layout/HeroSection.vue";
import Slider from "../components/ui/Slider.vue";
import TopThreeProducts from "../components/layout/TopThreeProductsSection.vue";
import PreviewProducts from "../components/layout/PreviewProductsSection.vue";
import AboutUs from "../components/layout/AboutUsSection.vue";
import PriceListFlyer from "../components/layout/PriceListFlyerSection.vue";
import RealNumbers from "../components/layout/RealNumbersSection.vue";
import { useI18n } from "@/i18n/useI18n";

const { t } = useI18n();
</script>

<template>
  <div class="home">
    <div class="home-fold">
      <Hero />
      <div class="container slider-wrap">
        <Slider />
      </div>
    </div>

    <div class="container section-intro section-intro--bestsellers">
      <p class="section-kicker">{{ t("home.bestsellersKicker") }}</p>
      <h2 class="section-heading">{{ t("home.bestsellersTitle") }}</h2>
    </div>

    <TopThreeProducts />

    <div class="container section-intro">
      <p class="section-kicker">{{ t("home.previewKicker") }}</p>
      <h2 class="section-heading">{{ t("home.previewTitle") }}</h2>
    </div>

    <PreviewProducts />

    <AboutUs />

    <PriceListFlyer />

    <div class="container section-intro section-intro--stats">
      <p class="section-kicker">{{ t("home.statsKicker") }}</p>
      <h2 class="section-heading">{{ t("home.statsTitle") }}</h2>
    </div>

    <RealNumbers />
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
}

.slider-wrap {
  display: flex;
  justify-content: center;
  padding: 0;
  width: 100%;
  margin-top: 1.75rem;
}

.section-intro {
  margin: 3.5rem auto 1.75rem;
  padding: 0 1.25rem;
  max-width: 820px;
  text-align: center;
}

.section-intro--stats {
  margin-top: 4.5rem;
}

.section-intro--bestsellers {
  margin-bottom: 0.65rem;
}

.section-kicker {
  margin: 0 0 0.55rem;
  font-size: clamp(1.05rem, 2.2vw, 1.35rem);
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-lavender-deep);
}

.section-heading {
  margin: 0;
  font-family: var(--font-body);
  font-size: clamp(2rem, 4.2vw, 2.85rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: var(--color-text);
  line-height: 1.2;
}

@media (min-width: 992px) {
  .home-fold {
    min-height: calc(100dvh - var(--nav-height));
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 1.25rem;
    box-sizing: border-box;
  }

  .slider-wrap {
    padding-top: 0.5rem;
    padding-bottom: 0;
    margin-top: auto;
  }

  .section-intro {
    margin: 4.5rem auto 2.25rem;
  }

  .section-intro--bestsellers {
    margin-bottom: 0.85rem;
  }

  .section-intro--stats {
    margin-top: 5.5rem;
  }
}
</style>
