<template>
  <div class="tabs-container">
    <div class="buttons-tabs">
      <button
        :class="['button-tab', { active: currentTab === key }]"
        @click="showContent(key)"
        v-for="(value, key) in tabsList"
        :key="key"
      >
        <span>{{ value }}</span>
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

<style lang="scss" scoped>
.tabs-container {
  padding: 0 8px;
}
.tab {
  padding: 22px 24px;
  background-color: #f0f7fc;
  border: 1px solid #b2d3e8;
  border-top: none;
}
.buttons-tabs {
  display: flex;

  .button-tab {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex: 1;
    cursor: pointer;
    box-shadow: inset 0 1px 0 0 #b2d3e8;
    border: 1px solid #b2d3e8;
    border-top: none;
    background-color: #ffffff;
    outline: none;
    &:nth-child(odd) {
      margin-right: -1px;
    }

    & span {
      display: inline-block;
      font-weight: 400;
      font-size: 14px;
      line-height: 15px;
      color: #04569c;
      padding: 10px 0;

      &::first-letter {
        text-transform: capitalize;
      }
    }

    &:hover {
      background-color: #d6e8f3;

      & span {
        color: #04569c;
        text-decoration: underline;
      }
    }

    &.active {
      background-color: #f0f7fc;
      box-shadow: inset 0 3px 0 0 #04569c;
      border-bottom: none;

      & span {
        color: #000000;
        text-decoration: none;
      }
    }
  }
}
@media only screen and (max-width: 450px) {
  .tab {
    padding: 22px 5px;
  }

  .tabs-container {
    padding: 0 4px;
  }
}
</style>
