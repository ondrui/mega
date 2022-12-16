<template>
  <g>
    <text
      v-for="(p, index) in calcPointsSVG"
      :key="`c-${index}`"
      :class="['text-meter', textMeter(index).thin]"
      :x="p.x"
      :y="textMeter(index).y"
    >
      <tspan text-anchor="middle" ref="tspan" class="tspan">{{
        textMeter(index).value
      }}</tspan>
      <tspan>{{ textMeter(index).unit }}</tspan>
    </text>
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
  },
  methods: {
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
    textMeter(index) {
      const points = this.points;
      const value = points.value[index];
      const unit = points.unit;
      const y =
        points.descr === "min"
          ? this.calcPointsSVG[index].y + this.marginText + this.textSize + 2
          : this.calcPointsSVG[index].y + this.marginText - this.textSize;
      const thin = points.descr === "min" ? "thin" : "";

      return {
        value,
        unit,
        y,
        thin,
      };
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
