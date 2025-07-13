import { templatePostApi, templateGetApi, templateDeleteApi, templatePutApi} from './api';
import {
  ProSkeleton,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useRef, useState ,useCallback} from 'react';
import { useModel } from '@umijs/max';
import TemplateComponentPrivate from './components/TemplateComponentPrivate';
import TemplateComponentCommon from '@/components/TemplateComponentCommon';
import styles from './index.less';
import dayjs from 'dayjs';
import { EventTracking } from '@/types';
const functionPath=JSON.stringify('src/pages/TemplateEventTracking/index.tsx');

export default () => {
  const {
    eventTracking,
    eventTrackingEmit,
  } = useModel('global');
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
  } = useModel('TemplateEventTracking.model');

  const onClickGet = useCallback(async () => {
    const eventTrackingCurrent:EventTracking={
      ...eventTracking,
      functionPath,
      functionName:'onClickGet',
      functionStartTime:dayjs().format('YYYY-MM-DD HH:mm:ss'),
    }
    try {
      eventTrackingCurrent.functionParams=JSON.stringify({...serviceParamsGet});
      const response = await templateGetApi({...serviceParamsGet});
      eventTrackingCurrent.functionResult=JSON.stringify(response);
      if (response?.code === 200) {
        message.success('操作成功');
      } else {
        message.error(response.msg || '操作失败');
      }
    } catch (error) {
      eventTrackingCurrent.functionCatch=JSON.stringify(error);
      message.error('系统异常');
    } finally {
      eventTrackingEmit({
        ...eventTrackingCurrent,
        functionEndTime:dayjs().format('YYYY-MM-DD HH:mm:ss'),
      })
    }
  },[eventTracking, eventTrackingEmit, serviceParamsGet]);

  const onClickPost =  useCallback(async () => {
    try {
      const response = await templatePostApi({ ...serviceParamsPost });
      if (response?.code === 200) {
        message.success('操作成功');
      } else {
        message.error(response.msg || '操作失败');
      }
    } catch (error) {
      message.error('系统异常');
    }
  },[serviceParamsPost]);

  const onClickPut = useCallback(async () => {
    try {
      const response = await templatePutApi({...serviceParamsPut});
      if (response?.code === 200) {
        message.success('操作成功');
      } else {
        message.error(response.msg || '操作失败');
      }
    } catch (error) {
      message.error('系统异常');
    }
  },[serviceParamsPut]);

  const onClickDelete = useCallback(async () => {
    try {
      const response =await templateDeleteApi({...serviceParamsDelete});
      if (response?.code === 200) {
        message.success('操作成功');
      } else {
        message.error(response.msg || '操作失败');
      }
    } catch (error) {
      message.error('系统异常');
    }
  },[serviceParamsDelete]);

  return (
    <div>
      <Button
        type="primary"
        onClick={()=>onClickGet()}
      >
        onClickGet
      </Button>
      <Button
        type="primary"
        onClick={()=>onClickPost()}
        className={styles.gap}
      >
        onClickPost
      </Button>
      <Button
        type="primary"
        onClick={()=>onClickPut()}
        className={styles.gap}
      >
        onClickPut
      </Button>
      <Button
        type="primary"
        onClick={()=>onClickDelete()}
        className={styles.gap}
      >
        onClickDelete
      </Button>
      <TemplateComponentPrivate />
      <TemplateComponentCommon />
      <ProSkeleton type="list" />
    </div>
  );
};