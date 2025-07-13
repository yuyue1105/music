import { loginApi, templateGetApi, templateDeleteApi, templatePutApi, getCurrentUserApi } from './api';
import {
  ProSkeleton,
} from '@ant-design/pro-components';
import { Button, Checkbox, Form, Input,message } from 'antd';
import React, { useRef, useState ,useCallback} from 'react';
import { useModel,history } from '@umijs/max';
import TemplateComponentPrivate from './components/TemplateComponentPrivate';
import TemplateComponentCommon from '@/components/TemplateComponentCommon';
import styles from './index.less';

export default () => {
  const {
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
  } = useModel('Login.model');

  const onFinish =  useCallback(async (values) => {
    const hide = message.loading('正在登录');
    try {
      const response:any=await loginApi({ ...values });
      if (response?.code === 200) {
        const { access_token } = response.data;
        localStorage.setItem('userInfo', JSON.stringify(response.data));
        localStorage.setItem('token', `Bearer ${access_token}`);
        const token = localStorage.getItem('token');
        if (token) {
          const res = await getCurrentUserApi();
          if (res?.code === 200) {
            localStorage.setItem('currentUserInfo', JSON.stringify(res.data));
          }
        }
        history.push('/templateProTable');
        message.success('登录成功');
      } else {
        message.error(response.msg || '登录失败');
      }
      hide();
    } catch (error) {
      hide();
      message.error('登录失败');
    }
  },[]);

  const onFinishFailed = (errorInfo: any) => {
  };

  return (
    <div className={styles.global}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
      >
        <Form.Item
          label="会员名"
          name="member"
          rules={[{ required: true, message: '请输入会员名!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
