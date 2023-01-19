<template>
  <component :is="iconComponent" />
</template>

<script>
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
    pick: String,
    name: {
      type: String,
      required: true,
    },
    isTest: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
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
