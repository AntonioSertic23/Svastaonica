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
          <div class="mb-3 text-center">
            <p class="contact-description">{{ t("contact.reachUs") }}</p>
          </div>

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

.contact-description {
  font-size: 31.25px;
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

@media (max-width: 991.98px) {
  .contact-description {
    font-size: 25px;
  }

  .social-media img {
    width: 48px;
  }

  .aboutus-cards-div {
    row-gap: 50px;
  }
}
</style>
