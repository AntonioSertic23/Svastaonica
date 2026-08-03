<script setup>
import { computed, ref } from "vue";
import sourceData from "@/catalog.js";
import ProductCard from "../components/ui/ProductCard.vue";
import SearchBar from "../components/ui/SearchBar.vue";
import { onBeforeRouteUpdate } from "vue-router";
import { useI18n } from "@/i18n/useI18n";

const { t } = useI18n();

const searchQuery = ref("");
const currentSort = ref(0);
let comingSoonData = [];
let soldoutData = [];

onBeforeRouteUpdate(() => {
  localStorage.removeItem("sortData");
});

function setDefaultGallery() {
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

function hasCategory(el, cat) {
  return (el.categories || []).some((c) => Number(c) === Number(cat));
}

const baseData = ref(setDefaultGallery());

const lsSortData = localStorage.getItem("sortData");
if (lsSortData != null) {
  currentSort.value = Number(lsSortData);
  baseData.value = sourceData.data.filter(function (el) {
    return hasCategory(el, currentSort.value);
  });
  baseData.value.reverse();
}

function sortData(x) {
  searchQuery.value = "";
  if (currentSort.value == x) {
    currentSort.value = 0;
    baseData.value = setDefaultGallery();
    localStorage.removeItem("sortData");
  } else {
    currentSort.value = x;
    baseData.value = sourceData.data.filter(function (el) {
      return hasCategory(el, x);
    });
    baseData.value.reverse();
    localStorage.setItem("sortData", String(x));
  }
}

function onSearch(textRef) {
  searchQuery.value = (textRef?.value || "").trim().toLowerCase();
}

function matchesSearch(item) {
  if (!searchQuery.value) return true;
  return item.name.toLowerCase().includes(searchQuery.value);
}

const visibleData = computed(() => baseData.value.filter(matchesSearch));
const visibleSoldout = computed(() => soldoutData.filter(matchesSearch));
const visibleComingSoon = computed(() => comingSoonData.filter(matchesSearch));

const isEmpty = computed(() => {
  if (currentSort.value != 0) {
    return visibleData.value.length === 0;
  }
  return (
    visibleData.value.length === 0 &&
    visibleSoldout.value.length === 0 &&
    visibleComingSoon.value.length === 0
  );
});
</script>

<template>
  <section class="gallery-section pt-4">
    <div class="container">
      <div class="row justify-content-center text-center">
        <p class="mb-4 menu-title">{{ t("gallery.title") }}</p>
      </div>

      <div class="row justify-content-center mb-4">
        <div class="searchbar-wrap col-11 col-md-8 col-lg-5">
          <SearchBar
            :inline="true"
            :placeholder="t('gallery.searchPlaceholder')"
            @find-data="onSearch"
          />
        </div>
      </div>

      <div class="row mb-5 pb-5 col-10 mx-auto">
        <div
          class="sort-div d-flex justify-content-center flex-wrap row-cols-1 row-cols-lg-5 text-center"
        >
          <a
            class="category-link"
            @click="sortData(1)"
            :class="currentSort == 1 ? 'active' : 'notactive'"
            >{{ t("gallery.trending") }}</a
          >
          <a
            class="category-link"
            @click="sortData(2)"
            :class="currentSort == 2 ? 'active' : 'notactive'"
            >{{ t("gallery.new") }}</a
          >
          <a
            class="category-link"
            @click="sortData(3)"
            :class="currentSort == 3 ? 'active' : 'notactive'"
            >{{ t("gallery.sale") }}</a
          >
          <a
            class="category-link"
            @click="sortData(4)"
            :class="currentSort == 4 ? 'active' : 'notactive'"
            >{{ t("gallery.bundles") }}</a
          >
        </div>
      </div>

      <div class="section-cards row justify-content-evenly mb-5">
        <div class="container text-center">
          <div class="row row-cols-1 row-cols-lg-3 gy-5 g-lg-5">
            <div class="col px-4" v-for="item in visibleData" :key="item.id">
              <ProductCard :cardData="item" />
            </div>
            <template v-if="currentSort == 0">
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
            </template>
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

.sort-div {
  gap: 24px;
}

.category-link {
  color: var(--color-text);
  text-decoration: none;
  text-transform: uppercase;
  border-radius: var(--radius);
  padding: 1rem;
  font-weight: 500;
  letter-spacing: 1px;
  box-shadow: var(--shadow-soft);
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.active {
  background-color: var(--color-lavender-hover);
}
.notactive {
  background-color: var(--color-lavender);
}

.empty-message {
  font-size: clamp(1.25rem, 2.5vw, 1.95rem);
}

@media (min-width: 992px) {
  .category-link:hover {
    background-color: var(--color-lavender-hover);
  }
}
</style>
