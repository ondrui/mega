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
      <g v-for="(p, index) in dataPoints" :key="`c-${index}`">
        <text class="temp-max" text-anchor="middle" :x="p.x" :y="p.textYMax">
          {{ `${p.temp_max}${p.unit}` }}
        </text>
        <text
          class="temp-feels"
          text-anchor="middle"
          :x="p.x"
          :y="p.textYFeels"
        >
          {{ `${p.feels_like}${p.unit}` }}
        </text>
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
  },
  data() {
    return {
      width: 300,
      height: 180,
      textSizeMax: 16,
      textSizeMin: 14,
      circleRadius: 3,
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
    /**
     * Вычисление общего отступа графика от
     * соседних ячеек.
     */
    totalYMargin() {
      return (
        this.textSizeMax +
        this.marginFromCell +
        this.marginText +
        this.circleRadius / 2
      );
    },
    /**
     * Составляет строку с командами для атрибута d элемента path графика.
     */
    svgPath() {
      const d = this.dataPoints.reduce(
        (acc, point, i, a) =>
          i === 0
            ? `M ${point.x},${point.y}`
            : `${acc} ${this.catmullRom2bezier(a, i - 1)}`,
        ""
      );
      return `${d}`;
    },
    /**
     * Возвращает массив объектов, которые содержат координаты для
     * отображения графиков и меток температурных.
     * @example
     *[
     *  { x: 27.35, y: 85, temp_max: 11, feels_like: 12 },
     *  { x: 27.35, y: 85, temp_max: 14, feels_like: 17 },
     *];
     */
    dataPoints() {
      let max = Math.max(...this.numData.map((e) => e.temp_max.value));
      let min = Math.min(...this.numData.map((e) => e.temp_max.value));
      let x = this.width / (this.numData.length * 2);

      const dataset = this.numData.reduce(
        (total, { temp_max, feels_like }, index) => {
          if (temp_max.value !== undefined && temp_max.value !== null) {
            let x1 = index === 0 ? x : 2 * x * index + x;
            const obj = {
              x: x1,
              y: this.calcY(temp_max.value, max, min),
              textYMax:
                this.calcY(temp_max.value, max, min) -
                (this.circleRadius + this.marginText + 2),
              textYFeels:
                this.calcY(temp_max.value, max, min) +
                (this.circleRadius + this.textSizeMin + 2),
              temp_max:
                temp_max.value > 0 ? `+${temp_max.value}` : temp_max.value,
              feels_like:
                feels_like.value > 0
                  ? `+${feels_like.value}`
                  : feels_like.value,
              unit: temp_max.unit,
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
     * Переводит принимаемый параметр в координату У элемента svg
     * с учетом текстовой метки и других маржинов.
     * @param temp - Значение температуры.
     *  @param max - Максимальное количество осадков за выбранный период.
     */
    calcY(temp, max, min) {
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
     * Находим размеры SVG элемента и записываем их в объект data.
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
    },
  },
};
</script>

<style lang="scss" scoped>
.svg-temp-hourly {
  fill: none;
  width: 100%;
  height: 188px;
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
.temp-max {
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
