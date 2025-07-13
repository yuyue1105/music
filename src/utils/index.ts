export function downloadFile(response) {
  const fileNameEncode = response?.headers?.['content-disposition']?.split('filename=')[1]
  const fileName = decodeURIComponent(fileNameEncode)
  const url = URL.createObjectURL(response.data)
  const aLink = document.createElement('a')
  aLink.href = url
  aLink.setAttribute('download', fileName)
  document.body.appendChild(aLink)
  aLink.click()
  document.body.removeChild(aLink)
}

export function encodeURIParams(urlParams) {
  let result:any=[];
  Object.keys(urlParams).forEach((key)=>{
    result.push(`${key}=${encodeURIComponent(JSON.stringify(urlParams[key]))}`)
  })
  return result.join('&')
}

export function decodeURIParams(url) {
  const objectString=url.split('?')[1];
  const objectStringItemArray=objectString.split('&');
  const urlParams:any = {}
  objectStringItemArray.forEach(item => {
    const [key,value]= item.split('=');
    const decodeURIComponentValue=decodeURIComponent(value);
    if(decodeURIComponentValue==='undefined'){
      urlParams[key]=undefined;
    }else{
      urlParams[key]=JSON.parse(decodeURIComponent(value));
    }
  })
  return urlParams;
}

export function getDetailTitle(param) {
  const titleObject={
    'add':'新增',
    'edit':'编辑',
    'look':'详情',
  }
  return titleObject[param];
}

export function goHome() {
  if ( window.location.href?.indexOf('localhost') === -1 && window.location.href?.indexOf('192.168') === -1 ) {// 线上环境
    if ( window.location.href?.indexOf('210.45.195.91') !== -1 ) {//安师大定制的url
      window.location.href = `${window.location.origin}/jx-digital-editor-web/#/manage`;
    } else if (window.location.pathname?.includes('/store-')) {//企业定制的url
      let companyKey = '/' + window.location.pathname.split('/')[1];
      window.location.href = `${window.location.origin}${companyKey}/store-saas/#/home`;
    } else {//saas的url
      window.location.href = `${window.location.origin}/store-saas/#/home`;
    }
  } else {// 本地环境
    window.location.href = `${window.location.origin}/#/user/login`;
  }
}

export function goLogin() {
  if ( window.location.href?.indexOf('localhost') === -1 && window.location.href?.indexOf('192.168') === -1 ) {// 线上环境
    if ( window.location.href?.indexOf('210.45.195.91') !== -1 ) {//安师大定制的url
      window.location.href = `${window.location.origin}/jx-digital-editor-web/#/user/login`;
    } else if (window.location.pathname?.includes('/store-')) {//企业定制的url
      let companyKey = '/' + window.location.pathname.split('/')[1];
      window.location.href = `${window.location.origin}${companyKey}/store-saas/#/user/login`;
    } else {//saas的url
      window.location.href = `${window.location.origin}/store-saas/#/user/login`;
    }
  } else {// 本地环境
    window.location.href = `${window.location.origin}/#/user/login`;
  }
}