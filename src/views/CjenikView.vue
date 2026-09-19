<script setup>
import { computed, onMounted, ref } from "vue";
import { RouterLink } from "vue-router";
import sourceData from "@/catalog.js";
import { useI18n } from "@/i18n/useI18n";
import {
  cjenikMeta,
  formatEuro,
  hasPrice,
  isOnSale,
} from "@/cjenik/pricing";

const { t, pt } = useI18n();
const files = ref([]);

const products = computed(() =>
  sourceData.data.filter((p) => !p.comingSoon && hasPrice(p))
);

onMounted(async () => {
  try {
    const res = await fetch("/cjenici/files.json", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      files.value = Array.isArray(data.files) ? data.files : [];
    }
  } catch {
    files.value = [];
  }
});
</script>

<template>
  <section class="cjenik-section py-4">
    <div class="container">
      <p class="mb-3 menu-title text-center">{{ t("cjenik.title") }}</p>
      <p class="intro text-center mx-auto">{{ t("cjenik.intro") }}</p>
      <p class="note text-center mx-auto mb-5">{{ t("cjenik.note") }}</p>

      <div v-if="files.length" class="files-card mx-auto mb-5">
        <h2 class="files-heading">{{ t("cjenik.files") }}</h2>
        <p class="files-hint">{{ t("cjenik.available30") }}</p>
        <ul class="file-list">
          <li v-for="file in files" :key="file.name">
            <a :href="file.url">{{ file.name }}</a>
          </li>
        </ul>
        <a class="raw-index" href="/cjenici/index.html">{{ t("cjenik.rawIndex") }}</a>
      </div>

      <p v-if="!products.length" class="note text-center mx-auto">
        {{ t("cjenik.noPrices") }}
      </p>

      <div v-else class="table-wrap">
        <table class="cjenik-table">
          <thead>
            <tr>
              <th>{{ t("cjenik.colName") }}</th>
              <th>{{ t("cjenik.colPrice") }}</th>
              <th>{{ t("cjenik.colAnchor") }}</th>
              <th>{{ t("cjenik.colLowest") }}</th>
              <th>{{ t("cjenik.colStatus") }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in products" :key="item.id">
              <td>
                <RouterLink :to="'/singleitem/' + item.id">
                  {{ pt(item, "name") }}
                </RouterLink>
                <span v-if="isOnSale(item)" class="sale-tag">{{
                  t("product.sale")
                }}</span>
              </td>
              <td>{{ formatEuro(item.price) }}</td>
              <td>
                <template v-if="item.sidrenaCijena != null">
                  {{ formatEuro(item.sidrenaCijena) }}
                  <span class="date">{{ cjenikMeta.sidrenaDatum }}</span>
                </template>
              </td>
              <td>
                {{
                  item.najnizaCijena30dana != null
                    ? formatEuro(item.najnizaCijena30dana)
                    : ""
                }}
              </td>
              <td>
                {{
                  item.soldout
                    ? t("product.soldOut")
                    : t("cjenik.available")
                }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cjenik-section {
  font-size: 1.05rem;
}

.menu-title {
  font-size: 48.83px;
}

.intro,
.note {
  max-width: 42rem;
  color: var(--color-text-muted);
}

.intro {
  font-size: 1.2rem;
}

.files-card {
  max-width: 52rem;
  background: color-mix(in srgb, var(--color-lavender) 32%, white);
  border-radius: var(--radius);
  box-shadow: var(--shadow-soft);
  padding: 1.5rem 1.75rem;
}

.files-heading {
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0 0 0.4rem;
}

.files-hint {
  color: var(--color-text-muted);
  margin-bottom: 1rem;
}

.file-list {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.file-list a,
.raw-index {
  color: var(--color-text);
  font-weight: 600;
  word-break: break-all;
}

.raw-index {
  font-size: 0.95rem;
}

.table-wrap {
  overflow-x: auto;
  border-radius: var(--radius);
  box-shadow: var(--shadow-soft);
  background: var(--color-bg-card);
}

.cjenik-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 640px;
}

.cjenik-table th,
.cjenik-table td {
  text-align: left;
  padding: 0.9rem 1rem;
  vertical-align: top;
}

.cjenik-table thead {
  background: var(--color-lavender);
}

.cjenik-table tbody tr:nth-child(even) {
  background: color-mix(in srgb, var(--color-lavender) 18%, transparent);
}

.cjenik-table a {
  color: var(--color-text);
  font-weight: 600;
}

.sale-tag {
  display: inline-block;
  margin-left: 0.5rem;
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: var(--color-pink);
  border-radius: 999px;
  padding: 0.15rem 0.5rem;
}

.date {
  display: block;
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

@media (max-width: 991.98px) {
  .menu-title {
    font-size: 2.2rem;
  }
}
</style>
