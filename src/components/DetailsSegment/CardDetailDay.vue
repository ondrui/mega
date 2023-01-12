<template>
  <div>
    <div :class="['card-content', { weekend: value.weekend === true }]">
      <div class="card-content-left">
        <div class="card-content-left-date">
          <div>{{ value.weekday[0] }}</div>
          <div>{{ value.date[0] }}</div>
        </div>
        <div>
          <BaseIcon :name="value.condition" pick="light" width="40" />
        </div>
        <div class="card-content-left-text">
          <div class="card-content-left-condition">{{ value.condition_s }}</div>
          <div class="card-content-left-precip">
            <span>{{ value.precProb.title }}</span>
            {{ value.precProb.value }}
          </div>
        </div>
        <div class="card-content-left-temp">
          <span>{{ value.temp.min }}/</span>{{ value.temp.max }}
        </div>
      </div>
      <div class="card-content-right">
        <CardDetailDayItem
          v-for="(item, index) in items"
          :key="`cn-${index}`"
          :value="value[item]"
        />
        <div class="day-length-block">
          <div>
            <BaseIcon name="sun-2" pick="common" width="11" />
            <BaseIcon name="arrow-up" pick="common" width="5" />
            {{ value.dayLength.sunrise }}
            <BaseIcon name="arrow-down" pick="common" width="5" />
            {{ value.dayLength.sunset }}
          </div>
          <div>
            <span>{{ value.dayLength.daytime.title }}</span
            >{{ value.dayLength.daytime.value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { languageExpressions } from "@/constants/locales";
import CardDetailDayItem from "./CardDetailDayItem.vue";

export default {
  components: {
    CardDetailDayItem,
  },
  props: ["value"],
  data() {
    return {
      items: ["pressure", "humidity", "wind", "uvi"],
    };
  },
  computed: {
    getLocales() {
      return this.$store.getters.getLocales;
    },
    forecastForItemHeader() {
      return this.$store.getters.forecastForItemHeader;
    },
    current() {
      return this.$store.getters.current;
    },
  },
  methods: {
    languageExpressions,
  },
};
</script>

<style lang="scss" scoped>
.card-content {
  display: flex;
  column-gap: 33px;
  flex-wrap: nowrap;
  border: 1px solid #d6e2f0;
  margin-top: 12px;
  padding: 0 9px 0 20px;

  &.weekend .card-content-left-date > div:first-child {
    color: #ff1616;
  }
}
.card-content-left {
  display: flex;
  align-items: center;

  & .card-content-left-temp {
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    color: #333333;
    & > span {
      font-weight: 300;
    }
  }

  & .card-content-left-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    row-gap: 4px;
    width: 180px;
    padding-left: 15px;

    & .card-content-left-condition {
      font-weight: 400;
      font-size: 10px;
      line-height: 12px;
      color: #000000;
    }

    & .card-content-left-condition::first-letter {
      text-transform: capitalize;
    }

    & .card-content-left-precip {
      font-weight: 400;
      font-size: 10px;
      line-height: 12px;
      color: #000000;

      & > span {
        font-weight: 300;
        font-size: 10px;
        line-height: 12px;
        color: #9c9c9c;
      }
    }

    & .card-content-left-precip::first-letter {
      text-transform: capitalize;
    }
  }
}
.card-content-right {
  display: flex;
  flex: 1;
  column-gap: 8px;
  justify-content: space-between;
  align-items: center;

  & .day-length-block {
    display: flex;
    flex-direction: column;
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    color: #333333;
  }
}
.card-content-left-date {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 0 13px 0;
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
}
.card-content-left-date > div {
  text-align: center;
}
.card-content-left-date > div:first-child {
  text-transform: uppercase;
  font-size: 16px;
  line-height: 21px;
}
</style>
