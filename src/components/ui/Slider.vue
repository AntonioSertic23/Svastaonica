<script setup>
import { computed } from "vue";
import catalog from "@/catalog.js";

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function collectCatalogImages() {
  const paths = [];
  for (const product of catalog.data) {
    if (product.comingSoon) continue;
    if (product.thumbnail) paths.push(product.thumbnail);
    if (Array.isArray(product.images)) {
      for (const img of product.images.slice(0, 2)) {
        const path = typeof img === "string" ? img : img?.path;
        if (path) paths.push(path);
      }
    }
  }
  return [...new Set(paths)];
}

const images = computed(() => {
  const pool = shuffle(collectCatalogImages());
  // Enough tiles for a smooth marquee; fall back if catalog is tiny
  const picked = pool.slice(0, Math.max(10, Math.min(14, pool.length)));
  return picked.length ? picked : collectCatalogImages();
});
</script>

<template>
  <section class="slider" v-if="images.length">
    <div class="fading-left"></div>
    <article>
      <div>
        <ul>
          <li v-for="(src, i) in images" :key="'a' + i">
            <img :src="src" alt="" loading="lazy" decoding="async" />
          </li>
        </ul>
      </div>
      <div aria-hidden="true">
        <ul>
          <li v-for="(src, i) in images" :key="'b' + i">
            <img :src="src" alt="" loading="lazy" decoding="async" />
          </li>
        </ul>
      </div>
    </article>
    <div class="fading-right"></div>
  </section>
</template>

<style scoped>
.fading-left {
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  width: 70px;
  height: 100%;
  z-index: 1;
  background-image: linear-gradient(
    to left,
    rgba(255, 255, 255, 0),
    var(--color-bg) 100%
  );
}
.fading-right {
  position: absolute;
  right: 0;
  top: 0;
  display: block;
  width: 70px;
  height: 100%;
  z-index: 1;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    var(--color-bg) 100%
  );
}

.slider {
  position: relative;
  width: 100%;
  overflow: hidden;
}

img {
  display: block;
  width: 100%;
  height: 255px;
  object-fit: cover;
}

article {
  display: flex;
  width: max-content;
  animation: bannermove 40s linear infinite;
  margin-bottom: 0;
}

article > div {
  display: flex;
}

ul {
  display: flex;
  list-style-type: none;
  padding-left: 0;
  margin: 0;
}

li {
  margin-left: 0.85rem;
  margin-right: 0.85rem;
  border-radius: var(--radius);
  overflow: hidden;
  width: 280px;
  flex-shrink: 0;
  box-shadow: var(--shadow-soft);
}

@keyframes bannermove {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@media (max-width: 991.98px) {
  img {
    height: 195px;
  }

  li {
    width: 200px;
  }

  article {
    animation-duration: 28s;
  }
}

@media (prefers-reduced-motion: reduce) {
  article {
    animation: none;
  }
}
</style>
