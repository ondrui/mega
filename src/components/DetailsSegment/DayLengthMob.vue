<template>
  <div class="day-length-block">
    <div>
      <BaseIcon name="sun-2" pick="common" width="11" />
      <BaseIcon name="arrow-up" pick="common" width="5" />
      {{ value.dayLength.sunrise }}
      <BaseIcon name="arrow-down" pick="common" width="5" />
      {{ value.dayLength.sunset }}
    </div>
    <div>
      <span>{{ value.dayLength.daytime.title }}:</span>&nbsp;{{
        value.dayLength.daytime.value_mob
      }}
    </div>
  </div>
</template>
<script>
export default {
  props: ["value"],
};
</script>
<style lang="scss" scoped>
.day-length-block {
  display: flex;
  flex-direction: column;
  row-gap: 2px;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  white-space: nowrap;
  color: #333333;

  & > div:first-child {
    width: 102px;
    display: flex;
    justify-content: space-between;
  }

  & span {
    display: inline-block;
    font-size: 10px;
    line-height: 12px;
    color: #9c9c9c;

    &::first-letter {
      text-transform: capitalize;
    }
  }
}
@media only screen and (max-width: 600px) {
  .day-length-block span {
    font-size: 14px;
    line-height: 16px;
  }
}
</style>
