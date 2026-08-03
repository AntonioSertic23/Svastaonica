<script setup>
import { useI18n } from "@/i18n/useI18n";

defineProps({
  compact: {
    type: Boolean,
    default: false,
  },
});

const { locale, setLocale, t } = useI18n();
</script>

<template>
  <div
    class="lang-switch"
    :class="{ compact }"
    role="group"
    :aria-label="t('lang.label')"
  >
    <button
      type="button"
      class="lang-btn"
      :class="{ active: locale === 'hr' }"
      :aria-pressed="locale === 'hr'"
      @click="setLocale('hr')"
    >
      {{ t("lang.hr") }}
    </button>
    <button
      type="button"
      class="lang-btn"
      :class="{ active: locale === 'en' }"
      :aria-pressed="locale === 'en'"
      @click="setLocale('en')"
    >
      {{ t("lang.en") }}
    </button>
  </div>
</template>

<style scoped>
.lang-switch {
  display: inline-grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.3rem;
  min-width: 118px;
  background-color: var(--color-lavender);
  border-radius: var(--radius);
  padding: 0.35rem;
  box-shadow: var(--shadow-soft);
}

.lang-btn {
  border: none;
  background: transparent;
  font-family: var(--font-body);
  font-size: 0.98rem;
  font-weight: 500;
  letter-spacing: 0.06em;
  color: var(--color-text-muted);
  cursor: pointer;
  padding: 0.45rem 0.75rem;
  border-radius: 11px;
  transition: color 0.15s ease, background-color 0.15s ease;
}

.lang-btn:hover {
  color: var(--color-text);
  background-color: rgba(255, 255, 255, 0.28);
}

.lang-btn.active {
  color: var(--color-text);
  font-weight: 700;
  background-color: rgba(255, 255, 255, 0.65);
  box-shadow: 0 1px 4px rgba(80, 50, 100, 0.12);
}

.lang-switch.compact {
  min-width: 128px;
}

.lang-switch.compact .lang-btn {
  padding: 0.5rem 0.85rem;
  font-size: 1.02rem;
}

@media (min-width: 992px) {
  .lang-switch {
    min-width: 132px;
    padding: 0.4rem;
  }

  .lang-btn {
    padding: 0.55rem 0.9rem;
    font-size: 1.05rem;
  }
}
</style>
