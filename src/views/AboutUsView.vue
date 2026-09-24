<script setup>
import VLazyImage from "v-lazy-image";
import { useI18n } from "@/i18n/useI18n";

const { t } = useI18n();
</script>

<template>
  <section class="aboutus-section py-4">
    <div class="container d-flex flex-column">
      <!-- SECTION 1 -->
      <div class="row justify-content-center text-center">
        <p class="mb-4 mb-lg-2 menu-title">{{ t("about.title") }}</p>
        <p class="mb-0 mb-lg-4 subheading">
          <img
            class="start-icon me-3"
            src="/assets/img/ui/floral-design.png"
            alt=""
          />
          {{ t("about.subheading") }}
          <img
            class="end-icon ms-3"
            src="/assets/img/ui/floral-design.png"
            alt=""
          />
        </p>

        <div class="heading-decoration">
          <img class="start-icon" src="/assets/img/ui/floral-design.png" alt="" />
          <img class="end-icon" src="/assets/img/ui/floral-design.png" alt="" />
        </div>

        <div class="mt-4 mt-lg-0 col col-lg-8 px-4">
          <p class="aboutus-description">
            {{ t("about.intro") }}
          </p>
        </div>
      </div>

      <!-- SECTION 2 -->
      <div class="section2 row mt-5 mb-4 py-lg-4 mx-2 justify-content-evenly">
        <div class="background-connector"></div>

        <div class="col col-lg-4 section2-left order-2 order-lg-1">
          <VLazyImage v-bind:src="'/assets/img/site/aboutus/4.jpg'" class="image1" />
        </div>

        <div
          class="col col-lg-4 section2-right order-1 order-lg-2 mb-5 mb-lg-0"
        >
          <div class="social-media mb-4 d-flex gap-lg-3">
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

            <!--             <a
              href="viber://pa?chatURI=<URI> viber://chat?number=0919375976"
              class=""
            >
              <img src="/assets/img/ui/sm-viber.png" />
            </a> -->

            <a href="mailto:svastaonica.rukotvorine@gmail.com" class="">
              <img src="/assets/img/ui/sm-google.png" />
            </a>
          </div>
          <VLazyImage v-bind:src="'/assets/img/site/aboutus/2.jpg'" class="image2" />
        </div>
      </div>

      <div class="row justify-content-center text-center mt-3 mt-lg-0 mb-5">
        <div class="col col-lg-8 px-4">
          <p class="aboutus-description">
            {{ t("about.handmadePrefix")
            }}<span class="important">{{ t("about.handmade") }}</span
            >{{ t("about.handmadeSuffix") }}
          </p>
        </div>
      </div>

      <!-- SECTION 3 -->
      <div class="section3 row mb-5 justify-content-around">
        <div class="background-image"></div>
        <div class="section3-1 px-3 col col-lg-5">
          <div class="item">
            <img src="/assets/img/ui/bp1.png" alt="" />
            <p>{{ t("about.point1") }}</p>
          </div>

          <div class="item">
            <img src="/assets/img/ui/bp1.png" alt="" />
            <p>{{ t("about.point2") }}</p>
          </div>

          <!--           <div class="item">
            <img src="/assets/img/ui/bp1.png" alt="" />
            <p>Igračke za zajedničko provođenje vremena</p>
          </div> -->
        </div>

        <div class="section3-2 mt-5 mt-lg-0 col col-lg-3">
          <VLazyImage
            v-bind:src="'/assets/img/site/aboutus/5.jpg'"
            class="section3-image1"
          />
          <div class="circle1"></div>
          <div class="circle2"></div>
          <div class="circle3"></div>
          <div class="circle4"></div>
        </div>
      </div>

      <div
        class="row justify-content-center text-center mt-3 mt-lg-0 mb-5 py-4 py-lg-5"
      >
        <div class="col col-lg-9 px-4">
          <p class="aboutus-description m-0">
            {{ t("about.closing") }}
          </p>
        </div>
      </div>

      <!-- SECTION 4 -->
      <!--       <div class="section4 mb-5">
        <div class="row justify-content-end">
          <div class="col px-4 col-lg-3 some-text-div me-5 order-2 order-lg-1">
            <p class="some-text">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed
              voluptas voluptate nobis nihil vel veniam? Vero libero voluptates
              laborum consectetur!
            </p>
          </div>
          <div class="col col-lg-3 order-1 order-lg-2">
            <div class="photo-div p-4">
              <div class="mark"></div>
              <VLazyImage
                v-bind:src="'/assets/img/site/aboutus3.jpg'"
                class="photo-photo"
              />
              <h1 class="text-center mt-4">Naslov</h1>
            </div>
          </div>
        </div>

        <div class="row">
          <div class="col col-lg-4">
            <div class="photo2-div p-4">
              <div class="mark"></div>
              <VLazyImage
                v-bind:src="'/assets/img/site/aboutus4.jpg'"
                class="photo-photo"
              />
              <h1 class="text-center mt-4">Naslov</h1>
            </div>
          </div>
          <div class="col px-4 col-lg-3 some-text-div ms-lg-5">
            <p class="some-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa eum
              dicta vel eaque, dolor architecto commodi et quaerat, tenetur, ad
              repellat adipisci neque nisi consequuntur!
            </p>
          </div>
        </div>

        <div class="row justify-content-end">
          <div class="col px-4 col-lg-3 some-text-div me-5 order-2 order-lg-1">
            <p class="some-text">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
              ipsum repellat. Repudiandae modi suscipit dolores!
            </p>
          </div>
          <div class="col col-lg-3 order-1 order-lg-2">
            <div class="photo-div p-4">
              <div class="mark"></div>
              <VLazyImage
                v-bind:src="'/assets/img/site/aboutus3.jpg'"
                class="photo-photo"
              />
              <h1 class="text-center mt-4">Naslov</h1>
            </div>
          </div>
        </div>
      </div> -->

      <!-- SECTION 5 -->
      <div class="section5 py-3 py-lg-0 mb-5 mx-3">
        <div class="section5-inner d-flex flex-column flex-lg-row">
          <div class="col">
            <div class="section5-card">
              <p class="heading mb-3">Paleta raznolikosti</p>
              <p class="text">
                može se pratiti prema bojama tkanina čiji je raspon od potpuno
                bijele, preko pastelnih i zemljanih boja, zatim jakog
                intenziteta crvene do izrazito tamnih i crnih tkanina.
              </p>
              <div class="icons mt-4 mt-lg-5">
                <img src="/assets/img/site/aboutus/palette1.png" alt="" />
                <img src="/assets/img/site/aboutus/palette2.png" alt="" />
                <img src="/assets/img/site/aboutus/palette3.png" alt="" />
              </div>
            </div>
          </div>

          <div class="col">
            <div class="section5-card mt-4 mt-lg-0">
              <p class="heading mb-3">Detalji uzoraka</p>
              <p class="text">
                na pamučnim tkaninama, koji su najčešće u kontrastu s pozadinom,
                sadrže niz različitih geometrijskih, biljnih te apstraktnih
                motiva.
              </p>
              <div class="icons mt-4 mt-lg-5">
                <img src="/assets/img/site/aboutus/shapes1.png" alt="" />
                <img src="/assets/img/site/aboutus/shapes5.png" alt="" />
                <img src="/assets/img/site/aboutus/flowers3.png" alt="" />
              </div>
            </div>
          </div>

          <div class="col">
            <div class="section5-card">
              <p class="heading mb-3">Obujam stilske različitostii</p>
              <p class="text">
                i prosperitetnost tvrtke svakako dokazuju da su tekstilni
                vizuali u skladu sa sezonskim trendovima i prigodama.
              </p>
              <div class="icons mt-4 mt-lg-5">
                <img src="/assets/img/site/aboutus/creativity1.png" alt="" />
                <img src="/assets/img/site/aboutus/creativity2.png" alt="" />
                <img src="/assets/img/site/aboutus/creativity3.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* SECTION 1 -> */

