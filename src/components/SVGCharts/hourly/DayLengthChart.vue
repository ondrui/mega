<template>
  <svg
    :view-box.camel="viewbox"
    ref="svg-day-length"
    class="svg-day-length"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
      v-show="isShowLine"
      :x1="calcCoordinates.startLine"
      y1="15"
      :x2="calcCoordinates.endLine"
      y2="15"
    />
    <g v-show="isShowSunrise">
      <text y="18" :x="calcCoordinates.sunriseText">
        {{ datasets.dayLength.sunrise }}
      </text>
      <BaseIcon
        y="0"
        :x="calcCoordinates.sunriseIcon"
        name="sunrise-1"
        pick="common"
        width="20"
      />
    </g>
    <text v-show="isShowDayLength" y="18" :x="calcCoordinates.longText">
      {{
        datasets.dayLength.value ??
        languageExpressions(getLocales, "polar", datasets?.polar)
      }}
    </text>
    <g v-show="isShowSunset">
      <BaseIcon
        y="0"
        :x="calcCoordinates.sunsetIcon"
        name="sunset-1"
        pick="common"
        width="20"
      />
      <text y="18" :x="calcCoordinates.sunsetText">
        {{ datasets.dayLength.sunset }}
      </text>
    </g>
  </svg>
</template>

<script>
import { languageExpressions } from "@/constants/locales";

export default {
  props: ["datasets"],
  data() {
    return {
      width: 500,
      height: 30,
    };
  },
  mounted() {
    this.size();
    this.calcX();
  },
  watch: {
    numData() {
      this.size();
    },
  },
  computed: {
    getLocales() {
      return this.$store.getters.getLocales;
    },
    viewbox() {
      return `0 0 ${this.width} ${this.height}`;
    },
    calcCoordinates() {
      const longText = () => {
        return !this.datasets.polar
          ? this.calcX("sunrise") +
              (this.calcX("sunset") - this.calcX("sunrise")) / 2 -
              15
          : this.width / 2 - 35;
      };
      const sunrise = () => {
        const x = this.calcX("sunrise");
        return x >= 40 ? x : 40;
      };
      const sunset = () => {
        const x = this.calcX("sunset");
        return x >= this.width - 60 ? this.width - 60 : x;
      };
      console.log(sunrise(), sunset());
      return {
        sunriseIcon: sunrise(),
        sunriseText: sunrise() - 30,
        sunsetIcon: sunset(),
        sunsetText: sunset() + 25,
        longText: longText(),
        startLine: this.isShowSunrise ? sunrise() + 25 : 0,
        endLine: this.isShowSunset ? sunset() - 4 : this.width,
      };
    },
    isShowSunrise() {
      return (
        this.datasets.sunrise &&
        this.datasets.dayLength.sunrise >= this.datasets.values[0].hour &&
        this.datasets.values.at(-1).hour >= this.datasets.dayLength.sunrise
      );
    },
    isShowSunset() {
      return (
        this.datasets.sunset &&
        this.datasets.values.at(-1).hour >= this.datasets.dayLength.sunset &&
        this.datasets.dayLength.sunset >= this.datasets.values[0].hour
      );
    },
    isShowDayLength() {
      return (
        (this.datasets.dayLength.value &&
          this.isShowSunset &&
          this.isShowSunrise) ||
        this.datasets.polar
      );
    },
    isShowLine() {
      return (
        (this.datasets.polar !== "night" && this.isShowSunrise) ||
        this.isShowSunset
      );
    },
  },
  methods: {
    languageExpressions,
    calcX(point) {
      if (!this.datasets[point]) return 0;
      const day = this.datasets.values.length * 60;
      const start =
        this.datasets.values[0].hour.slice(0, 2) * 60 +
        parseInt(this.datasets.values[0].hour.slice(3));
      const mPoint =
        this.datasets.dayLength[point].slice(0, 2) * 60 +
        parseInt(this.datasets.dayLength[point].slice(3)) +
        30 -
        start;
      const x = (this.width * mPoint) / day - 10;
      return x;
    },
    /**
     * Функция обработчик вызывается, когда изменяется размер окна страницы.
     */
    size() {
      /**
       * Определяет и устанавливает требуемые для отрисовки графика параметры.
       * @param element - строка содержит ключ ссылку $refs на элемент в шаблоне
       * компонента.
       */
      const getWidth = (element) => {
        return Math.round(this.$refs[element].getBoundingClientRect().width);
      };
      this.width = getWidth("svg-day-length");
    },
  },
};
</script>

<style lang="scss" scoped>
.svg-day-length {
  display: inline-block;
  fill: none;
  height: 30px;
  width: 100%;

  & text {
    fill: #4d4d4d;
    font-weight: 500;
    font-size: 10px;
    line-height: 12px;
    stroke: white;
    stroke-width: 0.5em;
    paint-order: stroke;
    stroke-linejoin: round;
  }

  & line {
    stroke: #8797a5;
    stroke-dasharray: 4 2;
  }
}
</style>
