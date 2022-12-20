<template>
  <svg
    :view-box.camel="viewbox"
    ref="svg-precip"
    class="svg-precip"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g v-for="(item, index) in barDataset" :key="index">
      <text text-anchor="middle" :x="item.xText" y="9">
        {{ `${item.precip} ${item.unit}` }}
      </text>
      <rect
        :height="item.heightRect"
        :width="item.widthRect"
        :y="item.y"
        :x="item.xRect"
      />
    </g>
  </svg>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      width: 300,
      height: 50,
      textSize: 12,
      marginFromBar: 2,
    };
  },
  mounted() {
    /**
     * После монтирования компоненты вызываем функцию обработчик, которая
     * отвечает за вычисление и установку следующих значений:
     * SVGWidth, textNumBlockMeterWidth, textBlockMeterWidth.
     */
    this.resizeBrowserHandler();
    /**
     * Устанавливаем оброботчик на событие resize, которое срабатывает при
     * изменении размера окна. Функция обработчик описана выше.
     */
    window.addEventListener("resize", this.resizeBrowserHandler);
  },
  destroyed() {
    /**
     * Удаляем оброботчик на событие resize когда компонент размонтирован.
     */
    window.removeEventListener("resize", this.resizeBrowserHandler);
  },
  computed: {
    viewbox() {
      return `0 0 ${this.width} ${this.height}`;
    },
    /**
     *
     */
    barDataset() {
      let w = this.width / this.data.length;
      let max = Math.max(...this.data.map((e) => e.precSum.value));
      max = max > 6 ? max : 6;
      const dataset = this.data.reduce(
        (total, { precSum: { value, unit } }, index) => {
          if (value !== 0) {
            let x = index === 0 ? w / 2 : w * index + w / 2;
            const widthRect = this.width / 10 - 20;
            const obj = {
              xText: x,
              xRect: x - widthRect / 2,
              unit,
              y: this.height - this.heightRect(value, max),
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
     * Переводит принимаемый параметр в координату У элемента svg
     * с учетом текстовой метки и других маржинов.
     * @param value -
     * @param max -
     * графиков и меток температурных.
     */
    heightRect(value, max) {
      const totalYMargin = this.textSize + this.marginFromBar;
      const h = Math.round(((this.height - totalYMargin) * value) / max);
      return h;
    },
    /**
     * Функция обработчик вызывается, когда изменяется размер окна страницы.
     */
    resizeBrowserHandler() {
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
      this.width = getWidth("svg-precip");
      this.height = getHeight("svg-precip");
    },
  },
};
</script>

<style lang="scss">
.svg-precip {
  fill: none;
  height: 45px;
  // box-shadow: 0 0 0 1px teal;
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
