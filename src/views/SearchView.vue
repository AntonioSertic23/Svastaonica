<script setup>
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import sourceData from "@/catalog.js";
import ProductCard from "../components/ui/ProductCard.vue";
import SearchBar from "../components/ui/SearchBar.vue";
import { useI18n } from "@/i18n/useI18n";

const { t } = useI18n();
const data = ref(sourceData.data);
const route = useRoute();
data.value = sourceData.data.filter(function (el) {
  if (el.name.toLowerCase().includes(route.params.search.toLowerCase())) {
    return el;
  }
});

function FindData(text) {
  data.value = sourceData.data.filter(function (el) {
    if (el.name.toLowerCase().includes(text.value.toLowerCase())) {
      return el;
    }
  });
}

const isEmpty = computed(() => data.value.length === 0);
</script>

<template>
  <section class="container d-flex flex-column align-items-center mt-5">
    <div class="searchbar-div mb-5 mt-4 mt-lg-0 mx-2">
      <SearchBar @find-data="FindData" :isForNavbar="false" />
    </div>

    <div class="section-cards row justify-content-evenly my-5">
      <div class="container text-center">
        <div class="row row-cols-1 row-cols-lg-auto gy-5 g-lg-5">
          <div class="col px-4" v-for="item in data" :key="item.id">
            <ProductCard :cardData="item" />
          </div>
        </div>
        <div class="message-div my-5 px-4 px-lg-0" v-if="isEmpty">
          <p class="message m-0">
            {{ t("search.empty") }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.searchbar-div {
  width: 500px;
}

.message-div {
  min-height: 103px;
  display: flex;
  align-items: center;
}

.message {
  font-size: 31.25px;
}

@media (max-width: 991.98px) {
  .searchbar-div {
    width: auto;
  }

  .message {
    font-size: 25px;
  }
}
</style>
