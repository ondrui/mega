<template>
  <div class="main-container">
    <HeaderInformer />
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere, non a
    laboriosam veritatis fuga culpa aliquam harum quaerat ipsa ipsum labore
    dolor, corporis laudantium odio consequuntur impedit, sunt expedita ratione.
  </div>
</template>

<script>
import HeaderInformer from "./HeaderInformer.vue";
import { expressions } from "@/constants/locales";

export default {
  components: {
    HeaderInformer,
  },
  computed: {
    getLocales() {
      return this.$store.getters.getLocales;
    },
  },
  methods: {
    expressions,
  },
};
</script>

<style lang="scss">
.main-container {
  background-color: #ffffff;
  min-width: 500px;
}
</style>
