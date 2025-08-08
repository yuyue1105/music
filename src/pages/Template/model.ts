// 全局共享数据示例
import { DEFAULT_NAME } from '@/constants';
import { useState } from 'react';
import { NoToneMapping } from 'three';

export default () => {
  const [musicIndex, setMusicIndex] = useState<any>(1);
  const [currentSong, setCurrentSong] = useState<any>("暂无播放-暂无歌手.MP3");
  const [currentSonger, setCurrentSonger] = useState<any>({
    songerName:'done',
  });
  const [isPlaying, setIsPlaying] = useState<any>(false);
  let [name, setName] = useState<any>();
  let [nowTime, setNowTime] = useState<any>('one');
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
    setNowTime
  };
};