<template>
  <g>
    <text
      v-for="(p, index) in points.dataset"
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
import { addPlus } from "@/constants/functions";
export default {
  props: {
    /**
     * Объект с данными для отображения блока восход/заход солнца.
     */
    points: {
      type: Object,
      required: true,
    },
    /**
     * Размер шрифта значения температуры.
     */
    textSize: {
      type: Number,
      required: true,
    },
    /**
     * Отступ текста от графика.
     */
    marginText: {
      type: Number,
      required: true,
    },
  },
  methods: {
    /**
     * Возвращает объект, который содержат координаты и другие параметры
     * необходимые для отображения текстовых меток.
     */
    textMeter(index) {
      const value = addPlus(this.points.dataset[index].temp);
      const unit = this.points.unit;
      const y =
        this.points.descr === "night"
          ? this.points.dataset[index].y + this.marginText + this.textSize + 2
          : this.points.dataset[index].y + this.marginText - this.textSize;
      const thin = this.points.descr === "night" ? "thin" : "";

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
