import { templatePostApi, templateGetApi, templateDeleteApi, templatePutApi} from './api';
import {
  ProSkeleton,
} from '@ant-design/pro-components';
import { Button, ConfigProvider, message } from 'antd';
import React, { useRef, useState ,useCallback, useEffect} from 'react';
import { useModel } from '@umijs/max';
import TemplateComponentPrivate from './components/TemplateComponentPrivate';
import TemplateComponentCommon from '@/components/TemplateComponentCommon';
import styles from './index.less';
import music from '@/utils/music';
import { render } from '@react-three/fiber';
import Item from 'antd/es/list/Item';
import { Input, Space } from 'antd';
import { Progress } from 'antd';
import { Slider, Switch } from 'antd';



export default () => {
  const {
    musicIndex,
    setMusicIndex,
    currentSong,
    setCurrentSong,
    currentSonger,
    setCurrentSonger,
    isPlaying,
    setIsPlaying,
    name,
    setName,
    nowTime,
    setNowTime,
    musicList,
    setMusicList,
    progressPercent,
    setProgressPercent,
    volume,
    setVolume,
    duration,
    setDuration
    

  } = useModel('Template.model');

  //播放暂停键
  const onClickStopAndStart = useCallback(() =>{
    const audioPlayer:any = document.getElementById('audioPlayer');
    if(currentSong==="暂无播放-暂无歌手.MP3"){
      setIsPlaying(false)
    }else{
      if(isPlaying===true){
        audioPlayer.pause();
        setIsPlaying(false)
      }else{
        audioPlayer.play();
        setIsPlaying(true)
      }
    }
  },[isPlaying, setIsPlaying, currentSong]);
  const { Search } = Input;
  const updateProgress = useCallback((e) => {
    const { duration, currentTime } = e.target;
    
    if (duration) {
        const progressPercent = (currentTime / duration) * 100;
        setDuration(duration)
        setProgressPercent(progressPercent)
        if(progressPercent === 100){
          onClickStopAndStart()
        }
    }
    
  },[onClickStopAndStart, setDuration, setProgressPercent]);

  const onSearch = useCallback((value: string) => {
    let newMusicList:any=[]
    for(let index = 0; index < music?.length; index++){
      if(music[index].indexOf(value)!== -1){
        newMusicList.push(music[index])
      }
    }
    setMusicList([...newMusicList])
    let hasIndex=false;
    for(let index = 0; index < newMusicList?.length; index++){
      
      if(newMusicList[index] === currentSong){
        hasIndex=true
        setMusicIndex(index)
      }
    }
    if(hasIndex === false){
      setMusicIndex(null)
    }
    
  },[currentSong, setMusicIndex, setMusicList]);

  const App: React.FC = () => ( <Progress percent={70} status="exception" />);
//进度
  const onChange = (value: number ) => {
    const audioPlayer:any = document.getElementById('audioPlayer');
    audioPlayer.currentTime = (value / 100) * duration;
  };
/*选歌*/
  const onClickDo = useCallback((index:any) => {
    setIsPlaying(true)
    setCurrentSong(musicList[index])
    setMusicIndex(index)
  },[musicList, setCurrentSong, setIsPlaying, setMusicIndex]);
/*歌曲列表 */
  const forCirlce = useCallback(() => {
    let returnValue:any=[];
    for (let index = 0; index < musicList?.length; index++) {
      let text = musicList[index].split('-')[0 ]
      let name = musicList[index].split('-')[1 ]
      if(text.length > 8){
        returnValue.push(
          <div className={musicIndex===index?`${styles.list} ${styles.listSelect}`:styles.list}>
            <div className = {styles.textLeftBig} onClick={()=>onClickDo(index)} >
              {text}<strong><div className={styles.songerName}>{name.split('.')[0]}</div></strong>
            </div>
          </div>
        )
      }else{
        returnValue.push(
          <div className={musicIndex===index?`${styles.list} ${styles.listSelect}`:styles.list}>
            <div className = {styles.textLeftSmall} onClick={()=>onClickDo(index)} >
              {text}<strong><div className={styles.songerName}>{name.split('.')[0]}</div></strong>
            </div>
          </div>
        )
      }
    }
    return returnValue        
  },[musicIndex, musicList, onClickDo]);

/*下一首 */
  const onClickNext = useCallback(() => {
    if(musicIndex + 1 < (music.length)){
      onClickDo(musicIndex + 1)
    }else{
      onClickDo(0)
    }    
  },[musicIndex, onClickDo]);
//上一首
  const onClickLast = useCallback(() => {
    if(musicIndex - 1 >= (0)){
      onClickDo(musicIndex - 1)    
    }else{
      onClickDo(music.length - 1)
    }
  },[musicIndex, onClickDo]);
/*换暂停开始图标*/
  const renderStopAndStart=useCallback(() =>{
    if(isPlaying===true){
      return <img onClick={()=>onClickStopAndStart()} className={styles.stopAndStart} src="./image/stop.png" alt="" />
    }else{
      return <img onClick={()=>onClickStopAndStart()} className={styles.stopAndStart} src="./image/start.png" alt="" />
    }
 
    
  },[isPlaying, onClickStopAndStart]);
  const volumeBar = document.getElementById('volume-bar');
/*歌曲名显示*/
  const renderSongName=useCallback(()=>{
    if(musicList?.length>0){
      let returnChoose:any = [];
      let lastSong:any = musicList[musicIndex - 1];
      let nextSong:any = musicList[musicIndex + 1];
      returnChoose.push(
        <div>
          <div className={styles.near1}><strong>上一首：</strong>{lastSong}</div>
          <div className={styles.near2}><strong>下一首：</strong>{nextSong}</div>
          <div className={styles.songName}><strong>{currentSong.split('-')[0 ]}</strong></div>
          <div className={styles.songerName}>{currentSong.split('-')[1].split('.')[0]}</div>
        </div>
      )
      return returnChoose
    }

  },[musicList, musicIndex, currentSong])

  const onClickOne=useCallback(()=>{
    setNowTime('one')
  },[setNowTime])
  const onClickNowTime=useCallback(()=>{
    setNowTime('allNext')
  },[setNowTime])
  const onClickRandom=useCallback(()=>{
    setNowTime('random')
  },[setNowTime])
  //播放顺序
  const renderNowTime=useCallback(()=>{
    if(nowTime==='random'){
      return <div className={styles.picture}><img onClick={()=>onClickOne()} className={styles.nowTime} src="./image/one.png" alt="" /></div>
    }else
    if(nowTime==='one'){
      return <div className={styles.picture}><img onClick={()=>onClickNowTime()} className={styles.nowTime} src="./image/allNext.png" alt="" /></div>
    }else{
      return <div className={styles.picture}><img onClick={()=>onClickRandom()} className={styles.nowTime} src="./image/random.png" alt="" /></div>
    }
    
  },[nowTime, onClickNowTime, onClickOne, onClickRandom])
  return (
    <div className={styles.global}>
        <div className={styles.leftOut}>
          <div className={styles.left}>
            <div className={styles.nameTop}></div>
            <div className={styles.name}><strong>列表</strong></div>
            <div className={styles.line}></div>
            <div className={styles.musicOut}>{forCirlce()}</div>
          </div>
          <div className={styles.dock2}>
            <Search 
              className={styles.search111} 
              placeholder="input search text" 
              onSearch={onSearch} 
              style={{ width: 200 ,marginTop: '24px',marginLeft: '20px'}} 
            />
          </div>
        </div>
        
        <div className={styles.right}>
          <audio id="audioPlayer" controls className = {styles.audio} key={currentSong} autoPlay 
            onTimeUpdate={(e)=>updateProgress(e)}
          >
            <source src={`./music/${currentSong}`}></source>
          </audio> 

          <div className={styles.outLine}>
            <div className={styles.textRightName}>
              <strong>播放器</strong>
            </div>
            {renderSongName()}
            
          </div>
          <div className={styles.dock}>
            <div className={styles.jinDuTiao}>
     
                <Slider value={progressPercent} tooltip={{ formatter: null }} onChange={onChange} step={0.00001} />
        
            </div>
            <div className={styles.forOverflow}>
              <div className={styles.dockBar}>
                <div className={styles.nowDockBar}></div>
              </div>
              <div>{renderNowTime()}</div>
              <img onClick={()=>onClickLast()} className={styles.last} src="./image/last.png" alt="" />
              {renderStopAndStart()}
              <img onClick={()=>onClickNext()} className={styles.next} src="./image/next.png" alt="" />
              
              <div className={styles.volume}>
                <img className={styles.icon} src="./image/volume.png" alt="" />
              </div>
            </div>
            
          </div>
        </div>
    </div>
  )
};