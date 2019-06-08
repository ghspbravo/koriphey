/**
 * Data parser
 * @param {Date} data 
 * 
 * @returns normilize data for RU locale
 */
export default function formatDate(data) {
  const datePartList = data.match(/\d\d\d\d-\d\d-\d\d/)[0].split('-')
  return `${datePartList[2]}.${datePartList[1]}.${datePartList[0]}`
}