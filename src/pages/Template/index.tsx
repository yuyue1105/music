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
import audio1 from "@/assets/audio/LBI利比 - 跳楼机.mp3"

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
  } = useModel('Template.model');

  const onClickGet = useCallback(async () => {
    try {
      const response = await templateGetApi({...serviceParamsGet});
      if (response?.code === 200) {
        message.success('操作成功');
      } else {
        message.error(response.msg || '操作失败');
      }
    } catch (error) {
      message.error('系统异常');
    }
  },[serviceParamsGet]);

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
    <div className={styles.global}>
        <div className={styles.left}>
          <div className={styles.name}></div>
          <div className={styles.line}></div>
          <div className={styles.list}>
            <div className = {styles.text}>推荐</div>
          </div>
          <div className={styles.list}>
            <div className = {styles.text}>喜欢</div>
          </div>
          <div className={styles.list}>
            <div className = {styles.text}>收藏</div>
          </div>
        </div>
        <div className={styles.right}>
          <audio controls className = {styles.audio}>
            <source src={audio1}></source>
          </audio>
        </div>
    </div>
  );
};
