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
        {{ `${p.feels_like}${p.feels_like_unit}` }}
      </text>
    </g>
  </g>
</template>

<script>
import { bezierCommand, catmullRom2bezier } from "@/constants/functions";
export default {
  /**
   * Объект с данными для отображения графика.
   */
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
    catmullRom2bezier,

    /**
     * Smooth a Svg path with cubic bezier curves
     * https://francoisromain.medium.com/
     * smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
     */
    bezierCommand,
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
.api {
  stroke-dasharray: 15 4;
  stroke: #e95f03;
}
</style>
