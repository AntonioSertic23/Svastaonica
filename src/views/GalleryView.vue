<script setup>
import { computed, ref } from "vue";
import sourceData from "@/catalog.js";
import ProductCard from "../components/ui/ProductCard.vue";
import SearchBar from "../components/ui/SearchBar.vue";
import { useI18n } from "@/i18n/useI18n";
import { productMatchesQuery } from "@/i18n/productLocale";

const { t } = useI18n();

const searchQuery = ref("");
let comingSoonData = [];
let soldoutData = [];

function buildGallery() {
  comingSoonData = [];
  soldoutData = [];
  const tempData = sourceData.data.filter(function (el) {
    if (el.comingSoon == true) {
      comingSoonData.push(el);
    } else if (el.soldout == true) {
      soldoutData.push(el);
    }
    return el.comingSoon == false || el.soldout == false;
  });

  tempData.sort(function (a, b) {
    return a.id - b.id;
  });
  tempData.reverse();

  return tempData;
}

const baseData = ref(buildGallery());

// Clear leftover category filter from older gallery versions
localStorage.removeItem("sortData");

function onSearch(textRef) {
  searchQuery.value = (textRef?.value || "").trim().toLowerCase();
}

function matchesSearch(item) {
  return productMatchesQuery(item, searchQuery.value);
}

const visibleData = computed(() => baseData.value.filter(matchesSearch));
const visibleSoldout = computed(() => soldoutData.filter(matchesSearch));
const visibleComingSoon = computed(() => comingSoonData.filter(matchesSearch));

const isEmpty = computed(
  () =>
    visibleData.value.length === 0 &&
    visibleSoldout.value.length === 0 &&
    visibleComingSoon.value.length === 0
);
</script>

<template>
  <section class="gallery-section pt-4">
    <div class="container">
      <div class="row justify-content-center text-center">
        <p class="mb-4 menu-title">{{ t("gallery.title") }}</p>
      </div>

      <div class="row justify-content-center mb-5">
        <div class="searchbar-wrap col-11 col-md-8 col-lg-5">
          <SearchBar
            :inline="true"
            :placeholder="t('gallery.searchPlaceholder')"
            @find-data="onSearch"
          />
        </div>
      </div>

      <div class="section-cards row justify-content-evenly mb-5">
        <div class="container text-center">
          <div class="row row-cols-1 row-cols-lg-3 gy-5 g-lg-5">
            <div class="col px-4" v-for="item in visibleData" :key="item.id">
              <ProductCard :cardData="item" />
            </div>
            <div
              class="col px-4"
              v-for="item in visibleSoldout"
              :key="'s' + item.id"
            >
              <ProductCard :cardData="item" />
            </div>
            <div
              class="col px-4"
              v-for="item in visibleComingSoon"
              :key="'c' + item.id"
            >
              <ProductCard :cardData="item" />
            </div>
          </div>
          <p v-if="isEmpty" class="empty-message mt-5 px-3">
            {{ t("gallery.empty") }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.menu-title {
  font-size: clamp(2rem, 4vw, 3.05rem);
}

.searchbar-wrap {
  margin-bottom: 0.5rem;
}

.empty-message {
  font-size: clamp(1.25rem, 2.5vw, 1.95rem);
}
</style>
