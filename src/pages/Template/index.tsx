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
import music from '@/utils/music'

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
    setComponentParamsPrivate,
    musicIndex,
    setMusicIndex,
    currentSong,
    setCurrentSong,
    currentSonger,
    setCurrentSonger

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
        <div className={styles.leftOut}>
          <div className={styles.left}>
            <div className={styles.nameTop}></div>
            <div className={styles.name}><strong>列表</strong></div>
            <div className={styles.line}></div>
            <div className={styles.list}>
              <div className = {styles.textLeft}>推荐</div>
            </div>
            <div className={styles.list}>
              <div className = {styles.textLeft}>喜欢</div>
            </div>
            <div className={styles.list}>
              <div className = {styles.textLeft}>收藏</div>
            </div>
          </div>
          <div className={styles.dock2}></div>
        </div>
        
        <div className={styles.right}>
          {/* {music[musicIndex]}
          <audio controls className = {styles.audio}>
            <source src={`./music/${music[musicIndex]}`}></source>
          </audio> */}
          <div className={styles.outLine}>
            <div className={styles.textRightName}>
              <strong>播放器</strong>
            </div>
          </div>
          <div className={styles.dock}>
            <div className={styles.forOverflow}>
              <div className={styles.dockBar}>
                <div className={styles.nowDockBar}></div>
              </div>
              <div className={styles.nowTime}></div>
              <div className={styles.random}></div>
              <div className={styles.last}></div>
              <div className={styles.stopAndStart}></div>
              <div className={styles.next}></div>
              <div className={styles.restart}></div>
              <div className={styles.volume}></div>
            </div>
          </div>
        </div>
    </div>
  );
};
