import { request } from '@umijs/max';

export async function templateGetApi(
  params: any,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/templateGet', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}` || '',
    },
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function templatePostApi(
  params?: any,
  options?: any,
) {
  return request<any>('/api/v1/templatePost', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}` || '',
    },
    data: params,
    ...(options || {}),
  });
}

export async function templatePutApi(
  params: any,
  options?: any,
) {
  const { userId: param0 } = params;
  return request<any>(`/api/v1/templatePut/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}` || '',
    },
    params: { ...params },
    data: params,
    ...(options || {}),
  });
}

export async function templateDeleteApi(
  params: any,
  options?: any,
) {
  const { paramsDelete } = params;
  return request<any>(`/api/v1/templateDelete/${paramsDelete}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}` || '',
    },
    params: { ...params },
    ...(options || {}),
  });
}
