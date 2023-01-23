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
          {{ `${p.temp}${p.unit}` }}
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
            : i !== a.length - 1 && point.y === a[i - 1].y
            ? `${acc} L ${point.x} ${point.y}`
            : // : `${acc} ${this.catmullRom2bezier(a, i - 1)}`,
              `${acc} ${this.bezierCommand(point, i, a)}`,
        ""
      );
      return `${d}`;
    },
    /**
     * Возвращает массив объектов, которые содержат координаты для
     * отображения графиков и меток температурных.
     * @example
     *[
     *  { x: 27.35, y: 85, temp: 11, feels_like: 12, textYFeels: 166, textYMax: 149, unit: '°' },
     *  { x: 28, y: 88, temp: 14, feels_like: 17, textYFeels: 180, textYMax: 199, unit: '°' },
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
                (this.circleRadius + this.textSizeMin + 2),
              temp: temp.value > 0 ? `+${temp.value}` : temp.value,
              feels_like:
                feels_like.value > 0
                  ? `+${feels_like.value}`
                  : feels_like.value,
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
     * Smooth a Svg path with cubic bezier curves
     * https://francoisromain.medium.com/
     * smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
     */

    line(pointA, pointB) {
      const lengthX = pointB.x - pointA.x;
      const lengthY = pointB.y - pointA.y;
      return {
        length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
        angle: Math.atan2(lengthY, lengthX),
      };
    },
    controlPoint(current, previous, next, reverse) {
      const p = previous ?? current;
      const n = next ?? current;
      const o = this.line(p, n);
      const flattening = 0.2;
      const smoothing = 0.2;
      const map = (value, inMin, inMax, outMin, outMax) => {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
      };
      // work in progress…
      const flat = map(Math.cos(o.angle) * flattening, 0, 1, 1, 0);
      const angle = o.angle * flat + (reverse ? Math.PI : 0);
      const length = o.length * smoothing;
      const x = current.x + Math.cos(angle) * length;
      const y = current.y + Math.sin(angle) * length;
      return [x, y];
    },
    bezierCommand(point, i, a) {
      const cps = this.controlPoint(a[i - 1], a[i - 2], point);
      const cpe = this.controlPoint(point, a[i - 1], a[i + 1], true);
      return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point.x},${point.y}`;
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
