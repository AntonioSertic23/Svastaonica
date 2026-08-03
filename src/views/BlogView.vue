<script setup>
import { ref } from "vue";
import sourceData from "@/catalog.js";

var data = ref(sourceData.blogs);
</script>

<template>
  <section class="blog-section py-4">
    <div class="container d-flex flex-column">
      <div class="row text-center">
        <p class="mb-5 menu-title">Blog</p>
      </div>

      <div class="row row-cols-1 row-cols-lg-3 gy-5 g-lg-5">
        <div class="col px-4" v-for="item in data" :key="item.id">
          <RouterLink :to="'/singleblog/' + item.id">
            <div class="blog-card">
              <div class="image-div">
                <img class="main-image" :src="item.thumbnail" alt="" />

                <div class="mask">
                  <img src="/assets/img/share.png" class="open-icon" alt="" />
                </div>
              </div>
              <div class="card-body">
                <p class="card-heading">{{ item.title }}</p>
                <div class="card-date text-muted">{{ item.date }}</div>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.menu-title {
  font-size: 48.83px;
}

a {
  color: black;
  text-decoration: none;
}

.blog-card:hover {
  cursor: pointer;
}

.blog-card:hover .image-div .main-image {
  transform: scale(1.2);
  filter: brightness(60%);
}

.image-div {
  border-radius: 15px;
  box-shadow: 4px 4px 4px lightgrey;
  overflow: hidden;
  position: relative;
}

.image-div .main-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: transform 0.5s;
}

.card-heading {
  font-size: 25px;
  font-weight: 500;
}

.card-date {
  font-size: 20px;
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
  transition: opacity 0.5s;
}
.mask .open-icon {
  filter: invert(100%);
  width: 96px;
}

.blog-card:hover .mask {
  visibility: visible;
  opacity: 1;
}
</style>
