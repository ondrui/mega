<template>
  <div class="details-row-caption">
    <slot />
  </div>
</template>

<style lang="scss">
.details-row-caption {
  position: absolute;
  z-index: 11;
  background: #f5f5f5;
  border-radius: 4px;
  font-weight: 300;
  font-size: 10px;
  line-height: 14px;
  padding: 0 4px;
  color: #333333;
  white-space: nowrap;
  left: 6px;
}
</style>
