<template>
  <v-sheet
    height="100vh"
    :class="drawer ? 'containerClass2' : 'containerClass'"
    class="sideclass"
  >
    <v-container class="fill-height">
      <v-row>
        <v-btn v-if="!drawer" color="pink" dark @click.stop="drawer = !drawer">
          Toggle
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
      <v-list dense>
        <v-list-item
          class="sidebarItem"
          v-for="item in items"
          :key="item.title"
          link
        >
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
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
      items: [{ title: "Randomize Data" }, { title: "Original Data" }],
    };
  },
};
</script>

<style  scoped>
.sideclass {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 0;
}
.sidebarItem {
  top: 50vh;
}
.containerClass {
  background-color: transparent;
}
.containerClass2 {
  background-color: transparent;
  width: 25vw;
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