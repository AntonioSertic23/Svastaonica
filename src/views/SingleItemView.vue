<script setup>
import sourceData from "@/catalog.js";
import { useRoute, RouterLink } from "vue-router";
import VLazyImage from "v-lazy-image";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useI18n } from "@/i18n/useI18n";

const { t } = useI18n();
const route = useRoute();
const paramId = parseInt(route.params.id, 10);

const data = ref(sourceData.data.find((d) => d.id === paramId));

const aBundles = [];
if (data.value?.isPartOfBundle) {
  data.value.bundle.forEach((id) => {
    aBundles.push(sourceData.data.find((d) => d.id === id));
  });
}

const aItems = [];
if (data.value?.isBundle) {
  data.value.bundleItems.forEach((id) => {
    aItems.push(sourceData.data.find((d) => d.id === id));
  });
}

const aSimilarItems = [];
data.value?.similarItems?.forEach((id) => {
  aSimilarItems.push(sourceData.data.find((d) => d.id === id));
});

const lightboxOpen = ref(false);
const lightboxSrc = ref("");

function openLightbox(path, index) {
  lightboxSrc.value = path;
  lightboxOpen.value = true;
  document.body.classList.add("lock-scroll");
  if (typeof index === "number") {
    currentIndex.value = index + 1;
    data.value?.images?.forEach((img, i) => {
      img.isActive = i === index;
    });
  }
}

function closeLightbox() {
  lightboxOpen.value = false;
  lightboxSrc.value = "";
  document.body.classList.remove("lock-scroll");
}

function onKeydown(e) {
  if (e.key === "Escape" && lightboxOpen.value) {
    closeLightbox();
  }
}

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", onKeydown);
  document.body.classList.remove("lock-scroll");
});

const totalImages = computed(() => data.value?.images?.length || 1);
const currentIndex = ref(
  Math.max(
    1,
    (data.value?.images?.findIndex((img) => img.isActive) ?? 0) + 1
  )
);
const galleryExpanded = ref(false);

function updateNumber(direction) {
  const total = totalImages.value;
  if (direction === "prev") {
    currentIndex.value = currentIndex.value <= 1 ? total : currentIndex.value - 1;
  } else if (direction === "next") {
    currentIndex.value = currentIndex.value >= total ? 1 : currentIndex.value + 1;
  }
}

function toggleGallery() {
  galleryExpanded.value = !galleryExpanded.value;
}

const share = () => {
  if (!navigator.share) return;
  navigator
    .share({
      title: data.value.name,
      text: data.value.name,
      url: "https://svastaonica.netlify.app" + route.fullPath,
    })
    .catch(() => {
      alert(t("product.shareUnavailable"));
    });
};
</script>

