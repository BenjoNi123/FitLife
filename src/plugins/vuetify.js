import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/dist/vuetify.min.css";
//import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
  iconfont: "mdi",
  theme: {
    themes: {
      light: {
        primary: "#379683",
        secondary: "#05386B",
        accent: "#379683",
        error: "#FC4445",
        warning: "#AFD275",
        info: "#03a9f4",
        success: "#5CDB95",
      },
    },
  },
});