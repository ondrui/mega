<template>
  <g>
    <path
      :class="[classChart, 'color-path']"
      stroke-width="1"
      :d="svgPath"
    ></path>
    <g v-for="(p, index) in calcPointsSVG" :key="`c-${index}`">
      <circle
        :cx="p.x"
        :cy="p.y"
        :r="circleRadius"
        stroke="#0BC2FF"
        stroke-width="1"
        fill="#ffffff"
      />
      <text
        :class="['text-meter', textMeter(index).thin]"
        :x="p.x"
        :y="textMeter(index).y"
      >
        <tspan ref="tspan" class="tspan">{{ textMeter(index).value }}</tspan>
        <tspan>{{ textMeter(index).unit }}</tspan>
      </text>
    </g>
  </g>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    points: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      textSize: 16,
      marginFromCell: 8,
      marginText: 5,
      circleRadius: 5.5,
    };
  },
  mounted() {
    this.calcPointsSVG;
  },
  computed: {
    /**
     * Вычисляет и возвращает массив координат Х и У в системе координат элемента svg.
     * @example
     * [
     *   { "x": 42.35, "y": 32 },
     *   { "x": 127.05, "y": 36 },
     *   { "x": 211.75, "y": 138 },
     *   { "x": 296.45, "y": 36 },
     * ]
     */
    calcPointsSVG() {
      let x = this.width / 20;
      const points = this.points.value.map((e, i) => {
        if (i === 0) {
          return { x, y: this.transformYToSVG(e) };
        }
        return { x: (x += this.width / 10), y: this.transformYToSVG(e) };
      });
      return points;
    },
    /**
     * Принимает массив объектов с координатами и
     * возвращает список команд пути для отображения графика.
     */
    svgPath() {
      // build the d attributes by looping over the points
      const d = this.calcPointsSVG.reduce(
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
    classChart() {
      return this.points.descr === "min" ? "dotted" : "";
    },
  },
  methods: {
    textMeter(index) {
      const points = this.points;
      const value = points.value[index];
      const unit = points.unit;
      const y =
        points.descr === "min"
          ? this.calcPointsSVG[index].y + this.marginText + this.textSize
          : this.calcPointsSVG[index].y + this.marginText - this.textSize;
      const thin = points.descr === "min" ? "thin" : "";

      return {
        value,
        unit,
        y,
        thin,
      };
    },
    /**
     * Переводит принимаемый параметр в координату У элемента svg
     * с учетом текстовой метки и других морджинов.
     * @param pointY - м
     */
    transformYToSVG(pointY) {
      const { max, min } = this.points;
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
  },
};
</script>

<style lang="scss">
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
