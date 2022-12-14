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
    forecastTenBasic: () => {
      return [
        {
          weekday: "пн",
          weekend: false,
          date: "21.09",
          iconCode: "partly-cloudy",
          temp: {
            min: "11",
            max: "18",
            unit: "°",
          },
          precSum: {
            title: "кол-во осадков",
            value: null,
            unit: "мм",
          },
          wind: {
            title: "направление и скорость ветра",
            value: "3",
            unit: "м/c",
            direction: ["n", "С"],
          },
          pressure: {
            title: "давление",
            value: "755",
            unit: "мм.рт.ст.",
          },
          humidity: {
            title: "влажность",
            value: "75",
            unit: "%",
          },
        },
        {
          weekday: "вт",
          weekend: false,
          date: "22.09",
          iconCode: "partly-cloudy",
          temp: {
            min: "12",
            max: "17",
            unit: "°",
          },
          precSum: {
            title: "кол-во осадков",
            value: null,
            unit: "мм",
          },
          wind: {
            title: "направление и скорость ветра",
            value: "3",
            unit: "м/c",
            direction: ["n", "С"],
          },
          pressure: {
            title: "давление",
            value: "755",
            unit: "мм.рт.ст.",
          },
          humidity: {
            title: "влажность",
            value: "75",
            unit: "%",
          },
        },
        {
          weekday: "ср",
          weekend: false,
          date: "23.09",
          iconCode: "partly-cloudy",
          temp: {
            min: "10",
            max: "16",
            unit: "°",
          },
          precSum: {
            title: "кол-во осадков",
            value: null,
            unit: "мм",
          },
          wind: {
            title: "направление и скорость ветра",
            value: "3",
            unit: "м/c",
            direction: ["n", "С"],
          },
          pressure: {
            title: "давление",
            value: "755",
            unit: "мм.рт.ст.",
          },
          humidity: {
            title: "влажность",
            value: "75",
            unit: "%",
          },
        },
        {
          weekday: "чт",
          weekend: false,
          date: "24.09",
          iconCode: "partly-cloudy",
          temp: {
            min: "11",
            max: "17",
            unit: "°",
          },
          precSum: {
            title: "кол-во осадков",
            value: null,
            unit: "мм",
          },
          wind: {
            title: "направление и скорость ветра",
            value: "3",
            unit: "м/c",
            direction: ["n", "С"],
          },
          pressure: {
            title: "давление",
            value: "755",
            unit: "мм.рт.ст.",
          },
          humidity: {
            title: "влажность",
            value: "75",
            unit: "%",
          },
        },
        {
          weekday: "пт",
          weekend: false,
          date: "24.09",
          iconCode: "cloudy",
          temp: {
            min: "14",
            max: "18",
            unit: "°",
          },
          precSum: {
            title: "кол-во осадков",
            value: null,
            unit: "мм",
          },
          wind: {
            title: "направление и скорость ветра",
            value: "3",
            unit: "м/c",
            direction: ["n", "С"],
          },
          pressure: {
            title: "давление",
            value: "755",
            unit: "мм.рт.ст.",
          },
          humidity: {
            title: "влажность",
            value: "75",
            unit: "%",
          },
        },
        {
          weekday: "сб",
          weekend: true,
          date: "25.09",
          iconCode: "cloudy_rain_1",
          temp: {
            min: "14",
            max: "18",
            unit: "°",
          },
          precSum: {
            title: "кол-во осадков",
            value: 5,
            unit: "мм",
          },
          wind: {
            title: "направление и скорость ветра",
            value: "3",
            unit: "м/c",
            direction: ["n", "С"],
          },
          pressure: {
            title: "давление",
            value: "755",
            unit: "мм.рт.ст.",
          },
          humidity: {
            title: "влажность",
            value: "75",
            unit: "%",
          },
        },
        {
          weekday: "вс",
          weekend: true,
          date: "26.09",
          iconCode: "cloudy_rain_1",
          temp: {
            min: "15",
            max: "17",
            unit: "°",
          },
          precSum: {
            title: "кол-во осадков",
            value: 7,
            unit: "мм",
          },
          wind: {
            title: "направление и скорость ветра",
            value: "3",
            unit: "м/c",
            direction: ["n", "С"],
          },
          pressure: {
            title: "давление",
            value: "755",
            unit: "мм.рт.ст.",
          },
          humidity: {
            title: "влажность",
            value: "75",
            unit: "%",
          },
        },
        {
          weekday: "пн",
          weekend: false,
          date: "28.09",
          iconCode: "cloudy",
          temp: {
            min: "14",
            max: "16",
            unit: "°",
          },
          precSum: {
            title: "кол-во осадков",
            value: null,
            unit: "мм",
          },
          wind: {
            title: "направление и скорость ветра",
            value: "3",
            unit: "м/c",
            direction: ["n", "С"],
          },
          pressure: {
            title: "давление",
            value: "755",
            unit: "мм.рт.ст.",
          },
          humidity: {
            title: "влажность",
            value: "75",
            unit: "%",
          },
        },
        {
          weekday: "вт",
          weekend: false,
          date: "29.09",
          iconCode: "cloudy",
          temp: {
            min: "12",
            max: "16",
            unit: "°",
          },
          precSum: {
            title: "кол-во осадков",
            value: null,
            unit: "мм",
          },
          wind: {
            title: "направление и скорость ветра",
            value: "3",
            unit: "м/c",
            direction: ["n", "С"],
          },
          pressure: {
            title: "давление",
            value: "755",
            unit: "мм.рт.ст.",
          },
          humidity: {
            title: "влажность",
            value: "75",
            unit: "%",
          },
        },
        {
          weekday: "ср",
          weekend: false,
          date: "30.09",
          iconCode: "partly-cloudy",
          temp: {
            min: "12",
            max: "16",
            unit: "°",
          },
          precSum: {
            title: "кол-во осадков",
            value: null,
            unit: "мм",
          },
          wind: {
            title: "направление и скорость ветра",
            value: "3",
            unit: "м/c",
            direction: ["n", "С"],
          },
          pressure: {
            title: "давление",
            value: "755",
            unit: "мм.рт.ст.",
          },
          humidity: {
            title: "влажность",
            value: "75",
            unit: "%",
          },
        },
      ];
    },
    tenDaysCharts: () => {
      const minTemp = [11, 12, 10, 11, 14, 14, 15, 14, 12, 12];
      const maxTemp = [18, 17, 16, 17, 18, 18, 17, 16, 16, 16];
      return { minTemp, maxTemp, unit: "°" };
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
