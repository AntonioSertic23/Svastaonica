<script setup>
import { useI18n } from "@/i18n/useI18n";

const { t } = useI18n();
</script>

<template>
  <section class="contact-section py-4">
    <div class="container d-flex flex-column">
      <div class="row text-center">
        <p class="mb-5 menu-title">{{ t("contact.title") }}</p>
      </div>

      <div class="col col-lg-8 pb-4 py-0 mx-auto">
        <div class="contact-information px-md-4 mb-4">
          <div class="social-media mb-5 row g-3 justify-content-center">
            <a href="http://m.me/svastaonicazabebe" class="">
              <img src="/assets/img/ui/sm-facebook-messenger.png" />
            </a>

            <a href="https://api.whatsapp.com/send?phone=0919375976" class="">
              <img src="/assets/img/ui/sm-whatsapp.png" />
            </a>

            <a href="https://www.facebook.com/svastaonicaobrtzarukotvorine" class="">
              <img src="/assets/img/ui/sm-facebook.png" />
            </a>

            <a href="https://www.instagram.com/svastaonica_rukotvorine/" class="">
              <img src="/assets/img/ui/sm-instagram.png" />
            </a>

            <a href="mailto:svastaonica.rukotvorine@gmail.com" class="">
              <img src="/assets/img/ui/sm-google.png" />
            </a>
          </div>

          <a
            class="call-btn btn mt-3 mb-5 mx-auto py-3 px-4"
            href="tel:0919375976"
            ><i class="fa fa-phone me-2"></i>
            0919375976
          </a>

          <div class="text-center short-message">
            <p>{{ t("contact.glad") }}</p>
          </div>

          <div class="aboutus-cards-div row row-cols-1 row-cols-lg-3 mt-5">
            <div class="text-center">
              <img src="/assets/img/ui/house.png" alt="" />
              <h6 class="card-label">{{ t("contact.place") }}</h6>
              <p class="info">{{ t("contact.placeValue") }}</p>
            </div>

            <div class="text-center">
              <img src="/assets/img/ui/call.png" alt="" />
              <h6 class="card-label">{{ t("contact.phone") }}</h6>
              <p class="info">091 937 59 76</p>
            </div>

            <div class="text-center">
              <img src="/assets/img/ui/email.png" alt="" />
              <h6 class="card-label">{{ t("contact.email") }}</h6>
              <p class="info">svastaonica.rukotvorine@gmail.com</p>
            </div>
          </div>
        </div>

        <aside id="impressum" class="impressum">
          <h2>{{ t("contact.impressumTitle") }}</h2>
          <p>
            SVAŠTAONICA<br />
            Obrt za rukotvorine<br />
            vl. Jelena Sermek<br />
            Vatroslava Lisinskog 172<br />
            31500 Našice<br />
            OIB: 05429065302<br />
            Matični broj obrta: 99162202
          </p>
          <p>
            {{ t("contact.registeredWith") }}:<br />
            Upravni odjel za gospodarstvo OBŽ, ispostava Našice
          </p>
          <p>
            IBAN: HR6125000091101597310<br />
            SWIFT: HAABHR22
          </p>
          <p>
            Tel: 091/937-5976<br />
            E-mail: svastaonica.rukotvorine@gmail.com
          </p>
        </aside>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact-section {
  font-size: 20px;
}

@media (max-width: 767.98px) {
  .contact-section {
    font-size: 20px;
  }
}

.menu-title {
  font-size: 48.83px;
}

.contact-information {
  display: flex;
  flex-direction: column;
}

.call-btn {
  color: #222;
  text-decoration: none;
  text-transform: uppercase;
  background-color: var(--color-lavender);
  border-radius: 15px;
  font-weight: 500;
  letter-spacing: 2px;
  font-size: 20px;
  box-shadow: -2px 2px 8px grey;
}
.call-btn:hover {
  background-color: var(--color-lavender-hover);
}

.aboutus-cards-div .col-4 {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.aboutus-cards-div img {
  width: 128px;
}

.aboutus-cards-div .card-label {
  margin-bottom: 0.5rem !important;
  margin-top: 2rem !important;
  font-size: 31.25px;
}

.social-media a {
  width: fit-content;
}
.social-media img {
  width: 64px;
  transition: transform 0.5s;
}
.social-media img:hover {
  transform: scale(1.3);
}

.short-message p {
  font-size: 25px;
}

.impressum {
  margin: 2.5rem auto 1rem;
  max-width: 28rem;
  padding-top: 1.5rem;
  border-top: 1px solid color-mix(in srgb, var(--color-text) 18%, transparent);
  scroll-margin-top: calc(var(--nav-height, 4.5rem) + 1rem);
  text-align: center;
  font-size: 0.92rem;
  line-height: 1.45;
  color: var(--color-text-muted);
}

.impressum h2 {
  margin: 0 0 0.75rem;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: var(--color-text-muted);
}

.impressum p {
  margin: 0 0 0.85rem;
}

@media (max-width: 991.98px) {
  .social-media img {
    width: 48px;
  }

  .aboutus-cards-div {
    row-gap: 50px;
  }
}
</style>
