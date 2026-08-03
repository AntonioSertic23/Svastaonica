<script setup>
import { RouterLink } from "vue-router";
import LanguageSwitcher from "../ui/LanguageSwitcher.vue";
import { useI18n } from "@/i18n/useI18n";

const emit = defineEmits(["closeMobileNavbar"]);
const { t } = useI18n();

function closeNavbar() {
  emit("closeMobileNavbar");
}
</script>

<template>
  <div class="mobile-menu">
    <div class="mobile-lang">
      <LanguageSwitcher compact />
    </div>

    <nav class="mobile-links" aria-label="Primary">
      <RouterLink class="nav-link site-link" @click="closeNavbar()" to="/">{{
        t("nav.home")
      }}</RouterLink>
      <RouterLink
        class="nav-link site-link"
        @click="closeNavbar()"
        to="/gallery"
        >{{ t("nav.gallery") }}</RouterLink
      >
      <RouterLink
        class="nav-link site-link"
        @click="closeNavbar()"
        to="/aboutus"
        >{{ t("nav.about") }}</RouterLink
      >
      <RouterLink
        class="nav-link site-link"
        @click="closeNavbar()"
        to="/contact"
        >{{ t("nav.contact") }}</RouterLink
      >
    </nav>

    <div class="mobile-footer">
      <div class="mobile-social">
        <a href="http://m.me/svastaonicazabebe" aria-label="Messenger">
          <img src="/assets/img/ui/sm-facebook-messenger.png" alt="" />
        </a>
        <a
          href="https://api.whatsapp.com/send?phone=0919375976"
          aria-label="WhatsApp"
        >
          <img src="/assets/img/ui/sm-whatsapp.png" alt="" />
        </a>
        <a
          href="https://www.facebook.com/svastaonicaobrtzarukotvorine"
          aria-label="Facebook"
        >
          <img src="/assets/img/ui/sm-facebook.png" alt="" />
        </a>
        <a
          href="https://www.instagram.com/svastaonica_rukotvorine/"
          aria-label="Instagram"
        >
          <img src="/assets/img/ui/sm-instagram.png" alt="" />
        </a>
        <a href="mailto:svastaonicazabebe@gmail.com" aria-label="Email">
          <img src="/assets/img/ui/sm-google.png" alt="" />
        </a>
      </div>

      <a class="phone-link" href="tel:+385994788586">+385 99 478 85 86</a>
    </div>
  </div>
</template>

<style scoped>
.mobile-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
  min-height: calc(100dvh - 72px);
  padding: 1rem 1.25rem 1.5rem;
  font-family: var(--font-display);
}

.mobile-lang {
  display: flex;
  justify-content: center;
  width: 100%;
  flex-shrink: 0;
}

.mobile-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  width: 100%;
  max-width: 280px;
  flex: 1;
  justify-content: center;
  animation: fadein 0.7s ease;
}

.nav-link {
  display: flex !important;
  justify-content: center;
  width: 100%;
  margin: 0;
  padding: 0.7rem 0.5rem;
  font-size: clamp(1.35rem, 5vw, 1.65rem) !important;
  color: var(--color-text) !important;
}

/* Purple active/hover underline only — no grey separators */
.site-link::after {
  bottom: 0.25rem;
}

.site-link.router-link-active::after,
.site-link.router-link-exact-active::after,
.site-link:hover::after {
  width: 42%;
}

.mobile-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.85rem;
  width: 100%;
  flex-shrink: 0;
  padding-bottom: env(safe-area-inset-bottom, 0);
  animation: fadein 0.7s ease;
}

.mobile-social {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.mobile-social img {
  width: 40px;
  height: 40px;
  display: block;
}

.phone-link {
  font-size: 1.15rem;
  color: var(--color-text);
  text-decoration: none;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
