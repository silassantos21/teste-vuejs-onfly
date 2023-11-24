<template>
  <q-card class="my-card">
    <q-card-section class="text-wrap col-5">
      <div class="row no-wrap items-start q-mb-md">
        <span class="text-caption text-grey q-mr-sm">{{ ratingString }}</span>
        <q-rating
          size="18px"
          readonly
          v-model="starCount"
          :max="5"
          color="yellow"
        />
      </div>
      <div class="row">
        <span class="text-h5 text-grey-7">{{ hotelDetails.name }}</span>
      </div>
      <div class="row">
        <span class="text-subtitle1 text-grey-5">{{
          `${hotelDetails.address.fullAddress}, ${
            hotelDetails.address.city
          } - ${hotelDetails.address.state}${
            hotelDetails.address.zipCode
              ? `, ${hotelDetails.address.zipCode}`
              : ""
          }`
        }}</span>
      </div>
    </q-card-section>
    <q-card-section>
      <q-carousel
        animated
        v-model="slide"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        control-type="push"
        control-color="white"
        control-text-color="grey-8"
        infinite
        class="border-radius-15"
      >
        <template v-for="(imgUrl, index) in hotelDetails.images" :key="index">
          <q-carousel-slide :name="index + 1" :img-src="imgUrl">
            <div class="absolute-bottom custom-caption flex flex-center">
              <div class="text-subtitle1 q-mb-xs" style="font-size: 13px">
                <q-badge rounded color="dark" class="q-px-sm q-py-xs">
                  {{ `${index + 1}/${hotelDetails.images.length}` }}
                </q-badge>
              </div>
            </div>
          </q-carousel-slide>
        </template>
      </q-carousel>
    </q-card-section>
    <q-card-section v-if="hotelDetails.amenities">
      <div class="text-h5 text-grey-7 q-pb-none">Facilidades do hotel</div>
    </q-card-section>
    <q-separator inset color="grey-8" v-if="hotelDetails.amenities" />
    <q-card-section v-if="hotelDetails.amenities">
      <div class="row no-wrap flex flex-center q-mt-sm q-mb-md">
        <div class="row q-gutter-x-lg">
          <div v-if="amenitieDetails(hotelDetails.amenities, 'WI_FI')">
            <q-icon name="wifi" size="xs" color="grey-7" />
            <span class="q-pl-sm text-subtitle1 text-grey-6">{{
              amenitieDetails(hotelDetails.amenities, "WI_FI")
            }}</span>
          </div>
          <div
            v-if="amenitieDetails(hotelDetails.amenities, 'AIR_CONDITIONING')"
          >
            <q-icon name="ac_unit" size="xs" color="grey-7" />
            <span class="q-pl-sm text-subtitle1 text-grey-6">{{
              amenitieDetails(hotelDetails.amenities, "AIR_CONDITIONING")
            }}</span>
          </div>

          <div v-if="amenitieDetails(hotelDetails.amenities, 'POOL')">
            <q-icon name="pool" size="xs" color="grey-7" />
            <span class="q-pl-sm text-subtitle1 text-grey-6">{{
              amenitieDetails(hotelDetails.amenities, "POOL")
            }}</span>
          </div>

          <div v-if="amenitieDetails(hotelDetails.amenities, 'FITNESS_CENTER')">
            <q-icon name="fitness_center" size="xs" color="grey-7" />
            <span class="q-pl-sm text-subtitle1 text-grey-6">{{
              amenitieDetails(hotelDetails.amenities, "FITNESS_CENTER")
            }}</span>
          </div>

          <div v-if="amenitieDetails(hotelDetails.amenities, 'RESTAURANT')">
            <q-icon name="restaurant" size="xs" color="grey-7" />
            <span class="q-pl-sm text-subtitle1 text-grey-6">{{
              amenitieDetails(hotelDetails.amenities, "RESTAURANT")
            }}</span>
          </div>

          <div v-if="amenitieDetails(hotelDetails.amenities, 'ROOM_SERVICE')">
            <q-icon name="room_service" size="xs" color="grey-7" />
            <span class="q-pl-sm text-subtitle1 text-grey-6">{{
              amenitieDetails(hotelDetails.amenities, "ROOM_SERVICE")
            }}</span>
          </div>

          <div v-if="amenitieDetails(hotelDetails.amenities, 'PUB')">
            <q-icon name="sports_bar" size="xs" color="grey-7" />
            <span class="q-pl-sm text-subtitle1 text-grey-6">{{
              amenitieDetails(hotelDetails.amenities, "PUB")
            }}</span>
          </div>

          <div v-if="amenitieDetails(hotelDetails.amenities, 'PETS')">
            <q-icon name="pets" size="xs" color="grey-7" />
            <span class="q-pl-sm text-subtitle1 text-grey-6">{{
              amenitieDetails(hotelDetails.amenities, "PETS")
            }}</span>
          </div>

          <div v-if="amenitieDetails(hotelDetails.amenities, 'SAFE')">
            <q-icon name="lock" size="xs" color="grey-7" />
            <span class="q-pl-sm text-subtitle1 text-grey-6">{{
              amenitieDetails(hotelDetails.amenities, "SAFE")
            }}</span>
          </div>

          <div v-if="amenitieDetails(hotelDetails.amenities, 'PARKING')">
            <q-icon name="local_parking" size="xs" color="grey-7" />
            <span class="q-pl-sm text-subtitle1 text-grey-6">{{
              amenitieDetails(hotelDetails.amenities, "PARKING")
            }}</span>
          </div>

          <div v-if="amenitieDetails(hotelDetails.amenities, 'LAUNDRY')">
            <q-icon name="local_laundry_service" size="xs" color="grey-7" />
            <span class="q-pl-sm text-subtitle1 text-grey-6">{{
              amenitieDetails(hotelDetails.amenities, "LAUNDRY")
            }}</span>
          </div>

          <div v-if="amenitieDetails(hotelDetails.amenities, 'BREAKFAST')">
            <q-icon name="coffee" size="xs" color="grey-7" />
            <span class="q-pl-sm text-subtitle1 text-grey-6">{{
              amenitieDetails(hotelDetails.amenities, "BREAKFAST")
            }}</span>
          </div>

          <div v-if="amenitieDetails(hotelDetails.amenities, 'MEETING_ROOM')">
            <q-icon name="meeting_room" size="xs" color="grey-7" />
            <span class="q-pl-sm text-subtitle1 text-grey-6">{{
              amenitieDetails(hotelDetails.amenities, "MEETING_ROOM")
            }}</span>
          </div>

          <div v-if="amenitieDetails(hotelDetails.amenities, 'STEAM_ROOM')">
            <q-icon name="bath_public_large" size="xs" color="grey-7" />
            <span class="q-pl-sm text-subtitle1 text-grey-6">{{
              amenitieDetails(hotelDetails.amenities, "STEAM_ROOM")
            }}</span>
          </div>
        </div>
      </div>
      <div class="row flex flex-center">
        <q-btn
          outline
          rounded
          no-caps
          color="light-blue"
          label="Mostrar todas as facilidades"
        />
      </div>
    </q-card-section>
    <q-separator inset color="grey-8" v-if="hotelDetails.description" />
    <q-card-section
      class="max-width-description"
      v-if="hotelDetails.description"
    >
      <div class="text-h5 text-grey-7 q-pb-sm">Conheça um pouco mais</div>
      <span class="text-subtitle1 text-grey-6">{{
        hotelDetails.description
      }}</span>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useHoteisStore } from "../stores/hoteis/hoteis";
import utils from "../utils/utils.js";

const { hotelDetails } = storeToRefs(useHoteisStore());

const starCount = ref(0);
const slide = ref(1);
let timer;

const amenitieDetails = (arrAmenitie, amenitie) => {
  return arrAmenitie
    ? arrAmenitie.find((am) => am.key === amenitie)?.label
    : false;
};

const ratingString = computed(() => {
  let rating = "";
  const ratingValue = parseInt(starCount.value);
  if (ratingValue < 3) {
    rating = "Ruim";
  }
  if (ratingValue === 3) {
    rating = "Regular";
  }
  if (ratingValue > 3) {
    rating = "Bom";
  }
  if (ratingValue === 5) {
    rating = "Ótimo";
  }
  return rating;
});

onMounted(() => {
  utils.showLoadingWithMessageTimeout(
    `Carregando detalhes do hotel ${hotelDetails.value.name}`,
    1500
  );
  starCount.value = hotelDetails.value.stars;
});
</script>

<style lang="sass" scoped>
.my-card
  min-width: 930px
.border-radius-15
  border-radius: 15px
.max-width-description
  max-width: 930px
  span
    overflow-wrap: break-word
</style>
