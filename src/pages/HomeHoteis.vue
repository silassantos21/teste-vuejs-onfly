<template>
  <q-page class="flex flex-center row" style="background-color: #f2f2f2">
    <div class="col-10 col-md-10 row q-py-md q-gutter-y-md">
      <div class="col-12 col-md-12">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">Our Changing Planet</div>
          </q-card-section>

          <q-separator />

          <q-card-section class="q-px-md">
            <div class="row flex flex-left float-center text-left">
              <span class="text-subtitle1 text-bold text-indigo-10">
                Destino
              </span>
            </div>
            <q-input
              outlined
              v-model="name"
              lazy-rules
              placeholder="Ex: teste"
              :rules="[
                (val) => (val && val.length > 0) || 'Please type something',
              ]"
            />
          </q-card-section>
          <q-card-actions vertical align="right" class="q-px-md q-pb-md">
            <q-btn
              unelevated
              rounded
              color="primary"
              label="Unelevated Rounded"
            />
          </q-card-actions>
        </q-card>
      </div>
      <div class="row col-12 col-md-12 justify-between items-center">
        <div>
          <q-breadcrumbs class="text-brown">
            <template v-slot:separator>
              <q-icon size="1.5em" name="chevron_right" color="primary" />
            </template>

            <q-breadcrumbs-el label="Home" icon="home" />
            <q-breadcrumbs-el label="Components" icon="widgets" />
            <q-breadcrumbs-el label="Breadcrumbs" icon="navigation" />
          </q-breadcrumbs>
        </div>
        <div>
          Organizar por
          <q-btn-dropdown
            no-caps
            flat
            label="Dropdown Button"
            dropdown-icon="expand_more"
          >
            <q-list>
              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Photos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Videos</q-item-label>
                </q-item-section>
              </q-item>

              <q-item clickable v-close-popup @click="onItemClick">
                <q-item-section>
                  <q-item-label>Articles</q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </div>
      <div class="col-12 col-md-12 q-mb-md">
        <q-card class="my-card">
          <q-card-section horizontal style="height: 400px">
            <!-- <q-img
              class="col-4"
              src="https://cdn.quasar.dev/img/parallax2.jpg"
            /> -->
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
              <q-carousel-slide
                :name="1"
                img-src="https://cdn.quasar.dev/img/mountains.jpg"
              />
              <q-carousel-slide
                :name="2"
                img-src="https://cdn.quasar.dev/img/parallax1.jpg"
              />
              <q-carousel-slide
                :name="3"
                img-src="https://cdn.quasar.dev/img/parallax2.jpg"
              />
              <q-carousel-slide
                :name="4"
                img-src="https://cdn.quasar.dev/img/quasar.jpg"
              />
            </q-carousel>
            <q-card-section class="text-wrap col-5">
              <div class="row">
                {{ lorem }}
              </div>
              <div class="row">
                {{ lorem }}
              </div>
              <div class="row no-wrap items-center">
                <q-rating
                  size="18px"
                  v-model="stars"
                  :max="5"
                  color="primary"
                />
                <span class="text-caption text-grey q-ml-sm">4.2 (551)</span>
                <span class="q-mx-sm">|</span>
                <div class="q-gutter-x-xs">
                  <q-icon name="print" />
                  <q-icon name="print" />
                  <q-icon name="print" />
                  <q-icon name="print" />
                </div>
              </div>
              <div class="col-12 col-md-12">
                <q-badge color="grey" class="q-px-md q-py-xs">
                  Reembolsável
                </q-badge>
              </div>
            </q-card-section>
            <q-separator
              vertical
              style="background-color: #f2f2f2"
              size="3px"
            />
            <q-card-section class="col-3">
              {{ lorem }}
              <q-btn
                unelevated
                rounded
                color="primary"
                label="Unelevated Rounded"
              />
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    > -->
  </q-page>
</template>

<script setup>
import { ref } from "vue";

const lorem = ref("Lorem ipsum dolor");
const slide = ref(1);
const stars = ref(1);
const name = ref("");
</script>

<style lang="sass">
.my-card
  border-radius: 10px
</style>
