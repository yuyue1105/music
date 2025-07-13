import { Dispatch, SetStateAction, useCallback, useEffect, useMemo, useRef, useState } from "react";
import styles from './index.less';
import { useLocation, history , useModel ,useOutlet} from '@umijs/max';
import { CloseOutlined } from "@ant-design/icons";
import LeftArrow from "@/assets/icon/tagView/leftArrow.png";
import RightArrow from '@/assets/icon/tagView/rightArrow.png';
import Reload from '@/assets/icon/tagView/reload.png';
import More from '@/assets/icon/tagView/more.png';
import MoreReload from '@/assets/icon/tagView/moreReload.png';
import MoreCloseCurrent from '@/assets/icon/tagView/moreCloseCurrent.png';
import MoreCloseLeft from '@/assets/icon/tagView/moreCloseLeft.png';
import MoreCloseRight from '@/assets/icon/tagView/moreCloseRight.png';
import MoreCloseOthers from '@/assets/icon/tagView/moreCloseOthers.png';
import MoreCloseAll from '@/assets/icon/tagView/moreCloseAll.png'
import {routes} from '../../../routes';
import { Popover } from "antd";

export default (props) => {
  const { menuItems } = props
  const {
    refLayoutContent,
    sideMenuSelectedKeys, setSideMenuSelectedKeys,
    tagViewList, setTagViewList,
  } = useModel('global')
  const outlet = useOutlet()

  // 跳转路由
  const openTag = useCallback((item) => {
    history.push(item.url.split('#')[1])
    if (item.id) {
      setSideMenuSelectedKeys(item.id)
    }
  }, [setSideMenuSelectedKeys])

  // 重新加载
  const reload = useCallback(() => {
    let newTagViewList=[...tagViewList]
    for(let i=0;i<newTagViewList.length;i++){
      if (newTagViewList[i].active) {
        newTagViewList[i]={
          ...newTagViewList[i],
          refresh:newTagViewList[i].refresh + 1
        }
      }
    }
    setTagViewList(newTagViewList)
  },[setTagViewList, tagViewList])

  // 关闭标签页
  const closeCurrent = useCallback(() => {
    if (tagViewList.length === 1) return;
    let index = 0 // 当前页索引
    for (let i = 0; i < tagViewList.length; i++) {
      if (tagViewList[i].active) {
        index = i
        tagViewList[i].active = false
        const next = i === 0 ? tagViewList[i + 1] : tagViewList[i - 1]
        next.active = true
        openTag(next)
        break
      }
    }
    setTagViewList(tagViewList.filter((_, i) => index !== i))
  },[openTag, setTagViewList, tagViewList])

  // 关闭左侧标签页
  const closeLeft = useCallback(() => {
    setTagViewList(tagViewList.filter((_, index) => index >= tagViewList.findIndex(item => item.active)) )
  },[setTagViewList, tagViewList])

  // 关闭右侧标签页
  const closeRight = useCallback(() => {
    setTagViewList(tagViewList.filter((_, index) => index <= tagViewList.findIndex(item => item.active)) )
  },[setTagViewList, tagViewList])

  // 关闭其他标签页
  const closeOthers = useCallback(() => {
    setTagViewList(tagViewList.filter((_, index) => index === tagViewList.findIndex(item => item.active)) )
  },[setTagViewList, tagViewList])

  // 关闭全部标签页
  const closeAll = useCallback(() => {
    tagViewList[0].active = true
    openTag(tagViewList[0])
    setTagViewList(tagViewList.filter((_, index) => index === 0))
  },[openTag, setTagViewList, tagViewList])

  const moreOprationList = useMemo(()=>[
    {name: '重新加载', icon: MoreReload, onClick: reload},
    {name: '关闭标签页', icon: MoreCloseCurrent, onClick: closeCurrent},
    {name: '关闭左侧标签页', icon: MoreCloseLeft, onClick: closeLeft},
    {name: '关闭右侧标签页', icon: MoreCloseRight, onClick: closeRight},
    {name: '关闭其他标签页', icon: MoreCloseOthers, onClick: closeOthers},
    {name: '关闭全部标签页', icon: MoreCloseAll, onClick: closeAll},
  ],[closeAll, closeCurrent, closeLeft, closeOthers, closeRight, reload])
  
  // 关闭标签
  const closeTag = useCallback((item) => {
    // 判断关闭标签是否处于打开状态
    tagViewList.forEach((el, i) => {
      if (el.url === item.url && item.active ) {
        const next = i === 0 ? tagViewList[i + 1] : tagViewList[i - 1]
        next.active = true
        openTag(next)
      }
    })
    setTagViewList(tagViewList.filter(el => el.url !== item.url))
  }, [openTag, setTagViewList, tagViewList])

  /** 获取当前路由 */
  const getCurrentRoute = useCallback((menuItems,targetUrl) => {
    for(let i=0;i<menuItems.length;i++){
      if (menuItems[i].data?.url === targetUrl) {
        return menuItems[i].data
      } else if (menuItems[i].children) {
        const result = getCurrentRoute(menuItems[i].children,targetUrl)
        if (result) {
          return result
        }
      }
    }
  }, [])

  useEffect(() => {
    if (menuItems.length>0) {
      const pathname=window.location.pathname;
      const hash=window.location.hash;
      let targetUrl
      if (window.location.href?.indexOf('localhost') === -1 && window.location.href?.indexOf('192.168') === -1) {// 线上环境
        targetUrl=pathname+hash
      }else{
        targetUrl=`/${process.env.projectName}/${hash}`
      }
      const currentRoute: any = getCurrentRoute(menuItems,targetUrl) || {}
      if (Object.keys(currentRoute)?.length>0 && !tagViewList.find(item => item.url === currentRoute.url)?.active) {
        let isOpen = false
        const newList = tagViewList.map(item => {
          if (item.url === currentRoute.url) {
            isOpen = true
            return { ...item, active: true, outlet }
          }
          return { ...item, active: false }
        }) 
        if (!isOpen) {
          newList.push({...currentRoute, active: true, outlet, refresh: 0})
        }
        setTagViewList(newList)
      }
    }
  }, [getCurrentRoute, menuItems, outlet, setTagViewList, tagViewList])

  // 点击左箭头
  const toLeft = useCallback(() => {
    if (tagViewList.length > 1) {
      for (let i = 1; i < tagViewList.length; i++) {
        if (tagViewList[i].active) {
          openTag(tagViewList[i - 1])
          break
        }
      }
    }
  },[openTag, tagViewList])

  // 点击右箭头
  const toRight = useCallback(() => {
    if (tagViewList.length > 1) {
      for (let i = 0; i < tagViewList.length - 1; i++) {
        if (tagViewList[i].active) {
          openTag(tagViewList[i + 1])
          break
        }
      }
    }
  },[openTag, tagViewList])

  const contentOpration =useMemo(()=>{
    return <div>
      {
        moreOprationList.map((item) => <div key={item.name} className={styles.moreRow} onClick={() => {item.onClick();}}>
          <img src={item.icon} />
          <span>{item.name}</span>
        </div>)
      }
    </div>
  },[moreOprationList]);

  // 主体页面有outlet方案和display方案，  默认为outlet方案
  // 数据回显有useModel方案和z-index方案，默认为useModel方案
  // 根据客户需求采用具体搭配
  const contentOutlet =useMemo(()=>{
    // outlet方案
    for (let i = 0; i < tagViewList.length; i++) {
      if(tagViewList[i].active){
        return <div key={`${tagViewList[i].url}-${tagViewList[i].refresh}`}>
          {outlet}
        </div>
      }
    }
    // display方案
    // return  tagViewList.map(item => {
    //   return (
    //     <div key={`${item.url}-${item.refresh}`} style={{ display: item.active ? 'block' : 'none' }}>
    //       {item.outlet}
    //     </div>
    //   )
    // })
  },[outlet, tagViewList]);

  return (
    <>
      <div className={styles.tag}>
        <img className={styles.leftOpration} src={LeftArrow} onClick={toLeft} />
        <div className={styles.content}>
          {
            tagViewList.map((item) => 
              <div 
                key={item.url} 
                className={`${styles.tagWrapper} ${item.active ? styles.tagActive:''}`} 
                onClick={() => openTag(item)}
              >
                <span className={styles.tagName}>{item.name}</span>
                {
                  tagViewList.length !== 1 && <CloseOutlined className={styles.tagIcon} onClick={(e) => {e.stopPropagation(); closeTag(item)}}/>
                }
              </div>
            ) 
          }
        </div>
        <div className={styles.rightOpration}>
          <img className={styles.opration} src={RightArrow} onClick={toRight} />
          <img className={styles.opration} src={Reload} onClick={reload} />
          <Popover 
            overlayInnerStyle={{padding:0}}
            placement="bottomRight"  
            content={contentOpration}
          >
            <img className={styles.opration} src={More}/>
          </Popover>
        </div>
      </div>
      <div className={styles.view}  ref={refLayoutContent}>
        {contentOutlet}
      </div>
    </>
  )
}