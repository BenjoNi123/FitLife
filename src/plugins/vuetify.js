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
        primary: '#005542',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107',
      },
    },
  },
});