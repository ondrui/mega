import Vue from "vue";
import Vuex from "vuex";
import { languageExpressions } from "@/constants/locales";
import { setTimeFormat } from "@/constants/functions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locales: "ru",
    datasetsHourly: {},
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
          wind_dir: ["ne", "св"],
        },
        windGust: {
          icon: "wind-gust",
          title: "порывы ветра",
          value: "14",
          unit: " м/с",
          wind_dir: ["ne", "св"],
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
        icon: "partly-cloudy_rain_1_hail_1_thunderstorm_1",
        descr: "переменная облачность небольшой дождь",
        temp: "14°",
        realFeel: "14°",
      };
    },
    forecastForItemHeader() {
      return [
        {
          icon: "wind-direction-grey",
          title: "ветер:",
          value: "4 м/c",
          wind_dir: ["ne", "св"],
        },
        {
          icon: "wind-gust",
          title: "порывы ветра:",
          value: "14 м/c",
          wind_dir: ["ne"],
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
    tenBasic: () => {
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
            value: 3,
            unit: "мм",
          },
          wind: {
            title: "направление и скорость ветра",
            value: "3",
            unit: "м/c",
            wind_dir: ["n", "с"],
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
            value: 0,
            unit: "мм",
          },
          wind: {
            title: "направление и скорость ветра",
            value: "3",
            unit: "м/c",
            wind_dir: ["e", "в"],
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
            value: 0,
            unit: "мм",
          },
          wind: {
            title: "направление и скорость ветра",
            value: "3",
            unit: "м/c",
            wind_dir: ["w", "з"],
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
          iconCode: "mainly-clear_rain_1_thunderstorm_1",
          temp: {
            min: "11",
            max: "17",
            unit: "°",
          },
          precSum: {
            title: "кол-во осадков",
            value: 4,
            unit: "мм",
          },
          wind: {
            title: "направление и скорость ветра",
            value: "3",
            unit: "м/c",
            wind_dir: ["n", "с"],
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
            value: 0,
            unit: "мм",
          },
          wind: {
            title: "направление и скорость ветра",
            value: "3",
            unit: "м/c",
            wind_dir: ["n", "с"],
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
            wind_dir: ["sw", "юз"],
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
            value: 9,
            unit: "мм",
          },
          wind: {
            title: "направление и скорость ветра",
            value: "3",
            unit: "м/c",
            wind_dir: ["s", "ю"],
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
            value: 0,
            unit: "мм",
          },
          wind: {
            title: "направление и скорость ветра",
            value: "3",
            unit: "м/c",
            wind_dir: ["n", "с"],
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
            value: 2,
            unit: "мм",
          },
          wind: {
            title: "направление и скорость ветра",
            value: "3",
            unit: "м/c",
            wind_dir: ["n", "с"],
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
            value: 0,
            unit: "мм",
          },
          wind: {
            title: "направление и скорость ветра",
            value: "3",
            unit: "м/c",
            wind_dir: ["n", "с"],
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
    tenDayTemp: () => {
      const maxTemp = [18, 17, 15, 17, 15, 18, 17, 14, 16, 16];
      const minTemp = [15, 15, 13, 12, 13, 14, 15, 13, 12, 12];
      const min = Math.min(...minTemp, ...maxTemp);
      const max = Math.max(...maxTemp, ...minTemp);
      const unit = "°";
      return [
        { unit, value: minTemp, descr: "min", min, max },
        { unit, value: maxTemp, descr: "max", min, max },
      ];
    },
    hourlyDatasets({ datasetsHourly }) {
      const sortData = (el) => {
        return parseInt(el.date.split("T")[1].slice(0, 2));
      };
      const obj = {};
      for (const key in datasetsHourly) {
        const arr = Object.values(datasetsHourly[key])
          .filter((i) => typeof i === "object")
          .sort((a, b) => sortData(a) - sortData(b));
        obj[key] = arr;
      }
      console.log(obj);
      return obj;
    },
    hourlyPropTitle(state, { hourlyDatasets, getLocales }) {
      const obj = {};
      for (const key in hourlyDatasets) {
        const arr = hourlyDatasets[key];
        const weekday = setTimeFormat(arr[0].date, "l", "ru");
        const day = setTimeFormat(arr[0].date, "d F", "ru");
        const showArr = arr.map(
          ({
            condition,
            light,
            date,
            humidity,
            prec_sum,
            pressure,
            temp_max,
            temp_min,
            wind_dir,
            wind_speed,
          }) => {
            return {
              hour: date.split("T")[1].slice(0, 5),
              condition,
              date,
              light,
              humidity: `${humidity}${
                languageExpressions(getLocales, "units", "percent")[0]
              }`,
              prec_sum: `${prec_sum} ${
                languageExpressions(getLocales, "units", "precSum")[0]
              }`,
              pressure,
              temp_max: `${temp_max}${
                languageExpressions(getLocales, "units", "temp")[0]
              }`,
              temp_min: `${temp_min}${
                languageExpressions(getLocales, "units", "temp")[0]
              }`,
              wind_dir: [
                wind_dir,
                `${languageExpressions(getLocales, "windDir", wind_dir)[1]}`,
              ],
              wind_speed: `${wind_speed} ${
                languageExpressions(getLocales, "units", "speed")[0]
              }`,
            };
          }
        );
        obj[key] = {
          values: showArr,
          date: [weekday, day],
          sunrise: state.datasetsHourly[key]["sunrise"],
          sunset: state.datasetsHourly[key]["sunset"],
        };
      }
      console.log(obj);
      return obj;
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
          wind_dir: "e",
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
          wind_dir: "e",
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
              wind_dir: "e",
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
  mutations: {
    setHourly(state, { forecast_1 }) {
      const filteredDatasets = Object.keys(forecast_1)
        .filter((key) => key !== "3" && key !== "start_date")
        .reduce((obj, key) => {
          obj[key] = forecast_1[key];
          return obj;
        }, {});
      state.datasetsHourly = filteredDatasets;
    },
  },
  actions: {},
  modules: {},
});
