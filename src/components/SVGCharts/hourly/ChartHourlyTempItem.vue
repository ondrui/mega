<template>
  <g>
    <g :class="[points.descr, 'color-path']" stroke-width="1">
      <path :d="svgPath"></path>
      <circle
        v-for="(p, index) in points.dataset"
        :key="`c-${index}`"
        :cx="p.x"
        :cy="p.y"
        :r="circleRadius"
        fill="#ffffff"
      />
    </g>
    <g v-for="(p, index) in points.dataset" :key="`c-${index}`">
      <text class="temp-max" text-anchor="middle" :x="p.x" :y="p.textYMax">
        {{ `${p.temp}${p.unit}` }}
      </text>
      <text class="temp-feels" text-anchor="middle" :x="p.x" :y="p.textYFeels">
        {{ `${p.feels_like}${p.unit}` }}
      </text>
    </g>
  </g>
</template>

<script>
export default {
  props: ["points"],
  data() {
    return {
      circleRadius: 3,
    };
  },
  computed: {
    /**
     * Составляет строку с командами для атрибута d элемента path графика.
     */
    svgPath() {
      const d = this.points.dataset.reduce(
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
  },
  methods: {
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
  },
};
</script>

<style lang="scss" scoped>
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
.linear_6 {
  stroke-dasharray: 8 4;
  stroke: #035175;
}
.linear_12 {
  // stroke-dasharray: 8 4;
  stroke: #b63705;
}
.exp_12 {
  // stroke-dasharray: 8 4;
  stroke: #418105;
}
</style>
