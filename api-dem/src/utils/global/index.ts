// @ts-nocheck
import moment from 'moment';


export function generateRandomDigit(length) {

  const min = 10 ** (length - 1);
  const max = 10 ** length - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;

}

export function maskEmail(email) {
  const parts = email.split('@');
  const localPart = parts[0];
  const domainPart = parts[1];

  const maskedLocalPart = localPart.slice(0, 2) + '*'.repeat(localPart.length - 2);
  const maskedDomainPart = '*'.repeat(domainPart.indexOf('.')) + domainPart.slice(domainPart.indexOf('.'));

  return `${maskedLocalPart}@${maskedDomainPart}`;
}


export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export const paginateArray = (array, page, pageSize) => {
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  const paginatedData = array.slice(startIndex, endIndex);

  return paginatedData;
};

export function float(value: string): number {
  return parseFloat(value);
}

export function round(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function inRange(value: number, min: number, max: number): boolean {
  return !((value - min) * (value - max) <= 0);
}

export const isEmptyObj = (val: any) =>
  val == null || !(Object.keys(val) || val).length;

export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (
    value !== null &&
    typeof value === 'object' &&
    !Object.keys(value).length
  ) {
    return true;
  } else {
    return false;
  }
};

export const capitalizeSentence = (sentence) => {
  return sentence.replace(/\b\w/g, (match) => match.toUpperCase());
};


export const timeDiff = (_date, type) => {
  let date = moment(_date);

  let diff = moment().diff(date, type);

  return diff;
};

export const getTimestamp = (hours: number, normal = false) => {
  if (normal) {
    return moment().add(hours, 'hours');
  } else {
    return moment().add(hours, 'hours').unix();
  }
};

export const dateAddHour = (date, hours) => {
  return moment(date).add(hours, 'hours').format('YYYY-MM-DD HH:mm:ss');
};

export const formatDate = (date, format = false) => {
  if (format === 'F') return moment(date).format('DD.MM. HH:mm');

  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

export const getTimestampFromDate = (date) => {
  return moment(date).unix();
};

export const getDateNow = () => {
  return moment().format('YYYY-MM-DD HH:mm:ss');
};

export const getTimestampNow = () => {
  return moment().unix();
};

export const isOutDated = (date) => {
  return moment().unix() > moment(date).unix();
};


export const GetDate = () => {
  let datenow = new Date();

  return ` ${datenow.getHours()}:${datenow.getMinutes()}:${datenow.getSeconds()} `;
};

