import { action, thunk } from 'easy-peasy'
import { API, CURRENT_PROFILE } from '../constants'

export const statistics = {
  statistics: {},

  loadStatistics: thunk(async (actions, payload) => {
    const success = await fetch(API[CURRENT_PROFILE] + 'Statistic/Get', {
      method: 'get',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    }).then(response => response.json())
      .then(data => {
        actions.setStatistics(data)
      })
      .catch(console.error)

    return success
  }),

  setStatistics: action((state, payload) => {
    for (const item in payload) {
      if (payload.hasOwnProperty(item)) {
        const statisticItem = payload[item];
        if (Array.isArray(statisticItem)) {
          payload[item] = statisticItem.filter(item => item.count > 0)
        }
      }
    }
    state.statistics = payload
  }),

}

export default statistics