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
            <q-form ref="refSelectCidade">
              <q-select
                outlined
                emit-value
                v-model="searchHotelCity"
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
              :label="
                !searchHotelCity && selectedHoteis.length === 0
                  ? 'Buscar'
                  : 'Alterar Busca'
              "
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
            <q-breadcrumbs-el
              v-if="searchHotelCity"
              :label="'Hospedagem em ' + searchHotelCity"
            />
          </q-breadcrumbs>
        </div>
        <div>
          <q-btn-dropdown
            no-caps
            flat
            dropdown-icon="expand_more"
            color="light-blue"
            :disable="selectedHoteis.length === 0"
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
            </q-list>
          </q-btn-dropdown>
        </div>
      </div>
      <div
        class="col-12 col-md-12 q-mb-md"
        v-if="selectedHoteis.length > 0 && realizouBusca"
      >
        <q-infinite-scroll @load="onLoad" :offset="250" class="q-gutter-y-md">
          <template v-for="(hotel, index) in selectedHoteis" :key="index">
            <CardHotel :hoteis="hotel" :openModal="openHotelDetails" />
          </template>
          <template v-slot:loading v-if="hasMoreHotels">
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="light-blue" size="40px" />
            </div>
          </template>
        </q-infinite-scroll>
      </div>
      <div
        class="col-12 col-md-12 q-mb-md"
        v-else-if="
          selectedHoteis.length === 0 && searchHotelCity && realizouBusca
        "
      >
        <q-banner rounded class="bg-white text-center">
          <div class="flex flex-center content-center">
            <img
              src="~assets/noVacancy.jpeg"
              style="width: 100px; height: 64px"
            />
            <span class="text-subtitle1 text-grey-6 q-pl-md"
              >Não há hoteis disponíveis nessa cidade.</span
            >
          </div>
        </q-banner>
      </div>
      <q-dialog v-model="cardDetails" position="right" maximized>
        <CardHotelDetails />
      </q-dialog>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import JsonCidades from "../utils/place.json";
import { storeToRefs } from "pinia";
import { useHoteisStore } from "../stores/hoteis/hoteis";
import utils from "../utils/utils.js";
import CardHotel from "../components/CardHotel.vue";
import CardHotelDetails from "../components/CardHotelDetails.vue";

const { lotesHoteis, selectedHoteis } = storeToRefs(useHoteisStore());
const hoteisStore = useHoteisStore();

const realizouBusca = ref(false);

const cardDetails = ref(false);
const hasMoreHotels = ref(true);
const refSelectCidade = ref("");

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

const searchHotelCity = computed({
  get() {
    return hoteisStore.searchHotelCity;
  },
  set(value) {
    hoteisStore.setSearchHotelCity(value);
  },
});

const filterBy = computed({
  get() {
    return hoteisStore.filterBy;
  },
  set(value) {
    hoteisStore.setFilterBy(value);
  },
});

watch(filterBy, (value) => {
  hoteisStore.getSelectedHoteis();
  utils.showLoadingWithMessageTimeout(`Filtrando por ${value}`);
});

onMounted(() => {
  setHoteisFunction();
});

const setHoteisFunction = () => {
  if (selectedHoteis.value.length === 0) {
    hoteisStore.setSearchHotelCity("");
  } else {
    hoteisStore.setSelectedHoteis(lotesHoteis.value[0]);
  }
};

const onLoad = (index, done, stop) => {
  hoteisStore.setLotesHoteisIndex(index);
  setTimeout(() => {
    if (lotesHoteis.value[index]) {
      selectedHoteis.value = selectedHoteis.value.concat(
        lotesHoteis.value[index]
      );
      hasMoreHotels.value = true;
      done();
    } else {
      hasMoreHotels.value = false;
    }
  }, 2000);
};

const buscarHoteisCidade = async () => {
  const isValid = await refSelectCidade.value.validate();
  if (!isValid) return;
  realizouBusca.value = false;
  utils.showLoadingWithMessageTimeout(
    `Carregando hotéis na localidade ${searchHotelCity.value}`
  );
  const modelSelectCity = filteredOptions.value.filter(
    (c) => c.value === searchHotelCity.value
  )[0];
  hoteisStore.setSelectedCity(modelSelectCity);
  hoteisStore.getSelectedHoteis();
  hasMoreHotels.value = true;
  realizouBusca.value = true;
};

const filterFn = (val, update, abort) => {
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

const openHotelDetails = (hotelId) => {
  hoteisStore.getHotelDetails(hotelId);
  cardDetails.value = true;
};
</script>

<style lang="sass">
.my-card
  border-radius: 10px
.q-btn-action
  min-width: 180px !important
</style>
