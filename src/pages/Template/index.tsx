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
    setCurrentSonger,
    isPlaying,
    setIsPlaying

  } = useModel('Template.model');

  const onClickDo = useCallback(async (item) => {
    setIsPlaying(true)
    setCurrentSong(item)
  },[setCurrentSong, setIsPlaying]);

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
  },[onClickDo]);
  const onClickStopAndStart = useCallback(() =>{
    const audioPlayer:any = document.getElementById('audioPlayer');
    if(isPlaying===true){
      audioPlayer.pause();
      setIsPlaying(false)
    }else{
      audioPlayer.play();
      setIsPlaying(true)
    }
    console.log("333")
    
  },[isPlaying, setIsPlaying]);

  const renderStopAndStart=useCallback(() =>{
    if(isPlaying===true){
      return <img onClick={()=>onClickStopAndStart()} className={styles.stopAndStart} src="./image/stop.png" alt="" />
    }else{
      return <img onClick={()=>onClickStopAndStart()} className={styles.stopAndStart} src="./image/start.png" alt="" />
    }
 
    
  },[isPlaying, onClickStopAndStart]);

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
          <audio id="audioPlayer" controls className = {styles.audio} key={currentSong} autoPlay>
            <source src={`./music/${currentSong}`}></source>
          </audio> 

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
              <img className={styles.last} src="./image/last.png" alt="" />
              {renderStopAndStart()}
              
              
              <img className={styles.next} src="./image/next.png" alt="" />
              <div className={styles.volume}>
                <img className={styles.icon} src="./image/volume.png" alt="" />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
};