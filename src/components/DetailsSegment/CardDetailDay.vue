<template>
  <div>
    <div
      @click="toggle(index)"
      :class="['card-content', { weekend: value.weekend === true }]"
    >
      <div class="card-content__date">
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
      <div class="card-content__condition">
        <div>
          <BaseIcon :name="value.condition" pick="light" width="40" />
        </div>
        <div class="card-content__text">
          <div>
            {{ value.condition_s }}
          </div>
          <div>
            <span>{{ value.precProb.title }}:</span>
            {{ value.precProb.value }}
          </div>
        </div>
      </div>
      <div class="card-content__temp">
        <span>{{ value.temp.min }}/</span>{{ value.temp.max }}
      </div>
      <div class="card-content__info">
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
import CardDetailDayItem from "./CardDetailDayItem.vue";

export default {
  components: {
    CardDetailDayItem,
  },
  props: ["value", "index"],
  data() {
    return {
      items: ["pressure", "humidity", "wind", "uvi"],
    };
  },
  methods: {
    toggle(index) {
      this.$store.commit("toggleDetails", index + 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.card-content {
  display: grid;
  grid-template-columns: 0.2fr 1fr 0.4fr 1fr 0.3fr;
  // grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  column-gap: 15px;
  align-items: center;
  border: 1px solid #d6e2f0;
  margin-top: 12px;
  padding: 0 9px 0 20px;
  height: 72px;
  cursor: pointer;
}
.weekend .date-text-short > div:first-child {
  color: #ff1616;
}
.weekend .date-text-long > span:first-child {
  color: #ff1616;
}
.card-content__condition {
  display: flex;
  column-gap: 12px;
}
.card-content__temp {
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
.card-content__text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  row-gap: 4px;

  & > div:first-child {
    min-width: 125px;
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    color: #000000;
  }

  & > div:first-child::first-letter {
    text-transform: capitalize;
  }

  & > div:last-child {
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

  & > div:last-child::first-letter {
    text-transform: capitalize;
  }
}
.card-content__info {
  display: flex;
  justify-content: space-between;
  column-gap: 8px;
  // padding: 0 10px;
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
.card-content__date {
  justify-self: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
}
.card-content__date > div {
  text-align: center;
}
.card-content__date > div:first-child {
  text-transform: uppercase;
  font-size: 16px;
  line-height: 21px;
}

@media only screen and (max-width: 450px) {
  .card-content__date {
    display: block;
    grid-area: a;
    justify-self: start;

    & > div {
      text-align: start;
    }
  }
  .day-length-block {
    grid-area: b;
    justify-self: end;
    font-size: 14px;
    line-height: 16px;

    & span {
      font-size: 14px;
      line-height: 16px;
    }
  }
  .card-content__condition {
    grid-area: c;
    padding-bottom: 10px;
    padding-top: 5px;

    & svg {
      width: 50px;
    }
  }
  .card-content__temp {
    grid-area: d;
    font-size: 32px;
    line-height: 38px;
  }
  .card-content__info {
    grid-area: e;
    padding-top: 15px;
    border-top: 1px solid #d6e2f0;
  }
  .card-content {
    grid-template-columns: 2fr 1fr;
    column-gap: 5px;
    // grid-template-rows: repeat(3, 1fr);
    grid-template-areas:
      "a b"
      "c d"
      "e e";
    height: auto;
    padding: 11px 15px 19px 15px;
  }
  .date-text-long {
    display: block;
    font-size: 16px;
    line-height: 21px;
    white-space: nowrap;

    & > span:first-child {
      font-weight: 500;
    }

    & > span:last-child {
      font-weight: 300;
    }
  }
  .date-text-short {
    display: none;
  }
  .card-content__text {
    & > div:first-child {
      // min-width: 125px;
      font-weight: 300;
      font-size: 14px;
      line-height: 17px;
    }

    & > div:last-child {
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      white-space: nowrap;

      & > span {
        font-weight: 300;
        font-size: 14px;
        line-height: 16px;
      }
    }

    & > div:last-child::first-letter {
      text-transform: capitalize;
    }
  }
}
</style>
