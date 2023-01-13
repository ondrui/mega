<template>
  <div>
    <div :class="['card-content', { weekend: value.weekend === true }]">
      <div class="card-content-left">
        <div class="card-content-left-date">
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
        <div class="card-content-left-condition">
          <div>
            <BaseIcon :name="value.condition" pick="light" width="40" />
          </div>
          <div class="card-content-left-text">
            <div class="card-content-left-title">
              {{ value.condition_s }}
            </div>
            <div class="card-content-left-precip">
              <span>{{ value.precProb.title }}:</span>
              {{ value.precProb.value }}
            </div>
          </div>
        </div>
        <div class="card-content-left-temp">
          <span>{{ value.temp.min }}/</span>{{ value.temp.max }}
        </div>
      </div>
      <div class="card-content-right">
        <div class="card-content-right-props">
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
  justify-content: space-between;
  flex-wrap: nowrap;
  border: 1px solid #d6e2f0;
  margin-top: 12px;
  padding: 0 9px 0 20px;
  height: 72px;

  &.weekend .date-text-short > div:first-child {
    color: #ff1616;
  }
}
.card-content-left {
  display: flex;
  justify-content: start;
  align-items: center;
  flex: 1;

  & .card-content-left-condition {
    display: flex;
    column-gap: 12px;
    width: 60%;
    padding-right: 10px;
  }

  & .card-content-left-temp {
    margin-left: auto;
    font-weight: 400;
    font-size: 24px;
    line-height: 28px;
    color: #333333;
    & > span {
      font-weight: 300;
    }
  }

  & .date-text-long {
    display: none;

    &::first-letter {
      text-transform: capitalize;
    }
  }

  & .card-content-left-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-self: center;
    row-gap: 4px;

    & .card-content-left-title {
      font-weight: 400;
      font-size: 10px;
      line-height: 12px;
      color: #000000;
    }

    & .card-content-left-title::first-letter {
      text-transform: capitalize;
    }

    & .card-content-left-precip {
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

    & .card-content-left-precip::first-letter {
      text-transform: capitalize;
    }
  }
}
.card-content-right {
  display: flex;
  flex: 1;
  column-gap: 20px;
  justify-content: space-between;
  align-items: center;

  .card-content-right-props {
    display: flex;
    justify-content: space-between;
    flex: 1;
  }

  & .day-length-block {
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
}
.card-content-left-date {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
  padding-right: 20px;
}
.card-content-left-date > div {
  text-align: center;
}
.card-content-left-date > div:first-child {
  text-transform: uppercase;
  font-size: 16px;
  line-height: 21px;
}

@media only screen and (max-width: 700px) {
  .card-content-left,
  .card-content-right {
    display: block;
  }
  .card-content-left-date {
    grid-area: a;
  }
  .day-length-block {
    grid-area: b;
  }
  .card-content-left-condition {
    grid-area: c;
  }
  .card-content-left-temp {
    grid-area: d;
  }
  .card-content-right-props {
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
