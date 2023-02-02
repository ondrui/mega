<template>
  <div class="p-20">
    <div class="p-10" v-for="icon in icons" :key="icon">
      <BaseIcon :name="icon" isTest />
      <div>{{ icon }}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icons: [
        "arrow-down-common",
        "arrow-up-common",
        "chevron-breadcrumb-right-common",
        "chevron-more-down-common",
        "chevron-scroll-left-common",
        "chevron-scroll-right-common",
        "humidity-common",
        "no-image-common",
        "pressure-common",
        "rect-background-common",
        "search-common",
        "sunrise-1-common",
        "sunset-1-common",
        "sun-1-common",
        "sun-2-common",
        "moon-1-common",
        "wind-direction-blue-common",
        "wind-direction-grey-common",
        "wind-gust-common",
        "clear-dark",
        "cloudy-dark",
        "cloudy_rain_0-dark",
        "cloudy_rain_0_thunderstorm_1-dark",
        "cloudy_rain_1-dark",
        "cloudy_rain_1_thunderstorm_1-dark",
        "cloudy_rain_1_thunderstorm_1_hail_1-dark",
        "cloudy_sleet_0-dark",
        "cloudy_sleet_1-dark",
        "cloudy_snow_0-dark",
        "cloudy_snow_1-dark",
        "mainly-clear-dark",
        "mainly-clear_rain_0-dark",
        "mainly-clear_rain_0_thunderstorm_1-dark",
        "mainly-clear_rain_1_thunderstorm_1-dark",
        "mostly-cloudy-dark",
        "partly-cloudy-dark",
        "partly-cloudy_rain_0-dark",
        "partly-cloudy_rain_0_thunderstorm_1-dark",
        "partly-cloudy_rain_1-dark",
        "partly-cloudy_rain_1_hail_1_thunderstorm_1-dark",
        "partly-cloudy_rain_1_thunderstorm_1-dark",
        "partly-cloudy_sleet_0-dark",
        "partly-cloudy_sleet_1-dark",
        "partly-cloudy_snow_0-dark",
        "partly-cloudy_snow_1-dark",
        "semitransparent-dark",
        "snowstorm-dark",
        "cloudy_snowstorm_1-dark",
        "clear-light",
        "cloudy-light",
        "cloudy_rain_0-light",
        "cloudy_rain_0_thunderstorm_1-light",
        "cloudy_rain_1-light",
        "cloudy_rain_1_thunderstorm_1-light",
        "cloudy_rain_1_thunderstorm_1_hail_1-light",
        "cloudy_sleet_0-light",
        "cloudy_sleet_1-light",
        "cloudy_snow_0-light",
        "cloudy_snow_1-light",
        "mainly-clear-light",
        "mainly-clear_rain_0-light",
        "mainly-clear_rain_0_thunderstorm_1-light",
        "mainly-clear_rain_1_thunderstorm_1-light",
        "mostly-cloudy-light",
        "partly-cloudy-light",
        "partly-cloudy_rain_0-light",
        "partly-cloudy_rain_0_thunderstorm_1-light",
        "partly-cloudy_rain_1-light",
        "partly-cloudy_rain_1_hail_1_thunderstorm_1-light",
        "partly-cloudy_rain_1_thunderstorm_1-light",
        "partly-cloudy_sleet_0-light",
        "partly-cloudy_sleet_1-light",
        "partly-cloudy_snow_0-light",
        "partly-cloudy_snow_1-light",
        "semitransparent-light",
        "snowstorm-light",
        "cloudy_snowstorm_1-light",
      ],
    };
  },
};
</script>

<style lang="scss" scoped></style>
