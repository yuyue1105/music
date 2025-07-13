import type { ActionType, Key, ProFormInstance } from '@ant-design/pro-components';
import { Form, message } from 'antd';
import { useCallback, useRef, useState } from 'react';
import { templateDetailApi } from './api';

export default () => {
  const refAction = useRef<ActionType>(); // 表格的ref
  const refForm = useRef<ProFormInstance>(); // 表格form的ref
  const [formDetail] = Form.useForm(); // 详情form的ref
  const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([])
  const [detail, setDetail] = useState<any>({
    visible:false,
    status:'',
    record:{},
  });
  const [searchParams, setSearchParams] = useState<any>({});
  const [searchSorter, setSearchSorter] = useState<any>({});

  return {
    refAction,
    refForm,
    formDetail,
    selectedRowKeys,setSelectedRowKeys,
    detail, setDetail,
    searchParams, setSearchParams,
    searchSorter, setSearchSorter,
  };
};
