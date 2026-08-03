<script setup>
import { RouterLink } from "vue-router";
import { onMounted, onUnmounted, ref } from "vue";

const visible = ref({ item1: false, item2: false, item3: false });
let observer;

onMounted(() => {
  if (window.innerWidth >= 992) {
    visible.value = { item1: true, item2: true, item3: true };
    return;
  }

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.dataset.item;
          if (id) visible.value[id] = true;
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.25, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll("[data-item]").forEach((el) => observer.observe(el));
});

onUnmounted(() => {
  observer?.disconnect();
});
</script>

<template>
  <div class="container top-three">
    <div class="products-row">
      <div
        data-item="item2"
        class="item item--side"
        :class="{ 'is-visible': visible.item2, 'from-right': true }"
      >
        <RouterLink to="/singleitem/8" class="top-card-link">
          <div class="top-card">
            <div class="image-div">
              <img
                class="image"
                src="/assets/img/products/slinceki/12.jpg"
                alt="Slinček"
                loading="lazy"
                decoding="async"
              />
              <div class="medal-div">
                <img class="medal" src="/assets/img/ui/medal2.png" alt="" />
              </div>
            </div>
            <div class="shape shape1">
              <h3>Slinček</h3>
            </div>
          </div>
        </RouterLink>
      </div>

      <div
        data-item="item3"
        class="item item--middle"
        :class="{ 'is-visible': visible.item3 }"
      >
        <RouterLink to="/singleitem/9" class="top-card-link">
          <div class="top-card">
            <div class="image-div">
              <img
                class="image"
                src="/assets/img/products/kocke/23.jpg"
                alt="Didaktička Kocka"
                loading="lazy"
                decoding="async"
              />
              <div class="medal-div">
                <img class="medal" src="/assets/img/ui/medal1.png" alt="" />
              </div>
            </div>
            <div class="shape shape2">
              <h3>Didaktička Kocka</h3>
            </div>
          </div>
        </RouterLink>
      </div>

      <div
        data-item="item1"
        class="item item--side"
        :class="{ 'is-visible': visible.item1, 'from-left': true }"
      >
        <RouterLink to="/singleitem/7" class="top-card-link">
          <div class="top-card">
            <div class="image-div">
              <img
                class="image"
                src="/assets/img/products/vezice/10.jpg"
                alt="Silikonska vezica"
                loading="lazy"
                decoding="async"
              />
              <div class="medal-div">
                <img class="medal" src="/assets/img/ui/medal3.png" alt="" />
              </div>
            </div>
            <div class="shape shape3">
              <h3>Silikonska vezica</h3>
            </div>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.top-three {
  margin: 2rem auto;
}

.products-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  padding: 0 2rem;
  overflow-x: hidden;
}

.item {
  position: relative;
  transition: transform 0.9s ease, opacity 0.9s ease;
}

.top-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.top-card {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.image-div {
  position: relative;
  z-index: 2;
  width: 100%;
  padding: 0.5rem 1rem 0;
}

.image {
  width: 100%;
  height: 230px;
  object-fit: cover;
  border-radius: var(--radius);
  box-shadow: var(--shadow-card);
  transition: transform 0.45s ease;
  display: block;
}

.image:hover {
  transform: translateY(-8px);
}

.medal-div {
  position: absolute;
  z-index: 3;
  top: 0;
  right: 0.5rem;
}

.medal {
  width: 80px;
  height: 80px;
  transition: transform 0.45s ease;
}

.medal:hover {
  transform: scale(1.15);
}

/* Purple bar = title plate under the photo */
.shape {
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 52px;
  margin-top: -22px;
  padding: 1.6rem 0.75rem 0.65rem;
  background-color: var(--color-lavender);
  border-radius: var(--radius);
  box-shadow: var(--shadow-card);
  display: flex;
  align-items: flex-end;
  justify-content: center;
}

.shape h3 {
  margin: 0;
  text-align: center;
  font-family: var(--font-body);
  font-size: 1.05rem;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--color-text);
  line-height: 1.3;
}

@media (max-width: 991.98px) {
  .item:not(.is-visible) {
    opacity: 0;
  }

  .item.from-left:not(.is-visible) {
    transform: translateX(-40%);
  }

  .item.from-right:not(.is-visible),
  .item--middle:not(.is-visible) {
    transform: translateX(40%);
  }

  .item.is-visible {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (min-width: 992px) {
  .top-three {
    margin: 3rem auto;
  }

  .products-row {
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    padding: 0 3rem;
    min-height: 420px;
    align-items: end;
  }

  .item--side {
    margin-top: 3rem;
  }

  .item {
    padding: 0 1.25rem;
  }

  .image-div {
    height: 280px;
  }

  .image {
    position: absolute;
    width: 260px;
    height: 270px;
    left: 0;
    right: 0;
    margin: 0 auto;
    top: 10px;
    transition: top 0.45s ease;
  }

  .image:hover {
    top: -8px;
    transform: none;
  }

  .medal-div {
    top: -5px;
    right: 18px;
  }

  .shape {
    min-height: 58px;
    padding: 1.75rem 0.5rem 0.7rem;
  }

  .shape1 {
    transform: skew(-18deg);
  }

  .shape1 h3 {
    transform: skew(18deg);
  }

  .shape3 {
    transform: skew(18deg);
  }

  .shape3 h3 {
    transform: skew(-18deg);
  }

  .shape h3 {
    font-size: 1.1rem;
    font-weight: 500;
  }
}
</style>
