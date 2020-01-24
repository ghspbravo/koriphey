import { action, thunk } from 'easy-peasy'
import { API, CURRENT_PROFILE } from '../constants'

import defaultPhoto from '../assets/defaultPhoto.png';

export const graduates = {
  graduatesYears: [],
  graduatesByYears: {},
  totalGraduates: undefined,
  totalStudents: undefined,

  fetchGraduates: thunk(async (actions, payload, { getStoreState }) => {
    const status = await fetch(API[CURRENT_PROFILE] + `Graduation/GetAllGradusations`, {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getStoreState().auth.access}`
      }
    }).then(response => response.json())
      .then(data => {
        const graduatesYears = data.graduationYears.map(yearInfo => yearInfo.year);
        const graduatesByYears = data.graduationYears.reduce((result, item) => {
          const { year, classes } = item;
          return {
            ...result,
            [year]: classes.map(classItem => ({
              classLetter: classItem.classIdentifier,
              teacher: {
                name: classItem.classroomTeacher,
                photo: classItem.classroomPhoto || defaultPhoto,
                location: classItem.classroomLocation
              },
              students: classItem.graduates.map(student => ({
                id: student.userId,
                name: student.fullName,
                photo: student.photo || defaultPhoto,
                location: student.location,
              }))
            }))
          }
        }, {})

        const payload = {
          totalGraduates: data.graduationsCount,
          totalStudents: data.graduatesCount,
          graduatesYears, graduatesByYears
        };
        actions.setGraduates(payload);
      })
      .catch(alert)

    return status
  }),

  setGraduates: action((state, payload) => {
    const { totalGraduates, totalStudents, graduatesYears, graduatesByYears } = payload
    state.totalGraduates = totalGraduates
    state.totalStudents = totalStudents
    state.graduatesYears = graduatesYears
    state.graduatesByYears = graduatesByYears
  })
}
export default graduates;