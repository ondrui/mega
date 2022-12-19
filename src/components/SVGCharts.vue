<template>
  <div>
    <svg
      ref="svg"
      class="svg"
      :view-box.camel="viewbox"
      xmlns="http://www.w3.org/2000/svg"
    >
      <SVGChartsItem
        v-for="(points, index) in dataPoints"
        :key="`ch-${index}`"
        :points="points"
      />
      <SVGChartsTextItem
        :width="width"
        :height="height"
        v-for="(value, index) in tenDay"
        :key="`tx-${index}`"
        :points="value"
      />
    </svg>
  </div>
</template>

<script>
import SVGChartsItem from "./SVGChartsItem.vue";
import SVGChartsTextItem from "./SVGChartsTextItem.vue";
export default {
  components: {
    SVGChartsItem,
    SVGChartsTextItem,
  },
  data() {
    return {
      width: 300,
      height: 170,
      textSize: 16,
      marginFromCell: 8,
      marginText: 5,
      circleRadius: 5.5,
    };
  },
  mounted() {
    this.points;
    /**
     * После монтирования компоненты вызываем функцию обработчик, которая
     * отвечает за вычисление и установку следующих значений:
     * SVGWidth, textNumBlockMeterWidth, textBlockMeterWidth.
     */
    this.resizeBrowserHandler();
    /**
     * Устанавливаем оброботчик на событие resize, которое срабатывает при
     * изменении размера окна. Функция обработчик описана выше.
     */
    window.addEventListener("resize", this.resizeBrowserHandler);
  },
  unmounted() {
    /**
     * Удаляем оброботчик на событие resize когда компонент размонтирован.
     */
    window.removeEventListener("resize", this.resizeBrowserHandler);
  },
  computed: {
    tenDay() {
      return this.$store.getters.tenDay;
    },
    viewbox() {
      return `0 0 ${this.width} ${this.height}`;
    },
    dataPoints() {
      const arr = this.tenDay.map((item) => {
        let x = this.width / (item.value.length * 2);
        const dataset = item.value.map((e, i) => {
          if (i === 0) {
            return { x, y: this.transformYToSVG(e, item) };
          }
          return {
            x: (x += this.width / item.value.length),
            y: this.transformYToSVG(e, item),
          };
        });
        return { descr: item.descr, dataset };
      });
      return arr;
    },
  },
  methods: {
    /**
     * Переводит принимаемый параметр в координату У элемента svg
     * с учетом текстовой метки и других маржинов.
     * @param pointY - м
     */
    transformYToSVG(pointY, item) {
      const { max, min } = item;
      const totalYMargin =
        this.textSize +
        this.marginFromCell +
        this.marginText +
        this.circleRadius / 2;
      const y = Math.round(
        ((this.height - 2 * totalYMargin) * (max - pointY)) / (max - min) +
          totalYMargin
      );
      return y;
    },
    /**
     * Функция обработчик вызывается, когда изменяется размер окна страницы.
     */
    resizeBrowserHandler() {
      /**
       * Определяет и устанавливает требуемые для отрисовки графика параметры.
       * @param element - строка содержит ключ ссылку $refs на элемент в шаблоне
       * компонента.
       */
      const getWidth = (element) => {
        return Math.round(this.$refs[element].getBoundingClientRect().width);
      };
      const getHeight = (element) => {
        return Math.round(this.$refs[element].getBoundingClientRect().height);
      };
      this.width = getWidth("svg");
      this.height = getHeight("svg");
    },
  },
};
</script>

<style lang="scss">
.svg {
  fill: none;
  width: 100%;
  height: 170px;
  box-shadow: 0 0 0 1px teal;
}
.text-meter {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  fill: #333333;
}
.color-path {
  stroke: #0bc2ff;
}
.dotted {
  stroke-dasharray: 8 4;
}
.thin {
  font-weight: 300;
}
</style>
