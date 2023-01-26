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
          <BaseIcon :name="value.condition" pick="light" width="46" />
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
        <span>{{ value.temp.max }}</span
        >/{{ value.temp.min }}
      </div>
      <div class="exp-1">
        <div class="exp">llll</div>
        <div class="card-content__info">
          <CardDetailDayItem
            v-for="(item, index) in items"
            :key="`cn-${index}`"
            :value="value[item]"
          />
        </div>
      </div>
      <DayLengthBlock class="length-block-mob" :value="value" />
    </div>
  </div>
</template>

<script>
import CardDetailDayItem from "./CardDetailDayItem.vue";
import DayLengthBlock from "./DayLengthBlock.vue";

export default {
  components: {
    CardDetailDayItem,
    DayLengthBlock,
  },
  props: ["value", "index"],
  data() {
    return {
      items: ["wind", "humidity", "wind_gust", "uvi", "pressure", "comf_idx"],
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
.exp {
  border: 1px solid teal;
}
.exp-1 {
  display: grid;
}
.length-block-mob {
  display: none;
}
.card-content {
  display: grid;
  grid-template-columns: 0.2fr 0.6fr 0.4fr 1.2fr;
  column-gap: 15px;
  align-items: center;
  border: 1px solid #d6e2f0;
  padding: 0 9px 0 20px;
  cursor: pointer;
  background-color: #f0f7fc;
}
.date-text-short > div:first-child {
  text-transform: uppercase;
  font-weight: 500;
  font-size: 20px;
  line-height: 27px;
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
.card-content__text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-self: center;
  row-gap: 4px;

  & > div:first-child {
    min-width: 125px;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #000000;
  }

  & > div:first-child::first-letter {
    text-transform: capitalize;
  }

  & > div:last-child {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    white-space: nowrap;
    color: #000000;

    & > span {
      font-weight: 300;
      font-size: 12px;
      line-height: 14px;
      color: #9c9c9c;
    }
  }

  & > div:last-child::first-letter {
    text-transform: capitalize;
  }
}
.card-content__temp {
  justify-self: end;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  color: #333333;
  & > span {
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
  }
}
.date-text-long {
  display: none;

  &::first-letter {
    text-transform: capitalize;
  }
}
.card-content__info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 24px);
  column-gap: 14px;
  align-self: stretch;
  align-items: center;
}
.card-content__date {
  justify-self: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 14px;
  line-height: 19px;
}
.card-content__date > div {
  text-align: center;
}

@media only screen and (max-width: 600px) {
  .exp {
    display: none;
  }
  .exp-1 {
    grid-area: e;
  }
  .card-content__date {
    display: block;
    grid-area: a;
    justify-self: start;

    & > div {
      text-align: start;
    }
  }
  .length-block {
    display: none;
  }
  .length-block-mob {
    display: block;
    grid-area: b;
    justify-self: end;
    font-size: 14px;
    line-height: 16px;
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
