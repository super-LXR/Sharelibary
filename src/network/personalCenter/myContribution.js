import {
  request
} from '../request.js'

export function getContributions() {
  return request({
    url: '/bookBaseControl/getSourceBook',
    method: 'get',
  })
}