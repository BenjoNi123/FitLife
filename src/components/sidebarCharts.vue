<template >
  <transition name="show">
    <div class="sidebar" v-if="open">
      <transition-group appear name="fade">
        <v-btn
          rounded
          raised
          text
          :class="item.action"
          class="sidebar-element justify-center text--white"
          v-for="item in items"
          :key="item.title"
          @click="dataChange(item.action)"
        >
          {{ item.title }}
        </v-btn>
      </transition-group>
    </div>
  </transition>
</template>

<script>
export default {
  props: ["open"],
  data: () => {
    return {
      items: [
        { title: "Randomize Data", action: "Randomize" },
        { title: "Original Data", action: "Original" },
      ],
    };
  },
  methods: {
    dataChange(value) {
      this.$emit("changeData", value);
    },
  },
};
</script>

<style  scoped>
.Original {
  margin-left: 9px;
}
.sidebar {
  position: fixed;
  right: 0;
  top: 0;
  z-index: 0;
  z-index: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 200px;
  height: 100vh;
  padding-top: 48px;
  background-color: rgba(36, 36, 36, 0.6);
}
.sidebar-element {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #1e88e5;
  margin-bottom: 8px;
  cursor: pointer;
  color: white;
  align-content: center;
  align-items: center;
}
.show-enter,
.show-leave-to {
  opacity: 0;
  transform: translateX(60px);
}
.show-enter-active,
.show-leave-active {
  transition: all 500ms;
}
.fade-enter {
  opacity: 0;
  transform: translateX(60px);
}
.fade-enter-active {
  transition: all 500ms ease-in-out;
  transition-delay: calc(50ms * var(--index));
}
</style>