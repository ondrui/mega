<template>
  <svg
    :view-box.camel="viewbox"
    ref="svg-precip"
    class="svg-precip"
    xmlns="http://www.w3.org/2000/svg"
  >
    <text text-anchor="middle" :x="width / 2" y="9">
      {{ `${data.value} ${data.unit}` }}
    </text>
    <rect :height="bar.height" :width="bar.width" :y="bar.y" />
  </svg>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    rect: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      width: 50,
      height: 50,
    };
  },
  mounted() {
    this.points;
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
    bar() {
      return {
        height: this.height - this.rect,
        y: this.rect,
        width: this.width,
      };
    },
  },
  methods: {
    /**
     * Переводит принимаемый параметр в координату У элемента svg
     * с учетом текстовой метки и других маржинов.
     * @param temp - Значение температуры.
     * @param obj - Объект содержит свойства необходимые для отрисовки
     * графиков и меток температурных.
     */
    transformYToSVG(temp, obj) {
      const { max, min } = obj;
      const totalYMargin =
        this.textSize +
        this.marginFromCell +
        this.marginText +
        this.circleRadius / 2;
      const y = Math.round(
        ((this.height - 2 * totalYMargin) * (max - temp)) / (max - min) +
          totalYMargin
      );
      return y;
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
  width: 70%;

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
