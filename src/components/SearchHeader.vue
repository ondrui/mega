<template>
  <div class="search-header">
    <input
      type="text"
      class="input-search-header"
      placeholder=""
      v-model="searchQuery"
    />
    <div class="search-icon-container">
      <BaseIcon name="search" pick="common" width="23" class="search-icon" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "Луховицы",
    };
  },
};
</script>

<style lang="scss">
.search-header {
  position: relative;
  margin-bottom: 26px;
}
.input-search-header {
  height: 50px;
  width: 100%;
  padding-left: 13px;
  background-color: #f0f7fc;
  border: 1px solid #b2d3e8;
  border-radius: 4px;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #04569c;
}

.search-icon-container {
  position: absolute;
  right: 13px;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>
