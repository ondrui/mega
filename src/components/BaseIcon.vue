<template>
  <component :is="iconComponent" />
</template>

<script>
/**
 * Компонента для вставки иконок в формате SVG.
 */
const icons = {};
const requireComponents = require.context(
  "../assets/images?inline",
  true,
  /.svg$/
);
requireComponents.keys().forEach((fileName) => {
  const iconName =
    fileName.split("/").at(-1).slice(0, -4) + "-" + fileName.split("/").at(-2);
  const componentConfig = requireComponents(fileName);
  icons[iconName] = componentConfig.default ?? componentConfig;
});

export default {
  props: {
    /**
     * Имя папки где хранится файл с изображением.
     * common - папка со служебными иконками.
     * light - погодные значки для темного времени суток.
     * light - погодные значки для светлого времени суток.
     */
    pick: String,
    /**
     * Имя иконки должно совпадать с названием файла svg в папке \src\assets\images
     */
    name: {
      type: String,
      required: true,
    },
    /**
     * Флаг используется для отрисовки всех иконок в тестовой компоненте.
     */
    isTest: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    /**
     * Возвращает компоненту с иконкой для отображения.
     */
    iconComponent() {
      const nameComponent = !this.isTest
        ? this.name + "-" + this.pick
        : this.name;
      if (!Object.prototype.hasOwnProperty.call(icons, nameComponent)) {
        return (
          console.log(`${nameComponent} иконка с таким именем не найдена!!!`),
          icons["no-image-common"]
        );
      }
      icons[nameComponent].name = nameComponent;
      return icons[nameComponent];
    },
  },
};
</script>
