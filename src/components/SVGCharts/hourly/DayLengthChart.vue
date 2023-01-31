<template>
  <svg
    :view-box.camel="viewbox"
    ref="svg-day-length"
    class="svg-day-length"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line
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
    <text y="18" :x="calcCoordinates.longText">
      {{ datasets.dayLength.value }}
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
    viewbox() {
      return `0 0 ${this.width} ${this.height}`;
    },
    calcCoordinates() {
      const longText =
        this.calcX("sunrise") +
        (this.calcX("sunset") - this.calcX("sunrise")) / 2 -
        20;
      return {
        sunriseIcon: this.calcX("sunrise"),
        sunriseText: this.calcX("sunrise") - 30,
        sunsetIcon: this.calcX("sunset"),
        sunsetText: this.calcX("sunset") + 25,
        longText,
        startLine: this.calcX("sunrise") + 25 ?? 0,
        endLine: this.calcX("sunset") - 5 ?? 0,
      };
    },
    isShowSunrise() {
      const diff =
        this.datasets.dayLength.sunrise.slice(0, 2) -
        this.datasets.values[0].hour.slice(0, 2);
      return this.datasets.sunrise && diff > 0;
    },
    isShowSunset() {
      const diff =
        this.datasets.dayLength.sunset.slice(0, 2) -
        this.datasets.values[0].hour.slice(0, 2);
      console.log(diff);
      return this.datasets.sunset && diff >= 0;
    },
  },
  methods: {
    calcX(point = "sunrise") {
      if (this.datasets.values[0].hour !== "00:00") {
        // return console.log("waw");
        const day = (23 - this.datasets.values[0].hour.slice(0, 2)) * 60 + 60;
        const mPoint =
          this.datasets.dayLength[point].slice(0, 2) * 60 +
          parseInt(this.datasets.dayLength[point].slice(3)) +
          30;
        const x = (this.width * mPoint) / day - 9;
        console.log(day);
        return x;
      }
      // const mWidth = this.width / this.datasets.values.length / 60;
      const day = (23 - this.datasets.values[0].hour.slice(0, 2)) * 60 + 60;
      const mPoint =
        this.datasets.dayLength[point].slice(0, 2) * 60 +
        parseInt(this.datasets.dayLength[point].slice(3)) +
        30;
      const x = (this.width * mPoint) / day - 9;
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
