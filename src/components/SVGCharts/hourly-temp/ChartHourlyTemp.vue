<template>
  <div>
    <svg
      :view-box.camel="viewbox"
      ref="svg-temp-hourly"
      class="svg-temp-hourly"
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
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    numData: {
      type: Array,
      required: true,
    },
    unitValues: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      width: 300,
      height: 180,
      textSizeMax: 16,
      textSizeMin: 14,
      circleRadius: 5.5,
      marginFromCell: 8,
      marginText: 5,
    };
  },
  mounted() {
    this.size();
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
    totalYMargin() {
      return (
        this.textSizeMax +
        this.marginFromCell +
        this.marginText +
        this.circleRadius / 2
      );
    },
    svgPath() {
      // build the d attributes by looping over the points
      const d = this.dataPoints.reduce(
        (acc, point, i, a) =>
          i === 0
            ? // if first point
              `M ${point.x},${point.y}`
            : // else
              `${acc} ${this.catmullRom2bezier(a, i - 1)}`,
        ""
      );
      return `${d}`;
    },
    /**
     * Возвращает массив объектов, которые содержат координаты и другие параметры
     * необходимые для отображения баров и текстовых меток.
     */
    barDataset() {
      let w = this.width / this.data.length;
      let max = Math.max(...this.data.map((e) => e.precSum.value));
      max = max > 6 ? max : 6;
      const dataset = this.data.reduce(
        (total, { precSum: { value, unit } }, index) => {
          if (value !== 0) {
            const x = index === 0 ? w / 2 : w * index + w / 2;
            const y = this.height - this.heightRect(value, max);
            const widthRect = this.width / 10 - 10;
            const obj = {
              xText: x,
              xRect: x - widthRect / 2,
              unit,
              yRect: y,
              yText: y - 2,
              precip: value,
              widthRect: widthRect,
              heightRect: this.heightRect(value, max),
            };
            total.push(obj);
          }
          return total;
        },
        []
      );
      return dataset;
    },
    /**
     * Возвращает массив объектов, которые содержат координаты для
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
      let max = Math.max(...this.numData.map((e) => e.temp_max));
      let min = Math.min(...this.numData.map((e) => e.temp_max));
      console.log(this.numData.length);
      let x = this.width / (this.numData.length * 2);
      console.log(x);

      const dataset = this.numData.reduce((total, { temp_max }, index) => {
        if (temp_max !== 0 && temp_max !== null) {
          let x1 = index === 0 ? x : 2 * x * index + x;
          const obj = {
            x: x1,
            y: this.transformYToSVG(temp_max, max, min),
            temp: temp_max,
          };
          total.push(obj);
        }
        return total;
      }, []);

      return dataset;
    },
  },
  methods: {
    /**
     * Переводит принимаемый параметр в координату У элемента svg
     * с учетом текстовой метки и других маржинов.
     * @param temp - Значение температуры.
     *  @param max - Максимальное количество осадков за выбранный период.
     */
    transformYToSVG(temp, max, min) {
      console.log("totalYMargin", this.totalYMargin);
      const y = Math.round(
        ((this.height - 2 * this.totalYMargin) * (max - temp)) / (max - min) +
          this.totalYMargin
      );
      return y;
    },
    /**
     * Конвертирует принимаемые точки в контрольные точки кривой Безье.
     * @param points - Массив объектов с координатами точек через которые нужно
     * построить кривую.
     * @param i - Индекс элемента в массиве.
     */
    catmullRom2bezier(points, i) {
      let p = [];

      p.push({
        x: points[Math.max(i - 1, 0)].x,
        y: points[Math.max(i - 1, 0)].y,
      });
      p.push({
        x: points[i].x,
        y: points[i].y,
      });
      p.push({
        x: points[i + 1].x,
        y: points[i + 1].y,
      });
      p.push({
        x: points[Math.min(i + 2, points.length - 1)].x,
        y: points[Math.min(i + 2, points.length - 1)].y,
      });

      // Catmull-Rom to Cubic Bezier conversion matrix
      //    0       1       0       0
      //  -1/6      1      1/6      0
      //    0      1/6      1     -1/6
      //    0       0       1       0

      let bp = [];
      bp.push({
        x: (-p[0].x + 6 * p[1].x + p[2].x) / 6,
        y: (-p[0].y + 6 * p[1].y + p[2].y) / 6,
      });
      bp.push({
        x: (p[1].x + 6 * p[2].x - p[3].x) / 6,
        y: (p[1].y + 6 * p[2].y - p[3].y) / 6,
      });
      bp.push({
        x: p[2].x,
        y: p[2].y,
      });
      return `C ${bp[0].x},${bp[0].y} ${bp[1].x},${bp[1].y} ${bp[2].x},${bp[2].y}`;
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
      const getHeight = (element) => {
        return Math.round(this.$refs[element].getBoundingClientRect().height);
      };
      this.width = getWidth("svg-temp-hourly");
      this.height = getHeight("svg-temp-hourly");
      console.log("getWidth", getWidth("svg-temp-hourly"));
      console.log("getHeight", getHeight("svg-temp-hourly"));
    },
  },
};
</script>

<style lang="scss" scoped>
.svg-temp-hourly {
  fill: none;
  width: 100%;
  height: 188px;
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
