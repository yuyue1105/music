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
import music from '@/utils/music';


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



  const onClickDo = useCallback(async (item) => {
    console.log('33333333333333333',item)
    setCurrentSong(item)
  },[serviceParamsDelete]);

  const forCirlce = useCallback(() => {
    let returnValue:any=[];
    for (let index = 0; index < music.length; index++) {
      returnValue.push(
        <div className={styles.list}>
          <div className = {styles.textLeft} onClick={()=>onClickDo(music[index])}>
            {music[index].split('-')[0 ]}
          </div>
        </div>
      )
    }
    return returnValue        
  },[]);

  
  const renderMusic = useCallback(() => {
    console.log('fffffffffffff',currentSong,`./music/${currentSong}`)
    const audioPath = require(`./music/${currentSong}`).default;
    return           <audio controls className = {styles.audio}>
            <source src={audioPath}></source>
          </audio>        
  },[currentSong]);

  return (
    <div className={styles.global}>
        <div className={styles.leftOut}>
          <div className={styles.left}>
            <div className={styles.nameTop}></div>
            <div className={styles.name}><strong>列表</strong></div>
            <div className={styles.line}></div>
            <div className={styles.musicOut}>{forCirlce()}</div>
          </div>
          <div className={styles.dock2}></div>
        </div>
        
        <div className={styles.right}>
          {renderMusic()}

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
