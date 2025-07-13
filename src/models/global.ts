// 全局共享数据示例
import { DEFAULT_NAME } from '@/constants';
import { eventTrackingApi } from '@/services';
import { EventTracking } from '@/types';
import React, { useRef, useState ,useCallback , useMemo} from 'react';
interface TagViewProps {
  id: string,
  url: string,
  name: string,
  outlet?: any,
  active: boolean,
  refresh: number
}
export default () => {
  const refLayoutContent=useRef<any>();
  const [name, setName] = useState<string>(DEFAULT_NAME);
  const [resourceTreeByAppCode, setResourceTreeByAppCode] = useState<any>([])
  const [targetPath, setTargetPath] = useState<any>([])
  const [sideMenuSelectedKeys, setSideMenuSelectedKeys] = useState<any>([]);
  const [sideMenuOpenKeys, setSideMenuOpenKeys] = useState<any>([]);
  const [tagViewList, setTagViewList] = useState<TagViewProps[]>([])
  
  const eventTracking:EventTracking = useMemo(()=>{
    return {
      userId: '通过方法获取userId',
      userName: '通过方法获取userName',
      
      pageType: '通过方法获取pageType',
      pageRouter: '通过方法获取pageRouter',
      deviceInfo: '通过方法获取deviceInfo',
      browserInfo: '通过方法获取browserInfo',
      appVersion: '通过方法获取appVersion',
      appPermission: '通过方法获取appPermission',
      
      functionPath: '',
      functionName: '',
      functionParams : '',
      functionResult: '',
      functionCatch: '',
      functionStartTime: '',
      functionEndTime: '',
      
      eventType: '',
      otherInfo: '',
    }
  },[])

  const eventTrackingEmit = useCallback(async (params:EventTracking)=>{
    try {
      const response = await eventTrackingApi({
        ...params,
      }) 
    } catch (error) {
      console.log(error);
    }
  },[])
  
  return {
    refLayoutContent,
    name,setName,
    resourceTreeByAppCode, setResourceTreeByAppCode,
    targetPath, setTargetPath,
    sideMenuSelectedKeys, setSideMenuSelectedKeys,
    sideMenuOpenKeys, setSideMenuOpenKeys,
    tagViewList, setTagViewList,
    eventTracking,
    eventTrackingEmit,
  };
};