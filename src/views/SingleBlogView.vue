<script setup>
import sourceData from "@/catalog.js";
import { useRoute, RouterLink } from "vue-router";
import VLazyImage from "v-lazy-image";
import { onMounted, ref } from "vue";

const route = useRoute();
const paramId = parseInt(route.params.id);

var data = ref(sourceData.blogs.find((d) => d.id === paramId));
</script>

<template>
  <section>
    <div class="container py-lg-5">
      <p class="blog-title col-10 col-lg-8">{{ data.title }}</p>
      <p class="blog-date text-muted m-0">{{ data.date }}</p>
      <img class="thumbnail my-5" :src="data.thumbnail" alt="" />
      <p
        class="blog-decription col-10 col-lg-8 mb-5"
        v-html="data.description"
      ></p>
    </div>
  </section>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.blog-title {
  font-size: 48.83px;
  text-align: center;
}

.blog-date {
  font-size: 20px;
}

.thumbnail {
  border-radius: 15px;
  height: 300px;
}

.blog-decription {
  font-size: 25px;
  text-align: center;
}

@media (max-width: 992px) {
  .blog-title {
    font-size: 39.06px;
  }
  .blog-decription {
    font-size: 20px;
  }

  .thumbnail {
    height: 100%;
    width: 100%;
  }
}
</style>
