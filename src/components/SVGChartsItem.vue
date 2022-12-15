<template>
  <g>
    <path stroke="#0BC2FF" stroke-width="2" :d="svgPath"></path>
    <circle
      :cx="p[0]"
      :cy="p[1]"
      :r="circleRadius"
      v-for="(p, index) in calcPointsSVG"
      :key="`c-${index}`"
      stroke="#0BC2FF"
      stroke-width="2"
      fill="#ffffff"
    />
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
    calcPointsSVG() {
      let x = this.width / 20;
      const points = this.points.value.map((e, i) => {
        if (i === 0) {
          return [x, this.transformYToSVG(e)];
        }
        return [(x += this.width / 10), this.transformYToSVG(e)];
      });
      console.log(points);
      return points;
    },
    svgPath() {
      const lineCommand = (point) => `L ${point[0]} ${point[1]}`;
      // build the d attributes by looping over the points
      const d = this.calcPointsSVG.reduce(
        (acc, point, i, a) =>
          i === 0
            ? // if first point
              `M ${point[0]},${point[1]}`
            : // else
              `${acc} ${lineCommand(point, i, a)}`,
        ""
      );
      return `${d}`;
    },
  },
  methods: {
    transformYToSVG(pointY) {
      const totalYMargin =
        this.textSize +
        this.marginFromCell +
        this.marginText +
        this.circleRadius / 2;
      const y = Math.round(
        ((this.height - 2 * totalYMargin) * (this.points.max - pointY)) /
          this.points.delta +
          totalYMargin
      );
      return y;
    },
  },
};
</script>

<style lang="scss"></style>