<template>
  <section id="main-div" class="item-section pt-lg-5 pb-5">
    <div class="container-fluid">
      <div class="row wrapper">
        <p class="mb-2 menu-title-mobile order-1">{{ data.name }}</p>
        <p class="sub-title-mobile mb-4 px-3 order-2">{{ data.subheading }}</p>

        <div class="col col-lg-6 item-info order-4 order-lg-1">
          <div class="left-side mx-4 col col-lg-9 ms-lg-auto me-lg-5">
            <div v-if="data.soldout" class="mb-5 text-center soldout-text">
              <p>{{ t("product.soldOut") }}</p>
            </div>

            <p class="menu-title mb-2">{{ data.name }}</p>
            <p class="sub-title mb-5">{{ data.subheading }}</p>
            <p
              class="item-description text-center"
              v-html="data.description"
            ></p>

            <div class="keywords-div my-5" v-if="data.keywords.length > 0">
              <div class="row">
                <div class="col" v-for="word in data.keywords" :key="word.id">
                  <VLazyImage class="d-block" v-bind:src="word.icon" />
                  <p class="mt-3">{{ word.text }}</p>
                </div>
              </div>
            </div>

            <!-- basic item -->
            <div class="bundle-section" v-if="data.isPartOfBundle">
              <p class="heading text-center mb-4">
                {{ t("product.partOfBundle") }}
              </p>

              <div class="row row-cols-1 row-cols-lg-3 justify-content-center">
                <div
                  class="col-11 col-lg-4"
                  v-for="item in aBundles"
                  :key="item.id"
                >
                  <RouterLink :to="'/singleitem/' + item.id">
                    <div
                      class="bundle-card"
                      v-bind:class="
                        aBundles.length == 1 ? 'onlyone mx-auto' : ''
                      "
                    >
                      <VLazyImage
                        class="d-block bundle-img"
                        v-bind:src="item.thumbnail"
                        v-bind:style="[
                          item.soldout ? 'filter: brightness(60%)' : '',
                        ]"
                      />
                      <div class="mask">
                        <img
                          v-if="item.soldout"
                          src="/assets/img/sold-out.png"
                          class="soldout-icon"
                          alt=""
                        />
                        <img
                          v-else
                          src="/assets/img/share.png"
                          class="open-icon"
                          alt=""
                        />
                      </div>
                    </div>
                  </RouterLink>
                  <p
                    class="mt-3 text-center"
                    v-bind:class="aBundles.length == 1 ? 'onlyone mx-auto' : ''"
                  >
                    {{ item.name }}
                  </p>
                </div>
              </div>
            </div>

            <!-- bundle item -->
            <div class="bundle-section" v-if="data.isBundle">
              <p class="heading text-center mb-4">
                {{ t("product.bundleItems") }}
              </p>

              <div class="row row-cols-1 row-cols-lg-3 justify-content-center">
                <div
                  class="col-11 col-lg-4"
                  v-for="item in aItems"
                  :key="item.id"
                >
                  <RouterLink :to="'/singleitem/' + item.id">
                    <div
                      class="bundle-card"
                      v-bind:class="aBundles.length == 1 ? 'onlyone' : ''"
                    >
                      <VLazyImage
                        class="d-block bundle-img"
                        v-bind:src="item.thumbnail"
                        v-bind:style="[
                          item.soldout ? 'filter: brightness(60%)' : '',
                        ]"
                      />
                      <div class="mask">
                        <img
                          v-if="item.soldout"
                          src="/assets/img/sold-out.png"
                          class="soldout-icon"
                          alt=""
                        />
                        <img
                          v-else
                          src="/assets/img/share.png"
                          class="open-icon"
                          alt=""
                        />
                      </div>
                    </div>
                  </RouterLink>
                  <p class="mt-3 text-center">{{ item.name }}</p>
                </div>
              </div>
            </div>

            <div
              class="my-5 mx-lg-5 px-3 py-4 declaration"
              v-if="data.declaration.materials.length > 0"
            >
              <ul class="mt-3">
                <li
                  v-for="material in data.declaration.materials"
                  :key="material.id"
                >
                  {{ material }}
                </li>
              </ul>

              <div
                class="standards"
                v-for="standard in data.declaration.standards"
                :key="standard.id"
              >
                <img :src="standard.image" alt="" />
              </div>

              <div
                class="declaration-icons mt-4 flex-wrap mx-auto"
                v-if="data.declaration.icons"
              >
                <div
                  class="img-div"
                  v-for="icon in data.declaration.icons"
                  :key="icon.id"
                >
                  <img v-bind:src="icon.icon" v-bind:alt="icon.text" />
                </div>
              </div>
            </div>

            <!-- <div class="reviews-div">
              <p class="title">Recenzije</p>

              <div
                class="my-5 row flex-column"
                v-for="comment in data.reviews"
                :key="comment.id"
              >
                <div class="col">
                  <div class="row">
                    <div class="col image-div">
                      <img class="w-100" v-bind:src="comment.image" alt="" />
                    </div>
                    <p class="name mb-0 ps-0 col d-flex align-items-center">
                      {{ comment.name }}
                    </p>
                  </div>
                </div>
                <div class="col">
                  <p class="review mt-3">
                    {{ comment.comment }}
                  </p>
                </div>
              </div>
            </div> -->
          </div>
        </div>

        <div class="right-side col col-lg-6 order-3 order-lg-2">
          <div class="slider-div col-11 col-lg-8 m-auto me-lg-auto ms-lg-5">
            <div class="" style="position: relative">
              <button
                class="carousel-prev"
                type="button"
                data-bs-target="#singleItemCarousel"
                data-bs-slide="prev"
                @click="updateNumber('prev')"
              >
                <img src="/assets/img/left-chevron.png" alt="" />
                <span class="visually-hidden">Previous</span>
              </button>

              <div
                id="singleItemCarousel"
                class="carousel carousel-fade carousel-dark"
                data-bs-ride="carousel"
                data-bs-interval="false"
              >
                <div class="carousel-inner h-100">
                  <div
                    v-for="image in data.images"
                    :class="{ active: image.isActive }"
                    :key="image.id"
                    class="carousel-item"
                  >
                    <img
                      class="d-block carousel-main-img"
                      :src="image.path"
                      :alt="data.name"
                      loading="lazy"
                      decoding="async"
                      @click="openLightbox(image.path)"
                    />

                    <div class="share-section">
                      <a
                        class="shareBtn"
                        :href="image.path"
                        :download="data.name + currentIndex"
                      >
                        <img src="/assets/img/download.png" alt="Preuzmi" />
                      </a>

                      <a class="shareBtn" @click="share()">
                        <img src="/assets/img/share3.png" alt="Podijeli" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <button
                class="carousel-next"
                type="button"
                data-bs-target="#singleItemCarousel"
                data-bs-slide="next"
                @click="updateNumber('next')"
              >
                <img src="/assets/img/chevron.png" alt="" />
                <span class="visually-hidden">Next</span>
              </button>
            </div>

            <p class="carousel-numbers text-center mt-4">
              {{ currentIndex }}/{{ totalImages }}
            </p>
          </div>
        </div>
      </div>

      <div
        class="all-photos-section px-4 px-lg-5 my-4 my-lg-5"
        v-if="data.images && data.images.length > 1"
      >
        <button
          type="button"
          class="gallery-toggle"
          @click="toggleGallery"
          :aria-expanded="galleryExpanded"
        >
          <span>
            {{
              galleryExpanded ? t("product.hidePhotos") : t("product.allPhotos")
            }}
          </span>
          <span class="gallery-toggle-meta"
            >{{ totalImages }} {{ t("product.photosCount") }}</span
          >
          <span class="gallery-chevron" :class="{ open: galleryExpanded }"
            >▼</span
          >
        </button>

        <div v-show="galleryExpanded" class="photo-grid">
          <button
            v-for="(image, index) in data.images"
            :key="image.id || index"
            type="button"
            class="photo-thumb"
            :class="{ active: currentIndex === index + 1 }"
            @click="openLightbox(image.path, index)"
          >
            <img
              :src="image.path"
              :alt="data.name + ' ' + (index + 1)"
              loading="lazy"
              decoding="async"
            />
          </button>
        </div>
      </div>

      <div
        class="row similar-items-div px-4 px-lg-0 align-items-center"
        v-if="aSimilarItems.length > 0"
      >
        <p class="title">{{ t("product.similar") }}</p>
        <div
          class="col-11 col-lg-2 similar-item p-0"
          v-for="item in aSimilarItems"
          :key="item.id"
        >
          <RouterLink :to="'/singleitem/' + item.id">
            <VLazyImage
              class="d-block product-image"
              v-bind:src="item.thumbnail"
              v-bind:style="[item.soldout ? 'filter: brightness(60%)' : '']"
            />

            <div class="mask">
              <img
                v-if="item.soldout"
                src="/assets/img/sold-out.png"
                class="soldout-icon"
                alt=""
              />
              <img
                v-else
                src="/assets/img/share.png"
                class="open-icon"
                alt=""
              />
            </div>
            <div class="similar-item-name">
              <p class="ms-3 mb-3">{{ item.name }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>

  <Teleport to="body">
    <div
      v-if="lightboxOpen"
      class="lightbox"
      role="dialog"
      aria-modal="true"
      @click.self="closeLightbox"
    >
      <button
        type="button"
        class="lightbox-close"
        aria-label="Close"
        @click="closeLightbox"
      >
        ✕
      </button>
      <img class="lightbox-image" :src="lightboxSrc" :alt="data.name" />
    </div>
  </Teleport>
</template>

<style scoped>
.reviews-div img {
  width: 100%;
  border-radius: 50%;
}

.reviews-div .name {
  font-size: 25px;
  font-weight: 500;
}
.reviews-div .review {
  font-size: 20px;
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 20000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  background: rgba(20, 12, 28, 0.78);
  cursor: zoom-out;
}

.lightbox-image {
  max-width: min(92vw, 1100px);
  max-height: 88vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: var(--radius);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  cursor: default;
}

.lightbox-close {
  position: fixed;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 20001;
  width: 48px;
  height: 48px;
  border: none;
  border-radius: 50%;
  background: white;
  color: var(--color-text);
  font-size: 1.25rem;
  line-height: 1;
  cursor: pointer;
  box-shadow: var(--shadow-soft);
}

.lightbox-close:hover {
  background: var(--color-lavender);
}

.carousel-main-img {
  cursor: zoom-in;
}

.reviews-div .title {
  font-size: 39.06px;
}
.reviews-div .name {
  font-size: 25px;
}
.reviews-div .image-div {
  max-width: 88px;
}

.similar-items-div {
  justify-content: center;
  gap: 25px;
}

.all-photos-section {
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}

.gallery-toggle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  flex-wrap: wrap;
  border: none;
  background-color: var(--color-lavender);
  color: var(--color-text);
  border-radius: var(--radius);
  padding: 0.9rem 1.25rem;
  font-size: 1.15rem;
  font-weight: 500;
  letter-spacing: 0.02em;
  box-shadow: var(--shadow-soft);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.gallery-toggle:hover {
  background-color: var(--color-lavender-hover);
}

.gallery-toggle-meta {
  opacity: 0.75;
  font-size: 0.95rem;
  font-weight: 400;
}

.gallery-chevron {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  margin-left: 0.15rem;
  font-size: 0.85rem;
  line-height: 1;
  background: rgba(255, 255, 255, 0.45);
  border-radius: 50%;
  transition: transform 0.25s ease;
}

.gallery-chevron.open {
  transform: rotate(180deg);
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 0.75rem;
  margin-top: 1.25rem;
}

.photo-thumb {
  border: 2px solid transparent;
  border-radius: 12px;
  overflow: hidden;
  padding: 0;
  background: transparent;
  cursor: pointer;
  aspect-ratio: 1;
  box-shadow: var(--shadow-soft);
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.photo-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.photo-thumb:hover {
  transform: translateY(-3px);
  border-color: var(--color-lavender);
}

.photo-thumb.active {
  border-color: var(--color-lavender-hover);
}
.similar-items-div .similar-item {
  background-color: var(--color-lavender);
  height: 250px;
  border-radius: var(--radius);
}

.similar-items-div .title {
  font-size: 31.25px;
  text-align: center;
}

.similar-item {
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 4px 4px 4px lightgrey;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.similar-item:hover .product-image {
  filter: brightness(60%);
  transform: scale(1.2);
}

.similar-item:hover .mask {
  visibility: visible;
  opacity: 1;
}

.similar-item:hover .similar-item-name p {
  color: white;
}

.similar-item-name p {
  position: absolute;
  font-size: 25px;
  bottom: 0;
  color: white;
  text-shadow: 3px 3px 3px black;
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
.mask .soldout-icon {
  width: 96px;
}
.mask .open-icon {
  filter: invert(100%);
  width: 64px;
}

.active img {
  transition: transform 0.5s;
}
.active img:hover {
  cursor: pointer;
  transform: scale(1.2);
}

/* Product detail layout */

.menu-title {
  font-size: 48.83px;
  text-align: center;
}
.sub-title {
  font-size: 31.25px;
  text-align: center;
}

.item-info {
  font-size: 25px;
}

.keywords-div img {
  width: 100px;
  transition: transform 0.5s;
}
.keywords-div img:hover {
  transform: scale(1.3);
}
.keywords-div .col {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.keywords-div p {
  text-align: center;
}

.age-div .age {
  background-color: var(--color-lavender);
  width: 75px;
  height: 75px;
  padding: 1rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sizes-div ul {
  list-style-type: none;
  display: flex;
  gap: 15px;
}
.sizes-div ul li {
  background-color: var(--color-lavender);
  width: 70px;
  height: 70px;
  padding: 1rem;
  text-align: center;
  border-radius: 15px;
}

/* BUNDLES OR ITEMS */

.bundle-section .heading {
  font-size: 31.25px;
}

.bundle .col {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bundle-card {
  overflow: hidden;
  border-radius: 15px;
  width: 100%;
  position: relative;
  box-shadow: 4px 4px 4px lightgrey;
}
.bundle-card:hover .bundle-img {
  cursor: pointer;
  transform: scale(1.2);
  filter: brightness(60%);
}
.bundle-img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.5s;
}
.onlyone {
  max-width: 300px;
}

.bundle-card:hover .mask {
  visibility: visible;
  opacity: 1;
}

/* DECLARATION */

.declaration {
  border: 2px dashed gray;
  border-radius: 15px;
}
.declaration .heading {
  font-size: 31.25px;
  text-align: center;
}
.declaration ul {
  list-style-type: none;
  padding: 0;
  text-align: center;
}
.declaration-icons {
  display: flex;
  justify-content: center;
  gap: 25px;
}
.declaration-icons img {
  width: 40px;
  cursor: pointer;
  transition: transform 0.5s;
}

.img-div:hover img {
  transform: scale(1.3);
}

.declaration .standards {
  display: flex;
  justify-content: center;
}
.declaration .standards img {
  height: 100px;
}

/* right */

.slider-div {
  position: sticky;
  top: 100px;
  align-self: flex-start;
}

.carousel {
  height: 650px;
  box-shadow: var(--shadow-soft);
  border-radius: var(--radius);
  overflow: hidden;
}

.carousel-inner {
  width: 100%;
  overflow: hidden;
}

.carousel-item {
  height: 100%;
}

.slider-div img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.carousel-prev {
  left: -35px;
}

.carousel-next {
  right: -35px;
}

.carousel-prev,
.carousel-next {
  position: absolute;
  z-index: 2;
  border-radius: 50%;
  width: 64px;
  height: 64px;
  top: 0;
  bottom: 0;
  margin-top: auto;
  margin-bottom: auto;
  padding: 12px;
  border: none;
  transition: transform 0.5s;
  background-color: var(--color-pink);
  box-shadow: var(--shadow-soft);
}

.carousel-prev:hover,
.carousel-next:hover {
  background-color: var(--color-pink-hover);
  transform: scale(1.2);
}

.carousel-numbers {
  left: 0;
  right: 0;
  font-size: 48.83px;
}

.left-side {
  display: flex;
  flex-direction: column;
}

.share-section {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;
  display: flex;
  column-gap: 20px;
}

.shareBtn {
  background-color: var(--color-lavender);
  border-radius: var(--radius);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem;
}
.shareBtn:hover {
  background-color: var(--color-lavender-hover);
  cursor: pointer;
}
.shareBtn img {
  height: 28px;
}

.soldout-text {
  color: crimson;
  font-size: 48.83px;
}

.menu-title-mobile {
  display: none;
}
.sub-title-mobile {
  display: none;
}

@media (max-width: 991.98px) {
  .wrapper {
    flex-direction: column;
  }

  .slider-div {
    position: static;
  }

  .carousel {
    height: 350px;
  }
  .carousel-prev,
  .carousel-next {
    width: 56px;
    height: 56px;
  }
  .carousel-prev {
    left: -20px;
  }

  .carousel-next {
    right: -20px;
  }

  .shareBtn {
    padding: 0.8rem;
  }
  .shareBtn img {
    height: 25px;
  }

  .carousel-numbers {
    font-size: 39.06px;
  }

  #main-div {
    position: relative;
  }
  .menu-title {
    display: none;
  }
  .sub-title {
    display: none;
  }

  .item-description {
    font-size: 20px;
  }

  .keywords-div img {
    width: 80px;
  }
  .keywords-div .col p {
    font-size: 20px;
    text-align: center;
  }

  .bundle-section .heading {
    font-size: 25px;
  }

  .bundle-img {
    height: 250px;
  }

  .declaration-icons {
    max-width: 200px;
  }

  .reviews-div .title {
    font-size: 31.25px;
    text-align: center;
  }

  .similar-items-div {
    flex-direction: column;
  }

  .photo-grid {
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  }

  .lightbox {
    padding: 1rem;
  }

  .lightbox-close {
    top: 0.75rem;
    right: 0.75rem;
  }

  .menu-title-mobile {
    display: block;
    font-size: 48.83px;
    text-align: center;
  }
  .sub-title-mobile {
    display: block;
    font-size: 25px;
    text-align: center;
  }

  .soldout-text {
    font-size: 39.06px;
  }

  .declaration .standards img {
    height: 75px;
  }
}
</style>
