<template>
  <div class="breadcrumbs-header">
    <div class="crumbs">
      <div v-for="(item, index) in crumbs" :key="item">
        <a v-if="isLast(index)" href="#">{{ item }}</a>
        <span v-else>{{ item }}</span>
        <BaseIcon
          name="chevron-breadcrumb-right"
          width="5"
          pick="common"
          v-if="isLast(index)"
          class="breadcrumbs-chevron"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { languageExpressions } from "@/constants/locales";
export default {
  data() {
    return {
      /**
       * Массив содержит имена ссылок.
       */
      crumbs: [],
    };
  },
  mounted() {
    /**
     * Задоем имена ссылок.
     */
    this.breadcrumbs("breadcrumbs", ["main", "weather", "city"]);
  },
  computed: {
    /**
     * Возвращает языковую метку для определения локали.
     * @example "ru"
     */
    getLocales() {
      return this.$store.getters.getLocales;
    },
  },
  methods: {
    /**
     * Возвращает строковые константы с учетом локали.
     */
    languageExpressions,
    /**
     * По условию отображает элемент ссылка.
     */
    isLast(index) {
      return index !== this.crumbs.length - 1;
    },
    /**
     * Функция для создания массива с именами ссылок.
     * @param key Ключ 1-го уровнядля объекта со строковыми константами.
     * @param arr Массив с ключами 2-го уровня для объекта со строковыми константами.
     */
    breadcrumbs(key, arr) {
      arr.forEach((element) => {
        this.crumbs.push(languageExpressions(this.getLocales, key, element));
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.breadcrumbs-header {
  display: flex;
  align-items: center;
  margin-bottom: 22px;
}

.crumbs {
  display: flex;
  align-items: center;
  max-width: 950px;
  min-width: max-content;
  width: 100%;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;

  & div::first-letter {
    text-transform: capitalize;
  }

  & a {
    color: #04569c;
  }

  & span {
    color: #9c9c9c;
  }

  & .breadcrumbs-chevron,
  & a {
    margin-right: 8px;
  }
}

@media only screen and (max-width: 600px) {
  .breadcrumbs-header {
    margin-bottom: 16px;
  }
}
</style>
