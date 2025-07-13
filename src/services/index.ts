import { request } from '@umijs/max';

export async function getResourceTreeByAppCodeApi(
  params?: any,
  options?: any,
) {
  return request<any>(`/jx-user-service/user/getResourceTreeByAppCode`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}` || '',
    },
    ...(options || {}),
  });
}

export async function eventTrackingApi(
  params?: any,
  options?: any,
) {
  return request<any>('/api/v1/eventTracking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}` || '',
    },
    data: params,
    ...(options || {}),
  });
}
