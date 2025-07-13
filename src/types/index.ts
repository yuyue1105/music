import React, { useRef, useState ,useCallback , useMemo} from 'react';

export type EventTracking = {
  userId: string; //用户id。普通字符串
  userName: string; //用户名。普通字符串
  
  pageType: string,  // android 、androidH5、ios 、iosH5、browserH5、taro、taroH5、electron，electronH5。普通字符串
  pageRouter: string,  //页面地址。普通字符串
  deviceInfo: string,  //手机信息。json字符串
  browserInfo: string,  //浏览器信息。json字符串
  appVersion: string,  //app版本信息。普通字符串
  appPermission: string,  //app当前权限信息。json字符串
  
  functionPath: string,  //方法所在文件。普通字符串
  functionName: string,  //方法名。普通字符串
  functionParams : string,  //方法参数。json字符串
  functionResult: string,  //方法执行结果。json字符串
  functionCatch: string,  //方法执行异常信息。普通字符串
  functionStartTime: string,  //方法开始执行时间，年月日时分秒毫秒。普通字符串
  functionEndTime: string,  //方法结束执行时间，年月日时分秒毫秒。普通字符串
  
  eventType: string,  //一个业务流。普通字符串
  otherInfo: string, //其他有用的信息。json字符串
}
