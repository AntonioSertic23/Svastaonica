<script setup>
import { onMounted, onUnmounted, ref } from "vue";

const isActive = ref(false);
const pathLength = ref(0);
const dashOffset = ref(0);
let progressPath = null;

function updateProgress() {
  if (!progressPath) return;
  const scroll = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  const progress =
    height > 0 ? pathLength.value - (scroll * pathLength.value) / height : pathLength.value;
  dashOffset.value = progress;
  isActive.value = scroll > 50;
}

function scrollToTop(event) {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

onMounted(() => {
  progressPath = document.querySelector(".progress-wrap path");
  if (!progressPath) return;
  pathLength.value = progressPath.getTotalLength();
  dashOffset.value = pathLength.value;
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateProgress);
});
</script>

<template>
  <div
    id="progress-wrap"
    class="progress-wrap"
    :class="{ 'active-progress': isActive }"
    @click="scrollToTop"
  >
    <svg
      class="progress-circle svg-content"
      width="100%"
      height="100%"
      viewBox="-1 -1 102 102"
    >
      <path
        d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"
        :style="{
          strokeDasharray: pathLength + ' ' + pathLength,
          strokeDashoffset: dashOffset,
        }"
      />
    </svg>
    <img class="icon" src="/assets/img/up-arrow.png" alt="Na vrh" />
  </div>
</template>

<style scoped>
.icon {
  position: absolute;
  top: 0;
  height: 54px;
  width: 54px;
  cursor: pointer;
  margin-top: 3px;
  margin-left: 3px;
  left: 0;
}

.progress-wrap {
  position: fixed;
  right: 70px;
  bottom: 50px;
  height: 60px;
  width: 60px;
  cursor: pointer;
  display: block;
  border-radius: 50px;
  box-shadow: inset 0 0 0 2px rgba(0, 0, 0, 0.2);
  z-index: 10000;
  opacity: 0;
  visibility: hidden;
  transform: translateY(15px);
  transition: all 200ms linear;
}

.progress-wrap.active-progress {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.progress-wrap svg path {
  fill: none;
}

.progress-wrap svg.progress-circle path {
  stroke: rgba(0, 0, 0, 0.6);
  stroke-width: 4;
  box-sizing: border-box;
  transition: stroke-dashoffset 10ms linear;
}

@media (max-width: 991.98px) {
  .progress-wrap {
    right: 20px;
    bottom: 20px;
    height: 50px;
    width: 50px;
  }

  .icon {
    height: 44px;
    width: 44px;
  }
}
</style>
