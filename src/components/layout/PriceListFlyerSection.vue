<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useI18n } from "@/i18n/useI18n";

const { t } = useI18n();

const FLYER_SRC = "/assets/img/site/cjenik-flyer.jpg";
const MIN_SCALE = 1;
const MAX_SCALE = 4;

const lightboxOpen = ref(false);
const scale = ref(1);
const scrollEl = ref(null);
const pinchStartDistance = ref(0);
const pinchStartScale = ref(1);
const lastTapAt = ref(0);

const scaleLabel = computed(() => `${Math.round(scale.value * 100)}%`);

const imgStyle = computed(() => ({
  width: `min(${96 * scale.value}vw, ${560 * scale.value}px)`,
}));

async function centerScroll() {
  await nextTick();
  const el = scrollEl.value;
  if (!el) return;
  // Wait a frame so width transition / layout can settle
  requestAnimationFrame(() => {
    el.scrollLeft = Math.max(0, (el.scrollWidth - el.clientWidth) / 2);
    el.scrollTop = 0;
  });
}

function setLightboxOpen(open) {
  lightboxOpen.value = open;
  document.body.classList.toggle("lock-scroll", open);
  document.body.classList.toggle("hide-navbar", open);
  document.body.classList.toggle("hide-scroll-top", open);
  if (!open) scale.value = 1;
}

function openLightbox() {
  setLightboxOpen(true);
}

function closeLightbox() {
  setLightboxOpen(false);
}

function zoomIn() {
  scale.value = Math.min(MAX_SCALE, Math.round((scale.value + 0.25) * 100) / 100);
}

function zoomOut() {
  scale.value = Math.max(MIN_SCALE, Math.round((scale.value - 0.25) * 100) / 100);
}

function resetZoom() {
  scale.value = 1;
}

function touchDistance(touches) {
  const [a, b] = touches;
  return Math.hypot(b.clientX - a.clientX, b.clientY - a.clientY);
}

function onTouchStart(e) {
  if (e.touches.length === 2) {
    pinchStartDistance.value = touchDistance(e.touches);
    pinchStartScale.value = scale.value;
  }
}

function onTouchMove(e) {
  if (e.touches.length !== 2 || !pinchStartDistance.value) return;
  e.preventDefault();
  const ratio = touchDistance(e.touches) / pinchStartDistance.value;
  const next = pinchStartScale.value * ratio;
  scale.value = Math.min(MAX_SCALE, Math.max(MIN_SCALE, next));
}

function onTouchEnd() {
  pinchStartDistance.value = 0;
}

function onImageClick() {
  const now = Date.now();
  if (now - lastTapAt.value < 320) {
    scale.value = scale.value > 1.1 ? 1 : 2;
  }
  lastTapAt.value = now;
}

function onKeydown(e) {
  if (!lightboxOpen.value) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "+" || e.key === "=") zoomIn();
  if (e.key === "-") zoomOut();
  if (e.key === "0") resetZoom();
}

watch(scale, () => {
  if (lightboxOpen.value) centerScroll();
});

watch(lightboxOpen, (open) => {
  if (open) centerScroll();
});

onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
  document.body.classList.remove("lock-scroll");
  document.body.classList.remove("hide-navbar");
  document.body.classList.remove("hide-scroll-top");
});
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
        :aria-label="t('home.flyerOpen')"
        @click="openLightbox"
      >
        <img
          :src="FLYER_SRC"
          :alt="t('home.flyerAlt')"
          loading="lazy"
          decoding="async"
          width="720"
          height="1280"
        />
      </button>

      <div class="flyer-actions">
        <button type="button" class="btn-cta" @click="openLightbox">
          {{ t("home.flyerOpen") }}
        </button>
      </div>
    </div>

    <div
      v-if="lightboxOpen"
      class="flyer-lightbox"
      role="dialog"
      aria-modal="true"
      :aria-label="t('home.flyerAlt')"
    >
      <div class="flyer-toolbar">
        <button type="button" class="toolbar-btn" @click="zoomOut" :aria-label="t('home.flyerZoomOut')">
          −
        </button>
        <button type="button" class="toolbar-btn toolbar-btn--label" @click="resetZoom">
          {{ scaleLabel }}
        </button>
        <button type="button" class="toolbar-btn" @click="zoomIn" :aria-label="t('home.flyerZoomIn')">
          +
        </button>
        <button
          type="button"
          class="toolbar-btn toolbar-btn--close"
          :aria-label="t('home.flyerClose')"
          @click="closeLightbox"
        >
          {{ t("home.flyerClose") }}
        </button>
      </div>

      <div
        ref="scrollEl"
        class="flyer-scroll"
        @touchstart.passive="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
      >
        <div class="flyer-scroll-inner">
          <img
            :src="FLYER_SRC"
            :alt="t('home.flyerAlt')"
            class="flyer-lightbox-img"
            :style="imgStyle"
            draggable="false"
            @click="onImageClick"
          />
        </div>
      </div>
    </div>
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

.flyer-lightbox {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  background: rgba(30, 24, 36, 0.9);
}

.flyer-toolbar {
  flex: 0 0 auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.45rem;
  padding: 0.75rem 0.85rem;
  padding-top: max(0.75rem, env(safe-area-inset-top));
  background: rgba(20, 16, 24, 0.55);
  z-index: 2;
}

.toolbar-btn {
  min-width: 2.6rem;
  height: 2.6rem;
  padding: 0 0.75rem;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.95);
  color: var(--color-text);
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
  box-shadow: var(--shadow-soft);
}

.toolbar-btn--label {
  min-width: 4rem;
  font-size: 0.9rem;
  font-weight: 600;
}

.toolbar-btn--close {
  margin-left: 0.35rem;
  font-size: 0.92rem;
  letter-spacing: 0.02em;
  background: var(--color-lavender);
}

.flyer-scroll {
  flex: 1 1 auto;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  touch-action: pan-x pan-y;
  /* No flex centering here — that clips the left side when zoomed */
}

.flyer-scroll-inner {
  display: block;
  width: max-content;
  min-width: 100%;
  box-sizing: border-box;
  padding: 0.75rem;
}

.flyer-lightbox-img {
  display: block;
  height: auto;
  max-width: none;
  margin-inline: auto;
  transition: width 0.12s ease-out;
  user-select: none;
  -webkit-user-drag: none;
  border-radius: var(--radius);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.35);
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
