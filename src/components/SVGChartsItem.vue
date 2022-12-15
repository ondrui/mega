<template>
  <g>
    <path stroke="#0BC2FF" stroke-width="2" :d="makePath"></path>
    <circle
      :cx="p.x"
      :cy="p.y"
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
          return { x, y: this.transformYToSVG(e) };
        }
        return { x: (x += this.width / 10), y: this.transformYToSVG(e) };
      });
      console.log(points);
      return points;
    },
    makePath() {
      const points = this.calcPointsSVG;
      let catmull = this.catmullRom2bezier(points);
      console.log(catmull);
      const d = catmull.reduce(
        (acc, point, i) =>
          i === 0
            ? // if first point
              `M ${points[0]},${points[1]}`
            : // else
              `${acc} C ${point[0].x},${point[0].y} ${point[1].x},${point[1].y} ${point[2].x},${point[2].y}`,
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
    catmullRom2bezier(points) {
      let result = [];
      for (let i = 0; i < points.length - 1; i++) {
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
        result.push(bp);
      }

      return result;
    },
  },
};
</script>

<style lang="scss"></style>
