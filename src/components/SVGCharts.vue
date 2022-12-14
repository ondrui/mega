<template>
  <div>
    <svg
      ref="svg"
      class="svg"
      :view-box.camel="viewbox"
      xmlns="http://www.w3.org/2000/svg"
    >
      <SVGChatsItem />
    </svg>
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: 300,
      height: 100,
      textSize: 16,
      marginFromCell: 12,
      marginText: 7,
      circleRadius: 5.5,
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
  unmounted() {
    /**
     * Удаляем оброботчик на событие resize когда компонент размонтирован.
     */
    window.removeEventListener("resize", this.resizeBrowserHandler);
  },
  computed: {
    tenDaysCharts() {
      return this.$store.getters.tenDaysCharts;
    },
    viewbox() {
      return `0 0 ${this.width} ${this.height}`;
    },
    renderCharts() {
      return "";
    },
  },
  methods: {
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
      this.width = getWidth("svg");
      this.height = getHeight("svg");
    },
  },
};
</script>

<style lang="scss">
.svg {
  fill: none;
  width: 100%;
  height: 100px;
  box-shadow: 0 0 0 1px teal;
}
</style>
