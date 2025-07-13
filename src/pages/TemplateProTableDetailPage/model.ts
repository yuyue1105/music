import type { ActionType, Key, ProFormInstance } from '@ant-design/pro-components';
import { Form, message } from 'antd';
import { useCallback, useRef, useState } from 'react';
import { templateDetailApi } from './api';

export default () => {
  const refLayoutContent=useRef<any>();
  const refLoading= useRef<any>(false);
  const refEditableFormMember=useRef<any>();
  const [formDetail] = Form.useForm(); // 详情form的ref

  const [loading, setLoading] = useState(false);
  const [record, setRecord] = useState<any>({});
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  const init = useCallback(() => {
    setRecord({});
    setEditableRowKeys([]);
  },[]);

  const setRefAndStateLoading = useCallback((newValue) => {
    refLoading.current=newValue;
    setLoading(newValue);
  },[]);

  const templateDetail = useCallback(async (id: any) => {
    try {
      setRefAndStateLoading(true);
      const response = await templateDetailApi(id);
      if (response?.code === 200) {
        setRecord(response?.data)
        setEditableRowKeys(() =>response?.data?.member?.map((item) => item.id))
      } else {
        message.error(response?.msg || '获取详情失败');
      }
    } catch (error) {
      message.error('系统异常');
    } finally {
      setRefAndStateLoading(false);
    }
  }, [setRefAndStateLoading]);

  return {
    refLayoutContent,
    refLoading,
    refEditableFormMember,
    formDetail,
    loading, setLoading,
    record, setRecord,
    editableKeys, setEditableRowKeys,
    init,
    setRefAndStateLoading,
    templateDetail,
  };
};