.aboutus-section {
  position: relative;
}

.menu-title {
  font-size: 48.83px;
}

.subheading {
  font-size: 31.25px;
}
.subheading .start-icon {
  width: 96px;
}
.subheading .end-icon {
  width: 96px;
  transform: scaleX(-1);
}

.heading-decoration {
  display: none;
}
.heading-decoration .end-icon {
  transform: scaleX(-1);
}

.aboutus-description {
  font-size: 25px;
}

.aboutus-description .important {
  font-weight: 500;
}

@media (max-width: 991.98px) {
  .subheading {
    font-size: 25px;
  }
  .subheading .start-icon,
  .subheading .end-icon {
    display: none;
  }

  .heading-decoration {
    display: flex;
    justify-content: center;
    column-gap: 20px;
  }
  .heading-decoration .start-icon,
  .heading-decoration .end-icon {
    width: 80px;
  }

  .aboutus-description {
    font-size: 20px;
  }
}

/* SECTION 2 -> */

.section2 {
  position: relative;
}

.background-connector {
  position: absolute;
  height: 180px;
  background-color: var(--color-thistle);
  z-index: 0;
  margin-top: 140px;
}

.section2-left p {
  font-size: 20px;
}

.section2-left,
.section2-right {
  z-index: 1;
}
.section2-right p {
  font-size: 39.06px;
}

.section2-left .who {
  font-weight: 300;
}

.image1,
.image2 {
  width: 100%;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 2px 2px 8px grey;
}
.image1 {
  height: 370px;
}
.image2 {
  height: 420px;
}

.social-media {
  justify-content: center;
}
.social-media img {
  width: 48px;
  height: 48px;
  transition: transform 0.5s;
}
.social-media img:hover {
  transform: scale(1.3);
}

