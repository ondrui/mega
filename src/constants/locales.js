const dataLocales = {
  ru: {
    breadcrumbs: {
      main: "главная",
      weather: "погода",
      city: "Москва",
    },
    header: {
      now: "сейчас в",
      forecast: "по прогнозу",
      feelsLike: "ощущается",
    },
    tabsDescr: {
      HourlyTabContent: "почасовой прогноз",
      TenDayTabContent: "прогноз погоды на 10 дней",
    },
    detailsSegmentTitle: "погода в Москве - подробный прогноз на 10 дней",
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
      precProb: "вер. осадков",
      uvi: "УФИ",
      daytime: "долгота дня",
      comfort: "комфорт",
    },
    units: {
      time: ["ч", "мин"],
      temp: ["°", "°С"],
      pressure: ["мм.рт.ст."],
      speed: ["м/с"],
      percent: "%",
      precSum: ["мм"],
    },
    windDir: {
      calm: [-1111, ""],
      variable: [-111, ""],
      n: [180, "с"],
      ne: [225, "св"],
      e: [270, "в"],
      se: [315, "юв"],
      s: [0, "ю"],
      sw: [45, "юз"],
      w: [90, "з"],
      nw: [135, "сз"],
    },
    weekendDays: ["вс", "сб"],
    polar: {
      day: "полярный день",
      night: "полярная ночь",
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

export const languageExpressions = (locales, key, name) => {
  const lang = locales ?? "ru";
  return key !== undefined && name !== undefined
    ? dataLocales[lang][key][name]
    : key !== undefined
    ? dataLocales[lang][key]
    : (console.log("Не найден ключ и/или имя параметра в языковых константах!"),
      undefined);
};

/**
 * Возможные значения формата отображения времени и даты.
 * Ключи - символы описывающие возможный формат даты и времени.
 * Значения - массив с параметрами для объекта options, который
 * настраивает формат даты и времени и передается аргументом
 * в конструктор new Intl.DateTimeFormat
 * @property d - День месяца, от 1 до 31. День месяца без нуля в начале.
 * @property D - Текстовое представление дня недели, 2 символа.
 * @property l - Полное наименование дня недели.
 * @property m - Порядковый номер месяца с ведущим нулём.
 * @property F - Полное наименование месяца. Строка.
 * @property M - Сокращённое наименование месяца, 3 символа.
 * @property Y - Полное числовое представление года, 4 цифры.
 * @property H - Часы в 24-часовом формате с ведущим нулём.
 * @property i - Минуты с ведущим нулём.
 * @property S - Секунды с ведущим нулём.
 */
export const formatListDateTime = {
  d: ["day", "numeric"],
  D: ["weekday", "short"],
  l: ["weekday", "long"],
  m: ["month", "2-digit"],
  F: ["month", "long"],
  M: ["month", "short"],
  Y: ["year", "numeric"],
  H: ["hour", "2-digit"],
  i: ["minute", "2-digit"],
  S: ["second", "2-digit"],
};

/**
 * Объект с дефолтными значениями свойств форматирования даты и времени.
 */
export const defaultOptionsDateTimeFormat = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};
