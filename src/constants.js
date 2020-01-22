const isDevelop = process.env.NODE_ENV === "development"

export const PROFILES = {
  KORIPHEY: "KORIPHEY",
  DLA8: "DLA8"
};

export const API = {
  KORIPHEY: (isDevelop && process.env.REACT_APP_API) || "https://backend.koriphey.ru/api/v1/",
  DLA8: (isDevelop && process.env.REACT_APP_API) || "http://dla8.us-east-2.elasticbeanstalk.com/api/v1/",
};


// ================ DEFINE CURRENT PROFILE ===============
/** @type {string} */
export let CURRENT_PROFILE;
export let isKoriphey = false;
export let isDla8 = false;


const currentBase = window.location.hostname;
if (/koriphey/.test(currentBase) || (isDevelop && process.env.REACT_APP_PROJECT === PROFILES.KORIPHEY)) {
  CURRENT_PROFILE = PROFILES.KORIPHEY;
  isKoriphey = true;
}
if (/dla8/.test(currentBase) || (isDevelop && process.env.REACT_APP_PROJECT === PROFILES.DLA8)) {
  CURRENT_PROFILE = PROFILES.DLA8;
  isDla8 = true;
}