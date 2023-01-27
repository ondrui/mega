<template>
  <div class="day-length-block">
    <div class="time">{{ value.dayLength.sunrise }}</div>
    <div class="icon">
      <BaseIcon name="sunrise-1" pick="common" width="20" />
    </div>
    <div class="line"></div>
    <div class="day-length">{{ value.dayLength.daytime.value }}</div>
    <div class="line"></div>
    <div class="icon">
      <BaseIcon name="sunset-1" pick="common" width="20" />
    </div>
    <div class="time">{{ value.dayLength.sunset }}</div>
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
  align-items: center;
  justify-content: space-between;
  padding-top: 2px;
}
.time {
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;

  color: #4d4d4d;
}
.line {
  flex-grow: 1;
  width: 1px;
  border-bottom: 1px dashed #8797a5;
}
.icon {
  display: flex;
  align-items: center;
  padding: 0 4px;
}
.day-length {
  padding: 0 4px;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  color: #4d4d4d;
}
@media only screen and (max-width: 600px) {
}
</style>
