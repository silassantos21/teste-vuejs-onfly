import { Loading } from "quasar";

let timer;

export default {
  toCurrency(val) {
    return parseFloat(val).toFixed(2).replace(".", ",");
  },

  maskCEP(value) {
    return value.replace(/\D/g, "").replace(/^(\d{5})(\d{3})+?$/, "$1-$2");
  },

  showLoadingWithMessageTimeout(msg, timeout = 3000) {
    Loading.show({
      message: msg,
    });

    // hiding in 3s
    timer = setTimeout(() => {
      Loading.hide();
      timer = void 0;
    }, timeout);
  },

  chunkArray(array, chunkSize) {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  },
};
