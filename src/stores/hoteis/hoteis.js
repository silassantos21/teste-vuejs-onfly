import JsonHoteis from "../../utils/hotel.json";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useHoteisStore = defineStore("hoteisStore", () => {
  const searchHotelCity = ref("");

  const selectedHoteis = ref([]);

  const hotelDetails = ref(null);

  function setSearchHotelCity(hotel) {
    searchHotelCity.value = hotel;
  }

  function setSelectedHoteis(hoteis) {
    selectedHoteis.value = hoteis;
  }

  function setHotelDetails(hotel) {
    hotelDetails.value = hotel;
  }

  async function getSelectedHoteis(city) {
    const hts = JsonHoteis.filter((c) => c.placeId === city.id)[0].hotels;
    setSelectedHoteis(hts);
  }

  async function getHotelDetails(id) {
    const selectedHotel = selectedHoteis.value.filter((ht) => ht.id === id)[0];
    setHotelDetails(selectedHotel);
  }

  return {
    searchHotelCity,
    selectedHoteis,
    hotelDetails,
    setSearchHotelCity,
    setSelectedHoteis,
    setHotelDetails,
    getSelectedHoteis,
    getHotelDetails,
  };
});
