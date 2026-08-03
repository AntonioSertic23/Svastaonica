<script setup>
import { onMounted, ref } from "vue";

const ICON_POOL = [
  "/assets/img/icons/rubber-duck.png",
  "/assets/img/icons/feeding-bottle.png",
  "/assets/img/icons/onesie.png",
  "/assets/img/icons/baby-crib.png",
  "/assets/img/icons/pacifier.png",
  "/assets/img/icons/carrot.png",
  "/assets/img/icons/broccoli.png",
  "/assets/img/icons/stroller.png",
  "/assets/img/icons/baby.png",
  "/assets/img/icons/feeding.png",
  "/assets/img/icons/baby-diaper.png",
  "/assets/img/icons/teddy-bear.png",
  "/assets/img/icons/whale.png",
  "/assets/img/icons/dino.png",
  "/assets/img/icons/elephant.png",
  "/assets/img/icons/cot.png",
  "/assets/img/icons/baby-boy.png",
  "/assets/img/icons/baby-girl.png",
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function rand(min, max) {
  return min + Math.random() * (max - min);
}

/**
 * Grid layout: even coverage, no overlaps.
 * Only which icon + slight jitter/rotation is random.
 * Outer columns denser; center column empty so content stays readable.
 */
function buildGridIcons() {
  const cols = 6;
  const rows = 5;
  const pool = shuffle(ICON_POOL);
  const icons = [];
  let n = 0;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Skip middle two columns (content band)
      if (col === 2 || col === 3) continue;

      // Occasionally skip a cell so it doesn't feel rigid (~20%)
      if (Math.random() < 0.2) continue;

      const cellW = 100 / cols;
      const cellH = 100 / rows;
      // Keep icon inside cell with margin so they never overlap
      const jitterX = rand(-cellW * 0.18, cellW * 0.18);
      const jitterY = rand(-cellH * 0.18, cellH * 0.18);
      const left = cellW * col + cellW / 2 + jitterX;
      const top = cellH * row + cellH / 2 + jitterY;

      icons.push({
        src: pool[n % pool.length],
        left: `${left}%`,
        top: `${top}%`,
        size: Math.round(rand(58, 78)),
        rotate: Math.round(rand(-16, 16)),
        opacity: Number(rand(0.16, 0.26).toFixed(2)),
      });
      n++;
    }
  }

  return icons;
}

const icons = ref(buildGridIcons());

onMounted(() => {
  icons.value = buildGridIcons();
});
</script>

<template>
  <div class="page-decorations" aria-hidden="true">
    <img
      v-for="(icon, i) in icons"
      :key="i"
      :src="icon.src"
      alt=""
      loading="lazy"
      decoding="async"
      class="decor-icon"
      :style="{
        top: icon.top,
        left: icon.left,
        width: icon.size + 'px',
        opacity: icon.opacity,
        transform: `translate(-50%, -50%) rotate(${icon.rotate}deg)`,
      }"
    />
  </div>
</template>

<style scoped>
.page-decorations {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  overflow: hidden;
}

.decor-icon {
  position: absolute;
  height: auto;
  filter: saturate(0.85);
  user-select: none;
}

@media (max-width: 991.98px) {
  .page-decorations {
    display: none;
  }
}
</style>
