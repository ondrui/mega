<template>
  <div class="tabs-container">
    <div class="buttons-tabs">
      <button
        :class="['button-tab', { active: currentTab === key }]"
        @click="showContent(key)"
        v-for="(value, key) in tabsList"
        :key="key"
      >
        <span>{{ showTitle(value, key) }}</span>
      </button>
    </div>

    <component
      @go="showContent('HourlyTabContent')"
      :is="currentTab"
      class="tab"
    />
  </div>
</template>

<script>
import { languageExpressions } from "@/constants/locales";
import HourlyTabContent from "./HourlyTabContent.vue";
import DayTabContent from "./DayTabContent.vue";

export default {
  data() {
    return {
      /**
       * @param currentTab Имя открытой вкладки (кампоненты).
       */
      currentTab: "HourlyTabContent",
    };
  },
  components: {
    HourlyTabContent,
    DayTabContent,
  },
  computed: {
    getLocales() {
      return this.$store.getters.getLocales;
    },
    /**
     * Подписи для вкладок.
     */
    tabsList() {
      return languageExpressions(this.getLocales, "tabsDescr");
    },
    tenDaysTabTable() {
      return this.$store.getters.tenDaysTabTable;
    },
  },
  methods: {
    languageExpressions,
    /**
     * Обработчик для установки имени открытой вкладки. Передается через параметр.
     * @param key Строка содержит имя вкладки.
     */
    showContent(key) {
      this.currentTab = `${key}`;
    },
    /**
     * Возвращает название вкладки с учетом количества дней прогноза.
     * @param value Значение свойства, котороое содержит название вкладки.
     * @param key Имя свойства, котороое содержит название вкладки.
     */
    showTitle(value, key) {
      return key === "HourlyTabContent"
        ? value
        : `${value.slice(0, 18)}${this.tenDaysTabTable.length}${value.slice(
            17,
            30
          )}`;
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
@media only screen and (max-width: 600px) {
  .tab {
    padding: 22px 5px;
  }

  .tabs-container {
    padding: 0 4px;
  }
}
</style>
