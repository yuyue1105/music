import { request } from '@umijs/max';

export async function templateListApi(
  params: any,
  options?: { [key: string]: any },
) {
  return request<any>('/api/v1/template/list', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}` || '',
    },
    params,
    ...(options || {}),
  });
}

export async function templateDetailApi(
  id: any,
  options?: { [key: string]: any },
) {
  return request<any>(`/api/v1/template/detail/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}` || '',
    },
    ...(options || {}),
  });
}

export async function templateAddApi(
  params?: any,
  options?: any,
) {
  return request<any>('/api/v1/template/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}` || '',
    },
    data: params,
    ...(options || {}),
  });
}

export async function templateUpdateApi(
  params: any,
  options?: any,
) {
  return request<any>(`/api/v1/template/update`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}` || '',
    },
    data: params,
    ...(options || {}),
  });
}

export async function templateDeleteApi(
  data: any,
  options?: any,
) {
  return request<any>(`/api/v1/template/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}` || '',
    },
    data,
    ...(options || {}),
  });
}

export async function templateUploadApi(
  params: any,
  options?: any,
) {
  return request<any>(`/api/v1/template/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}` || '',
    },
    data: { ...params },
    ...(options || {}),
  });
}

export async function templateExportApi(
  params: any,
  options?: any,
) {
  return request<any>(`/jx-zzy-wms-service/stock/export`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${localStorage.getItem('token')}` || '',
    },
    data: { ...params },
    ...(options || {}),
    responseType: 'blob',
    getResponse: true,
  });
}