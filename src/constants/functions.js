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
