<template>
  <svg
    :view-box.camel="viewbox"
    ref="svg-precip-hourly"
    class="svg-precip-hourly"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g v-for="(item, index) in barDataset" :key="index">
      <text text-anchor="middle" :x="item.xText" :y="item.yText">
        {{ `${item.precip} ${item.unit}` }}
      </text>
      <rect
        :height="item.heightRect"
        :width="item.widthRect"
        :y="item.yRect"
        :x="item.xRect"
      />
    </g>
  </svg>
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
      width: 500,
      height: 50,
      textSize: 12,
      marginFromBar: 2,
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
     * Возвращает массив объектов, которые содержат координаты и другие параметры
     * необходимые для отображения баров и текстовых меток.
     */
    barDataset() {
      let w = this.width / this.numData.length;
      let max = Math.max(...this.numData.map((e) => e.prec_sum.value));
      max = max > 6 ? max : 6;
      const dataset = this.numData.reduce(
        (total, { prec_sum: { value, unit } }, index, arr) => {
          if (value !== 0) {
            const x = index === 0 ? w / 2 : w * index + w / 2 + 0.5;
            const y = this.height - this.heightRect(value, max);
            const widthRect = this.width / arr.length - 5;
            const obj = {
              xText: x,
              xRect: x - widthRect / 2,
              unit,
              yRect: y,
              yText: y - 2,
              precip: value,
              widthRect: widthRect,
              heightRect: this.heightRect(value, max),
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
     * Переводит принимаемый параметр (количество осадков) в высоту бара
     * с учетом высоты текстовой метки и других маржинов.
     * @param value - Значение необходимое для отображения бара графика.
     * @param max - Максимальное количество осадков за выбранный период.
     */
    heightRect(value, max) {
      const totalYMargin = this.textSize + this.marginFromBar;
      const h = Math.round(((this.height - totalYMargin) * value) / max);
      return h;
    },
    /**
     * Функция обработчик вызывается, когда изменяется размер окна страницы.
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
      this.width = getWidth("svg-precip-hourly");
      this.height = getHeight("svg-precip-hourly");
    },
  },
};
</script>

<style lang="scss" scoped>
.svg-precip-hourly {
  fill: none;
  height: 45px;
  width: 100%;

  & text {
    fill: #0099cc;
    font-weight: 300;
    font-size: 12px;
    line-height: 10px;
  }

  & rect {
    fill: #0bc2ff;
  }
}
</style>
