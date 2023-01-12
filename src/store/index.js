import Vue from "vue";
import Vuex from "vuex";
import { languageExpressions } from "@/constants/locales";
import { setTimeFormat, daytime } from "@/constants/functions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    locales: "ru",
    datasetsHourly: null,
    datasetsTenDays: null,
    datasetsThreeHour: null,
  },
  getters: {
    getLocales(state) {
      return state.locales;
    },
    loading(state) {
      return state.datasetsHourly;
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
    /**
     * Возвращает данные для таблицы и графика осадков на вкладке
     * "Прогноз погоды на 10 дней".
     * @param datasetsTenDays Текущее состояние store.state.datasetsTenDays.
     * @param getLocales Языковая метка.
     */
    tenDaysTabTable: ({ datasetsTenDays }, { getLocales }) => {
      const arr = Object.values(datasetsTenDays)
        .filter((f, i, a) => i !== a.length - 1)
        .map((e) => {
          const weekday = setTimeFormat(e.start_date, "D", getLocales);
          return {
            weekday: weekday,
            weekend: weekday === "сб" || weekday === "вс",
            date: setTimeFormat(e.start_date, "d.m", getLocales),
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
      return arr;
    },
    /**
     * Возвращает значения температур и другие данные  для графика на вкладке
     * "Прогноз погоды на 10 дней".
     * @param datasetsTenDays Текущее состояние store.state.datasetsTenDays.
     * @example
     * [{
     *  unit: "°",
     *  value: [-9,-7,-6,-3,-4,-2,1,1,2,2],
     *  descr: "day",
     *  min: -10,
     *  max: 2
     * },
     * {
     *  unit: "°",
     *  value: [-10,-8,-7,-5,-7,-3,0,-8,1,0],
     *  descr: "night",
     *  min: -10,
     *  max: 2
     * }]
     */
    tenDaysTabTempCharts: ({ datasetsTenDays }) => {
      const arr = Object.values(datasetsTenDays);
      const dayTemp = arr
        .map((e) =>
          /**
           * Проверяем есть ли поле day в объекте с данными за сутки,
           * а также значение температуры.
           */
          e.day && e.day.temp_max !== undefined && e.day.temp_max !== null
            ? e.day.temp_max
            : null
        )
        /**
         * Для дня отбрасываем донные за последние сутки.
         */
        .filter((f, i, a) => i !== a.length - 1);
      const nightTemp = arr
        .map((e) =>
          /**
           * Проверяем есть ли поле night в объекте с данными за сутки,
           * а также значение температуры.
           */
          e.night && e.night.temp_min !== undefined && e.night.temp_min !== null
            ? e.night.temp_min
            : null
        )
        /**
         * Для ночи отбрасываем донные за текучие сутки.
         */
        .filter((f, i) => i !== 0);

      const min = Math.min(...nightTemp, ...dayTemp);
      const max = Math.max(...dayTemp, ...nightTemp);
      const unit = "°";
      return [
        { unit, value: dayTemp, descr: "day", min, max },
        { unit, value: nightTemp, descr: "night", min, max },
      ];
    },
    hourlyTabChartsData({ datasetsHourly }) {
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
    hourlyTabTable(state, { getLocales }) {
      const sortData = (el) => {
        return parseInt(el.date.split("T")[1].slice(0, 2));
      };
      const obj = {};
      for (const key in state.datasetsHourly) {
        const arr = Object.values(state.datasetsHourly[key])
          .filter((i) => typeof i === "object")
          .sort((a, b) => sortData(a) - sortData(b));
        const weekday = setTimeFormat(arr[0].date, "l", getLocales);
        const day = setTimeFormat(arr[0].date, "d F", getLocales);
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
    /**
     * Возвращает данные для отображения карточки подробного прогноза на 10 дней.
     * @param datasetsTenDays Текущее состояние store.state.datasetsTenDays.
     * @param getLocales Языковая метка.
     */
    tenDaysDetailsCard: ({ datasetsTenDays }, { getLocales }) => {
      console.log("datasetsTenDays", datasetsTenDays);
      const arr = Object.values(datasetsTenDays)
        .filter((f, i) => i !== 0)
        .map((e) => {
          const formatWeekday = ["D", "l"];
          const weekday = formatWeekday.map((el) =>
            setTimeFormat(e.start_date, el, getLocales)
          );
          const formatDate = ["d.m", "d F"];
          const date = formatDate.map((el) =>
            setTimeFormat(e.start_date, el, getLocales)
          );

          return {
            weekday,
            date,
            weekend: weekday[0] === "сб" || weekday[0] === "вс",
            condition: e.day.condition,
            condition_s: e.day.condition_s,
            precProb: {
              title: languageExpressions(
                getLocales,
                "climateIndicators",
                "precProb"
              ),
              value: e.day.prec_prob,
              unit: languageExpressions(getLocales, "units", "percent")[0],
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
            temp: {
              min: `${e.night.temp_min}${
                languageExpressions(getLocales, "units", "temp")[0]
              }`,
              max: `${e.day.temp_max}${
                languageExpressions(getLocales, "units", "temp")[0]
              }C`,
            },
            dayLength: {
              daytime: {
                title: languageExpressions(
                  getLocales,
                  "climateIndicators",
                  "daytime"
                ),
                value: daytime(e.sunrise, e.sunset),
              },
              sunrise: setTimeFormat(e.sunrise, "H:i", getLocales),
              sunset: setTimeFormat(e.sunset, "H:i", getLocales),
            },
          };
        });
      console.log("tenDaysDetailsCard", arr);
      return arr;
    },
    /**
     * Возвращает данные для отображения графика и таблицы подробного
     * прогноза на 10 дней с разбивкой на 3-х часовые интервалы.
     * @param datasetsThreeHour Текущее состояние store.state.datasetsThreeHour.
     * @param getLocales Языковая метка.
     */
    tenDaysDetailsChart: ({ datasetsThreeHour }, { getLocales }) => {
      console.log("datasetsThreeHour", datasetsThreeHour);
      const sortData = (el) => {
        return parseInt(el.date.split("T")[1].slice(0, 2));
      };

      const filteredData = Object.keys(datasetsThreeHour)
        .filter((key) => key !== "0")
        .reduce((obj, key) => {
          obj[key] = datasetsThreeHour[key];
          return obj;
        }, {});
      const obj = {};
      for (const key in filteredData) {
        const arr = Object.values(filteredData[key])
          .filter((i) => typeof i === "object")
          .sort((a, b) => sortData(a) - sortData(b));
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
            const temperature = light === "dark" ? temp_min : temp_max;
            return {
              hour: date.split("T")[1].slice(0, 5),
              condition,
              light,
              humidity: {
                title: languageExpressions(
                  getLocales,
                  "climateIndicators",
                  "humidity"
                ),
                unit: languageExpressions(getLocales, "units", "percent")[0],
                value: humidity,
              },
              prec_sum: {
                title: languageExpressions(
                  getLocales,
                  "climateIndicators",
                  "precSum"
                ),
                value: prec_sum,
                unit: languageExpressions(getLocales, "units", "precSum")[0],
              },
              temp: {
                value: temperature,
                unit: languageExpressions(getLocales, "units", "temp")[0],
              },
              pressure: {
                title: languageExpressions(
                  getLocales,
                  "climateIndicators",
                  "pressure"
                ),
                value: pressure,
                unit: languageExpressions(getLocales, "units", "pressure")[0],
              },
              wind: {
                title: languageExpressions(
                  getLocales,
                  "climateIndicators",
                  "windDirSpeed"
                ),
                value: wind_speed,
                unit: languageExpressions(getLocales, "units", "speed")[0],
                wind_dir: [
                  wind_dir,
                  languageExpressions(getLocales, "windDir", wind_dir)[1],
                ],
              },
            };
          }
        );
        obj[key] = showArr;
      }
      console.log("tenDaysDetailsChart", obj);
      return obj;
      // return {
      //   time: "03:00",
      //   condition: "cloudy_snow_0",
      //   temp: {
      //     value: "13",
      //     unit: "°",
      //   },
      //   wind: {
      //     title: "направление и скорость ветра",
      //     value: "4",
      //     unit: "м/c",
      //     wind_dir: "e",
      //   },
      //   pressure: {
      //     title: "давление",
      //     value: "755",
      //     unit: "мм.рт.ст.",
      //   },
      //   humidity: {
      //     title: "влажность",
      //     value: "65",
      //     unit: "%",
      //   },
      // };
    },
  },
  mutations: {
    setData(state, { forecast_1, forecast_24, forecast_3 }) {
      //hourly datasets
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

      //Three Hour Datasets
      const filteredThreeHourDatasets = Object.keys(forecast_3)
        .filter((key) => key !== "start_date")
        .reduce((obj, key) => {
          const addObj = Object.keys(forecast_3[key]).reduce((total, p) => {
            total[p] =
              typeof forecast_3[key][p] === "object"
                ? {
                    ...forecast_3[key][p],
                    prec_sum: +(Math.random() * 10).toFixed(1),
                  }
                : forecast_3[key][p];
            return total;
          }, {});
          obj[key] = addObj;
          return obj;
        }, {});
      state.datasetsThreeHour = filteredThreeHourDatasets;

      //ten days datasets
      const filteredTenDatasets = Object.keys(forecast_24).reduce(
        (obj, key) => {
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
        },
        {}
      );
      state.datasetsTenDays = filteredTenDatasets;
    },
  },
  actions: {},
  modules: {},
});
