<script setup>
import { RouterLink } from "vue-router";
import { useI18n } from "@/i18n/useI18n";

const { t } = useI18n();
</script>

<template>
  <section class="hero">
    <div class="container">
      <div class="hero-grid">
        <div class="hero-copy">
          <p class="hero-eyebrow">{{ t("hero.welcome") }}</p>
          <h1 class="hero-brand">Svaštaonica</h1>
          <p class="hero-subtitle">{{ t("hero.subtitle") }}</p>
          <RouterLink class="btn-cta hero-cta" to="/gallery">{{
            t("hero.cta")
          }}</RouterLink>
        </div>

        <div class="hero-logo">
          <div class="logo-frame">
            <div class="logo-frame-inner">
              <img
                class="logo-img"
                src="/assets/img/brand/svastaonica-logo-1.png"
                alt="Svaštaonica — obrt za rukotvorine"
                width="400"
                height="267"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  margin-bottom: 0;
  padding-top: 0.5rem;
}

.hero-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.75rem;
  align-items: center;
  padding: 0 1rem;
}

.hero-copy {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  order: 2;
}

.hero-eyebrow {
  margin: 0 0 0.35rem;
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 400;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.hero-brand {
  font-size: clamp(2.6rem, 7vw, 4.25rem);
  font-family: var(--font-body);
  font-weight: 300;
  letter-spacing: -0.03em;
  margin: 0 0 0.85rem;
  line-height: 1.05;
  color: var(--color-text);
}

.hero-subtitle {
  font-size: clamp(1.1rem, 2.1vw, 1.4rem);
  margin: 0 0 1.5rem;
  line-height: 1.5;
  color: var(--color-text-muted);
  max-width: 28rem;
}

.hero-cta {
  margin-top: 0.25rem;
}

.hero-logo {
  order: 1;
  justify-self: center;
  width: min(100%, 460px);
}

.logo-frame {
  position: relative;
  padding: 10px;
  border-radius: calc(var(--radius) + 6px);
  background:
    linear-gradient(
      145deg,
      color-mix(in srgb, var(--color-lavender) 55%, white),
      color-mix(in srgb, var(--color-pink-soft) 40%, white) 48%,
      color-mix(in srgb, var(--color-blue-soft) 50%, white)
    );
  box-shadow: 0 10px 28px rgba(70, 50, 90, 0.12);
}

.logo-frame-inner {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 400 / 290;
  padding: 1.35rem 1.5rem;
  border-radius: var(--radius);
  background:
    radial-gradient(
      ellipse 80% 70% at 50% 40%,
      #fff 0%,
      color-mix(in srgb, var(--color-bg-card) 70%, white) 100%
    );
}

.logo-img {
  display: block;
  width: 100%;
  height: auto;
  object-fit: contain;
  object-position: center;
}

@media (min-width: 992px) {
  .hero {
    padding-top: 0.75rem;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
  }

  .hero .container {
    width: 100%;
  }

  .hero-grid {
    grid-template-columns: 1fr minmax(320px, 460px);
    gap: 2.5rem;
    padding: 0;
    align-items: center;
  }

  .hero-copy {
    order: 1;
    text-align: left;
    align-items: flex-start;
    padding-right: 1rem;
  }

  .hero-subtitle {
    max-width: 32rem;
  }

  .hero-logo {
    order: 2;
  }
}

@media (max-width: 575.98px) {
  .hero-brand {
    font-size: 2.35rem;
  }
}
</style>
