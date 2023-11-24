<template>
  <q-card class="my-card" flat>
    <q-card-section horizontal style="height: 400px">
      <q-carousel
        animated
        class="col-4"
        v-model="slide"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        control-type="push"
        control-color="white"
        control-text-color="grey-8"
        infinite
      >
        <template v-for="(imgUrl, index) in hoteis.images" :key="index">
          <q-carousel-slide :name="index + 1" :img-src="imgUrl" />
        </template>
      </q-carousel>
      <q-card-section class="text-wrap col-5">
        <div class="row">
          <span class="text-h5 text-grey-7">{{ hoteis.name }}</span>
        </div>
        <div class="row">
          <span class="text-subtitle1 text-grey-5">{{
            `${hoteis.address.city}, ${hoteis.address.district}`
          }}</span>
        </div>
        <div class="row no-wrap items-start q-my-md">
          <q-rating
            size="18px"
            readonly
            v-model="starCount"
            :max="5"
            color="yellow"
          />
          <span v-if="hoteis.amenities" class="q-mx-sm">|</span>
          <div v-if="hoteis.amenities" class="q-gutter-x-xs">
            <q-icon
              v-if="hasAmenitie(hoteis.amenities, 'WI_FI')"
              name="wifi"
              size="xs"
              color="grey-6"
            />
            <!-- WI_FI -->
            <q-icon
              v-if="hasAmenitie(hoteis.amenities, 'AIR_CONDITIONING')"
              name="ac_unit"
              size="xs"
              color="grey-6"
            />
            <!-- AIR_CONDITIONING -->
            <q-icon
              v-if="hasAmenitie(hoteis.amenities, 'POOL')"
              name="pool"
              size="xs"
              color="grey-6"
            />
            <!-- POOL -->
            <q-icon
              v-if="hasAmenitie(hoteis.amenities, 'FITNESS_CENTER')"
              name="fitness_center"
              size="xs"
              color="grey-6"
            />
            <!-- FITNESS_CENTER -->
            <q-icon
              v-if="hasAmenitie(hoteis.amenities, 'RESTAURANT')"
              name="restaurant"
              size="xs"
              color="grey-6"
            />
            <!-- RESTAURANT -->
            <q-icon
              v-if="hasAmenitie(hoteis.amenities, 'ROOM_SERVICE')"
              name="room_service"
              size="xs"
              color="grey-6"
            />
            <!-- ROOM_SERVICE -->
            <q-icon
              v-if="hasAmenitie(hoteis.amenities, 'PUB')"
              name="sports_bar"
              size="xs"
              color="grey-6"
            />
            <!-- PUB -->
            <q-icon
              v-if="hasAmenitie(hoteis.amenities, 'PETS')"
              name="pets"
              size="xs"
              color="grey-6"
            />
            <!-- PETS -->
            <q-icon
              v-if="hasAmenitie(hoteis.amenities, 'SAFE')"
              name="lock"
              size="xs"
              color="grey-6"
            />
            <!-- SAFE -->
            <q-icon
              v-if="hasAmenitie(hoteis.amenities, 'PARKING')"
              name="local_parking"
              size="xs"
              color="grey-6"
            />
            <!-- PARKING -->
            <q-icon
              v-if="hasAmenitie(hoteis.amenities, 'LAUNDRY')"
              name="local_laundry_service"
              size="xs"
              color="grey-6"
            />
            <!-- LAUNDRY -->
            <q-icon
              v-if="hasAmenitie(hoteis.amenities, 'BREAKFAST')"
              name="coffee"
              size="xs"
              color="grey-6"
            />
            <!-- BREAKFAST -->
            <q-icon
              v-if="hasAmenitie(hoteis.amenities, 'MEETING_ROOM')"
              name="meeting_room"
              size="xs"
              color="grey-6"
            />
            <!-- MEETING_ROOM -->
            <q-icon
              v-if="hasAmenitie(hoteis.amenities, 'STEAM_ROOM')"
              name="sauna"
              size="xs"
              color="grey-6"
            />
            <!-- STEAM_ROOM -->
          </div>
        </div>
        <div v-if="hoteis.hasRefundableRoom" class="col-12 col-md-12">
          <q-badge color="grey" class="q-px-md q-py-xs"> Reembolsável </q-badge>
        </div>
      </q-card-section>
      <q-separator vertical style="background-color: #f2f2f2" size="3px" />
      <q-card-section class="col-3">
        <div class="row">
          <span class="text-subtitle2 text-grey-5">A partir de</span>
        </div>
        <div class="row q-my-xs">
          <span class="text-grey-7"
            >R$<span class="text-h5">{{
              utils.toCurrency(hoteis.price)
            }}</span></span
          >
        </div>
        <div class="row">
          <span class="text-subtitle2 text-grey-5">{{
            `R$${utils.toCurrency(hoteis.price)}/noite`
          }}</span>
        </div>
        <div class="row">
          <span class="text-subtitle2 text-grey-6">Impostos inclusos</span>
        </div>
        <div class="row q-mt-lg">
          <q-btn
            no-caps
            size="15px"
            class="q-btn-action"
            unelevated
            rounded
            color="light-blue"
            label="Selecionar"
            @click="openModal(props.hoteis.id)"
          />
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import utils from "../utils/utils.js";

const slide = ref(1);

const props = defineProps({
  hoteis: {
    type: Object,
  },
  openModal: {
    type: Function,
  },
});

const starCount = computed(() => {
  return props.hoteis.stars;
});

const hasAmenitie = (arrAmenitie, amenitie) => {
  return Boolean(arrAmenitie.find((am) => am.key === amenitie));
};
</script>

<style></style>