@media (max-width: 991.98px) {
  .section2 {
    flex-direction: column;
  }

  .section2-left p {
    text-align: center;
  }

  .background-connector {
    display: none;
  }

  .social-media img {
    width: 40px;
    height: 40px;
  }

  .social-media {
    justify-content: space-around;
  }

  .image1,
  .image2 {
    height: 350px;
  }
}

/* SECTION 3 -> */

.section3 {
  height: 400px;
}

.background-image {
  position: absolute;
  height: 400px;
  background-color: var(--color-thistle);
  left: 0;
}

.section3-1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
  row-gap: 15px;
}
.section3-1 .item {
  display: flex;
  align-items: center;
}
.section3-1 p {
  font-size: 31.25px;
  margin: 0;
}
.section3-1 img {
  width: 80px;
  height: 80px;
  margin-right: 1rem;
}

.section3-2 {
  background-color: var(--color-bg);
  display: flex;
  align-items: center;
  z-index: 1;
  position: relative;
}

.section3-image1 {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 2px 2px 8px grey;
  transform: scale(1.5);
}

.circle1,
.circle2,
.circle3,
.circle4 {
  width: 20px;
  height: 20px;
  background-color: var(--color-thistle);
  position: absolute;
  border-radius: 50%;
  border: 2px solid gray;
}

.circle1 {
  left: -40px;
  top: 60px;
}
.circle2 {
  right: -40px;
  top: 60px;
}
.circle3 {
  left: -40px;
  bottom: 60px;
}
.circle4 {
  right: -40px;
  bottom: 60px;
}

@media (max-width: 991.98px) {
  .background-image {
    display: none;
  }

  .section3 {
    height: auto;
    flex-direction: column;
  }

  .section3-1 {
    width: 90%;
    background-color: var(--color-thistle);
    padding-top: 1rem;
    border-top-right-radius: 15px;
    border-bottom-right-radius: 15px;
    padding-bottom: 1rem;
  }

  .section3-1 p {
    font-size: 20px;
  }
  .section3-1 img {
    width: 56px;
    height: 56px;
  }

  .section3-2 {
    background-color: var(--color-thistle);
    width: 90%;
    margin-left: auto;
    justify-content: center;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .section3-image1 {
    width: 100%;
    margin-bottom: 2rem;
    margin-top: 2rem;
    transform: scale(1);
  }

  .circle1,
  .circle2,
  .circle3,
  .circle4 {
    display: none;
  }
}

/* SECTION 4 -> */

.some-text-div {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.some-text {
  font-size: 20px;
  text-align: center;
}

.photo-div {
  background-color: thistle;
  border-radius: 15px;
  position: relative;
  transform: rotate(10deg);
  box-shadow: 4px 4px 4px lightgrey;
}
.photo2-div {
  background-color: thistle;
  border-radius: 15px;
  position: relative;
  transform: rotate(-10deg);
  box-shadow: 4px 4px 4px lightgrey;
}

.photo2-div:before {
  content: "";
  float: left;
  padding-top: 100%; /* initial ratio of 1:1*/
}

.mark {
  background-color: hotpink;
  border-radius: 10px;
  width: 60px;
  height: 70px;
  position: absolute;
  top: -30px;
  left: 60px;
}

.photo-photo {
  width: 100%;
  border-radius: 15px;
  aspect-ratio: 1 /1;
  object-fit: cover;
}

@media (max-width: 991.98px) {
  .section4 .row {
    flex-direction: column;
  }

  .photo-div {
    transform: rotate(5deg) scale(0.7);
  }
  .photo2-div {
    transform: rotate(-5deg) scale(0.8);
  }
}

/* SECTION 5 -> */

.section5 .section5-inner {
  gap: 2rem;
}

.section5 .section5-card {
  background-color: var(--color-thistle);
  border-radius: 15px;
  height: 100%;
  padding-left: 2rem;
  padding-right: 2rem;
  padding-top: 3rem;
  padding-bottom: 3rem;
  box-shadow: 2px 2px 8px grey;
}

.section5 img {
  width: 300px;
  height: 200px;
  object-fit: cover;
}

.section5 .heading {
  font-weight: 500;
  font-size: 25px;
  text-align: center;
}

.section5 .text {
  font-size: 20px;
  text-align: center;
  min-height: 180px;
}

.section5 .icons {
  display: flex;
  justify-content: space-evenly;
}

.section5 .icons img {
  width: 80px;
  height: 80px;
  transition: transform 0.5s;
}
.section5 .icons img:hover {
  transform: scale(1.3);
}

.section5 .icons-last {
  height: 288px;
  align-items: center;
}
.section5 .icons-last img {
  width: 128px;
  height: 128px;
}

@media (max-width: 991.98px) {
  .section5 .icons img {
    width: 64px;
    height: 64px;
  }

  .section5 .icons-last img {
    width: 96px;
    height: 96px;
  }
}
</style>
