<template>
  <div>
    <div class="header-date-info">
      {{ current.timeText }}
    </div>
    <div class="header-content">
      <div class="header-content-left">
        <div>
          <BaseIcon :name="current.icon" pick="light" width="49" />
        </div>
        <div class="header-content-left-temp">{{ current.temp }}</div>
        <div class="header-content-left-descr">
          <div class="header-content-left-text">{{ current.descr }}</div>
          <div class="feeling">
            {{ current.realFeel }}
          </div>
        </div>
      </div>
      <div class="header-content-right">
        <ForecastHeaderItem
          v-for="(value, index) in forecastForItemHeader"
          :key="`cn-${index}`"
          :value="value"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { languageExpressions } from "@/constants/locales";
import ForecastHeaderItem from "./ForecastHeaderItem.vue";

export default {
  components: {
    ForecastHeaderItem,
  },
  computed: {
    getLocales() {
      return this.$store.getters.getLocales;
    },
    forecastForItemHeader() {
      return this.$store.getters.forecastForItemHeader;
    },
    current() {
      return this.$store.getters.current;
    },
  },
  methods: {
    languageExpressions,
  },
};
</script>

<style lang="scss">
.header-date-info {
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #9c9c9c;
  margin-bottom: 16px;

  &::first-letter {
    text-transform: capitalize;
  }
}
.header-content {
  display: flex;
  column-gap: 14px;
  row-gap: 22px;
  flex-wrap: nowrap;
}
.header-content-left {
  display: flex;
  align-items: center;

  & .header-content-left-temp {
    font-weight: 400;
    font-size: 48px;
    line-height: 56px;
    color: #333333;
    padding-left: 8px;
  }

  & .header-content-left-descr {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    row-gap: 2px;
    width: 180px;
    padding-left: 15px;

    & .header-content-left-text {
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #9c9c9c;
    }

    & .header-content-left-text::first-letter {
      text-transform: capitalize;
    }

    & .feeling {
      font-weight: 500;
      font-size: 16px;
      line-height: 18px;
      color: #000000;
    }

    & .feeling::first-letter {
      text-transform: capitalize;
    }
  }
}
.header-content-right {
  display: flex;
  flex: 1;
  column-gap: 8px;
  justify-content: space-between;
  align-items: center;
}

@media only screen and (max-width: 890px) {
  .header-content-right {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 8px 17px;
  }
  .header-content {
    flex-wrap: wrap;
  }
}
</style>
