// 全局共享数据示例
import { DEFAULT_NAME } from '@/constants';
import { useState } from 'react';

export default () => {
  const [serviceParamsGet, setServiceParamsGet] = useState<any>({
    paramsGet:'get',
  });
  const [serviceParamsPost, setServiceParamsPost] = useState<any>({
    paramsPost:'post',
  });
  const [serviceParamsPut, setServiceParamsPut] = useState<any>({
    paramsPut:'put',
  });
  const [serviceParamsDelete, setServiceParamsDelete] = useState<any>({
    paramsDelete:'delete',
  });
  const [componentParamsPrivate, setComponentParamsPrivate] = useState<any>({
    test:1,
  });
  return {
    serviceParamsGet,
    setServiceParamsGet,
    serviceParamsPost,
    setServiceParamsPost,
    serviceParamsPut,
    setServiceParamsPut,
    serviceParamsDelete,
    setServiceParamsDelete,
    componentParamsPrivate,
    setComponentParamsPrivate
  };
};