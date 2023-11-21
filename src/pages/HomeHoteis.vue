<template>
  <q-page
    class="flex justify-center items-start row"
    style="background-color: #f2f2f2"
  >
    <div class="col-10 col-md-10 row q-py-md q-gutter-y-md">
      <div class="col-12 col-md-12">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h5 text-grey-6">Reservar hotel</div>
          </q-card-section>

          <q-separator color="grey-7" />

          <q-card-section class="q-px-md">
            <div class="row flex flex-left float-center text-left">
              <span class="text-subtitle1 text-bold text-grey-6">
                Destino <span class="text-red-9">*</span>
              </span>
            </div>
            <!-- <q-input
              outlined
              v-model="name"
              lazy-rules
              placeholder="Selecione uma cidade (Ex: Belo Horizonte, Curitiba...)"
              :rules="[(val) => (val && val.length > 0) || 'Campo Obrigatório']"
            /> -->
            {{ selectHoteis[0] }}
            <q-form ref="refSelectCidade">
              <q-select
                outlined
                emit-value
                v-model="city"
                use-input
                hide-selected
                fill-input
                input-debounce="0"
                placeholder="Ex: Belo Horizonte, Curitiba..."
                :options="filteredOptions"
                @filter="filterFn"
                :rules="[
                  (val) => (val && val.length > 0) || 'Campo Obrigatório',
                ]"
              >
                <template v-slot:no-option>
                  <q-item>
                    <q-item-section class="text-grey">
                      Selecione uma cidade
                    </q-item-section>
                  </q-item>
                </template>
              </q-select>
            </q-form>
          </q-card-section>
          <q-card-actions vertical align="right" class="q-px-md q-pb-md">
            <q-btn
              rounded
              no-caps
              size="15px"
              color="light-blue"
              class="q-btn-action"
              label="Alterar Busca"
              @click="buscarHoteisCidade"
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

            <q-breadcrumbs-el label="Início" />
            <q-breadcrumbs-el label="Hotéis" />
            <q-breadcrumbs-el :label="'Hospedagem em ' + city" />
          </q-breadcrumbs>
        </div>
        <div>
          <q-btn-dropdown
            no-caps
            flat
            dropdown-icon="expand_more"
            color="light-blue"
          >
            <template v-slot:label>
              <div class="row items-center no-wrap">
                <span class="text-dark">Organizar por</span>
                <span class="text-bold q-pl-sm"> {{ filterBy }}</span>
              </div>
            </template>
            <q-list>
              <q-item
                clickable
                v-close-popup
                @click="filterBy = 'Recomendados'"
              >
                <q-item-section>
                  <q-item-label
                    :class="filterBy === 'Recomendados' && 'text-light-blue'"
                  >
                    <q-icon
                      v-show="filterBy === 'Recomendados'"
                      name="check"
                      class="mr-md"
                    />
                    Recomendados
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                @click="filterBy = 'Melhor Avaliados'"
              >
                <q-item-section>
                  <q-item-label
                    :class="
                      filterBy === 'Melhor Avaliados' && 'text-light-blue'
                    "
                  >
                    <q-icon
                      v-show="filterBy === 'Melhor Avaliados'"
                      name="check"
                      class="mr-md"
                    />
                    Melhor Avaliados
                  </q-item-label>
                </q-item-section>
              </q-item>

              <q-item
                clickable
                v-close-popup
                @click="filterBy = 'Número de Estrelas'"
              >
                <q-item-section>
                  <q-item-label
                    :class="
                      filterBy === 'Número de Estrelas' && 'text-light-blue'
                    "
                  >
                    <q-icon
                      v-show="filterBy === 'Número de Estrelas'"
                      name="check"
                      class="mr-md"
                    />
                    Número de Estrelas
                  </q-item-label>
                </q-item-section>
              </q-item>
            </q-list>
          </q-btn-dropdown>
        </div>
      </div>
      <div class="col-12 col-md-12 q-mb-md">
        <q-card class="my-card" flat>
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
                <span class="text-h5 text-grey-7">Meliá Paulista</span>
              </div>
              <div class="row">
                <span class="text-subtitle1 text-grey-5"
                  >São Paulo, Paraíso, A 2,97 km do centro</span
                >
              </div>
              <div class="row no-wrap items-start q-my-md">
                <span class="text-caption text-grey q-mr-sm">8.3</span>
                <q-rating
                  size="18px"
                  readonly
                  v-model="stars"
                  :max="5"
                  color="yellow"
                />
                <span class="q-mx-sm">|</span>
                <div class="q-gutter-x-xs">
                  <q-icon name="wifi" size="xs" color="grey-6" />
                  <q-icon name="ac_unit" size="xs" color="grey-6" />
                  <q-icon name="pool" size="xs" color="grey-6" />
                  <q-icon name="fitness_center" size="xs" color="grey-6" />
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
              <div class="row">
                <span class="text-subtitle2 text-grey-5">A partir de</span>
              </div>
              <div class="row q-my-xs">
                <span class="text-grey-7"
                  >R$<span class="text-h5">1.332,00</span></span
                >
              </div>
              <div class="row">
                <span class="text-subtitle2 text-grey-5">R$444,00/noite</span>
              </div>
              <div class="row">
                <span class="text-subtitle2 text-grey-6"
                  >Impostos inclusos</span
                >
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
                  @click="openHotelDetails()"
                />
              </div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
      <q-dialog v-model="cardDetails" position="right" maximized>
        <q-card class="my-card">
          <q-card-section class="q-pt-xs">
            <div class="text-overline">Overline</div>
            <div class="text-h5 q-mt-sm q-mb-xs">Title</div>
            <div class="text-caption text-grey">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </div>
          </q-card-section>
          <q-img src="https://cdn.quasar.dev/img/chicken-salad.jpg" />

          <q-card-section>
            <q-btn
              fab
              color="primary"
              icon="place"
              class="absolute"
              style="top: 0; right: 12px; transform: translateY(-50%)"
            />

            <div class="row no-wrap items-center">
              <div class="col text-h6 ellipsis">Cafe Basilico</div>
              <div
                class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
              >
                <q-icon name="place" />
                250 ft
              </div>
            </div>

            <q-rating v-model="stars" :max="5" size="32px" />
          </q-card-section>

          <q-card-section class="q-pt-none">
            <div class="text-subtitle1">$・Italian, Cafe</div>
            <div class="text-caption text-grey">
              Small plates, salads & sandwiches in an intimate setting.
            </div>
          </q-card-section>

          <q-separator />

          <q-card-actions align="right">
            <q-btn v-close-popup flat color="primary" label="Reserve" />
            <q-btn v-close-popup flat color="primary" round icon="event" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <!-- <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    > -->
  </q-page>
