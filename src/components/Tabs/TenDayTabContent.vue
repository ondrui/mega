<template>
  <div>
    <div class="days-container">
      <div class="svg-charts">
        <SVGCharts />
      </div>
      <div
        class="day"
        :class="['day', { weekend: day.weekend === true }]"
        v-for="(day, index) in forecastTenBasic"
        :key="`d-${index}`"
      >
        <div class="weekday">
          <div>{{ day.weekday }}</div>
          <div>{{ day.date }}</div>
        </div>
        <div class="icon">
          <BaseIcon width="40" :name="day.iconCode" pick="light" />
        </div>
        <div class="charts"></div>
        <div>
          Осадки
          <div class="day-title" v-if="index === 0">
            {{ day.precSum.title }}
          </div>
        </div>
        <div>
          <div>
            <div class="day-title" v-if="index === 0">{{ day.wind.title }}</div>
            <BaseIcon width="10" name="wind-direction" pick="common" />
            <span>{{ day.wind.direction[1] }}</span>
          </div>
          <div>{{ day.wind.value }}{{ day.wind.unit }}</div>
        </div>
        <div>
          <div class="day-title" v-if="index === 0">
            {{ day.pressure.title }}, {{ day.pressure.unit }}
          </div>
          {{ day.pressure.value }}
        </div>
        <div>
          <div class="day-title" v-if="index === 0">
            {{ day.humidity.title }}
          </div>
          {{ day.humidity.value }}{{ day.humidity.unit }}
        </div>
        <div>
          <BaseIcon width="20" name="chevron-more-down" pick="common" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SVGCharts from "../SVGCharts.vue";

export default {
  components: {
    SVGCharts,
  },
  computed: {
    forecastTenBasic() {
      return this.$store.getters.forecastTenBasic;
    },
  },
};
</script>

<style lang="scss">
.days-container {
  position: relative;
  display: grid;
  height: 480px;
  background-color: #ffffff;
  max-width: 100%;
  grid-template-columns: repeat(10, minmax(0, 1fr));
  & .day {
    // display: flex;
    flex-direction: column;
    border: 1px solid #d8e9f3;
    margin-right: -1px;
    & > div {
      // flex: 1;
      border-bottom: 1px solid #d8e9f3;
      position: relative;

      &:last-child {
        border-bottom: none;
      }
    }
  }
}
.charts {
  height: 170px;
}
.weekend {
  background-color: #f7fafd;
}
.icon {
  height: 50px;
}
.day-title {
  position: absolute;
  z-index: 11;
  background: #f5f5f5;
  border-radius: 4px;
  font-weight: 300;
  font-size: 10px;
  line-height: 12px;
  color: #333333;
  white-space: nowrap;
  top: -6px;
  left: 6px;
}
.svg-charts {
  position: absolute;
  top: 92px;
  width: 100%;
  height: 170px;
  z-index: 10;
}
</style>
