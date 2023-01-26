<template>
  <div class="descr">
    <div class="title">
      {{ value.title }}
    </div>
    <div class="value">
      {{ value.value }}
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
  align-items: stretch;
  white-space: nowrap;

  & > div {
    border-bottom: 1px solid #d6e2f0;
  }
  & .title {
    flex-basis: 60%;
    font-weight: 300;
    font-size: 12px;
    line-height: 14px;
    color: #9c9c9c;

    &::first-letter {
      text-transform: capitalize;
    }
  }

  & .value {
    flex-grow: 1;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #000000;

    & span {
      display: inline-block;
      text-transform: uppercase;
    }
  }
}
@media only screen and (max-width: 600px) {
  .descr {
    & .title {
      font-size: 12px;
      line-height: 14px;
    }
    & .value {
      font-size: 14px;
      line-height: 16px;
    }
  }
}
</style>
