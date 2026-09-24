<script setup>
import sourceData from "@/catalog.js";
import { RouterLink } from "vue-router";
import VLazyImage from "v-lazy-image";
import { computed } from "vue";
import { useI18n } from "@/i18n/useI18n";

const { t, pt } = useI18n();

function shuffle(list) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const data = computed(() => {
  const pool = sourceData.data.filter((p) => !p.comingSoon);
  const picked = shuffle(pool).slice(0, 5);
  // Keep layout stable if fewer than 5 products exist
  while (picked.length < 5 && pool.length) {
    picked.push(pool[picked.length % pool.length]);
  }
  return picked;
});
</script>

<template>
  <div class="container px-4 preview-section">
    <div class="row main-row px-0 px-lg-5">
      <div class="col h-100">
        <RouterLink v-bind:to="/singleitem/ + data[0].id">
          <div class="item-big">
            <VLazyImage class="product-image" v-bind:src="data[0].thumbnail" />
            <div class="mask">
              <img src="/assets/img/ui/share.png" alt="" />
            </div>
            <div class="product-name">
              <p class="ms-3 mb-3">{{ pt(data[0], "name") }}</p>
            </div>
          </div>
        </RouterLink>
      </div>

      <div class="col subrow h-100">
        <div class="row">
          <div class="item col-6">
            <RouterLink v-bind:to="/singleitem/ + data[1].id">
              <div class="item-small">
                <VLazyImage
                  class="product-image"
                  v-bind:src="data[1].thumbnail"
                />
                <div class="mask">
                  <img src="/assets/img/ui/share.png" alt="" />
                </div>
                <div class="product-name">
                  <p class="ms-3 mb-3">{{ pt(data[1], "name") }}</p>
                </div>
              </div>
            </RouterLink>
          </div>

          <div class="item col-6">
            <RouterLink v-bind:to="/singleitem/ + data[2].id">
              <div class="item-small">
                <VLazyImage
                  class="product-image"
                  v-bind:src="data[2].thumbnail"
                />
                <div class="mask">
                  <img src="/assets/img/ui/share.png" alt="" />
                </div>
                <div class="product-name">
                  <p class="ms-3 mb-3">{{ pt(data[2], "name") }}</p>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>

        <div class="row">
          <div class="item col-6">
            <RouterLink v-bind:to="/singleitem/ + data[3].id">
              <div class="item-small">
                <VLazyImage
                  class="product-image"
                  v-bind:src="data[3].thumbnail"
                />
                <div class="mask">
                  <img src="/assets/img/ui/share.png" alt="" />
                </div>
                <div class="product-name">
                  <p class="ms-3 mb-3">{{ pt(data[3], "name") }}</p>
                </div>
              </div>
            </RouterLink>
          </div>

          <div class="item col-6">
            <RouterLink v-bind:to="/singleitem/ + data[4].id">
              <div class="item-small">
                <VLazyImage
                  class="product-image"
                  v-bind:src="data[4].thumbnail"
                />
                <div class="mask">
                  <img src="/assets/img/ui/share.png" alt="" />
                </div>
                <div class="product-name">
                  <p class="ms-3 mb-3">{{ pt(data[4], "name") }}</p>
                </div>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center">
        <RouterLink class="category-link mt-4 mt-lg-5 px-4" to="/gallery"
          >{{ t("home.viewAll") }}</RouterLink
        >
    </div>
  </div>
</template>

<style scoped>
.preview-section {
  margin-top: 0.25rem;
  margin-bottom: 1rem;
}

.main-row {
  height: 550px;
}

.subrow {
  display: grid;
  gap: 24px;
}

.item-big {
  width: 100%;
  height: 100%;
}

.item,
.item-big {
  position: relative;
}

.item-big:hover .product-image,
.item-small:hover .product-image {
  filter: brightness(60%);
  transform: scale(1.2);
}
.item-big:hover .product-name p,
.item-small:hover .product-name p {
  color: white;
}
.item-big:hover .mask,
.item-small:hover .mask {
  visibility: visible;
  opacity: 1;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.col-6 .product-image {
  height: 263px;
}

.product-name {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  padding: 2.25rem 0.85rem 0.7rem;
  background: linear-gradient(
    to top,
    rgba(34, 24, 40, 0.72) 0%,
    rgba(34, 24, 40, 0.35) 55%,
    transparent 100%
  );
  pointer-events: none;
}

.product-name p {
  position: static;
  font-size: 20px;
  margin: 0;
  color: white;
  font-weight: 500;
  text-shadow: none;
}

.item-big .product-name p {
  font-size: 39.06px;
}

.item-small {
  position: relative;
}

.item-big,
.item-small {
  border-radius: var(--radius);
  overflow: hidden;
  cursor: pointer;
  box-shadow: var(--shadow-soft);
}

.mask {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  width: fit-content;
  height: fit-content;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.8s;
}
.mask img {
  filter: invert(100%);
}

.item-big .mask img {
  width: 128px;
}
.item-small .mask img {
  width: 64px;
}

.category-link {
  display: inline-block;
  color: var(--color-text);
  text-decoration: none;
  text-transform: uppercase;
  background-color: var(--color-lavender);
  border-radius: var(--radius);
  padding: 1rem 1.5rem;
  font-weight: 500;
  letter-spacing: 1px;
  box-shadow: var(--shadow-soft);
  transition: background-color 0.2s ease;
}
.category-link:hover {
  background-color: var(--color-lavender-hover);
}

@media (max-width: 991.98px) {
  .main-row {
    height: auto;
    flex-direction: column;
    row-gap: 24px;
  }

  .item-big {
    height: 250px;
  }

  .col-6 .product-image {
    height: 200px;
  }

  .item-big .product-name p {
    font-size: 31.25px;
  }

  .product-name p {
    color: white;
  }
}
</style>
