import Vue from "vue";
import Vuex from "vuex";
import { languageExpressions } from "@/constants/locales";
import { setTimeFormat } from "@/constants/functions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locales: "ru",
    datasetsHourly: null,
    datasetsTenDays: null,
  },
  getters: {
    loading(state) {
      return state.datasetsHourly;
    },
    getLocales(state) {
      return state.locales;
    },
    currentWhat: () => {
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
    current(state, { getLocales }) {
      let obj = {};
      if (!state.datasetsHourly) {
        return obj;
      }
      const data = state.datasetsHourly[0][1];
      const time = setTimeFormat(new Date(), "H:i", getLocales);
      return {
        timeText: `сейчас в ${time} по прогнозу`,
        icon: data.condition,
        descr: data.condition_s,
        temp: `${data.temp_max}${
          languageExpressions(getLocales, "units", "temp")[0]
        }`,
        realFeel: `ощущается ${data.feels_like}`,
      };
    },
    forecastForItemHeader(state, { getLocales }) {
      let obj = {};
      if (!state.datasetsHourly) {
        return obj;
      }
      const data = state.datasetsHourly[0][1];
      return [
        {
          icon: "wind-direction-grey",
          title: `${languageExpressions(
            getLocales,
            "climateIndicators",
            "wind"
          )}:`,
          value: `${data.wind_speed} ${
            languageExpressions(getLocales, "units", "speed")[0]
          }`,
          wind_dir: [
            data.wind_dir,
            languageExpressions(getLocales, "windDir", data.wind_dir)[1],
          ],
        },
        {
          icon: "wind-gust",
          title: `${languageExpressions(
            getLocales,
            "climateIndicators",
            "windGust_1"
          )}:`,
          value: `${data.wind_gust} ${
            languageExpressions(getLocales, "units", "speed")[0]
          }`,
          wind_dir: [data.wind_dir],
        },
        {
          icon: "pressure",
          title: `${languageExpressions(
            getLocales,
            "climateIndicators",
            "pressure"
          )}:`,
          value: `${data.pressure} ${
            languageExpressions(getLocales, "units", "pressure")[0]
          }`,
        },
        {
          icon: "humidity",
          title: `${languageExpressions(
            getLocales,
            "climateIndicators",
            "humidity"
          )}:`,
          value: `${data.humidity}${
            languageExpressions(getLocales, "units", "percent")[0]
          }`,
        },
      ];
    },
    tenBasic: ({ datasetsTenDays }, { getLocales }) => {
      console.log("datasetsTenDays", datasetsTenDays);
      console.log(getLocales);
      const arr = Object.values(datasetsTenDays)
        .filter((f, i, a) => i !== a.length - 1)
        .map((e) => {
          const weekday = setTimeFormat(e.start_date, "D", "ru");
          return {
            weekday: weekday,
            weekend: weekday === "сб" || weekday === "вс",
            date: setTimeFormat(e.start_date, "d.m", "ru"),
            condition: e.day.condition,
            precSum: {
              title: languageExpressions(
                getLocales,
                "climateIndicators",
                "precSum"
              ),
              value: e.day.prec_sum,
              unit: languageExpressions(getLocales, "units", "precSum")[0],
            },
            wind: {
              title: languageExpressions(
                getLocales,
                "climateIndicators",
                "wind"
              ),
              value: e.day.wind_speed,
              unit: languageExpressions(getLocales, "units", "speed")[0],
              wind_dir: [
                e.day.wind_dir,
                languageExpressions(getLocales, "windDir", e.day.wind_dir)[1],
              ],
            },
            pressure: {
              title: languageExpressions(
                getLocales,
                "climateIndicators",
                "pressure"
              ),
              value: e.day.pressure,
              unit: languageExpressions(getLocales, "units", "pressure")[0],
            },
            humidity: {
              title: languageExpressions(
                getLocales,
                "climateIndicators",
                "humidity"
              ),
              value: e.day.humidity,
              unit: languageExpressions(getLocales, "units", "percent")[0],
            },
          };
        });
      console.log(arr);
      return arr;
      // return [
      //   {
      //     weekday: "пн",
      //     weekend: false,
      //     date: "21.09",
      //     condition: "partly-cloudy",
      //     temp: {
      //       min: "11",
      //       max: "18",
      //       unit: "°",
      //     },
      //     precSum: {
      //       title: "кол-во осадков",
      //       value: 3,
      //       unit: "мм",
      //     },
      //     wind: {
      //       title: "направление и скорость ветра",
      //       value: "3",
      //       unit: "м/c",
      //       wind_dir: ["n", "с"],
      //     },
      //     pressure: {
      //       title: "давление",
      //       value: "755",
      //       unit: "мм.рт.ст.",
      //     },
      //     humidity: {
      //       title: "влажность",
      //       value: "75",
      //       unit: "%",
      //     },
      //   },
      //   {
      //     weekday: "вт",
      //     weekend: false,
      //     date: "22.09",
      //     condition: "partly-cloudy",
      //     temp: {
      //       min: "12",
      //       max: "17",
      //       unit: "°",
      //     },
      //     precSum: {
      //       title: "кол-во осадков",
      //       value: 0,
      //       unit: "мм",
      //     },
      //     wind: {
      //       title: "направление и скорость ветра",
      //       value: "3",
      //       unit: "м/c",
      //       wind_dir: ["e", "в"],
      //     },
      //     pressure: {
      //       title: "давление",
      //       value: "755",
      //       unit: "мм.рт.ст.",
      //     },
      //     humidity: {
      //       title: "влажность",
      //       value: "75",
      //       unit: "%",
      //     },
      //   },
      //   {
      //     weekday: "ср",
      //     weekend: false,
      //     date: "23.09",
      //     condition: "partly-cloudy",
      //     temp: {
      //       min: "10",
      //       max: "16",
      //       unit: "°",
      //     },
      //     precSum: {
      //       title: "кол-во осадков",
      //       value: 0,
      //       unit: "мм",
      //     },
      //     wind: {
      //       title: "направление и скорость ветра",
      //       value: "3",
      //       unit: "м/c",
      //       wind_dir: ["w", "з"],
      //     },
      //     pressure: {
      //       title: "давление",
      //       value: "755",
      //       unit: "мм.рт.ст.",
      //     },
      //     humidity: {
      //       title: "влажность",
      //       value: "75",
      //       unit: "%",
      //     },
      //   },
      //   {
      //     weekday: "чт",
      //     weekend: false,
      //     date: "24.09",
      //     condition: "mainly-clear_rain_1_thunderstorm_1",
      //     temp: {
      //       min: "11",
      //       max: "17",
      //       unit: "°",
      //     },
      //     precSum: {
      //       title: "кол-во осадков",
      //       value: 4,
      //       unit: "мм",
      //     },
      //     wind: {
      //       title: "направление и скорость ветра",
      //       value: "3",
      //       unit: "м/c",
      //       wind_dir: ["n", "с"],
      //     },
      //     pressure: {
      //       title: "давление",
      //       value: "755",
      //       unit: "мм.рт.ст.",
      //     },
      //     humidity: {
      //       title: "влажность",
      //       value: "75",
      //       unit: "%",
      //     },
      //   },
      //   {
      //     weekday: "пт",
      //     weekend: false,
      //     date: "24.09",
      //     condition: "cloudy",
      //     temp: {
      //       min: "14",
      //       max: "18",
      //       unit: "°",
      //     },
      //     precSum: {
      //       title: "кол-во осадков",
      //       value: 0,
      //       unit: "мм",
      //     },
      //     wind: {
      //       title: "направление и скорость ветра",
      //       value: "3",
      //       unit: "м/c",
      //       wind_dir: ["n", "с"],
      //     },
      //     pressure: {
      //       title: "давление",
      //       value: "755",
      //       unit: "мм.рт.ст.",
      //     },
      //     humidity: {
      //       title: "влажность",
      //       value: "75",
      //       unit: "%",
      //     },
      //   },
      //   {
      //     weekday: "сб",
      //     weekend: true,
      //     date: "25.09",
      //     condition: "cloudy_rain_1",
      //     temp: {
      //       min: "14",
      //       max: "18",
      //       unit: "°",
      //     },
      //     precSum: {
      //       title: "кол-во осадков",
      //       value: 5,
      //       unit: "мм",
      //     },
      //     wind: {
      //       title: "направление и скорость ветра",
      //       value: "3",
      //       unit: "м/c",
      //       wind_dir: ["sw", "юз"],
      //     },
      //     pressure: {
      //       title: "давление",
      //       value: "755",
      //       unit: "мм.рт.ст.",
      //     },
      //     humidity: {
      //       title: "влажность",
      //       value: "75",
      //       unit: "%",
      //     },
      //   },
      //   {
      //     weekday: "вс",
      //     weekend: true,
      //     date: "26.09",
      //     condition: "cloudy_rain_1",
      //     temp: {
      //       min: "15",
      //       max: "17",
      //       unit: "°",
      //     },
      //     precSum: {
      //       title: "кол-во осадков",
      //       value: 9,
      //       unit: "мм",
      //     },
      //     wind: {
      //       title: "направление и скорость ветра",
      //       value: "3",
      //       unit: "м/c",
      //       wind_dir: ["s", "ю"],
      //     },
      //     pressure: {
      //       title: "давление",
      //       value: "755",
      //       unit: "мм.рт.ст.",
      //     },
      //     humidity: {
      //       title: "влажность",
      //       value: "75",
      //       unit: "%",
      //     },
      //   },
      //   {
      //     weekday: "пн",
      //     weekend: false,
      //     date: "28.09",
      //     condition: "cloudy",
      //     temp: {
      //       min: "14",
      //       max: "16",
      //       unit: "°",
      //     },
      //     precSum: {
      //       title: "кол-во осадков",
      //       value: 0,
      //       unit: "мм",
      //     },
      //     wind: {
      //       title: "направление и скорость ветра",
      //       value: "3",
      //       unit: "м/c",
      //       wind_dir: ["n", "с"],
      //     },
      //     pressure: {
      //       title: "давление",
      //       value: "755",
      //       unit: "мм.рт.ст.",
      //     },
      //     humidity: {
      //       title: "влажность",
      //       value: "75",
      //       unit: "%",
      //     },
      //   },
      //   {
      //     weekday: "вт",
      //     weekend: false,
      //     date: "29.09",
      //     condition: "cloudy",
      //     temp: {
      //       min: "12",
      //       max: "16",
      //       unit: "°",
      //     },
      //     precSum: {
      //       title: "кол-во осадков",
      //       value: 2,
      //       unit: "мм",
      //     },
      //     wind: {
      //       title: "направление и скорость ветра",
      //       value: "3",
      //       unit: "м/c",
      //       wind_dir: ["n", "с"],
      //     },
      //     pressure: {
      //       title: "давление",
      //       value: "755",
      //       unit: "мм.рт.ст.",
      //     },
      //     humidity: {
      //       title: "влажность",
      //       value: "75",
      //       unit: "%",
      //     },
      //   },
      //   {
      //     weekday: "ср",
      //     weekend: false,
      //     date: "30.09",
      //     condition: "partly-cloudy",
      //     temp: {
      //       min: "12",
      //       max: "16",
      //       unit: "°",
      //     },
      //     precSum: {
      //       title: "кол-во осадков",
      //       value: 0,
      //       unit: "мм",
      //     },
      //     wind: {
      //       title: "направление и скорость ветра",
      //       value: "3",
      //       unit: "м/c",
      //       wind_dir: ["n", "с"],
      //     },
      //     pressure: {
      //       title: "давление",
      //       value: "755",
      //       unit: "мм.рт.ст.",
      //     },
      //     humidity: {
      //       title: "влажность",
      //       value: "75",
      //       unit: "%",
      //     },
      //   },
      // ];
    },
    tenDayTemp: ({ datasetsTenDays }) => {
      const arr = Object.values(datasetsTenDays);
      const dayTemp = arr
        .map((e) =>
          e.day && e.day.temp_max !== undefined && e.day.temp_max !== null
            ? e.day.temp_max
            : null
        )
        .filter((f, i, a) => i !== a.length - 1);
      const nightTemp = arr
        .map((e) =>
          e.night && e.day.temp_min !== undefined && e.day.temp_min !== null
            ? e.night.temp_min
            : null
        )
        .filter((f, i) => i !== 0);

      const min = Math.min(...nightTemp, ...dayTemp);
      const max = Math.max(...dayTemp, ...nightTemp);
      const unit = "°";
      return [
        { unit, value: dayTemp, descr: "day", min, max },
        { unit, value: nightTemp, descr: "night", min, max },
      ];
    },
    hourlyChartsData({ datasetsHourly }) {
      const sortData = (el) => {
        return parseInt(el.date.split("T")[1].slice(0, 2));
      };
      let dataArr = [];
      for (const key in datasetsHourly) {
        const arr = Object.values(datasetsHourly[key])
          .filter((i) => typeof i === "object")
          .map(({ temp_max, prec_sum, date, feels_like }) => {
            return {
              date,
              temp_max: {
                value: temp_max,
                unit: "°",
              },
              prec_sum: {
                value: prec_sum,
                unit: "мм",
              },
              feels_like: {
                value: feels_like,
                unit: "°",
              },
            };
          })
          .sort((a, b) => sortData(a) - sortData(b));
        dataArr = dataArr.concat(arr);
      }
      return dataArr;
    },

    hourlyPropTitle(state, { getLocales }) {
      const sortData = (el) => {
        return parseInt(el.date.split("T")[1].slice(0, 2));
      };
      const obj = {};
      for (const key in state.datasetsHourly) {
        const arr = Object.values(state.datasetsHourly[key])
          .filter((i) => typeof i === "object")
          .sort((a, b) => sortData(a) - sortData(b));
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
            feels_like,
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
              feels_like: `${feels_like}${
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
      return obj;
    },
    forecastTenDeepHeader: (state) => {
      state;
      return {
        weekday: "пн",
        date: "21.09",
        condition: "cloudy_snow_0",
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
        condition: "cloudy_snow_0",
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
            condition: "cloudy_snow_0",
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
          const addObj = Object.keys(forecast_1[key]).reduce((total, p) => {
            total[p] =
              typeof forecast_1[key][p] === "object"
                ? {
                    ...forecast_1[key][p],
                    prec_sum: +(Math.random() * 10).toFixed(1),
                  }
                : forecast_1[key][p];
            return total;
          }, {});
          obj[key] = addObj;
          return obj;
        }, {});
      state.datasetsHourly = filteredDatasets;
    },
    setTenDays(state, { forecast_24 }) {
      const filteredDatasets = Object.keys(forecast_24).reduce((obj, key) => {
        const addObj = Object.keys(forecast_24[key]).reduce((total, p) => {
          total[p] =
            typeof forecast_24[key][p] === "object"
              ? {
                  ...forecast_24[key][p],
                  prec_sum: +(Math.random() * 10).toFixed(1),
                }
              : forecast_24[key][p];
          return total;
        }, {});
        obj[key] = addObj;
        return obj;
      }, {});
      state.datasetsTenDays = filteredDatasets;
    },
  },
  actions: {},
  modules: {},
});
