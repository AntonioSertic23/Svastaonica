<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "@/i18n/useI18n";

const { t } = useI18n();

const stats = [
  {
    id: "hours",
    target: 5200,
    suffix: "+",
    labelKey: "stats.hours",
    icons: [{ src: "/assets/img/clock.png", rotate: 0 }],
  },
  {
    id: "children",
    target: 2800,
    suffix: "+",
    labelKey: "stats.children",
    icons: [
      { src: "/assets/img/baby.png", rotate: -15 },
      { src: "/assets/img/baby-girl.png", rotate: 15 },
    ],
  },
  {
    id: "moms",
    target: 2600,
    suffix: "+",
    labelKey: "stats.moms",
    icons: [{ src: "/assets/img/mother.png", rotate: 0 }],
  },
  {
    id: "products",
    target: 180,
    suffix: "+",
    labelKey: "stats.products",
    icons: [{ src: "/assets/img/gift.png", rotate: 0 }],
  },
];

const displayValues = ref(stats.map(() => 0));
const sectionEl = ref(null);
let observer;
let rafIds = [];

function animateCount(index, target, duration = 1600) {
  const start = performance.now();
  const from = 0;

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    displayValues.value[index] = Math.round(from + (target - from) * eased);
    if (progress < 1) {
      rafIds[index] = requestAnimationFrame(tick);
    }
  }

  rafIds[index] = requestAnimationFrame(tick);
}

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        stats.forEach((stat, i) => animateCount(i, stat.target));
        observer.disconnect();
      });
    },
    { threshold: 0.35 }
  );

  if (sectionEl.value) observer.observe(sectionEl.value);
});

onUnmounted(() => {
  observer?.disconnect();
  rafIds.forEach((id) => cancelAnimationFrame(id));
});
</script>

<template>
  <div
    ref="sectionEl"
    class="container mb-5 px-3 px-lg-5 d-flex flex-column stats-section"
  >
    <div class="real-numbers-div g-4 mx-1 mx-lg-4 row mt-3 mt-lg-5">
      <div
        class="col-12 col-sm-6 col-lg-3"
        v-for="(stat, i) in stats"
        :key="stat.id"
      >
        <div class="rn-card p-4 p-lg-5">
          <div class="image-div">
            <img
              v-for="(icon, j) in stat.icons"
              :key="j"
              :src="icon.src"
              :style="{ transform: `rotate(${icon.rotate}deg)` }"
              alt=""
            />
          </div>
          <p class="rn-numbers">
            {{ displayValues[i].toLocaleString("hr-HR") }}{{ stat.suffix }}
          </p>
          <p class="rn-description">{{ t(stat.labelKey) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.real-numbers-div {
  justify-content: center;
}

.rn-card {
  text-align: center;
  background: linear-gradient(
    165deg,
    #c9a8d8 0%,
    var(--color-thistle) 45%,
    #b894c9 100%
  );
  border-radius: var(--radius);
  box-shadow: var(--shadow-soft);
  height: 100%;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.rn-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 22px rgba(80, 50, 100, 0.18);
}

.rn-card .image-div {
  display: flex;
  justify-content: center;
  background-color: var(--color-bg);
  border-radius: var(--radius);
  padding: 0.85rem;
}

.rn-card .image-div img {
  width: 72px;
  height: 72px;
}

.rn-numbers {
  margin-top: 1rem;
  margin-bottom: 0.25rem;
  font-size: clamp(2.2rem, 4vw, 3.05rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  font-variant-numeric: tabular-nums;
}

.rn-description {
  font-size: 1.05rem;
  color: var(--color-text-muted);
  margin: 0;
}

@media (max-width: 991.98px) {
  .rn-card .image-div img {
    width: 64px;
    height: 64px;
  }
}
</style>
