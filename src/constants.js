export const PROFILES = {
  KORIPHEY: "KORIPHEY",
  DLA8: "DLA8"
};

export const API = {
  KORIPHEY: "https://koriphey.us-east-2.elasticbeanstalk.com/api/v1/",
  DLA8: "http://dla8.us-east-2.elasticbeanstalk.com/api/v1/",
};

export const FAVICONS = {
  KORIPHEY: "favicon_koriphey.png",
  DLA8: "favicon_dla8.ico"
}

export const TITLES = {
  KORIPHEY: "Koriphey app",
  DLA8: "DLA8 community"
}

export const ORG_NAME = {
  KORIPHEY: "ООО Корифей",
  DLA8: "ООО DLA8"
}

export const ADMIN_MALE = {
  KORIPHEY: "koriphey@gmail.com",
  DLA8: "dla8@gmail.com"
}



// ================ DEFINE CURRENT PROFILE ===============
/** @type {string} */
export let CURRENT_PROFILE;
export let isKoriphey = false;
export let isDla8 = false;


const currentBase = window.location.hostname;
if (/koriphey/.test(currentBase) || /localhost/.test(currentBase)) {
  CURRENT_PROFILE = PROFILES.KORIPHEY;
  isKoriphey = true;
}
if (/dla8/.test(currentBase)) {
  CURRENT_PROFILE = PROFILES.DLA8;
  isDla8 = true;
}

/** @type {HTMLLinkElement} */
document.getElementById('shortcut').href = FAVICONS[CURRENT_PROFILE];
document.title = TITLES[CURRENT_PROFILE];