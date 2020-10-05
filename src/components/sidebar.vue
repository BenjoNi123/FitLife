<template>
  <v-sheet
    height="100vh"
    :class="drawer ? 'containerClass2' : 'containerClass'"
    class="sideclass"
  >
    <v-container class="fill-height">
      <v-row>
        <v-btn
          @click.stop="drawer = !drawer"
          v-if="!drawer"
          class="mx-2"
          fab
          dark
          small
          color="primary"
        >
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </v-row>
    </v-container>

    <v-navigation-drawer
      class="drawerClass"
      v-model="drawer"
      absolute
      temporary
      right
    >
      <v-list>
        <v-list-item
          class="sidebarItem"
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-content>
            <v-btn
              class="buttons white--text"
              rounded
              raised
              text
              @click="testRun(item.action)"
              >{{ item.title }}</v-btn
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-sheet>
</template>


<script>
export default {
  data() {
    return {
      drawer: false,
      overlay: false,
      zIndex: 0,
      items: [
        { title: "Randomize Data", action: "randomize" },
        { title: "Original Data", action: "original" },
      ],
    };
  },
  methods: {
    testRun(action) {
      this.$emit("do" + action);
      console.log(action);
    },
  },
};
</script>

<style  scoped>
.buttons:hover {
  background-color: #1e88e5;
}
.sideclass {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 0;
}
.sidebarItem {
  top: 45vh;
}
.containerClass {
  background-color: transparent;
}
.containerClass2 {
  background-color: transparent;
  width: 10vw;
}
.drawerClass {
  background-color: rgba(0, 0, 0, 0.25);
}
.theme--light.v-sheet {
  background-color: transparent;
}
v-overlay v-overlay--absolute v-overlay--active theme--dark .v-overlay__scrim {
  opacity: 0;
}
</style>