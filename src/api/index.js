import request from '@/utils/request';

/**
 * 广告接口
 * @param {*} id 
 * @returns 
 */
export function getAdList(params) {
  return request({
    url: `/api/ad/list`,
    method: 'get',
    params
  })
}

/**
 * 泰国地图-公告
 * @param {*} id 
 * @returns 
 */
export function getNoticeList(params) {
  return request({
    url: `/api/notice`,
    method: 'get',
    params
  })
}

/**
 * 泰国地图-公告
 * @param {*} id 
 * @returns 
 */
export function getMapList(params) {
  return request({
    url: `/api/map/list`,
    method: 'get',
    params
  })
}

/**
 * 上传图片
 * @param {*} data 
 * @returns 
 */
export const postUpload = data => {
  return request({
    url: '/api/common/upload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

/**
 * 上传图片
 * @param {*} data 
 * @returns 
 */
export const postMapAdd = data => {
  return request({
    url: '/api/map/add',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}
