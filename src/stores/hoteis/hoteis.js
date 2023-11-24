import JsonHoteis from "../../utils/hotel.json";
import { defineStore } from "pinia";
import { ref } from "vue";
import utils from "../../utils/utils";

export const useHoteisStore = defineStore("hoteisStore", () => {
  const lotesHoteisIndex = ref(0);

  const searchHotelCity = ref("");

  const selectedCity = ref("");

  const filterBy = ref("Recomendados");

  const fullSelectedHoteis = ref([]);

  const selectedHoteis = ref([]);

  const lotesHoteis = ref([]);

  const hotelDetails = ref(null);

  function setLotesHoteisIndex(index) {
    lotesHoteisIndex.value = index;
  }

  function setSearchHotelCity(hotel) {
    searchHotelCity.value = hotel;
  }

  function setSelectedCity(hotel) {
    selectedCity.value = hotel;
  }

  function setFilterBy(filter) {
    filterBy.value = filter;
  }

  function setFullSelectedHoteis(filter) {
    fullSelectedHoteis.value = filter;
  }

  function setSelectedHoteis(hoteis) {
    selectedHoteis.value = hoteis;
  }

  function setLotesHoteis(hoteis) {
    lotesHoteis.value = hoteis;
  }

  function setHotelDetails(hotel) {
    hotelDetails.value = hotel;
  }

  function clearSelectedHoteis() {
    selectedHoteis.value = [];
  }

  async function getSelectedHoteis() {
    let hts = selectedCity.value
      ? JsonHoteis.filter((c) => c.placeId === selectedCity.value.id)[0]?.hotels
      : fullSelectedHoteis.value;
    if (!hts || hts?.length === 0) {
      clearSelectedHoteis();
      return;
    }
    if (filterBy.value === "Recomendados") {
      hts = hts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }
    if (filterBy.value === "Melhor Avaliados") {
      hts = hts.sort((a, b) => (a.stars > b.stars ? -1 : 1));
    }
    setFullSelectedHoteis(hts);
    setLotesHoteis(utils.chunkArray(hts, 10));
    setSelectedHoteis(lotesHoteis.value[0]);
  }

  async function getHotelDetails(id) {
    const selectedHotel = selectedHoteis.value.filter((ht) => ht.id === id)[0];
    setHotelDetails(selectedHotel);
  }

  return {
    searchHotelCity,
    filterBy,
    fullSelectedHoteis,
    selectedHoteis,
    lotesHoteis,
    hotelDetails,
    setLotesHoteisIndex,
    setSearchHotelCity,
    setSelectedCity,
    setFilterBy,
    setSelectedHoteis,
    setLotesHoteis,
    setHotelDetails,
    clearSelectedHoteis,
    getSelectedHoteis,
    getHotelDetails,
  };
});
