<script setup>
import { RouterLink } from "vue-router";
import { ref } from "vue";
import { useI18n } from "@/i18n/useI18n";

const { t } = useI18n();

/** false = classic logo.jpg, true = new brand mark */
const showNewLogo = ref(false);
const isSpinning = ref(false);

function flipLogo() {
  if (isSpinning.value) return;
  isSpinning.value = true;

  // Swap image at mid-spin so the back is never a mirrored copy of the front
  window.setTimeout(() => {
    showNewLogo.value = !showNewLogo.value;
  }, 320);

  window.setTimeout(() => {
    isSpinning.value = false;
  }, 650);
}
</script>

<template>
  <section class="hero">
    <div class="container">
      <div class="hero-grid">
        <div class="hero-copy">
          <h1>{{ t("hero.welcome") }}</h1>
          <p>{{ t("hero.subtitle") }}</p>
          <RouterLink class="btn-cta hero-cta" to="/gallery">{{
            t("hero.cta")
          }}</RouterLink>
        </div>

        <button
          type="button"
          class="hero-logo"
          :class="{ spinning: isSpinning, 'is-brand': showNewLogo }"
          :aria-pressed="showNewLogo"
          :aria-label="t('hero.logoFlipHint')"
          @click="flipLogo"
        >
          <span class="logo-stage">
            <img
              v-show="!showNewLogo"
              class="logo-img logo-img--classic"
              src="/logo.jpg"
              alt="Svaštaonica"
              width="400"
              height="364"
            />
            <img
              v-show="showNewLogo"
              class="logo-img logo-img--brand"
              src="/svastaonica-logo-1.png"
              alt="Svaštaonica — obrt za rukotvorine"
              width="400"
              height="267"
            />
          </span>
        </button>

        <blockquote class="hero-quote">
          <p>{{ t("hero.quote") }}</p>
          <footer>Pablo Larrain</footer>
        </blockquote>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  margin-bottom: 3rem;
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
  text-align: center;
  order: 2;
}

.hero-copy h1 {
  font-size: clamp(1.95rem, 4vw, 3.05rem);
  font-weight: 500;
  margin: 0 0 0.75rem;
}

.hero-copy p {
  font-size: clamp(1.15rem, 2.2vw, 1.55rem);
  margin: 0 0 1.5rem;
  line-height: 1.45;
  color: var(--color-text-muted);
}

.hero-cta {
  margin-top: 0.25rem;
}

.hero-logo {
  order: 1;
  justify-self: center;
  width: min(100%, 420px);
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.logo-stage {
  display: grid;
  place-items: center;
  width: 100%;
  aspect-ratio: 400 / 364;
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  background: #fff;
  transition: transform 0.65s cubic-bezier(0.4, 0.2, 0.2, 1);
}

.hero-logo.spinning .logo-stage {
  animation: logo-spin 0.65s cubic-bezier(0.4, 0.2, 0.2, 1);
}

@keyframes logo-spin {
  0% {
    transform: rotateY(0deg) scale(1);
  }
  45% {
    transform: rotateY(90deg) scale(0.92);
  }
  55% {
    transform: rotateY(90deg) scale(0.92);
  }
  100% {
    transform: rotateY(0deg) scale(1);
  }
}

.logo-img {
  display: block;
  width: 100%;
  height: 100%;
}

.logo-img--classic {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.logo-img--brand {
  width: 100%;
  height: auto;
  object-fit: contain;
  object-position: center;
}

.hero-logo:hover .logo-stage {
  filter: brightness(1.02);
}

.hero-logo:focus-visible {
  outline: 3px solid var(--color-lavender-hover);
  outline-offset: 4px;
  border-radius: calc(var(--radius) + 2px);
}

.hero-quote {
  display: none;
  margin: 0;
  text-align: center;
}

.hero-quote p {
  font-size: clamp(1.35rem, 2.4vw, 1.75rem);
  margin: 0 0 0.65rem;
  line-height: 1.4;
}

.hero-quote footer {
  font-style: italic;
  font-weight: 700;
  font-size: 1.05rem;
}

@media (min-width: 992px) {
  .hero {
    margin-bottom: 4rem;
    padding-top: 1rem;
  }

  .hero-grid {
    grid-template-columns: 1fr minmax(280px, 380px) 1fr;
    gap: 1.5rem;
    padding: 0;
    align-items: center;
  }

  .hero-copy {
    order: 1;
    text-align: left;
    padding-right: 1.5rem;
  }

  .hero-logo {
    order: 2;
  }

  .hero-quote {
    display: flex;
    flex-direction: column;
    justify-content: center;
    order: 3;
    padding-left: 1rem;
    padding-right: 0.25rem;
    align-self: center;
  }

  .hero-quote p {
    font-size: clamp(1.55rem, 1.9vw, 1.95rem);
  }
}

@media (max-width: 575.98px) {
  .hero-copy h1 {
    font-size: 1.75rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-logo.spinning .logo-stage {
    animation: none;
  }
}
</style>
