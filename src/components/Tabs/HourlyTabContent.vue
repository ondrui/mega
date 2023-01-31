<template>
  <div>
    <div ref="hourly-tab-container" class="hourly-tab-container">
      <div class="scroll-button-container">
        <button
          :class="['btn', { hidden: side === 'left' }]"
          @click="scroll('left')"
        >
          <BaseIcon width="7" name="chevron-scroll-left" pick="common" />
        </button>
        <button
          :class="['btn', { hidden: side === 'right' }]"
          @click="scroll('right')"
        >
          <BaseIcon width="7" name="chevron-scroll-right" pick="common" />
        </button>
      </div>
      <RowCaption class="wind">
        {{
          languageExpressions(getLocales, "climateIndicators", "windDirSpeed")
        }}
      </RowCaption>
      <RowCaption class="pressure">
        {{ languageExpressions(getLocales, "climateIndicators", "pressure") }},
        {{ languageExpressions(getLocales, "units", "pressure")[0] }}
      </RowCaption>
      <RowCaption class="humidity">
        {{ languageExpressions(getLocales, "climateIndicators", "humidity") }}
      </RowCaption>
      <div class="swiper-container" ref="swiper-container">
        <div
          :class="['swiper-wrapper', { grabbing: dragMouseScroll.isDown }]"
          @mousedown.prevent="mouseDown"
          @mouseleave="mouseLeave"
          @mouseup="mouseUp"
          @mousemove.prevent="mouseMove"
          ref="swiper-wrapper"
        >
          <div class="hourly-charts-temp">
            <ChartHourlyTempList :datasets="datasetsForHourlyCharts" />
          </div>
          <div
            class="date-container"
            v-for="(date, indexParent) in hourlyTabTable"
            :key="`d-${indexParent}`"
          >
            <div class="day-length-chart">
              <DayLengthChart :datasets="date" />
            </div>
            <div class="date-header">
              <div class="date-text">
                <span
                  ><b>{{ date.date[0] }}</b></span
                >
                <span>&nbsp; {{ date.date[1] }}</span>
              </div>
            </div>
            <div class="hourly-data-container">
              <div
                class="hourly-item"
                v-for="(value, index) in date.values"
                :key="`h-${index}`"
                :ref="addRef(indexParent, index, hourlyTabTable, date.values)"
              >
                <div class="time">{{ value.hour }}</div>
                <div class="day-length"></div>
                <div class="hourly-icon">
                  <BaseIcon
                    width="34"
                    :name="value.condition"
                    :pick="value.light"
                  />
                </div>
                <div class="hourly-temp-item"></div>
                <div class="hourly-wind-descr">
                  <div>
                    <div>
                      <BaseIcon
                        width="8"
                        name="wind-direction-blue"
                        pick="common"
                        :transform="windDirection(getLocales, value)"
                      />
                    </div>
                    <span>{{ value.wind_dir[1] }}</span>
                  </div>
                  <div>{{ value.wind_speed }}</div>
                </div>
                <div class="hourly-pressure">
                  {{ value.pressure }}
                </div>
                <div class="hourly-day-humidity">
                  {{ value.humidity }}{{ value.humidity.unit }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChartHourlyTempList from "../SVGCharts/hourly/ChartHourlyTempList.vue";
import DayLengthChart from "../SVGCharts/hourly/DayLengthChart.vue";
import RowCaption from "@/components/RowCaption.vue";
import { languageExpressions } from "@/constants/locales";
import { windDirection } from "@/constants/functions";

export default {
  components: {
    ChartHourlyTempList,
    RowCaption,
    DayLengthChart,
  },
  data() {
    return {
      side: "left",
      observer: null,
      dragMouseScroll: {
        isDown: false,
        startX: 0,
        scrollLeft: 0,
      },
      momentum: {
        velX: 0,
        momentumID: null,
      },
    };
  },
  mounted() {
    this.observer = new IntersectionObserver(this.observerCallback, {
      root: this.$refs["swiper-container"],
      threshold: 0.99,
    });
    const coolElement = this.$refs["item"];
    coolElement.forEach((elem) => this.observer.observe(elem));
  },
  beforeDestroy() {
    this.observer.disconnect();
  },
  computed: {
    datasetsForHourlyCharts() {
      return this.$store.getters.datasetsForHourlyCharts;
    },
    hourlyTabTable() {
      return this.$store.getters.hourlyTabTable;
    },
    getLocales() {
      return this.$store.getters.getLocales;
    },
    scrollSize() {
      return (
        (this.$refs["swiper-wrapper"].clientWidth /
          this.datasetsForHourlyCharts.data[0].value.length) *
        3
      );
    },
  },
  methods: {
    languageExpressions,
    windDirection,
    addRef(indexParent, index, arrParent, arr) {
      return (+indexParent === 0 && index === 0) ||
        (+indexParent === Object.keys(arrParent).length - 1 &&
          index === arr.length - 1)
        ? "item"
        : null;
    },
    observerCallback([entry]) {
      const firstItem = this.$refs.item[0];
      if (entry.isIntersecting && entry.intersectionRatio >= 0.9) {
        entry.target === firstItem
          ? (this.side = "left")
          : (this.side = "right");
      } else {
        this.side = "";
      }
    },
    scroll(direction) {
      this.$refs["swiper-container"].scrollBy({
        left: direction === "right" ? this.scrollSize : -this.scrollSize,
        behavior: "smooth",
      });
    },
    mouseDown(event) {
      this.dragMouseScroll.isDown = true;
      this.dragMouseScroll.startX =
        event.pageX - this.$refs["swiper-container"].offsetLeft;
      this.dragMouseScroll.scrollLeft =
        this.$refs["swiper-container"].scrollLeft;
      this.cancelMomentumTracking();
    },
    mouseLeave() {
      this.dragMouseScroll.isDown = false;
    },
    mouseUp() {
      this.dragMouseScroll.isDown = false;
      this.beginMomentumTracking();
    },
    mouseMove(event) {
      if (!this.dragMouseScroll.isDown) return;
      const x = event.pageX - this.$refs["swiper-container"].offsetLeft;
      const walk = x - this.dragMouseScroll.startX;
      let prevScrollLeft = this.$refs["swiper-container"].scrollLeft;
      this.$refs["swiper-container"].scrollLeft =
        this.dragMouseScroll.scrollLeft - walk;
      this.momentum.velX =
        this.$refs["swiper-container"].scrollLeft - prevScrollLeft;
    },
    beginMomentumTracking() {
      this.cancelMomentumTracking();
      this.momentummomentumID = requestAnimationFrame(this.momentumLoop);
    },
    cancelMomentumTracking() {
      cancelAnimationFrame(this.momentum.momentumID);
    },
    momentumLoop() {
      if (this.$refs["swiper-container"]) {
        this.$refs["swiper-container"].scrollLeft += this.momentum.velX * 2;
        this.momentum.velX *= 0.95;
        if (Math.abs(this.momentum.velX) > 0.5) {
          this.momentum.momentumID = requestAnimationFrame(this.momentumLoop);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.hourly-tab-container {
  position: relative;
  background-color: #ffffff;
  border: 1px solid #d8e9f3;
}
.swiper-container {
  display: flex;
  max-width: 100%;
  overflow-y: hidden;
  overflow-x: auto;
  position: relative;
}
.swiper-wrapper {
  display: flex;
  position: relative;
  cursor: grab;

  &.grabbing {
    cursor: grabbing;
  }
}
.date-container {
  position: relative;
  display: flex;
  flex-direction: column;
  border-right: 2px solid #d8e9f3;
}
.date-text {
  position: sticky;
  left: 0;
  top: 0;
  display: inline;
  padding: 0 13px;
}
.date-header {
  white-space: nowrap;
  padding: 9px 0;
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
  color: #333333;

  &::first-letter {
    text-transform: capitalize;
  }
}
.date-container:last-child .date-header {
  border-right: none;
}
.hourly-data-container {
  display: flex;

  & .hourly-item {
    border-top: 1px solid #d8e9f3;
    border-bottom: 1px solid #d8e9f3;
    border-right: 1px solid #d8e9f3;

    &:last-child {
      border-right: none;
    }
    width: 56px;
    & > div {
      border-bottom: 1px solid #d8e9f3;
      position: relative;

      &:last-child,
      &:nth-child(2),
      &:nth-child(3) {
        border-bottom: none;
      }
    }
  }
}
.date-container:last-child,
.date-container:last-child .hourly-item:last-child {
  border-right: none;
}
.date-container .hourly-item:first-child {
  border-left: none;
}
.time {
  height: 33px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  font-size: 12px;
  line-height: 16px;
  color: #333333;
}
.day-length {
  height: 30px;
}
.hourly-temp-item {
  height: 180px;
}
.hourly-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 60px;
  align-items: center;
}
.wind {
  top: 330px;
}
.pressure {
  top: 384px;
}
.humidity {
  top: 419px;
}
.hourly-charts-temp {
  position: absolute;
  top: 146px;
  width: 100%;
  height: 170px;
  z-index: 10;
}
.day-length-chart {
  position: absolute;
  top: 68px;
  width: 100%;
  height: 30px;
  z-index: 10;
}
.hourly-wind-descr {
  height: 53px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  color: #333333;

  & span {
    text-transform: uppercase;
    padding-left: 1px;
  }

  & > div:first-child {
    display: flex;
    column-gap: 3px;
  }
}
.hourly-pressure,
.hourly-day-humidity {
  height: 36px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  font-size: 12px;
  line-height: 14px;
  color: #333333;
}

.scroll-button-container {
  position: absolute;
  top: calc(50% - 18px);
  left: 18px;
  width: calc(100% - 36px);
  display: flex;
  justify-content: space-between;
  & .btn {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 20;
    visibility: visible;
    pointer-events: auto;
    background-color: rgba(29, 125, 188, 0.08);
    border: none;
    border-radius: 50px;
    cursor: pointer;
    width: 36px;
    height: 36px;
    touch-action: manipulation;
    transition: all 0.5s;

    &:hover {
      background-color: rgba(29, 125, 188, 0.16);
    }

    &:active {
      background-color: rgba(29, 125, 188, 0.24);
    }

    &.hidden {
      visibility: hidden;
      opacity: 0;
      cursor: auto;
      // transition: opacity 0.3s, visibility 0.3s;
      transition: all 0.5s;
    }
  }
}

.adjust {
  position: absolute;
  left: 0;
}

@media only screen and (max-width: 450px) {
  .hourly-icon svg {
    width: 30px;
  }
}
</style>
