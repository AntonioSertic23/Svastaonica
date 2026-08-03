<script setup>
const images = [
  "/assets/img/cizme/1.jpg",
  "/assets/img/gricke/1.jpg",
  "/assets/img/kocke/1.jpg",
  "/assets/img/krun/1.jpg",
  "/assets/img/kugle/1.jpg",
  "/assets/img/okviri/10.jpg",
  "/assets/img/privj/1.jpg",
  "/assets/img/set/6.jpg",
  "/assets/img/shuze/1.jpg",
  "/assets/img/slinceki/12.jpg",
  "/assets/img/trake/1.jpg",
  "/assets/img/vezice/12.jpg",
];
</script>

<template>
  <section class="slider">
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
  height: 300px;
  object-fit: cover;
}

article {
  display: flex;
  width: max-content;
  animation: bannermove 40s linear infinite;
  margin-bottom: 1rem;
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
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: var(--radius);
  overflow: hidden;
  width: 220px;
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
    height: 220px;
  }

  li {
    width: 160px;
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
