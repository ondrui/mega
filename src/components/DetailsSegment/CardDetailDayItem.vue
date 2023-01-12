<template>
  <div class="descr">
    <div class="value">
      {{ value.value }}
    </div>
    <div class="title">
      {{ value.title }}
    </div>
  </div>
</template>

<script>
export default {
  props: ["value"],
};
</script>

<style lang="scss" scoped>
.descr {
  display: flex;
  flex-direction: column;
  padding-left: 6px;
  justify-content: center;
  row-gap: 2px;
  white-space: nowrap;

  & .title {
    font-weight: 300;
    font-size: 10px;
    line-height: 12px;
    color: #9c9c9c;

    &::first-letter {
      text-transform: capitalize;
    }
  }

  & .value {
    font-weight: 300;
    font-size: 12px;
    line-height: 14px;
    color: #000000;

    & span {
      display: inline-block;
      text-transform: uppercase;
    }
  }
}
</style>
