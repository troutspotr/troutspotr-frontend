const mnStateData = require('static/data/v3/mn/mn.data.json')
const wiStateData = require('static/data/v3/wi/wi.data.json')
import { updateStateObject } from './StateApi'
const stateDictionary = {
  wi: updateStateObject(wiStateData),
  mn: updateStateObject(mnStateData),
}

export class StateApiSync {
  getStateData(stateName) {
    if (stateName == null) {
      throw new Error('stateName cannot be null')
    }

    stateName = stateName.toLowerCase()
    return stateDictionary[stateName]
  }
}

export default new StateApiSync()
