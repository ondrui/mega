<template>
  <div class="segment-container">
    <h1 class="segment-title">
      {{ languageExpressions(getLocales, "detailsSegmentTitle").slice(0, 39)
      }}{{ tenDaysDetailsCard.length
      }}{{
        languageExpressions(getLocales, "detailsSegmentTitle").slice(38, 43)
      }}
    </h1>
    <div
      ref="item"
      :class="['wrapper-list', { open: isOpen(index) }]"
      v-for="(item, index) in tenDaysDetailsCard"
      :key="`s-${index}`"
      tabindex="0"
    >
      <CardDetailDay class="card" :value="item" :index="index" />
      <Transition>
        <ContentDetailDay
          v-if="isOpen(index)"
          :data="tenDaysDetailsChart[`${index + 1}`]"
        />
      </Transition>
    </div>
  </div>
</template>

<script>
import { languageExpressions } from "@/constants/locales";
import CardDetailDay from "./CardDetailDay.vue";
import ContentDetailDay from "./ContentDetailDay.vue";

export default {
  components: {
    CardDetailDay,
    ContentDetailDay,
  },
  watch: {
    /**
     * Следим за изменениями в массиве с карточками - полем isOpen.
     */
    tenDaysDetailsCard() {
      this.focus();
    },
  },
  computed: {
    getLocales() {
      return this.$store.getters.getLocales;
    },
    tenDaysDetailsCard() {
      return this.$store.getters.tenDaysDetailsCard;
    },
    tenDaysDetailsChart() {
      return this.$store.getters.tenDaysDetailsChart;
    },
  },
  methods: {
    languageExpressions,
    /**
     * Устанавливаем фокус на выбранный элемент и скролим до него.
     */
    focus() {
      const index = this.tenDaysDetailsCard.findIndex((i) => i.isOpen === true);
      // if (index !== -1) this.$refs.item[index].focus();
      if (index !== -1)
        this.$refs.item[index].scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
    },
    /**
     * Отображает график и рамку вокруг элемента если свойство isOpen равно true.
     */
    isOpen(index) {
      return this.tenDaysDetailsCard[index].isOpen === true;
    },
  },
};
</script>

<style lang="scss" scoped>
.segment-container {
  padding: 30px 32px 42px 32px;
}
.segment-title {
  padding-left: 26px;
  font-weight: 300;
  font-size: 20px;
  line-height: 23px;
  color: #333333;

  &::first-letter {
    text-transform: capitalize;
  }
}
.wrapper-list {
  position: relative;
  margin-top: 12px;
}
.wrapper-list:nth-child(-n + 11) .card {
  transition: box-shadow 0.3s ease-in-out;
  cursor: pointer;
}
.wrapper-list:nth-child(-n + 11) .card:hover {
  box-shadow: 0 0 0 2px #d2e7ff;
  border-radius: 1px;
}
.card:hover::after {
  transform: scale(2);
}
.wrapper-list:nth-child(-n + 11) .card::after {
  content: "";
  display: inline-block;
  background: url("@/assets/images/common/chevron-more-down.svg?external")
    no-repeat;
  background-size: 6px 4px;
  transition: transform 0.3s ease-in-out;
  width: 6px;
  height: 4px;
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  // left: 50%;
  bottom: 6px;
}
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: all 0.7s ease;
}

.v-enter-to,
.v-leave {
  max-height: 500px;
}

.v-enter,
.v-leave-to {
  position: relative;
  opacity: 0;
  max-height: 0;
  overflow: hidden;
}
.open {
  // border: 2px solid #d2e7ff;
  box-shadow: 0 0 0 2px #d2e7ff;
  border-radius: 1px;
}

@media only screen and (max-width: 700px) {
  .segment-container {
    padding: 30px 8px 23px 8px;
  }
}
@media only screen and (max-width: 600px) {
  .card::after {
    content: "";
    bottom: 12px;
  }
}
</style>
