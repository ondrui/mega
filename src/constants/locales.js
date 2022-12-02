const data = {
  ru: {
    breadcrumbs: {
      main: "главная",
      weather: "погода",
      city: "Луховицы (Московская область, Россия)",
    },
    header: {
      now: "сейчас в",
      forecast: "по прогнозу",
      feelsLike: "ощущается",
    },
    tabsDescr: {
      hourly: "почасовой прогноз",
      daily: "прогноз погоды на 10 дней",
    },
    climateIndicators: {
      temp: "температура",
      pressure: "давление",
      wind: "ветер",
      main: "главная",
      windDirSpeed: "направление и скорость ветра",
      windGust_1: "порывы ветра",
      windGust_2: "до",
      humidity: "влажность",
      precSum: "кол-во осадков",
      precProb: "вер. осадков:",
      uvi: "УФИ",
      daytime: "долгота дня",
    },
    units: {
      temp: ["°", "°С"],
      pressure: ["мм.рт.ст."],
      speed: ["м/с"],
      percent: "%",
      precSum: ["мм"],
    },
  },
  en: {
    en: {
      breadcrumbs: {
        main: "home",
        weather: "weather",
      },
      header: {
        now: "now at",
        forecast: "according to the forecast",
        feelsLike: "feels like",
      },
      tabsDescr: {
        hourly: "hourly",
        daily: "10 day forecast",
      },
      climateIndicators: {
        temp: "temperature",
        pressure: "pressure",
        wind: "wind",
        windDirSpeed: "wind direction and speed",
        windGust_1: "wind gust",
        windGust_2: "up to",
        humidity: "humidity",
        precSum: "precipitation",
        precProb: "precip chance",
        uvi: "UVI",
        daytime: "sunrise & sunset",
      },
      units: {
        temp: ["°", "°С"],
        pressure: ["mmHg"],
        speed: ["m/s"],
        percent: "%",
        precSum: ["mm"],
      },
    },
  },
  fr: {},
};

export const expressions = (locales, key, name) => {
  const lang = locales ?? "ru";
  return key !== undefined && name !== undefined
    ? data[lang][key][name]
    : (console.log("Не найден ключ и/или имя параметра в языковых константах!"),
      undefined);
};
