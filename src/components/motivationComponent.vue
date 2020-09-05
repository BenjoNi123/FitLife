<template>
  <v-card elevation="24" class="carouselClass mx-auto">
    <v-carousel
      :cycle="cycle"
      :continuous="true"
      :show-arrows="false"
      hide-delimiter-background
      hide-delimiters
      height="300"
      text
    >
      <v-carousel-item class="elevation-10" v-for="quote in quotesData" :key="quote.id">
        <v-sheet color="secondary lighten-4" height="100%" tile>
          <v-row
            class="fill-height carouselItemClass secondary lighten-3"
            align="center"
            justify="center"
          >
            <v-col class="quoteClass">"{{ quote.quote }}"</v-col>
            <v-col class="ownerClass">-{{ quote.owner }}</v-col>
          </v-row>
          <v-row></v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-card>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      colors: ["primary", "secondary"],
      cycle: true,
      slides: ["First", "Second", "Third", "Fourth", "Fifth"],
      quotesData: []
    };
  },

  methods: {
    async getQuotes() {
      let response = await axios.get("http://localhost:3000/motivationQuotes/");
      this.quotesData = response.data;
    }
  },
  created() {
    this.getQuotes();
  }
};
</script>
<style >
.carouselClass {
  width: 600px;
  border-radius: 16px;
}
.carouselItemClass {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.quoteClass {
  display: flex;
  align-items: flex-end;
  padding-left: 10%;
  padding-right: 10%;
}
.ownerClass {
  display: flex;
  justify-content: center;
  align-items: center;
}
@media screen and (max-width: 600px) {
  .carouselClass {
    width: 370px;
  }
  .quoteClass {
    display: flex;
    align-items: flex-end;
  }
  .ownerClass {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>