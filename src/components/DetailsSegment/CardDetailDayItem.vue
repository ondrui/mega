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
  align-items: center;
  white-space: nowrap;
  border-top: 1px solid #d6e2f0;

  &:nth-child(-n + 2) {
    border: none;
  }

  &:nth-child(even) .value {
    padding-left: 15px;
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
      flex-basis: 70%;
      font-size: 14px;
      line-height: 16px;
    }
    & .value {
      min-width: 56px;
      font-size: 14px;
      line-height: 16px;
    }
  }
}
</style>
