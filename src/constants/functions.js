import {
  defaultOptionsDateTimeFormat,
  formatListDateTime,
  languageExpressions,
} from "./locales";
/**
 * Возвращает строку с датой и временем в заданном формате.
 * @param date Строковое представление даты получаемое с
 * сервера.
 * @param format Строковое представление формата.
 * @param locales Языковая метка для определения локали.
 * @returns {string}
 * @example
 * "20:30"
 */
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
// const formatListDateTime = {
//   d: ["day", "numeric"],
//   D: ["weekday", "short"],
//   l: ["weekday", "long"],
//   m: ["month", "2-digit"],
//   F: ["month", "long"],
//   M: ["month", "short"],
//   Y: ["year", "numeric"],
//   H: ["hour", "2-digit"],
//   i: ["minute", "2-digit"],
//   S: ["second", "2-digit"],
// };

export const setTimeFormat = (date, format, locales) => {
  /**
   * Объект options настраивает формат даты и времени и передается
   *  аргументом в конструктор new Intl.DateTimeFormat.
   * @example
   * {
   * weekday: "long",
   * year: "numeric",
   * month: "long",
   * day: "numeric",
   * hour: "2-digit",
   * minute: "2-digit",
   * second: "2-digit",
   * };
   */
  const options = {
    ...defaultOptionsDateTimeFormat,
  };
  /**
   * Формируем объект с заданными свойствами форматирования даты и времени.
   */
  for (const key in formatListDateTime) {
    const value = formatListDateTime[key];
    if (format.includes(key) && value.length > 0) {
      options[value[0]] = value[1];
    }
  }

  const localDate = new Date(date);
  /**
   * Массив объектов, содержащий отформатированную дату по частям.
   * @example
   * [
   * { type: "weekday", value: "вторник" },
   * { type: "literal", value: ", " },
   * { type: "day", value: "11" },
   * { type: "literal", value: " " },
   * { type: "month", value: "октября" },
   * { type: "literal", value: " " },
   * { type: "year", value: "2022" },
   * { type: "literal", value: " г., " },
   * { type: "hour", value: "08" },
   * { type: "literal", value: ":" },
   * { type: "minute", value: "00" },
   * { type: "literal", value: ":" },
   * { type: "second", value: "00" },
   * ];
   */
  const datePartsArr = new Intl.DateTimeFormat(locales, options).formatToParts(
    localDate
  );
  /**
   * Формируем строку дата-время с заданным форматированием.
   */
  let dateFormated = format;

  for (const item of format) {
    const value = formatListDateTime[item];
    if (value && value.length > 0) {
      let replaceValue = datePartsArr.find((i) => i.type === value[0]);
      dateFormated = dateFormated.replace(item, replaceValue?.value ?? "");
    }
  }
  return dateFormated;
};

export const windDirection = (locales, obj) => {
  const { wind_dir } = obj;
  return wind_dir
    ? `rotate(${languageExpressions(locales, "windDir", wind_dir[0])[0]})`
    : "rotate(0)";
};
/**
 * Возвращает долготу дня в часах и минутах.
 * @example
 * "10:14"
 */
export const daytime = (sunrise, sunset, separator) => {
  const diffMilliseconds = new Date(sunset) - new Date(sunrise);
  // function convert Milliseconds to Hours and Minutes
  const padTo2Digits = (num) => num.toString().padStart(2, "0");

  const convertMsToHM = () => {
    const hours = Math.floor((diffMilliseconds / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diffMilliseconds / (1000 * 60)) % 60);
    // const seconds = Math.floor((diffMilliseconds / 1000) % 60);

    return separator === ":"
      ? `${hours}:${padTo2Digits(minutes)}`
      : `${hours} ${
          languageExpressions("ru", "units", "time")[0]
        } ${padTo2Digits(minutes)} ${
          languageExpressions("ru", "units", "time")[1]
        }`;
  };

  return convertMsToHM();
};
