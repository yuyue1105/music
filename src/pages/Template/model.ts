// 全局共享数据示例
import { DEFAULT_NAME } from '@/constants';
import { useState } from 'react';
import { NoToneMapping } from 'three';
import music from '@/utils/music';
export default () => {
  const [musicIndex, setMusicIndex] = useState<any>(99999);
  const [currentSong, setCurrentSong] = useState<any>("暂无播放-暂无歌手.MP3");
  const [currentSonger, setCurrentSonger] = useState<any>({
    songerName:'done',
  });
  const [isPlaying, setIsPlaying] = useState<any>(false);
  let [name, setName] = useState<any>();
  let [nowTime, setNowTime] = useState<any>('one');
  let [musicList, setMusicList] = useState<any>(music);
  let [progressPercent,setProgressPercent] = useState<any>(0.0);
  let [audioPlayer,setAudioPlayer] = useState<any>(0);
  let [volume,setVolume] = useState<any>(0);
  let [duration,setDuration] = useState<any>(0);
  return {
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
    audioPlayer,
    setAudioPlayer,
    volume,
    setVolume,
    duration,
    setDuration
  }
};