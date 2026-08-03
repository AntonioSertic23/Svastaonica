<script setup>
import { RouterLink } from "vue-router";
import { useI18n } from "@/i18n/useI18n";

const { t } = useI18n();
</script>

<template>
  <div class="">
    <footer class="text-center">
      <div class="container d-flex flex-column">
        <section>
          <div
            class="row row-cols-1 row-cols-lg-4 justify-content-center g-3 mt-4 col-lg-8 mx-auto"
          >
            <div class="">
              <h6 class="text-uppercase">
                <RouterLink class="nav-link site-link" to="/">{{
                  t("nav.home")
                }}</RouterLink>
              </h6>
            </div>

            <div class="">
              <h6 class="text-uppercase">
                <RouterLink class="nav-link site-link" to="/gallery">{{
                  t("nav.gallery")
                }}</RouterLink>
              </h6>
            </div>

            <div class="">
              <h6 class="text-uppercase">
                <RouterLink class="nav-link site-link" to="/aboutus">{{
                  t("nav.about")
                }}</RouterLink>
              </h6>
            </div>

            <div class="">
              <h6 class="text-uppercase">
                <RouterLink class="nav-link site-link" to="/contact">{{
                  t("nav.contact")
                }}</RouterLink>
              </h6>
            </div>
          </div>
        </section>

        <hr class="mt-4 mb-5" />

        <section class="mb-4">
          <div class="row d-flex justify-content-center">
            <div class="col-lg-8 px-4">
              <p class="footer-text m-0">{{ t("footer.reachUs") }}</p>
            </div>
          </div>
        </section>

        <section class="my-0 social-media px-3 row g-3 justify-content-center">
          <a href="http://m.me/svastaonicazabebe">
            <img src="/assets/img/sm-facebook-messenger.png" alt="Messenger" />
          </a>

          <a href="https://api.whatsapp.com/send?phone=0919375976">
            <img src="/assets/img/sm-whatsapp.png" alt="WhatsApp" />
          </a>

          <a href="https://www.facebook.com/svastaonicaobrtzarukotvorine">
            <img src="/assets/img/sm-facebook.png" alt="Facebook" />
          </a>

          <a href="https://www.instagram.com/svastaonica_rukotvorine/">
            <img src="/assets/img/sm-instagram.png" alt="Instagram" />
          </a>

          <a href="mailto:svastaonicazabebe@gmail.com">
            <img src="/assets/img/sm-google.png" alt="Email" />
          </a>
        </section>

        <p class="my-3 footer-text">{{ t("footer.glad") }}</p>
        <p class="mb-4 text-center madeineu">Made in EU</p>
      </div>

      <div class="text-center p-3 footer-copyright-text">
        {{ t("footer.copyright") }}
      </div>
    </footer>
  </div>
</template>

<style scoped>
footer {
  position: relative;
  z-index: 2;
  background-color: var(--color-lavender);
  isolation: isolate;
}

.nav-link {
  color: var(--color-text);
  font-size: 20px;
}
.nav-link:focus,
.nav-link:hover {
  color: black;
  font-weight: 600;
}

.footer-text {
  font-size: 25px;
}

.social-media {
  row-gap: 24px;
}

.social-media a {
  width: fit-content;
  margin-top: 0;
}

.social-media img {
  width: 48px;
  height: 48px;
  transition: transform 0.5s;
}

.social-media img:hover {
  transform: scale(1.3);
}

.madeineu {
  font-size: 25px;
}

.footer-copyright-text {
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0.2);
}
</style>
