import {
  ProSkeleton,
} from '@ant-design/pro-components';
import { Link,history } from 'umi';
import { Layout, Dropdown, Menu,Avatar } from 'antd';
import { CaretDownOutlined, LogoutOutlined, UserOutlined,HomeOutlined} from '@ant-design/icons';
import React, { useRef, useState ,useCallback,useMemo} from 'react';
import styles from './index.less';
import Logo from '@/assets/icon/logo.png';
import Home from '@/assets/icon/home.png';
import UserIconDown from '@/assets/icon/userIconDown.png';
import IconUser from '@/assets/icon/iconUser.png';
import { goHome, goLogin } from '@/utils';

export default () => {

  const items = useMemo(() => {
    return [{
      key:'1',
      label: (
        <div
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('userInfo');
            localStorage.removeItem('currentUserInfo');
            goLogin();
          }}
        >
          <LogoutOutlined />
          退出登录
        </div>
      )
    }]
  },[]);

  const currentUserInfo:any=localStorage.getItem('currentUserInfo') ? JSON.parse(localStorage.getItem('currentUserInfo')||'') : null;  

  return (
    <div className={styles.global}>
      <img src={Logo} className={styles.logo} />
      <div className={styles.home} onClick={()=>goHome()}>
        <img src={Home} className={styles.homeIcon} />
        <span className={styles.homeText}>主页</span>
      </div>
      <Dropdown menu={{items}}>
        <div className={styles.user}>
          <Avatar 
            className={styles.userIcon} 
            src={currentUserInfo?.pic||IconUser}
            size={30}
          >
          </Avatar>
          <div className={styles.userText}>
            欢迎您，{currentUserInfo?.alias}
          </div>
          <img src={UserIconDown} className={styles.userDownText} />
        </div>
      </Dropdown>
    </div>
  );
};
