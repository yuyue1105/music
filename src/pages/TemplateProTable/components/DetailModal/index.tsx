import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useModel } from '@umijs/max';
import { message, Modal, notification, Form, Button, Spin } from 'antd';
import { ProForm, ProFormDateTimePicker, ProFormDigit, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { templateAddApi, templateUpdateApi } from '../../api';
import styles from './index.less';
import { getDetailTitle } from '@/utils';

export default () => {
  const {
    refAction,
    formDetail,
    detail, setDetail,
  } = useModel('TemplateProTable.model');

  const refLoading= useRef(false);
  const [loading, setLoading] = useState(false);
  const setRefAndStateLoading = useCallback((newValue) => {
    refLoading.current=newValue;
    setLoading(newValue);
  },[]);
  
  useEffect(()=>{
    if(detail?.visible){
      formDetail.setFieldsValue({
        ...detail?.record,
      })
    }
  },[detail?.record, detail?.visible, formDetail])

  const onClickCancel = useCallback(() => {
    setDetail((prev)=>{
      return {
        ...prev,
        visible:false,
      }
    });
  },[setDetail]);

  const onFinish = useCallback(async (values) => {
    try {
      if(refLoading?.current) return;
      setRefAndStateLoading(true);
      let response;
      if(detail?.status==='add'){
        response=await templateAddApi({ ...values })
      }else{
        response=await templateUpdateApi({ 
          ...detail?.record,
          ...values 
        })
      }
      if (response?.code === 200) {
        message.success('操作成功');
        onClickCancel();
        refAction.current?.reload();
      } else {
        message.error(response?.msg || '操作失败');
      }
    } catch (error) {
      message.error('系统异常');
    } finally {
      setRefAndStateLoading(false);
    }
  },[detail?.record, detail?.status, onClickCancel, refAction, setRefAndStateLoading]);
  
  const onFinishFailed = useCallback((errorInfo) => {
    console.log(errorInfo);
  },[]);

  const differentStatusProFormParams:any = useMemo(() => {
    if(detail?.status==='look'){
      return {
        readonly:true,
      }
    }else{
      return {
      }
    }
  },[detail?.status]);

  const differentStatusItemParams:any = useMemo(() => {
    if(detail?.status==='look'){
      return {
        labelCol:{ span: 12 },
        wrapperCol:{ span: 12 }
      }
    }else{
      return {
      }
    }
  },[detail?.status]);

  return (
    <Modal
      open={detail?.visible}
      title={getDetailTitle(detail?.status)}
      onCancel={onClickCancel}
      footer={null}
      maskClosable={detail?.status==='look'?true:false}
      afterClose={() => {
        formDetail.resetFields();
      }}
    >
      <Spin spinning={loading}>
        <ProForm
          form={formDetail}
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          submitter={false}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          {...differentStatusProFormParams}
        >
          <ProFormText 
            label="姓名"
            name="name"
            rules={detail?.status==='look'?[]:[{ required: true }]} 
            {...differentStatusItemParams}
          />
          <ProFormSelect
            label="性别"
            name="sex"
            options={[
              {
                label: '女',
                value: '0',
              },
              {
                label: '男',
                value: '1',
              },
            ]}
            rules={detail?.status==='look'?[]:[{ required: true }]} 
            {...differentStatusItemParams}
          />
          <ProFormDateTimePicker
            label="出生日期"
            name="birthTime"
            fieldProps={{
              className:styles.fitWidth,
            }}
            rules={detail?.status==='look'?[]:[{ required: true }]} 
            {...differentStatusItemParams}
          />
          <ProFormDigit
            label="年龄"
            name="age"
            fieldProps={{
              min: 0,
              className:styles.fitWidth,
            }}
            rules={detail?.status==='look'?[]:[{ required: true }]} 
            {...differentStatusItemParams}
          />
          {detail?.status!=='look'&&(<div
            className={styles.button}
          >
            <Button onClick={onClickCancel}>
              取消
            </Button>
            <Button type="primary" htmlType="submit" className={styles.submit}>
              确认提交
            </Button>
          </div>)}
        </ProForm>
      </Spin>
    </Modal>
  );
};

