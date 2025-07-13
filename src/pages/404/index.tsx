import React, { useRef, useState ,useCallback} from 'react';
import { Button, Result } from "antd";
import { history  } from "@umijs/max";
import Icon404 from '@/assets/icon/icon404.png'
import { routes  } from '../../../routes';
import GlobalTitleBar from '@/components/GlobalTitleBar';
import styles from './index.less';
import { goHome } from '@/utils';

export default () => {
  const onClickExtra = useCallback(()=>{
    goHome()
  },[])
  return (
    <div className={styles.root}>
      <GlobalTitleBar />
      <div className={styles.content}>
        <Result
          icon={<img src={Icon404} />}
          subTitle={<span className={styles.subTitle} >啊哦，您访问的页面不存在，返回首页</span>}
          extra={<Button type="primary" onClick={onClickExtra}>返回首页</Button>}
        />
      </div>
    </div>
  )
}