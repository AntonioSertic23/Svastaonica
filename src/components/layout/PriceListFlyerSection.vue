<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useI18n } from "@/i18n/useI18n";
import PriceListFlyerLightbox from "@/components/layout/PriceListFlyerLightbox.vue";

const { t } = useI18n();

const FLYER_SRC = "/assets/img/site/cjenik-flyer.jpg";
const lightboxOpen = ref(false);

function openLightbox() {
  lightboxOpen.value = true;
}

function closeLightbox() {
  lightboxOpen.value = false;
}
</script>

<template>
  <section class="flyer-section">
    <div class="container">
      <div class="section-intro">
        <h2 class="section-heading">{{ t("home.flyerTitle") }}</h2>
      </div>

      <button
        type="button"
        class="flyer-preview"
        :aria-label="t('home.flyerOpenEnlarge')"
        @click="openLightbox"
      >
        <img
          :src="FLYER_SRC"
          :alt="t('home.flyerAlt')"
          loading="lazy"
          decoding="async"
          width="4416"
          height="6204"
        />
      </button>

      <div class="flyer-actions">
        <RouterLink class="btn-cta" to="/cjenik-slika">
          {{ t("home.flyerOpen") }}
        </RouterLink>
      </div>
    </div>

    <PriceListFlyerLightbox
      :open="lightboxOpen"
      :src="FLYER_SRC"
      @close="closeLightbox"
    />
  </section>
</template>

<style scoped>
.flyer-section {
  padding: 1rem 0 2rem;
}

.section-intro {
  margin: 2.5rem auto 1.75rem;
  padding: 0 1.25rem;
  max-width: 820px;
  text-align: center;
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

.flyer-preview {
  display: block;
  width: min(100%, 420px);
  margin: 0 auto;
  padding: 0;
  border: none;
  background: transparent;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  cursor: zoom-in;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.flyer-preview:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 28px rgba(70, 50, 90, 0.16);
}

.flyer-preview img {
  display: block;
  width: 100%;
  height: auto;
}

.flyer-actions {
  display: flex;
  justify-content: center;
  margin-top: 1.75rem;
  padding: 0 1rem;
}

@media (min-width: 992px) {
  .flyer-section {
    padding: 1.5rem 0 2.5rem;
  }

  .flyer-preview {
    width: min(100%, 480px);
  }
}
</style>
