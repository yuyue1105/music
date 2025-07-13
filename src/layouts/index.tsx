import GlobalTitleBar from '@/components/GlobalTitleBar';
import { Dropdown, Layout, Menu, Tabs ,message,Popover,ConfigProvider, Space} from 'antd';
import { Outlet, history, useLocation, useModel } from 'umi'
import styles from './index.less'
import { getResourceTreeByAppCodeApi } from '@/services';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ceil } from 'lodash';
import Fold from '@/assets/icon/fold.png';
import More from '@/assets/icon/more.png';
import MoreItemImg from '@/assets/icon/moreItemImg.png'
import { routes  } from '../../routes';
import TagView from '@/components/TagView';
import { useOutlet } from '@umijs/max';

const { Header, Content, Sider } = Layout;

export default () => {
  const {
    resourceTreeByAppCode, setResourceTreeByAppCode,
    targetPath, setTargetPath,
    sideMenuSelectedKeys, setSideMenuSelectedKeys,
    sideMenuOpenKeys, setSideMenuOpenKeys,
  } = useModel('global')
  
  const [menuItems, setMenuItems] = useState<any>([])
  const [collapsed, setCollapsed] = useState(false)

  const getTargetPath = useCallback((resourceTreeByAppCode,url) => {
    for (let i = 0; i < resourceTreeByAppCode?.length; i++) {
      if(resourceTreeByAppCode[i]?.url===url){
        return {
          path:[resourceTreeByAppCode[i]],
          isRight:true,
        }
      }else{
        let newResourceTreeByAppCode=resourceTreeByAppCode[i]?.children;
        const result=getTargetPath(newResourceTreeByAppCode,url);
        if(result?.isRight){
          return {
            path:[resourceTreeByAppCode[i],...result?.path],
            isRight:result?.isRight
          }
        }
      }
    }
  },[])
  
  const getMenuItems = useCallback((resourceTreeByAppCode) => {
    let result:any=[]
    for (let i = 0; i < resourceTreeByAppCode?.length; i++) {
      let children:any=[]
      result.push({
        label:resourceTreeByAppCode[i].name,
        key:resourceTreeByAppCode[i].id,
        children:getMenuItems(resourceTreeByAppCode[i]?.children||[]),
        data:resourceTreeByAppCode[i],
      })
    }
    return result?.length>0?result:undefined;
  },[])

  const getResourceTreeByAppCode = useCallback(async (pathname,hash) => {
    try {
      const response :any = await getResourceTreeByAppCodeApi()
      if (response?.code ===200&&response?.data) {
        let targetUrl
        if (window.location.href?.indexOf('localhost') === -1 && window.location.href?.indexOf('192.168') === -1) {// 线上环境
          targetUrl=pathname+hash
        }else{
          targetUrl=`/${process.env.projectName}/${hash}`
        }
        let targetPathObject=getTargetPath(response?.data,targetUrl);
        if(targetPathObject?.path?.length>0){
          setTargetPath(targetPathObject?.path);
          setResourceTreeByAppCode(response?.data)
        }else{
          let newResourceTreeByAppCode=response?.data;
          let children = [] as any;
          routes.forEach((item)=>{
            if((!item?.redirect)&&(item?.layout!==false)&&(item?.name!=='404')){
              children.push({
                name:item?.name,
                url:`/${process.env.projectName}/#${item?.path}`,
                id:`/${process.env.projectName}/#${item?.path}`,
              })
            }
          })
          newResourceTreeByAppCode.push({
            name:'未配置',
            children
          })
          targetPathObject=getTargetPath(newResourceTreeByAppCode,targetUrl);
          setTargetPath(targetPathObject?.path);
          setResourceTreeByAppCode(newResourceTreeByAppCode)
        }
      } else {
        message.error(response.msg || '操作失败');
      }
    }
    catch (error) {
      message.error('系统异常');
    } finally {
    }
  }, [getTargetPath, setResourceTreeByAppCode, setTargetPath])

  useEffect(() => {
    const handleHashChange = () => {
      const pathname=window.location.pathname;
      const hash=window.location.hash;
      getResourceTreeByAppCode(pathname,hash);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [getResourceTreeByAppCode])

  useEffect(() => {
    const pathname=window.location.pathname;
    const hash=window.location.hash;
    getResourceTreeByAppCode(pathname,hash);
  }, [getResourceTreeByAppCode])

  useEffect(()=>{
    if(resourceTreeByAppCode.length>0&&targetPath?.length>0){
      const newSideMenuSelectedKeys:any=[];
      const newSideMenuOpenKeys:any=[];
      targetPath?.forEach((item,index)=>{
        if(index===targetPath?.length-1){
          newSideMenuSelectedKeys.push(item.id);
        }else{
          newSideMenuOpenKeys.push(item.id);
        }
      })
      setSideMenuSelectedKeys(newSideMenuSelectedKeys);
      setSideMenuOpenKeys(newSideMenuOpenKeys);
  
      let newMenuItems:any=[];
      const resourceTreeBranch = resourceTreeByAppCode?.find((item)=>{
        return item.id===targetPath?.[0]?.id
      })
      newMenuItems=getMenuItems(resourceTreeBranch?.children);
      setMenuItems(newMenuItems);
    }
  },[getMenuItems, resourceTreeByAppCode, setSideMenuOpenKeys, setSideMenuSelectedKeys, targetPath])

  const content =useMemo(()=>{
    const result:any=[];
    let lineResult:any=[];
    resourceTreeByAppCode.forEach((item,index) => {
      lineResult.push(
        <div 
          key={item?.id}
          className={styles.moreItem} 
          style={{
            borderRight:index%3<2?'1px solid #F0F1F3':'none',
            borderBottom:ceil(resourceTreeByAppCode?.length/3)===ceil((index+1)/3)?'none':'1px solid #F0F1F3',
          }}
          onClick={() => {
            let currentItem=item;
            while (currentItem?.children?.length>0) {
              currentItem=currentItem?.children[0]
            }
            let selectedUrl=currentItem?.url || '';
            if(selectedUrl){
              const matchResult = selectedUrl.split('#');
              if(`/${process.env.projectName}/`===matchResult[0]){
                history.push(matchResult[1]);
                window.location.reload();
              }else{
                window.location.href =selectedUrl;
              }
            }
          }}
        >
          <img className={styles.img} src={item?.icon||MoreItemImg}/>
          <div className={styles.text}>{item?.name}</div>
        </div>
      )
      if(index%3===2||index===resourceTreeByAppCode?.length-1){
        result.push(
          <div 
            key={`${index}-${item?.id}`}
            className={styles.moreLine}
          >
            {lineResult}
          </div>
        )
        lineResult=[];
      }
    });
    return <div className={styles.moreContent}>
      {result}
    </div>;
  },[resourceTreeByAppCode]);

  const onSelect = useCallback(({ item, key, keyPath, selectedKeys, domEvent })=>{
    setSideMenuSelectedKeys(key)
    let selectedUrl=item?.props?.data?.url;
    if(selectedUrl){
      const matchResult = selectedUrl.split('#');
      if(`/${process.env.projectName}/`===matchResult[0]){
        history.push(matchResult[1]);
        getResourceTreeByAppCode(matchResult[0],'#'+matchResult[1]);
      }else{
        window.location.href =selectedUrl;
      }
    }
  },[getResourceTreeByAppCode, setSideMenuSelectedKeys])

  const onOpenChange = useCallback((openKeys)=>{
    setSideMenuOpenKeys(openKeys);
  },[setSideMenuOpenKeys])

  return (
    <div className={styles.root}>
      <GlobalTitleBar />
      <Layout className={styles.layout}>
        <Sider  
          width={220}
          className={styles.sider}
          collapsedWidth={0}
          zeroWidthTriggerStyle={{
            width:'32px',
            height:'48px',
            background: '#ffffff',
            borderRadius:0,
            top: collapsed?'calc(50% - 24px)':'calc(100% - 48px)',
            insetInlineEnd:collapsed?'-32px':'0',
          }}
          trigger={<img src={Fold} />}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
        >
          <div className={styles.siderContent}>
            <div className={styles.titleBar}>
              <span className={styles.currentTitle}>{targetPath?.[0]?.name}</span>
              <Popover 
                overlayInnerStyle={{padding:0}}
                placement="leftTop"  
                content={content}
              >
                <img className={styles.more} src={More} />
              </Popover>
            </div>
            <Menu
              openKeys={sideMenuOpenKeys}
              selectedKeys={sideMenuSelectedKeys}
              onSelect={onSelect}
              onOpenChange={onOpenChange}
              style={{ width: 220 }}
              mode="inline"
              items={menuItems}
            />
          </div>
        </Sider>
        <Content className={styles.content}>
          <TagView menuItems={menuItems} />
        </Content>
      </Layout>
    </div>
  )
}