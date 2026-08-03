<script setup>
import sourceData from "@/catalog.js";
import { RouterLink } from "vue-router";
import { useI18n } from "@/i18n/useI18n";

const { t } = useI18n();

/* TODO: fetch the latest product id dynamically */
</script>

<template>
  <div class="newinstore-section">
    <p class="mt-5 mt-lg-3 mb-0 text-center section-heading">
      {{ t("gallery.new") }}
    </p>

    <div class="container my-4 my-lg-5">
      <div class="row">
        <div class="col col-lg-6 image-column px-5 px-lg-2">
          <div class="image-div">
            <img class="main-image" src="/assets/img/products/zahvalnice/1.jpg" alt="" />
          </div>
        </div>

        <div class="col col-lg-6 text-column">
          <div class="px-3">
            <p class="product-name mt-4 mt-lg-0 mb-3">Zahvalnice</p>
            <p class="product-description mb-0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              iste harum hic et esse dignissimos laboriosam vel suscipit neque
              explicabo.
            </p>
            <RouterLink class="category-link mt-4 px-4" to="/singleitem/13">{{
              t("home.viewAll")
            }}</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.row {
  justify-content: center;
}

.section-heading {
  font-size: 48.83px;
}

.image-div {
  transform: rotate(-10deg);
  overflow: hidden;
  transition: transform 0.5s;
  border-radius: 50px;
  opacity: 0.8;
  z-index: 0;
  box-shadow: 2px 2px 8px grey;
}
.image-div:hover .main-image {
  transform: scale(1.2);
}

.main-image {
  width: 350px;
  height: 350px;
  object-fit: cover;
  transition: transform 0.5s;
}

.image-column {
  display: flex;
  justify-content: end;
}

.text-column {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.product-name {
  font-size: 39.06px;
  position: relative;
  padding-right: 2rem;
}

.product-description {
  font-size: 25px;
}

.category-link {
  display: inline-block;
  color: #222;
  text-decoration: none;
  text-transform: uppercase;
  background-color: var(--color-lavender);
  border-radius: 15px;
  padding: 1rem;
  font-weight: 500;
  letter-spacing: 1px;
  width: fit-content;
}
.category-link:hover {
  background-color: var(--color-lavender-hover);
}

.icon {
  position: absolute;
  width: 64px;
  height: 64px;
  top: -32px;
  right: -32px;
  transform: rotate(20deg);
}

@media (max-width: 991.98px) {
  .section-heading {
    font-size: 39.06px;
  }

  .row {
    flex-direction: column;
  }

  .image-div {
    transform: rotate(0);
    border-radius: 15px;
    opacity: 1;
  }

  .main-image {
    width: 100%;
    height: 100%;
  }

  .text-column {
    text-align: center;
  }
  .product-name {
    font-size: 31.25px;
    padding-right: 2rem;
    padding-right: 0;
  }

  .product-description {
    font-size: 20px;
  }
}

@media (min-width: 992px) {
  .newinstore-section .image-div {
    animation: moveright 1s forwards;
  }
  .newinstore-section:hover .image-div {
    transform: rotate(0) scale(1.1);
    opacity: 1 !important;
    z-index: 1 !important;
    animation: moveleft 1s forwards;
  }

  @keyframes moveleft {
    from {
      margin-right: 50px;
    }
    to {
      margin-right: 100px;
    }
  }
  @keyframes moveright {
    from {
      margin-right: 100px;
    }
    to {
      margin-right: 50px;
    }
  }
}
</style>
