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
/**
 * Возвращает команду поворота иконки ветра в соответствие с направлением ветра.
 * @param locales Языковая метка.
 * @param obj Объект с данными для отображения, в котором есть поле wind_dir.
 * Поле wind_dir - значение указывает направление ветра.
 */
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
    let hours = Math.floor((diffMilliseconds / (1000 * 60 * 60)) % 24);
    let minutes = Math.floor((diffMilliseconds / (1000 * 60)) % 60);
    const seconds = Math.floor((diffMilliseconds / 1000) % 60);
    // 👇️ if seconds are greater than 30, round minutes up (optional)
    minutes = seconds >= 30 ? minutes + 1 : minutes;
    hours = minutes > 59 ? hours + 1 : hours;
    minutes = minutes % 60;
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
/**
 * Добовляет знак +, если значение парометра больше нуля.
 * @param item значение параметра.
 */
export const addPlus = (item) => {
  return item > 0 ? `+${item}` : item;
};

/**
 * Конвертирует принимаемые точки в контрольные точки кривой Безье.
 * Возвращает строку с командой для создания кривой линии.
 * @param points - Массив объектов с координатами точек через которые нужно
 * построить кривую.
 * @param i - Индекс элемента в массиве.
 */
export const catmullRom2bezier = (points, i) => {
  let p = [];

  p.push({
    x: points[Math.max(i - 1, 0)].x,
    y: points[Math.max(i - 1, 0)].y,
  });
  p.push({
    x: points[i].x,
    y: points[i].y,
  });
  p.push({
    x: points[i + 1].x,
    y: points[i + 1].y,
  });
  p.push({
    x: points[Math.min(i + 2, points.length - 1)].x,
    y: points[Math.min(i + 2, points.length - 1)].y,
  });

  // Catmull-Rom to Cubic Bezier conversion matrix
  //    0       1       0       0
  //  -1/6      1      1/6      0
  //    0      1/6      1     -1/6
  //    0       0       1       0

  let bp = [];
  bp.push({
    x: (-p[0].x + 6 * p[1].x + p[2].x) / 6,
    y: (-p[0].y + 6 * p[1].y + p[2].y) / 6,
  });
  bp.push({
    x: (p[1].x + 6 * p[2].x - p[3].x) / 6,
    y: (p[1].y + 6 * p[2].y - p[3].y) / 6,
  });
  bp.push({
    x: p[2].x,
    y: p[2].y,
  });
  return `C ${bp[0].x},${bp[0].y} ${bp[1].x},${bp[1].y} ${bp[2].x},${bp[2].y}`;
};

/**
 * Конвертирует принимаемые точки в контрольные точки кривой Безье.
 * Возвращает строку с командой для создания кривой линии.
 * Smooth a Svg path with cubic bezier curves
 * https://francoisromain.medium.com/
 * smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74
 */
export const bezierCommand = (point, i, a) => {
  const line = (pointA, pointB) => {
    const lengthX = pointB.x - pointA.x;
    const lengthY = pointB.y - pointA.y;
    return {
      length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
      angle: Math.atan2(lengthY, lengthX),
    };
  };
  const controlPoint = (current, previous, next, reverse) => {
    const p = previous ?? current;
    const n = next ?? current;
    const o = line(p, n);
    const flattening = 0.1;
    const smoothing = 0.3;
    const map = (value, inMin, inMax, outMin, outMax) => {
      return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    };
    // work in progress…
    const flat = map(Math.cos(o.angle) * flattening, 0, 1, 1, 0);
    const angle = o.angle * flat + (reverse ? Math.PI : 0);
    const length = o.length * smoothing;
    const x = current.x + Math.cos(angle) * length;
    const y = current.y + Math.sin(angle) * length;
    return [x, y];
  };

  const cps = controlPoint(a[i - 1], a[i - 2], point);
  const cpe = controlPoint(point, a[i - 1], a[i + 1], true);
  return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point.x},${point.y}`;
};
