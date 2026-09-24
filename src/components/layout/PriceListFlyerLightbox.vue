<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from "vue";
import { useI18n } from "@/i18n/useI18n";

const props = defineProps({
  open: { type: Boolean, required: true },
  src: { type: String, required: true },
});

const emit = defineEmits(["close"]);

const { t } = useI18n();

const MIN_SCALE = 1;
const MAX_SCALE = 4;

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
  requestAnimationFrame(() => {
    el.scrollLeft = Math.max(0, (el.scrollWidth - el.clientWidth) / 2);
    el.scrollTop = 0;
  });
}

function applyBodyClasses(open) {
  document.body.classList.toggle("lock-scroll", open);
  document.body.classList.toggle("hide-navbar", open);
  document.body.classList.toggle("hide-scroll-top", open);
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
  if (!props.open) return;
  if (e.key === "Escape") emit("close");
  if (e.key === "+" || e.key === "=") zoomIn();
  if (e.key === "-") zoomOut();
  if (e.key === "0") resetZoom();
}

watch(scale, () => {
  if (props.open) centerScroll();
});

watch(
  () => props.open,
  (open) => {
    applyBodyClasses(open);
    if (open) {
      scale.value = 1;
      centerScroll();
    } else {
      scale.value = 1;
    }
  }
);

onMounted(() => window.addEventListener("keydown", onKeydown));
onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
  applyBodyClasses(false);
});
</script>

<template>
  <div
    v-if="open"
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
        @click="emit('close')"
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
          :src="src"
          :alt="t('home.flyerAlt')"
          class="flyer-lightbox-img"
          :style="imgStyle"
          draggable="false"
          @click="onImageClick"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
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
</style>
