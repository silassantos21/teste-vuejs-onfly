import { store } from "quasar/wrappers";
import { createPersistedStatePlugin } from "pinia-plugin-persistedstate-2";
import { createPinia } from "pinia";

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store((/* { ssrContext } */) => {
  const pinia = createPinia();

  // You can add Pinia plugins here
  // pinia.use(SomePiniaPlugin)
  const installPersistedStatePlugin = createPersistedStatePlugin();
  pinia.use((context) => installPersistedStatePlugin(context));

  return pinia;
});
