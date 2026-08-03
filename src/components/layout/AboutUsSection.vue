<script setup>
import { RouterLink } from "vue-router";
import { useI18n } from "@/i18n/useI18n";

const { t } = useI18n();
</script>

<template>
  <div
    class="container my-3 mt-lg-4 mb-lg-0 py-5 px-3 px-lg-5 d-flex flex-column"
  >
    <p class="title text-center mb-5 mb-lg-3">{{ t("order.title") }}</p>

    <div class="row process gy-5 mx-lg-5 mt-lg-0">
      <div class="item col-lg-4">
        <img src="/assets/img/message.png" alt="" />
        <p class="mt-4 heading">{{ t("order.contact") }}</p>
        <p class="mt-3 text-center px-3">
          {{ t("order.contactText") }}
          <RouterLink class="contact-page-link" to="/contact">{{
            t("order.contactLink")
          }}</RouterLink
          >.
        </p>
      </div>

      <div class="arrow-section1">
        <img src="/assets/img/arrow.png" alt="" />
      </div>

      <div class="item col-lg-4">
        <img src="/assets/img/handcraft.png" alt="" />
        <p class="mt-4 heading">{{ t("order.crafting") }}</p>
        <p class="mt-3 text-center px-3">{{ t("order.craftingText") }}</p>
      </div>

      <div class="arrow-section2">
        <img src="/assets/img/arrow.png" alt="" />
      </div>

      <div class="item col-lg-4">
        <img src="/assets/img/delivery.png" alt="" />
        <p class="mt-4 heading">{{ t("order.delivery") }}</p>
        <p class="mt-3 text-center px-3">
          {{ t("order.deliveryTextBefore") }}
          <span class="bolded-text">{{ t("order.deliveryPost") }}</span
          >,
          <span class="bolded-text">{{ t("order.deliveryParcel") }}</span
          >,
          <span class="bolded-text">{{ t("order.deliveryTisak") }}</span
          >{{ t("order.deliveryAnd") }}
          <span class="bolded-text">{{ t("order.deliveryPickup") }}</span
          >.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.title {
  font-size: clamp(2rem, 4vw, 3.05rem);
  font-weight: 500;
}

.row {
  position: relative;
  row-gap: 25px;
}

.item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.process img {
  height: 130px;
}

.item p {
  font-size: 1.25rem;
}
.item .heading {
  font-size: clamp(1.5rem, 2.5vw, 1.95rem);
  font-weight: 500;
  margin-bottom: 0;
}

.arrow-section1,
.arrow-section2 {
  position: absolute;
  width: fit-content;
  height: fit-content;
}
.arrow-section1 {
  left: 27%;
  top: -30px;
  transform: rotate(180deg);
}
.arrow-section2 {
  right: 27%;
  top: 30px;
  transform: scaleX(-1);
}

.contact-page-link {
  text-decoration: none;
  color: var(--color-lavender-hover);
  font-weight: 600;
}

.bolded-text {
  font-weight: 600;
}

@media (max-width: 991.98px) {
  .arrow-section1 {
    left: -16px;
    top: 25%;
    transform: scaleX(-1) rotate(-90deg);
  }
  .arrow-section2 {
    right: -16px;
    top: 62%;
    transform: rotate(-90deg);
  }
}
</style>