</template>

<script setup>
import { computed, ref } from "vue";
import JsonCidades from "../utils/place.json";
import JsonHoteis from "../utils/hotel.json";

const cardDetails = ref(false);
const refSelectCidade = ref("");
const lorem = ref("Lorem ipsum dolor");
const slide = ref(1);
const stars = ref(1);
const filterBy = ref("Recomendados");
const name = ref("");
const city = ref("");
const selectedCity = ref("");
const selectHoteis = ref([]);
// const stringOptions = [
//   {
//     label: "Google",
//     value: "goog",
//   },
//   {
//     label: "Facebook",
//     value: "fb",
//   },
//   {
//     label: "Apple",
//     value: "app",
//   },
//   {
//     label: "Insta",
//     value: "ig",
//   },
// ];

const filteredOptions = ref([]);

const selectCidades = computed(() => {
  return JsonCidades.map((c) => {
    return {
      label: `${c.name}, ${c.state.name}`,
      value: `${c.name}, ${c.state.shortname}`,
      id: c.placeId,
    };
  });
});

const buscarHoteisCidade = async () => {
  const isValid = await refSelectCidade.value.validate();
  if (!isValid) return;
  selectedCity.value = filteredOptions.value.filter(
    (c) => c.value === city.value
  )[0];
  debugger;
  selectHoteis.value = JsonHoteis.filter(
    (c) => c.placeId === selectedCity.value.id
  )[0].hotels;
  debugger;
};

const filterFn = (val, update, abort) => {
  // call abort() at any time if you can't retrieve data somehow

  setTimeout(() => {
    update(() => {
      if (val === "") {
        filteredOptions.value = [];
      } else {
        const needle = val.toLowerCase();
        filteredOptions.value = selectCidades.value.filter(
          (v) => v.label.toLowerCase().indexOf(needle) > -1
        );
      }
    });
  }, 1500);
};

const openHotelDetails = () => {
  cardDetails.value = true;
};
</script>

<style lang="sass">
.my-card
  border-radius: 10px
.q-btn-action
  min-width: 180px !important
</style>
