<script setup>
import { ref } from "vue";
import { useI18n } from "@/i18n/useI18n";
import PriceListFlyerLightbox from "@/components/layout/PriceListFlyerLightbox.vue";

const { t } = useI18n();

const FLYER_SRC = "/assets/img/site/cjenik-flyer.png";
const lightboxOpen = ref(false);

function openLightbox() {
  lightboxOpen.value = true;
}

function closeLightbox() {
  lightboxOpen.value = false;
}
</script>

<template>
  <section class="flyer-page py-4">
    <div class="container">
      <h1 class="page-title text-center">{{ t("home.flyerTitle") }}</h1>
      <p class="page-hint text-center mx-auto">{{ t("home.flyerShareHint") }}</p>

      <button
        type="button"
        class="flyer-preview"
        :aria-label="t('home.flyerOpenEnlarge')"
        @click="openLightbox"
      >
        <img
          :src="FLYER_SRC"
          :alt="t('home.flyerAlt')"
          decoding="async"
          width="3374"
          height="6000"
        />
      </button>
    </div>

    <PriceListFlyerLightbox
      :open="lightboxOpen"
      :src="FLYER_SRC"
      @close="closeLightbox"
    />
  </section>
</template>

<style scoped>
.flyer-page {
  padding-bottom: 2.5rem;
}

.page-title {
  margin: 0 0 0.75rem;
  font-family: var(--font-body);
  font-size: clamp(2rem, 4.2vw, 2.85rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: var(--color-text);
  line-height: 1.2;
}

.page-hint {
  margin: 0 auto 1.75rem;
  max-width: 28rem;
  padding: 0 1rem;
  font-size: 1.05rem;
  line-height: 1.45;
  color: var(--color-text-muted);
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

@media (min-width: 992px) {
  .flyer-preview {
    width: min(100%, 480px);
  }
}
</style>
