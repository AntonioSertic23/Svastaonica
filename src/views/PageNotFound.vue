<script setup>
import { RouterLink } from "vue-router";
import { useI18n } from "@/i18n/useI18n";

const { t } = useI18n();
</script>

<template>
  <section>
    <div class="container">
      <div class="box">
        <h1 class="mb-3 mb-lg-5">{{ t("notFound.title") }}</h1>
        <p class="my-5">{{ t("notFound.message") }}</p>

        <div class="">
          <a
            class="home-link first me-3"
            href="javascript:;"
            onclick="history.back()"
            >{{ t("notFound.back") }}</a
          >
          <RouterLink class="home-link ms-3" to="/">{{
            t("notFound.home")
          }}</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.container {
  height: 100%;
}

section {
  height: calc(100vh - 107px);
}

.box {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}

h1 {
  font-size: 48.83px;
  scale: 3.5;
}
p {
  font-size: 39.06px;
}

.home-link {
  color: #222;
  text-decoration: none;
  text-transform: uppercase;
  background-color: var(--color-lavender);
  border-radius: 15px;
  padding: 1rem;
  font-weight: 500;
  letter-spacing: 2px;
  border: none;
}
.home-link:hover {
  background-color: var(--color-lavender-hover);
}

.first {
  background-color: #b391ca;
}

@media (max-width: 991.98px) {
  h1 {
    scale: 2;
  }

  section {
    height: calc(100vh - 88px);
  }
}
</style>
