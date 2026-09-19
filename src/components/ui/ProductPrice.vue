<script setup>
import { computed } from "vue";
import { useI18n } from "@/i18n/useI18n";
import {
  cjenikMeta,
  formatEuro,
  hasAmount,
  hasPrice,
  isOnSale,
} from "@/cjenik/pricing";

const props = defineProps({
  product: { type: Object, required: true },
});

const { t } = useI18n();

const visible = computed(() => hasPrice(props.product));
const sale = computed(() => isOnSale(props.product));
const current = computed(() => formatEuro(props.product.price));
const hasAnchor = computed(() => hasAmount(props.product.sidrenaCijena));
const hasLowest = computed(() => hasAmount(props.product.najnizaCijena30dana));
</script>

<template>
  <div v-if="visible" class="product-price" :class="{ sale }">
    <p class="current">
      <span class="label">{{ t("product.price") }}</span>
      <span class="amount">{{ current }}</span>
      <span v-if="sale" class="sale-tag">{{ t("product.sale") }}</span>
    </p>
    <p v-if="hasAnchor" class="extra">
      {{ t("product.anchorPrice") }}
      ({{ cjenikMeta.sidrenaDatum }}):
      <span class="extra-amount">{{ formatEuro(product.sidrenaCijena) }}</span>
    </p>
    <p v-if="hasLowest" class="extra">
      {{ t("product.lowest30") }}:
      <span class="extra-amount">{{
        formatEuro(product.najnizaCijena30dana)
      }}</span>
    </p>
  </div>
</template>

<style scoped>
.product-price {
  text-align: center;
  margin: 0 auto 0.25rem;
  padding: 1rem 1.25rem;
  max-width: 28rem;
  background: color-mix(in srgb, var(--color-lavender) 35%, transparent);
  border-radius: 12px;
}

.current {
  display: flex;
  align-items: baseline;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.45rem 0.7rem;
  margin: 0;
}

.label {
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  opacity: 0.85;
}

.amount {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1.15;
}

.sale-tag {
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  background: var(--color-pink);
  border-radius: 999px;
  padding: 0.2rem 0.65rem;
}

.extra {
  margin: 0.45rem 0 0;
  font-size: 1.05rem;
  color: var(--color-text-muted);
}

.extra-amount {
  font-weight: 600;
  color: var(--color-text);
}

@media (max-width: 991.98px) {
  .amount {
    font-size: 1.7rem;
  }

  .extra {
    font-size: 0.98rem;
  }
}
</style>
