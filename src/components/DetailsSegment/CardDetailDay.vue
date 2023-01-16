<template>
  <div>
    <div :class="['card-content', { weekend: value.weekend === true }]">
      <div class="card-content-date">
        <div class="date-text-short">
          <div>{{ value.weekday[0] }}</div>
          <div>{{ value.date[0] }}</div>
        </div>
        <div class="date-text-long">
          <span
            ><b>{{ value.weekday[1] }}</b></span
          >
          <span>&nbsp; {{ value.date[1] }}</span>
        </div>
      </div>
      <div class="card-content-condition">
        <div>
          <BaseIcon :name="value.condition" pick="light" width="40" />
        </div>
        <div class="card-content-text">
          <div class="card-content-title">
            {{ value.condition_s }}
          </div>
          <div class="card-content-precip">
            <span>{{ value.precProb.title }}:</span>
            {{ value.precProb.value }}
          </div>
        </div>
      </div>
      <div class="card-content-temp">
        <span>{{ value.temp.min }}/</span>{{ value.temp.max }}
      </div>
      <div class="card-content-info">
        <CardDetailDayItem
          v-for="(item, index) in items"
          :key="`cn-${index}`"
          :value="value[item]"
        />
      </div>
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
            value.dayLength.daytime.value
          }}
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
  display: grid;
  grid-template-columns: 0.2fr 1fr 0.4fr 1fr 0.3fr;
  column-gap: 10px;
  align-items: center;
  border: 1px solid #d6e2f0;
  margin-top: 12px;
  padding: 0 9px 0 20px;
  height: 72px;

  &.weekend .date-text-short > div:first-child {
    color: #ff1616;
  }
}
.card-content-condition {
  display: flex;
  column-gap: 12px;
}

.card-content-temp {
  justify-self: end;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
  color: #333333;
  & > span {
    font-weight: 300;
  }
}

.date-text-long {
  display: none;

  &::first-letter {
    text-transform: capitalize;
  }
}

.card-content-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  row-gap: 4px;

  & .card-content-title {
    min-width: 125px;
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    color: #000000;
  }

  & .card-content-title::first-letter {
    text-transform: capitalize;
  }

  & .card-content-precip {
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    white-space: nowrap;
    color: #000000;

    & > span {
      font-weight: 300;
      font-size: 10px;
      line-height: 12px;
      color: #9c9c9c;
    }
  }

  & .card-content-precip::first-letter {
    text-transform: capitalize;
  }
}

.card-content-info {
  display: flex;
  justify-content: space-between;
  column-gap: 8px;
}

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

.card-content-date {
  justify-self: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
}
.card-content-date > div {
  text-align: center;
}
.card-content-date > div:first-child {
  text-transform: uppercase;
  font-size: 16px;
  line-height: 21px;
}

@media only screen and (max-width: 450px) {
  .card-content-date {
    grid-area: a;
  }
  .day-length-block {
    grid-area: b;
  }
  .card-content-condition {
    grid-area: c;
  }
  .card-content-temp {
    grid-area: d;
  }
  .card-content-info {
    grid-area: e;
  }
  .card-content {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-template-areas:
      "a b"
      "c d"
      "e e";
    height: auto;

    & .date-text-long {
      display: block;
    }

    & .date-text-short {
      display: none;
    }
  }
}
</style>
