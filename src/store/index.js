import Vue from "vue";
import Vuex from "vuex";
// import { languageExpressions } from "@/constants/locales";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locales: "ru",
  },
  getters: {
    getLocales(state) {
      return state.locales;
    },
    current: () => {
      return {
        currDateDescr: "сейчас в 15:38 по прогнозу ",
        icon: "partly-cloudy_rain_0",
        descr: "переменная облачность небольшой дождь",
        temp: {
          value: "-3",
          unit: "°",
        },
        realFeel: {
          value: "-4",
          title: "ощущается",
        },
        pressure: {
          icon: "pressure",
          title: "давление",
          value: "755",
          unit: " мм.рт.ст.",
        },
        wind: {
          icon: "wind-direction",
          title: "ветер",
          value: "4",
          unit: " м/c",
          direction: "e",
        },
        windGust: {
          icon: "wind-gust",
          title: "порывы ветра",
          value: "14",
          unit: " м/с",
          direction: "e",
        },
        humidity: {
          icon: "humidity",
          title: "влажность",
          value: "65",
          unit: "%",
        },
      };
    },
    nowcast() {
      return {
        icon: "mainly-clear_rain_1_thunderstorm_1",
        descr: "переменная облачность небольшой дождь",
        temp: "14°",
        realFeel: "14°",
      };
    },
    forecastForItemHeader() {
      return [
        {
          icon: "wind-direction",
          title: "ветер:",
          value: "4 м/c",
          direction: "e",
        },
        {
          icon: "wind-gust",
          title: "порывы ветра:",
          value: "14 м/c",
          direction: "e",
        },
        {
          icon: "pressure",
          title: "давление:",
          value: "755 мм.рт.ст.",
        },
        {
          icon: "humidity",
          title: "влажность:",
          value: "65%",
        },
      ];
    },
    forecastTenBasic: (state) => {
      state;
      return {
        weekday: "пн",
        date: "21.09",
        iconCode: "cloudy_snow_0",
        temp: {
          min: "11",
          max: "18",
          unit: "°",
        },
        precSum: {
          title: "кол-во осадков",
          value: "3",
          unit: "мм",
        },
        wind: {
          title: "направление и скорость ветра",
          value: "4",
          unit: "м/c",
          direction: "e",
        },
        pressure: {
          title: "давление",
          value: "755",
          unit: "мм.рт.ст.",
        },
        humidity: {
          title: "влажность",
          value: "65",
          unit: "%",
        },
      };
    },
    forecastTenDeepHeader: (state) => {
      state;
      return {
        weekday: "пн",
        date: "21.09",
        iconCode: "cloudy_snow_0",
        descr: "переменная облачность небольшой дождь",
        precProb: {
          title: "вер. осадков:",
          value: "10",
          unit: "%",
        },
        temp: {
          min: "11",
          max: "18",
          unit: "°С",
        },
        pressure: {
          title: "давление",
          value: "755",
          unit: "мм.рт.ст.",
        },
        humidity: {
          title: "влажность",
          value: "65",
          unit: "%",
        },
        wind: {
          title: "ветер",
          value: "4",
          unit: "м/c",
          direction: "e",
        },
        uvi: {
          title: "уфи",
          value: "3",
        },
        sun: {
          rise: "08:19",
          set: "19:00",
          dayLength: {
            title: "долгота дня",
            value: "10:18",
          },
        },
      };
    },
    forecastTenDeepBody: (state) => {
      state;
      return {
        time: "03:00",
        iconCode: "cloudy_snow_0",
        temp: {
          value: "13",
          unit: "°",
        },
        wind: {
          title: "направление и скорость ветра",
          value: "4",
          unit: "м/c",
          direction: "e",
        },
        pressure: {
          title: "давление",
          value: "755",
          unit: "мм.рт.ст.",
        },
        humidity: {
          title: "влажность",
          value: "65",
          unit: "%",
        },
      };
    },
    forecastHourly: (state) => {
      state;
      return {
        0: {
          descr: {
            weekday: "понедельник",
            date: "17 октября",
          },
          sun: {
            rise: "08:19",
            set: "19:00",
            dayLength: "10:18",
          },
          0: {
            //Enum Tenses: {past, present, future}
            tense: "future",
            hour: "00:00",
            iconCode: "cloudy_snow_0",
            temp: {
              min: "11",
              max: "18",
              unit: "°С",
            },
            precSum: {
              title: "кол-во осадков",
              value: "0.5",
              unit: "мм",
            },
            wind: {
              title: "направление и скорость ветра",
              value: "4",
              unit: "м/c",
              direction: "e",
            },
            pressure: {
              title: "давление",
              value: "755",
              unit: "мм.рт.ст.",
            },
            humidity: {
              title: "влажность",
              value: "65",
              unit: "%",
            },
          },
          1: {},
          2: {},
          3: {},
          4: {},
        },
        1: {},
        2: {},
      };
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
