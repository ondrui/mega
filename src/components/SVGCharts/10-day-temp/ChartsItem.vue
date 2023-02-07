<template>
  <g>
    <path
      :class="[classChart, 'color-path']"
      stroke-width="1"
      :d="svgPath"
    ></path>
    <circle
      v-for="(p, index) in points.dataset"
      :key="`c-${index}`"
      :cx="p.x"
      :cy="p.y"
      :r="circleRadius"
      stroke="#0BC2FF"
      stroke-width="1"
      fill="#ffffff"
    />
  </g>
</template>

<script>
import { catmullRom2bezier } from "@/constants/functions";

export default {
  props: {
    /**
     * Объект с данными для отображения графика.
     */
    points: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      /**
       * Радиус окружности точки на графике.
       */
      circleRadius: 3,
    };
  },
  computed: {
    /**
     * Составляет и возвращает строку с командами для атрибута d элемента path графика.
     */
    svgPath() {
      const d = this.points.dataset.reduce(
        (acc, point, i, a) =>
          i === 0
            ? `M ${point.x},${point.y}`
            : `${acc} ${this.catmullRom2bezier(a, i - 1)}`,
        ""
      );
      return `${d}`;
    },
    /**
     * Возвращает строку с именем класса css, который отвечает за
     * стиль линии графика.
     */
    classChart() {
      return this.points.descr === "night" ? "dotted" : "";
    },
  },
  methods: {
    /**
     * Конвертирует принимаемые точки в контрольные точки кривой Безье.
     * Возвращает строку с командой для создания кривой линии.
     * @param points - Массив объектов с координатами точек через которые нужно
     * построить кривую.
     * @param i - Индекс элемента в массиве.
     */
    catmullRom2bezier,
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
.dotted {
  stroke-dasharray: 8 4;
}
.thin {
  font-weight: 300;
}
</style>
