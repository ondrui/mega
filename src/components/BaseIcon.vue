<template>
  <component :is="iconComponent" />
</template>

<script>
// const icons = {
//   "arrow-down": require("../assets/images/common-icons/arrow-down.svg"),
//   "arrow-up": require("../assets/images/common-icons/arrow-up.svg"),
//   "chevron-breadcrumb-right": require("../assets/images/common-icons/chevron-breadcrumb-right.svg"),
//   "chevron-more-down": require("../assets/images/common-icons/chevron-more-down.svg"),
//   "chevron-scroll-left": require("../assets/images/common-icons/chevron-scroll-left.svg"),
//   "chevron-scroll-right": require("../assets/images/common-icons/chevron-scroll-right.svg"),
//   humidity: require("../assets/images/common-icons/humidity.svg"),
//   pressure: require("../assets/images/common-icons/pressure.svg"),
//   "rect-background": require("../assets/images/common-icons/rect-background.svg"),
//   search: require("../assets/images/common-icons/icon-search.svg"),
//   "sun-1": require("../assets/images/common-icons/sun-1.svg"),
//   "sun-2": require("../assets/images/common-icons/sun-2.svg"),
//   "wind-direction": require("../assets/images/common-icons/wind-direction.svg"),
//   "wind-gust": require("../assets/images/common-icons/wind-gust.svg"),

//   "": require("../assets/images/weather-icons/day"),
// };

const icons = {};
const requireComponents = require.context("../assets/images", true, /.svg$/);
requireComponents.keys().forEach((fileName) => {
  const iconName = fileName.split("/").at(-1).slice(0, -4);
  const componentConfig = requireComponents(fileName);
  icons[iconName] = componentConfig.default ?? componentConfig;
});

export default {
  props: {
    pick: String,
    name: {
      type: String,
      required: true,
      validator(value) {
        return Object.prototype.hasOwnProperty.call(icons, value);
      },
    },
  },

  computed: {
    iconComponent() {
      icons[this.name].name = this.name;
      return icons[this.name];
    },
  },
};
</script>
