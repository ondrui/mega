<template>
  <svg
    :view-box.camel="viewbox"
    ref="svg-temp-details"
    class="svg-temp-details"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <path class="color-path" stroke-width="1" :d="svgPath"></path>
      <circle
        v-for="(p, index) in dataPoints"
        :key="`c-${index}`"
        :cx="p.x"
        :cy="p.y"
        :r="circleRadius"
        stroke="#0BC2FF"
        stroke-width="1"
        fill="#ffffff"
      />
    </g>
    <g v-for="(p, index) in dataPoints" :key="`c-${index}`">
      <text class="temp" text-anchor="middle" :x="p.x" :y="p.textYMax">
        {{ `${p.temp}${p.unit}` }}
      </text>
      <text class="temp-feels" text-anchor="middle" :x="p.x" :y="p.textYFeels">
        {{ `${p.feels_like}${p.unit}` }}
      </text>
    </g>
  </svg>
</template>

<script>
import {
  addPlus,
  bezierCommand,
  catmullRom2bezier,
} from "@/constants/functions";
export default {
  props: {
    numData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      width: 300,
      height: 156,
      textSize: 16,
      marginFromCell: 9,
      marginText: 5,
      circleRadius: 3,
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
  watch: {
    tenDaysDetailsCard() {
      this.resizeBrowserHandler();
    },
  },
  computed: {
    tenDaysDetailsCard() {
      return this.$store.getters.tenDaysDetailsCard;
    },
    viewbox() {
      return `0 0 ${this.width} ${this.height}`;
    },
    /**
     * Составляет строку с командами для атрибута d элемента path графика.
     */
    svgPath() {
      const d = this.dataPoints.reduce(
        (acc, point, i, a) =>
          i === 0
            ? `M ${point.x},${point.y}`
            : i !== a.length - 1 && point.y === a[i - 1].y
            ? `${acc} L ${point.x} ${point.y}`
            : `${acc} ${this.catmullRom2bezier(a, i - 1)}`,
        // `${acc} ${this.bezierCommand(point, i, a)}`,
        ""
      );
      return `${d}`;
    },
    /**
     * Возвращает массив объектов, которые содержат координаты для
     * отображения графиков и меток температурных.
     * @example
     *[
     *  { x: 27.35, y: 85, temp: 11, textYMax: 149, unit: '°' },
     *  { x: 27.35, y: 85, temp: 14, textYMax: 199, unit: '°' },
     *];
     */
    dataPoints() {
      let max = Math.max(...this.numData.map((e) => e.temp.value));
      let min = Math.min(...this.numData.map((e) => e.temp.value));
      let x = this.width / (this.numData.length * 2);

      const dataset = this.numData.reduce(
        (total, { temp, feels_like }, index) => {
          if (temp.value !== undefined && temp.value !== null) {
            let x1 = index === 0 ? x : 2 * x * index + x;
            const obj = {
              x: x1,
              y: this.calcY(temp.value, max, min),
              textYMax:
                this.calcY(temp.value, max, min) -
                (this.circleRadius + this.marginText + 2),
              textYFeels:
                this.calcY(temp.value, max, min) +
                (this.circleRadius + this.textSize + 2),
              temp: addPlus(temp.value),
              feels_like: addPlus(feels_like.value),
              unit: temp.unit,
            };
            total.push(obj);
          }
          return total;
        },
        []
      );
      return dataset;
    },
  },
  methods: {
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
     * Переводит принимаемый параметр в координату У элемента svg
     * с учетом текстовой метки и других маржинов.
     * @param temp - Значение температуры.
     *  @param max - Максимальное количество осадков за выбранный период.
     */
    calcY(temp, max, min) {
      const y =
        Math.round(
          ((this.height - 2 * this.totalYMargin()) * (max - temp)) / (max - min)
        ) + this.totalYMargin();
      return y;
    },
    /**
     * Вариант 1
     * Конвертирует принимаемые точки в контрольные точки кривой Безье.
     * @param points - Массив объектов с координатами точек через которые нужно
     * построить кривую.
     * @param i - Индекс элемента в массиве.
     */
    catmullRom2bezier,
    /**
     * Вариант 2
     * Конвертирует принимаемые точки в контрольные точки кривой Безье.
     * Возвращает строку с командой для создания кривой линии.
     * Smooth a Svg path with cubic bezier curves
     * https://francoisromain.medium.com/
     * smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
     */
    bezierCommand,

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
      this.width = getWidth("svg-temp-details");
      this.height = getHeight("svg-temp-details");
    },
  },
};
</script>

<style lang="scss" scoped>
.svg-temp-details {
  fill: none;
  width: 100%;
  height: 100%;
  display: inline-block;
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
.temp {
  font-weight: 500;
  font-size: 16px;
  line-height: 19px;
  fill: #333333;
}
.temp-feels {
  font-weight: 300;
  font-size: 14px;
  line-height: 16px;
  fill: #9c9c9c;
}
</style>
