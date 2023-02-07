<template>
  <svg
    ref="svg-temp"
    class="svg-temp"
    :view-box.camel="viewbox"
    xmlns="http://www.w3.org/2000/svg"
  >
    <ChartsItem
      v-for="(points, index) in dataPoints"
      :key="`ch-${index}`"
      :points="points"
    />
    <ChartsTextItem
      v-for="(value, index) in dataPoints"
      :key="`tx-${index}`"
      :points="value"
      :textSize="textSize"
      :marginText="marginText"
    />
  </svg>
</template>

<script>
import ChartsItem from "./ChartsItem.vue";
import ChartsTextItem from "./ChartsTextItem.vue";
export default {
  components: {
    ChartsItem,
    ChartsTextItem,
  },
  data() {
    return {
      /**
       * Ширина элемента SVG.
       */
      width: 300,
      /**
       * Высота элемента SVG.
       */
      height: 170,
      /**
       * Размер шрифта значения температуры.
       */
      textSize: 16,
      /**
       * Отступ от соседней ячейки.
       */
      marginFromCell: 8,
      /**
       * Отступ текста от графика.
       */
      marginText: 5,
      /**
       * Радиус окружности точки на графике.
       */
      circleRadius: 5.5,
    };
  },
  mounted() {
    /**
     * После монтирования компоненты вызываем функцию обработчик, которая
     * отвечает за вычисление и установку следующих значений поля data:
     * width и height.
     */
    this.resizeBrowserHandler();
    /**
     * Устанавливаем оброботчик на событие resize, которое срабатывает при
     * изменении размера окна. Функция обработчик описана выше.
     */
    window.addEventListener("resize", this.resizeBrowserHandler);
  },
  destroyed() {
    /**
     * Удаляем оброботчик на событие resize когда компонент размонтирован.
     */
    window.removeEventListener("resize", this.resizeBrowserHandler);
  },
  computed: {
    /**
     * Получаем массив объектов со стора, которые содержит свойства
     * необходимые для отрисовки графиков и меток температурных.
     */
    tenDay() {
      return this.$store.getters.tenDaysTabTempCharts;
    },
    viewbox() {
      return `0 0 ${this.width} ${this.height}`;
    },
    /**
     * Вычисление общего отступа графика от
     * соседних ячеек.
     */
    totalYMargin() {
      return (
        this.textSize +
        this.marginFromCell +
        this.marginText +
        this.circleRadius / 2
      );
    },
    /**
     * Возвращает массив объектов, которые содержат координаты,
     * значения, символ единицы измерения температуры для
     * отображения графиков и меток температурных.
     * @example
     *[
     *  {
     *    descr: "min",
     *    unit: "°",
     *    dataset: [
     *      { x: 27.35, y: 85, temp: 11 },
     *      { x: 82.05, y: 77, temp: 12 },
     *    ],
     *  },
     *  {
     *    descr: "max",
     *    unit: "°",
     *    dataset: [
     *      { x: 27.35, y: 32, temp: 18 },
     *      { x: 82.05, y: 39, temp: 17 },
     *    ],
     *  },
     *];
     */
    dataPoints() {
      const colCount = this.tenDay[0].value.length;
      const arr = this.tenDay.map((item) => {
        let x = this.width / (colCount * 2);

        const dataset = item.value.reduce((total, current, index) => {
          if (current !== undefined && current !== null) {
            let x1 = index === 0 ? x : 2 * x * index + x;
            const obj = {
              x: x1,
              y: this.transformYToSVG(current, item),
              temp: current,
            };
            total.push(obj);
          }
          return total;
        }, []);

        return { descr: item.descr, unit: item.unit, dataset: dataset };
      });
      return arr;
    },
  },
  methods: {
    /**
     * Переводит принимаемый параметр в координату У элемента svg
     * с учетом текстовой метки и других маржинов.
     * @param temp - Значение температуры.
     * @param obj - Объект содержит свойства необходимые для отрисовки
     * графиков и меток температурных.
     */
    transformYToSVG(temp, obj) {
      const { max, min } = obj;
      const totalYMargin =
        this.textSize +
        this.marginFromCell +
        this.marginText +
        this.circleRadius / 2;
      const y = Math.round(
        ((this.height - 2 * totalYMargin) * (max - temp)) / (max - min) +
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
      this.width = getWidth("svg-temp");
      this.height = getHeight("svg-temp");
    },
  },
};
</script>

<style lang="scss" scoped>
.svg-temp {
  display: inline-block;
  fill: none;
  width: 100%;
  height: 100%;
  // box-shadow: 0 0 0 1px teal;
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
