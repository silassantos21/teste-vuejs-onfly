export default {
  toCurrency(val) {
    return parseFloat(val).toFixed(2).replace(".", ",");
  },

  maskCEP(value) {
    return value.replace(/\D/g, "").replace(/^(\d{5})(\d{3})+?$/, "$1-$2");
  },
};
