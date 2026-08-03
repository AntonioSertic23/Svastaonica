<script setup>
import { RouterLink } from "vue-router";
import VLazyImage from "v-lazy-image";
import { useI18n } from "@/i18n/useI18n";

const props = defineProps({
  cardData: Object,
});

const { t, pt } = useI18n();
const item = props.cardData;
</script>

<template>
  <div class="">
    <div class="image-div" v-if="item.badges.length == 1">
      <div class="image-div-background oneBadge"></div>
      <VLazyImage
        v-bind:src="'/assets/img/ui/' + item.badges[0] + '.png'"
        v-bind:class="[item.soldout ? 'soldout-img' : '']"
      />
    </div>

    <div class="multi-image-div" v-if="item.badges.length > 1">
      <div class="image-div-background moreBadges gap-3">
        <VLazyImage
          v-bind:src="'/assets/img/ui/' + item.badges[0] + '.png'"
          v-bind:class="[item.soldout ? 'soldout-img' : '']"
        />
        <VLazyImage
          v-bind:src="'/assets/img/ui/' + item.badges[1] + '.png'"
          v-bind:class="[item.soldout ? 'soldout-img' : '']"
        />
      </div>
    </div>

    <RouterLink :to="'/singleitem/' + item.id" v-if="!item.comingSoon">
      <div class="product-image-div">
        <VLazyImage
          class="thumbnail"
          v-bind:src="item.thumbnail"
          v-bind:style="[item.soldout ? 'filter: brightness(60%)' : '']"
        />

        <div class="mask">
          <p v-if="item.soldout">{{ t("product.soldOut") }}</p>
          <img v-else src="/assets/img/ui/share.png" class="open-icon" alt="" />
        </div>
      </div>
    </RouterLink>

    <div class="product-image-div-coming-soon" v-else>
      <VLazyImage
        class="thumbnail"
        :class="item.comingSoon ? 'coming-soon' : ''"
        v-bind:src="item.thumbnail"
      />

      <div class="mask px-lg-5">
        <p>{{ t("product.comingSoon") }}</p>
      </div>
    </div>

    <h1 v-bind:style="[item.soldout || item.comingSoon ? 'opacity: 0.5' : '']">
      {{ pt(item, "name") }}
    </h1>
  </div>
</template>

<style scoped>
.section-cards .image-div img {
  width: 70px;
  position: absolute;

  margin-top: -35px;
  margin-right: auto;
  margin-left: auto;
  left: 0;
  right: 0;
  z-index: 2;
  transition: transform 0.5s;
}
.image-div,
.multi-image-div {
  position: relative;
}

.image-div img:hover,
.multi-image-div img:hover {
  transform: scale(1.2);
}

.section-cards .multi-image-div img {
  width: 70px;
  height: 70px;
  transition: transform 0.5s;
}

.multi-image-div .moreBadges {
  display: flex;
  justify-content: center;
  align-items: center;
}

.badge {
  position: absolute;
  background-color: gray;
  left: 20px;
  top: 20px;
  border-radius: 0;
}

.product-image-div,
.product-image-div-coming-soon {
  position: relative;
  height: 400px;
  width: 400px;
  border-radius: 15px;
  cursor: pointer;
  overflow: hidden;
  box-shadow: 4px 4px 4px lightgrey;
}

.product-image-div img,
.product-image-div-coming-soon img {
  height: 100%;
  width: 100%;
  border-radius: 15px;
  object-fit: cover;
}

.image-div-background {
  position: absolute;
  background-color: var(--color-bg);
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  margin-top: -50px;
  z-index: 1;
}
.oneBadge {
  width: 100px;
  border-radius: 50%;
  height: 100px;
}
.moreBadges {
  width: 200px;
  border-radius: 40%;
  height: 110px;
}

.thumbnail {
  transition: transform 0.5s;
}

.product-image-div:hover .mask {
  visibility: visible;
  opacity: 1;
}
.product-image-div:hover .thumbnail {
  filter: brightness(60%);
  transform: scale(1.2);
}

.product-image-div .mask {
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
  transition: opacity 0.5s;
}
.mask .soldout-icon {
  width: 128px;
}
.mask .open-icon {
  filter: invert(100%);
  width: 96px;
}
.paragraph-div {
  position: absolute;
  opacity: 0.7;
  border-radius: 15px;
  background-color: #222;
  left: -1rem;
  right: -1rem;
  top: -1rem;
  bottom: -1rem;
}
.product-image-div .mask p {
  position: relative;
  color: white;
  font-size: 48.83px;
}

.col h1 {
  text-align: center;
  margin-top: 1rem;
  font-size: 32px;
  font-weight: 300;
  margin-bottom: 1rem;
}

.soldout-img {
  z-index: 1;
  filter: brightness(60%);
}

.coming-soon {
  filter: blur(5px) brightness(60%);
}

.product-image-div-coming-soon {
  cursor: default;
}

.product-image-div-coming-soon .mask {
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
  transition: transform 0.5s;
}

.product-image-div-coming-soon:hover .mask {
  transform: scale(1.2);
}

.product-image-div-coming-soon .mask p {
  position: relative;
  color: white;
  font-size: 48.83px;
}

@media (max-width: 991.98px) {
  .product-image-div,
  .product-image-div-coming-soon {
    height: 350px;
    width: 100%;
  }
}
</style>
