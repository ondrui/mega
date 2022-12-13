<template>
  <div>
    <div class="buttons-tabs">
      <button
        :class="['button-tab', { active: currentTab === key }]"
        @click="showContent(key)"
        v-for="(value, key) in tabsList"
        :key="key"
      >
        {{ value }}
      </button>
    </div>

    <component :is="currentTab" class="tab" />
  </div>
</template>

<script>
import { languageExpressions } from "@/constants/locales";
import HourlyTabContent from "./HourlyTabContent.vue";
import TenDayTabContent from "./TenDayTabContent.vue";

export default {
  data() {
    return {
      currentTab: "HourlyTabContent",
    };
  },
  components: {
    HourlyTabContent,
    TenDayTabContent,
  },
  computed: {
    getLocales() {
      return this.$store.getters.getLocales;
    },
    tabsList() {
      return languageExpressions(this.getLocales, "tabsDescr");
    },
  },
  methods: {
    languageExpressions,
    showContent(key) {
      this.currentTab = `${key}`;
    },
  },
};
</script>

<style lang="scss">
.tab {
  border: 1px solid #ccc;
  padding: 10px;
}
.buttons-tabs {
  display: flex;

  .button-tab {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    cursor: pointer;
    font-weight: 400;
    font-size: 13px;
    line-height: 15px;
    color: #04569c;
    padding: 10px 0;
    border: 1px solid #b2d3e8;
    background-color: #ffffff;

    &.active {
      color: #000000;
      background-color: #f0f7fc;
      border-bottom: 4px solid #04569c;
    }
  }
}
</style>
