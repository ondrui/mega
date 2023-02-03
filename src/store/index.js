import Vue from "vue";
import Vuex from "vuex";
import { languageExpressions } from "@/constants/locales";
import { setTimeFormat, daytime, addPlus } from "@/constants/functions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    /**
     * Свойство определяет языковую локаль. Значение по умолчанию "ru".
     */
    locales: "ru",
    /**
     * Объект с фактическими погодными данными, которые приходят с сервера.
     */
    datasetsFact: null,
    /**
     * Объект с данными для отображения почасового прогноза.
     */
    datasetsHourly: null,
    /**
     * Объект с данными для отображения прогноза на 10-14 дней.
     */
    datasetsTenDays: null,
    /**
     * Объект с данными для отображения подробного прогноза на 10 дней с
     * разбивкой по 3 часа.
     */
    datasetsThreeHour: null,
    /**
     * Данные со стороннего API.
     */
    dataFromAPI: null,
    /**
     * Настройки для отображения температурных графиков, а также
     * корректировки и выравнивания прогнозных и фактических
     * данных.
     * @property periodAdjusted - количество интервалов в которые будут
     * внесены корректировки.
     * @property func - функция согласно которой будут корректироваться
     * данные.
     */
    chartSettings: [
      {
        title: "linear_0",
        periodAdjusted: 0,
        func: (periodAdjusted, diffTime, index) =>
          (periodAdjusted - diffTime - index - 1) / (periodAdjusted - 1),
      },
      {
        title: "linear_6",
        periodAdjusted: 6,
        func: (periodAdjusted, diffTime, index) =>
          (periodAdjusted - diffTime - index - 1) / (periodAdjusted - 1),
      },
      // {
      //   title: "linear_12",
      //   periodAdjusted: 12,
      //   func: (periodAdjusted, diffTime, index) =>
      //     (periodAdjusted - diffTime - index - 1) / (periodAdjusted - 1),
      // },
      // {
      //   title: "exp_12",
      //   periodAdjusted: 12,
      //   func: (periodAdjusted, diffTime, index) => 1 / Math.exp(index),
      // },
    ],
  },
  getters: {
    /**
     * Возвращает языковую метку.
     * @example
     * "ru"
     * @param state Текущее состояние store.
     */
    getLocales(state) {
      return state.locales;
    },
    /**
     * Лоадер
     * @param state Текущее состояние store.
     */
    loading(state) {
      return state.datasetsHourly;
    },
    /**
     * Возвращает данные для отображения в шапке виджета.
     * Левая часть.
     * @param state Текущее состояние store.
     * @param getLocales Языковая метка.
     */
    current(state, { getLocales }) {
      let obj = {};
      if (!state.datasetsHourly) {
        return obj;
      }
      /**
       * Данные используемые для отоброжения. Берем прогнозные данные
       * за текущий час из часового прогноза.
       */
      const data = state.datasetsHourly[0][1];
      const time = setTimeFormat(new Date(), "H:i", getLocales);
      return {
        timeText: `${languageExpressions(
          getLocales,
          "header",
          "now"
        )} ${time} ${languageExpressions(getLocales, "header", "forecast")}`,
        icon: data.condition,
        descr: data.condition_s,
        temp: `${addPlus(data.temp)}${
          languageExpressions(getLocales, "units", "temp")[0]
        }`,
        realFeel: `${languageExpressions(
          getLocales,
          "header",
          "feelsLike"
        )} ${addPlus(data.feels_like)}`,
      };
    },
    /**
     * Возвращает данные для отображения в шапке виджета.
     * Правая часть.
     * @param state Текущее состояние store.
     * @param getLocales Языковая метка.
     */
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
      const valuesArr = Object.values(datasetsTenDays);
      const sliceEndIndex = valuesArr.length > 12 ? -1 : -2;
      const arr = valuesArr.slice(0, sliceEndIndex).map((e) => {
        const weekday = setTimeFormat(e.start_date, "D", getLocales);
        return {
          weekday: weekday,
          weekend:
            weekday ===
              `${languageExpressions(getLocales, "weekendDays")[0]}` ||
            weekday === `${languageExpressions(getLocales, "weekendDays")[1]}`,
          date: setTimeFormat(e.start_date, "d.m", getLocales),
          condition: e.day.condition,
          prec_sum: {
            value: e.day.prec_sum,
            unit: languageExpressions(getLocales, "units", "precSum")[0],
          },
          wind: {
            value: e.day.wind_speed,
            unit: languageExpressions(getLocales, "units", "speed")[0],
            wind_dir: [
              e.day.wind_dir,
              languageExpressions(getLocales, "windDir", e.day.wind_dir)[1],
            ],
          },
          pressure: {
            value: e.day.pressure,
            unit: languageExpressions(getLocales, "units", "pressure")[0],
          },
          humidity: {
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
    tenDaysTabTempCharts: ({ datasetsTenDays }, { getLocales }) => {
      const arr = Object.values(datasetsTenDays);
      const sliceEndIndexDay = arr.length > 12 ? -1 : -2;
      const dayTemp = arr.slice(0, sliceEndIndexDay).map((e) =>
        /**
         * Проверяем есть ли поле day в объекте с данными за сутки,
         * а также значение температуры.
         */
        e.day && e.day.temp_max !== undefined && e.day.temp_max !== null
          ? e.day.temp_max
          : null
      );
      const sliceEndIndexNight = arr.length > 12 ? 0 : -1;
      const nightTemp = arr.slice(1, sliceEndIndexNight).map((e) =>
        /**
         * Проверяем есть ли поле night в объекте с данными за сутки,
         * а также значение температуры.
         */
        e.night && e.night.temp_min !== undefined && e.night.temp_min !== null
          ? e.night.temp_min
          : null
      );
      /**
       * Для ночи отбрасываем донные за текущие сутки.
       */
      // .filter((f, i) => i !== 0);
      /**
       * Вычисляем минимальную и максимальную температуру для ограничения
       * границ графика.
       */
      const min = Math.min(...nightTemp, ...dayTemp);
      const max = Math.max(...dayTemp, ...nightTemp);
      const unit = languageExpressions(getLocales, "units", "temp")[0];
      return [
        { unit, value: dayTemp, descr: "day", min, max },
        { unit, value: nightTemp, descr: "night", min, max },
      ];
    },
    /**
     * Возвращает данные для отображения таблицы подробного
     * почасового прогноза с разбивкой на часовые интервалы.
     * @param datasetsHourly Текущее состояние store.state.datasetsHourly.
     * @param getLocales Языковая метка.
     */
    hourlyTabTable({ datasetsHourly }, { getLocales }) {
      const sortData = (el) => {
        return parseInt(el.date.split("T")[1].slice(0, 2));
      };
      const obj = {};
      for (const key in datasetsHourly) {
        const arr = Object.values(datasetsHourly[key])
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
            temp,
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
              temp: `${temp}${
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
        const time =
          datasetsHourly[key]["sunrise"] && datasetsHourly[key]["sunset"]
            ? daytime(
                datasetsHourly[key]["sunrise"],
                datasetsHourly[key]["sunset"]
              )
            : undefined;
        obj[key] = {
          values: showArr,
          date: [weekday, day],
          polar: datasetsHourly[key]["polar"] ?? undefined,
          sunrise: datasetsHourly[key]["sunrise"],
          sunset: datasetsHourly[key]["sunset"],
          dayLength: {
            value: time,
            sunrise: datasetsHourly[key]["sunrise"]
              ? setTimeFormat(datasetsHourly[key]["sunrise"], "H:i", getLocales)
              : undefined,
            sunset: datasetsHourly[key]["sunset"]
              ? setTimeFormat(datasetsHourly[key]["sunset"], "H:i", getLocales)
              : undefined,
          },
        };
      }
      return obj;
    },
    /**
     * Возвращает данные для отображения карточки подробного прогноза на 10 дней.
     * @param datasetsTenDays Текущее состояние store.state.datasetsTenDays.
     * @param getLocales Языковая метка.
     */
    tenDaysDetailsCard: (
      { datasetsTenDays },
      { getLocales, tenDaysTabTempCharts }
    ) => {
      const arr = Object.values(datasetsTenDays)
        .slice(1, -1)
        // .filter((f, i) => i !== 0)
        .map((e, index) => {
          const formatWeekday = ["D", "l"];
          const weekday = formatWeekday.map((el) =>
            setTimeFormat(e.start_date, el, getLocales)
          );
          const formatDate = ["d.m", "d F"];
          const date = formatDate.map((el) =>
            setTimeFormat(e.start_date, el, getLocales)
          );
          const time =
            e.sunrise && e.sunset ? daytime(e.sunrise, e.sunset) : undefined;
          return {
            weekday,
            date,
            isOpen: e.isOpen,
            weekend: weekday[0] === "сб" || weekday[0] === "вс",
            condition: e.day.condition,
            condition_s: e.day.condition_s,
            precProb: {
              title: languageExpressions(
                getLocales,
                "climateIndicators",
                "precProb"
              ),
              value: `${e.day.prec_prob}${
                languageExpressions(getLocales, "units", "percent")[0]
              }`,
            },
            wind: {
              title: languageExpressions(
                getLocales,
                "climateIndicators",
                "wind"
              ),
              value: `${languageExpressions(
                getLocales,
                "windDir",
                e.day.wind_dir
              )[1].toUpperCase()} ${e.day.wind_speed} ${
                languageExpressions(getLocales, "units", "speed")[0]
              }`,
            },
            pressure: {
              title: languageExpressions(
                getLocales,
                "climateIndicators",
                "pressure"
              ),
              value: `${e.day.pressure}`,
            },
            wind_gust: {
              title: languageExpressions(
                getLocales,
                "climateIndicators",
                "windGust_1"
              ).split(" ")[0],
              value: `${e.day.wind_gust} ${
                languageExpressions(getLocales, "units", "speed")[0]
              }`,
            },
            comf_idx: {
              title: languageExpressions(
                getLocales,
                "climateIndicators",
                "comfort"
              ),
              value: `${e.day.comf_idx}0 ${
                languageExpressions(getLocales, "units", "percent")[0]
              }`,
            },
            humidity: {
              title: languageExpressions(
                getLocales,
                "climateIndicators",
                "humidity"
              ),
              value: `${e.day.humidity} ${
                languageExpressions(getLocales, "units", "percent")[0]
              }`,
            },
            temp: {
              min: `${addPlus(tenDaysTabTempCharts[1].value[index + 1])}${
                languageExpressions(getLocales, "units", "temp")[0]
              }`,
              max: `${addPlus(tenDaysTabTempCharts[0].value[index + 1])}${
                languageExpressions(getLocales, "units", "temp")[0]
              }`,
            },
            uvi: {
              title: languageExpressions(
                getLocales,
                "climateIndicators",
                "uvi"
              ),
              value: e.day.uvi,
            },
            dayLength: {
              daytime: {
                title: languageExpressions(
                  getLocales,
                  "climateIndicators",
                  "daytime"
                ),
                value_mob: time,
                value: time,
              },
              sunrise: e.sunrise
                ? setTimeFormat(e.sunrise, "H:i", getLocales)
                : undefined,
              sunset: e.sunset
                ? setTimeFormat(e.sunset, "H:i", getLocales)
                : undefined,
              polar: e.polar ?? undefined,
            },
          };
        });
      // .slice(0, -1);
      return arr;
    },
    /**
     * Возвращает данные для отображения графика и таблицы подробного
     * прогноза на 10 дней с разбивкой на 3-х часовые интервалы.
     * @param datasetsThreeHour Текущее состояние store.state.datasetsThreeHour.
     * @param getLocales Языковая метка.
     */
    tenDaysDetailsChart: ({ datasetsThreeHour }, { getLocales }) => {
      const sortData = (el) => {
        return parseInt(el.date.split("T")[1].slice(0, 2));
      };

      const filteredData = Object.keys(datasetsThreeHour)
        .filter((key, index, arr) => key !== "0" && key !== `${arr.length - 1}`)
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
            temp,
            feels_like,
            wind_dir,
            wind_speed,
          }) => {
            return {
              date,
              hour: date.split("T")[1].slice(0, 5),
              condition,
              light,
              humidity: {
                unit: languageExpressions(getLocales, "units", "percent")[0],
                value: humidity,
              },
              prec_sum: {
                value: prec_sum,
                unit: languageExpressions(getLocales, "units", "precSum")[0],
              },
              temp: {
                value: temp,
                unit: languageExpressions(getLocales, "units", "temp")[0],
              },
              feels_like: {
                value: feels_like,
                unit: languageExpressions(getLocales, "units", "temp")[0],
              },
              pressure: {
                value: pressure,
                unit: languageExpressions(getLocales, "units", "pressure")[0],
              },
              wind: {
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
      const length = Object.keys(obj).length;
      obj.length = length;
      return obj;
    },
    /**
     * Возвращает скорректированные данные для отображения дельта графика подробного
     * почасового прогноза с разбивкой на часовые интервалы.
     * @param datasetsHourly Текущее состояние store.state.datasetsHourly.
     * @param datasetsFact Текущее состояние store.state.datasetsFact.
     * @param elem Объект с настройками для отрисовки графика.
     * @param getLocales Языковая метка.
     */
    calcAdjustingForecast:
      ({ datasetsFact, datasetsHourly }, { getLocales }) =>
      (elem) => {
        const periodAdjusted = elem.periodAdjusted;
        const obsTimeFact = {
          time: datasetsFact.obs_time,
          temp: datasetsFact.temp,
        };
        const firstForecastTime = {
          time: datasetsHourly[0][1].date,
          temp: datasetsHourly[0][1].temp,
        };
        const diffTime =
          (new Date(firstForecastTime.time) - new Date(obsTimeFact.time)) /
            (1000 * 60 * 60) -
          1;
        const deltaTemp = Math.abs(firstForecastTime.temp - obsTimeFact.temp);
        const indexPointMerge = periodAdjusted - diffTime;

        const sortData = (el) => {
          return parseInt(el.date.split("T")[1].slice(0, 2));
        };
        let dataArr = [];
        for (const key in datasetsHourly) {
          const arr = Object.values(datasetsHourly[key])
            .filter((i) => typeof i === "object")
            .map(({ temp, prec_sum, date, feels_like }) => {
              return {
                date,
                temp: {
                  value: temp,
                  unit: languageExpressions(getLocales, "units", "temp")[0],
                },
                prec_sum: {
                  value: prec_sum,
                  unit: languageExpressions(getLocales, "units", "precSum")[0],
                },
                feels_like: {
                  value:
                    periodAdjusted !== 0 && deltaTemp > 1
                      ? feels_like + deltaTemp
                      : feels_like,
                  unit: languageExpressions(getLocales, "units", "temp")[0],
                },
              };
            })
            .sort((a, b) => sortData(a) - sortData(b));
          dataArr = dataArr.concat(arr);
        }
        const ajustingDataArr = dataArr.map((e, index) => {
          let calcTemp;
          if (
            index < indexPointMerge &&
            periodAdjusted !== 0 &&
            deltaTemp > 1
          ) {
            calcTemp =
              e.temp.value +
              deltaTemp * elem.func(periodAdjusted, diffTime, index);
          } else {
            calcTemp = e.temp.value;
          }
          return {
            ...e,
            temp: {
              value: Math.round(calcTemp),
              unit: languageExpressions(getLocales, "units", "temp")[0],
            },
          };
        });

        return {
          value: ajustingDataArr,
          descr: elem.title,
        };
      },
    /**
     * Данные со стороннего API.
     * GFS & HRRR Forecast API
     */
    datasetsAPI: (
      { datasetsHourly, dataFromAPI, chartSettings },
      { getLocales, calcAdjustingForecast }
    ) => {
      const copyAPITime = [...dataFromAPI.time];
      const copyAPITemp = [...dataFromAPI.temperature_2m];
      const startTime = datasetsHourly[0][1].date;
      const isEqualTime = (elem) => new Date(startTime) - new Date(elem) === 0;
      const startIndex = copyAPITime.findIndex(isEqualTime);
      const finishedIndex = calcAdjustingForecast(chartSettings[0]).value
        .length;
      const spliceArrTime = copyAPITime.splice(startIndex, finishedIndex);
      const spliceArrTemp = copyAPITemp.splice(startIndex, finishedIndex);
      const arr = spliceArrTime.map((elem, index) => {
        return {
          temp: {
            value: Math.round(spliceArrTemp[index]),
            unit: languageExpressions(getLocales, "units", "temp")[0],
          },
          prec_sum: {
            value: 0,
            unit: languageExpressions(getLocales, "units", "precSum")[0],
          },
          feels_like: {
            value: "",
            unit: "",
          },
        };
      });
      return {
        value: arr,
        descr: "api",
      };
    },
    /**
     * Возвращает объект данных для отображения графиков подробного
     * почасового прогноза с разбивкой на часовые интервалы.
     * @param chartSettings Текущее состояние store.state.chartSettings.
     * @param calcAdjustingForecast Геттер вычисления данных для графика.
     */
    datasetsForHourlyCharts: (
      { chartSettings },
      { calcAdjustingForecast, datasetsAPI }
    ) => {
      const data = chartSettings.map((e) => calcAdjustingForecast(e));
      data.push(datasetsAPI);
      const arr = data.reduce((total, current) => {
        return [...total, ...current.value];
      }, []);
      const min = Math.min(...arr.map((e) => e.temp.value));
      const max = Math.max(...arr.map((e) => e.temp.value));
      return {
        min,
        max,
        data,
      };
    },
  },
  mutations: {
    setData(state, { forecast_1, forecast_24, forecast_3, fact }) {
      //fact datasets
      state.datasetsFact = fact;
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
        (obj, key, index) => {
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
          addObj.isOpen = index === 1 ? true : false;
          obj[key] = addObj;
          return obj;
        },
        {}
      );
      state.datasetsTenDays = filteredTenDatasets;
    },
    setDataAPI(state, { hourly }) {
      state.dataFromAPI = hourly;
    },
    toggleDetails(state, [index]) {
      Object.keys(state.datasetsTenDays).map(
        (e) => (state.datasetsTenDays[e].isOpen = false)
      );
      state.datasetsTenDays[index].isOpen = true;
      // if (index < num) {
      //   Object.keys(state.datasetsTenDays).map(
      //     (e) => (state.datasetsTenDays[e].isOpen = false)
      //   );
      //   state.datasetsTenDays[index].isOpen = true;
      // }
    },
  },
  actions: {
    index({ commit, getters }, index) {
      const num = getters.tenDaysDetailsChart.length + 1;
      commit("toggleDetails", [index, num]);
    },
  },
  modules: {},
});
