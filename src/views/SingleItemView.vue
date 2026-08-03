<script setup>
import sourceData from "@/data.json";
import { useRoute, RouterLink } from "vue-router";
import VLazyImage from "v-lazy-image";
import { onMounted, ref } from "vue";

const route = useRoute();
const paramId = parseInt(route.params.id);

var data = ref(sourceData.data.find((d) => d.id === paramId));

var aBundles = [];
if (data.value.isPartOfBundle) {
  data.value.bundle.forEach((id) => {
    var bundle = sourceData.data.find((d) => d.id === id);
    aBundles.push(bundle);
  });
}

var aItems = [];
if (data.value.isBundle) {
  data.value.bundleItems.forEach((id) => {
    var item = sourceData.data.find((d) => d.id === id);
    aItems.push(item);
  });
}

var aSimilarItems = [];
data.value.similarItems.forEach((id) => {
  var item = sourceData.data.find((d) => d.id === id);
  aSimilarItems.push(item);
});

// modal

var currentImageToOpen = ref("");
function ChangeCurrentImageToOpen(path) {
  currentImageToOpen.value = path;
}

function getCurrentImageToOpen() {
  return currentImageToOpen.value;
}

// carousel

var totalImages = ref(1);
var currentIndex = ref(1);

onMounted(() => {
  totalImages.value = $(".carousel-item").length;
});

function updateNumber() {
  currentIndex.value = $(".active").index() + 1;
}

// share
const share = (e) => {
  if (navigator.share) {
    navigator
      .share({
        title: "Product share",
        text: data.value.name,
        url: "https://svastaonica.netlify.app" + route.fullPath,
      })
      .then(() => console.log("thanks for share"))
      .catch((error) =>
        alert(
          "Nažalost mogućnost dijeljenja proizvoda nije moguća za vaš uređaj ili preglednika."
        )
      );
  }
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
              <p>RASPRODANO</p>
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
                Ovaj proizvod je dio našeg promo paketa
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
                Proizvodi koji se nalaze u paketu
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
                v-on:click="updateNumber()"
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
                      class="d-block"
                      v-bind:src="image.path"
                      data-bs-toggle="modal"
                      data-bs-target="#imageModal"
                      @click="ChangeCurrentImageToOpen(image.path)"
                    />

                    <div class="share-section">
                      <a
                        class="shareBtn"
                        :href="image.path"
                        :download="data.name + currentIndex"
                      >
                        <img src="/assets/img/download.png" alt="" />
                      </a>

                      <a class="shareBtn" @click="share()">
                        <img src="/assets/img/share3.png" alt="" />
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
                v-on:click="updateNumber()"
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
        class="row similar-items-div px-4 px-lg-0 align-items-center"
        v-if="aSimilarItems.length > 0"
      >
        <p class="title">Slični proizvodi</p>
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

  <!-- Modal -->
  <div
    class="modal fade"
    id="imageModal"
    tabindex="-1"
    aria-labelledby="imageModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content mx-auto">
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
        <div class="modal-body p-0">
          <img :src="getCurrentImageToOpen()" />
        </div>
      </div>
    </div>
  </div>
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

.btn-close {
  position: absolute;
  z-index: 1;
  background-color: white;
  opacity: 1;
  padding: 1rem;
  border-radius: 15px;
  right: 20px;
  top: 20px;
}
.btn-close:hover {
  background-color: #aaa;
  filter: invert(1);
}

.modal-dialog {
  max-width: none;
}
.modal-body {
  height: 100%;
}
.modal-body img {
  width: 100%;
  height: 100%;
}

.modal-content {
  border: none;
  border-radius: 15px;
  overflow: hidden;
  height: 90vh;
  width: fit-content;
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
.similar-items-div .similar-item {
  background-color: rgb(205, 180, 219);
  height: 250px;
  border-radius: 15px;
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

/* for real */

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
  background-color: rgb(205, 180, 219);
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
  background-color: rgb(205, 180, 219);
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

.carousel {
  height: 650px;
  box-shadow: 0px 5px 18px grey;
  border-radius: 15px;
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

.slider-div {
  position: sticky;
  top: 100px;
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
  background-color: #ffafcc;
  box-shadow: 0 0.25rem 1rem 0 grey;
}

.carousel-prev:hover,
.carousel-next:hover {
  background-color: #ff85b1;
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
.share-section-down {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1;
}

.shareBtn {
  background-color: rgb(205, 180, 219);
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.9rem;
}
.shareBtn:hover {
  background-color: #a375bd;
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

  .modal.show {
    display: flex !important;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    height: fit-content;
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

  .modal-dialog {
    margin: 0 1rem;
  }

  .soldout-text {
    font-size: 39.06px;
  }

  .declaration .standards img {
    height: 75px;
  }
}
</style>
