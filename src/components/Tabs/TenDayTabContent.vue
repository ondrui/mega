<template>
  <div>
    <div class="ten-days-container">
      <div class="ten-days-charts-temp">
        <ChartsList />
      </div>
      <div class="ten-days-charts-precip">
        <ChartPrecip :data="tenDaysTabTable" />
      </div>
      <div
        @click="toggle(index)"
        :class="['ten-days-day', { 'ten-days-weekend': day.weekend === true }]"
        v-for="(day, index) in tenDaysTabTable"
        :key="`d-${index}`"
      >
        <div class="ten-days-weekday">
          <div>{{ day.weekday }}</div>
          <div>{{ day.date }}</div>
        </div>
        <div class="ten-days-icon">
          <BaseIcon width="46" :name="day.condition" pick="light" />
        </div>
        <div class="ten-days-temp-item"></div>
        <div class="ten-days-precip-item">
          <div class="ten-days-row-caption" v-if="index === 0">
            {{ day.precSum.title }}
          </div>
        </div>
        <div class="ten-days-wind-descr">
          <div>
            <div class="ten-days-row-caption" v-if="index === 0">
              {{ day.wind.title }}
            </div>
            <div>
              <BaseIcon
                width="8"
                name="wind-direction-blue"
                pick="common"
                :transform="windDirection(getLocales, day.wind)"
              />
            </div>
            <span>{{ day.wind.wind_dir[1] }}</span>
          </div>
          <div>{{ day.wind.value }} {{ day.wind.unit }}</div>
        </div>
        <div class="ten-days-pressure">
          <div class="ten-days-row-caption" v-if="index === 0">
            {{ day.pressure.title }}, {{ day.pressure.unit }}
          </div>
          {{ day.pressure.value }}
        </div>
        <div class="ten-day-humidity">
          <div class="ten-days-row-caption" v-if="index === 0">
            {{ day.humidity.title }}
          </div>
          {{ day.humidity.value }}{{ day.humidity.unit }}
        </div>
        <div class="ten-days-chevron-down">
          <BaseIcon width="7" name="chevron-more-down" pick="common" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChartsList from "../SVGCharts/10-day-temp/ChartsList.vue";
import ChartPrecip from "../SVGCharts/10-day-precipitation/ChartPrecip.vue";
import { languageExpressions } from "@/constants/locales";
import { windDirection } from "@/constants/functions";

export default {
  components: {
    ChartsList,
    ChartPrecip,
  },
  computed: {
    tenDaysTabTable() {
      return this.$store.getters.tenDaysTabTable;
    },
    getLocales() {
      return this.$store.getters.getLocales;
    },
  },
  methods: {
    languageExpressions,
    windDirection,
    toggle(index) {
      if (index === 0) {
        this.$emit("go");
      } else {
        this.$store.commit("toggleDetails", index);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.ten-days-container {
  position: relative;
  display: grid;
  background-color: #ffffff;
  max-width: 100%;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  border: 1px solid #d8e9f3;
  border-top: none;
  border-bottom: none;

  .ten-days-weekend {
    background-color: #f7fafd;

    & .ten-days-weekday > div:first-child {
      color: #ff1616;
    }
  }
  & .ten-days-day {
    // border: 1px solid #d8e9f3;
    cursor: pointer;
    transition: box-shadow 0.5s ease-in-out;
    border-top: 1px solid #d8e9f3;
    border-bottom: 1px solid #d8e9f3;
    border-right: 1px solid #d8e9f3;

    &:last-child {
      border-right: none;
    }

    &::before {
      position: absolute;
      content: "";
      top: 1px;
      transition: box-shadow 0.3s ease-in-out;
      width: calc(100% / 10 - 1px);
      height: calc(100% - 2px);
      z-index: 10;
    }

    &:hover::before {
      box-shadow: 0 0 0 3px #d2e7ff;
      border-radius: 1px;
    }

    &:hover {
      & .ten-days-chevron-down svg {
        transform: scale(2);
      }
    }

    & > div {
      // flex: 1;
      border-bottom: 1px solid #d8e9f3;
      position: relative;

      &:last-child,
      &:nth-child(2) {
        border-bottom: none;
      }
    }
  }
}
.ten-days-temp-item {
  height: 170px;
}
.ten-days-precip-item {
  height: 60px;
}
.ten-days-weekday {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 0 13px 0;
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
}
.ten-days-weekday > div {
  text-align: center;
}
.ten-days-weekday > div:first-child {
  text-transform: uppercase;
  font-size: 16px;
  line-height: 21px;
}
.ten-days-icon {
  display: flex;
  flex-direction: column;
  height: 60px;
  align-items: center;
  padding-top: 5px;
}
.ten-days-row-caption {
  position: absolute;
  z-index: 11;
  background: #f5f5f5;
  border-radius: 4px;
  font-weight: 300;
  font-size: 10px;
  line-height: 14px;
  padding: 0 4px;
  color: #333333;
  white-space: nowrap;
  top: 0px;
  left: 6px;
}
.ten-days-charts-temp {
  position: absolute;
  top: 123px;
  width: 100%;
  height: 170px;
  // z-index: 10;
  cursor: pointer;
}
.ten-days-charts-precip {
  position: absolute;
  top: 296px;
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 60px;
  // z-index: 10;
  opacity: 0.6;
  cursor: pointer;
}
.ten-days-wind-descr {
  display: flex;
  flex-direction: column;
  height: 53px;
  align-items: center;
  padding-top: 16px;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: #333333;

  & span {
    text-transform: uppercase;
    padding-left: 1px;
  }

  & > div:first-child {
    display: flex;
    column-gap: 3px;
  }
}
.ten-days-pressure,
.ten-day-humidity {
  display: flex;
  flex-direction: column;
  height: 36px;
  align-items: center;
  padding-top: 14px;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  color: #333333;
}
.ten-days-chevron-down {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 22px;

  & svg {
    transition: transform 0.3s ease-in-out;
  }
}

@media only screen and (max-width: 450px) {
  .ten-days-icon svg {
    width: 30px;
  }
}
</style>
