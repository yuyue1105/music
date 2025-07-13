import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useModel } from '@umijs/max';
import { message, Modal, notification, Form, Button, Spin, Drawer } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import { ProForm, EditableProTable, ProFormDateTimePicker, ProFormDigit, ProFormRadio, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { templateAddApi, templateUpdateApi } from '../../api';
import styles from './index.less';
import { getDetailTitle } from '@/utils';
import Title from '@/assets/icon/title.png';
import Close from '@/assets/icon/close.png';

export default () => {
  const {
    refAction,
    formDetail,
    detail, setDetail,
  } = useModel('TemplateProTable.model');

  const refLayoutContent=useRef<any>();
  const refLoading= useRef(false);
  const [loading, setLoading] = useState(false);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  const setRefAndStateLoading = useCallback((newValue) => {
    refLoading.current=newValue;
    setLoading(newValue);
  },[]);
  
  useEffect(()=>{
    if(detail?.visible){
      formDetail.setFieldsValue({
        ...detail?.record,
      })
      setEditableRowKeys(() =>detail?.record?.member?.map((item) => item.id))
    }
  },[detail?.record, detail?.visible, formDetail])

  const columns: ProColumns<any>[] = useMemo(()=>{
    const value: ProColumns<any>[] =[];
    value.push({
      title: '成员姓名',
      dataIndex: 'memberName',
      width: 100,
      formItemProps: {
        rules:[{ required: true }],
      },
    })
    value.push({
      title: '成员性别', 
      dataIndex: 'memberSex',
      width: 100,
      formItemProps: {
        rules:[{ required: true }],
      },
      valueEnum: {
        '0': '女',
        '1': '男',
      },
      fieldProps: {
        style:{width:'100%'}
      },
    })
    value.push({
      title: '成员出生日期',
      dataIndex: 'memberBirthTime',
      width: 100,
      formItemProps: {
        rules:[{ required: true }],
      },
      valueType: 'dateTime',
      fieldProps: {
        className:styles.fitWidth,
      },
    })
    value.push({
      title: '年龄',
      dataIndex: 'memberAge',
      width: 100,
      formItemProps: {
        rules:[{ required: true }],
      },
      valueType: 'digit',
      fieldProps: {
        min: 0,
        className:styles.fitWidth,
      },
      render: (_, record, index, action: any) => {
        const { memberAge }=record;
        return memberAge || '-';
      },
    })
    if(detail?.status!=='look'){
      value.push({
        title: '操作',
        valueType: 'option',
        width: 100,
        className:styles.valueTypeOption,
      })
    }
    return value;
  },[detail?.status])

  const onClickCancel = useCallback(() => {
    setDetail((prev)=>{
      return {
        ...prev,
        visible:false,
      }
    });
  },[setDetail]);

  const onFinish = useCallback(async (values) => {
    try {
      if(refLoading?.current) return;
      setRefAndStateLoading(true);
      let response;
      if(detail?.status==='add'){
        response=await templateAddApi({ ...values })
      }else{
        response=await templateUpdateApi({ 
          ...detail?.record,
          ...values 
        })
      }
      if (response?.code === 200) {
        message.success('操作成功');
        onClickCancel();
        refAction.current?.reload();
      } else {
        message.error(response?.msg || '操作失败');
      }
    } catch (error) {
      message.error('系统异常');
    } finally {
      setRefAndStateLoading(false);
    }
  },[detail?.record, detail?.status, onClickCancel, refAction, setRefAndStateLoading]);
  
  const onFinishFailed = useCallback((errorInfo) => {
    console.log(errorInfo);
  },[]);

  const differentStatusProFormParams:any = useMemo(() => {
    if(detail?.status==='look'){
      return {
        readonly:true,
        layout:"horizontal"
      }
    }else{
      return {
      }
    }
  },[detail?.status]);

  const differentStatusItemParams:any = useMemo(() => {
    if(detail?.status==='look'){
      return {
        labelCol:{ span: 12 },
        wrapperCol:{ span: 12 }
      }
    }else{
      return {
      }
    }
  },[detail?.status]);

  return (
    <Drawer
      onClose={onClickCancel}
      open={detail?.visible}
      width={848}
      headerStyle={{display:'none'}}
      bodyStyle={{padding:'0px'}}
      maskClosable={detail?.status==='look'?true:false}
      afterOpenChange={(open)=>{
        if(!open){
          formDetail.resetFields();
        }
      }}
    >
      <Spin spinning={loading} className={styles.spin}>
        <div className={styles.root}>
          <div className={styles.titleGlobal}>
            <div className={styles.titleText}>
              {getDetailTitle(detail?.status)}
            </div>
            <img src={Close} className={styles.titleIcon} onClick={onClickCancel}  />
          </div>
          <ProForm<any>
            form={formDetail}
            grid
            submitter={false}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            rowProps={{
              gutter: [20, 0],
            }}
            {...differentStatusProFormParams}
          >
            <div className={`${styles.layout} ${detail?.status==='look'?styles.layoutLook:''}`} ref={refLayoutContent}>
              <div className={styles.content}>
                <div className={styles.title}>
                  <img src={Title} className={styles.titleIcon} />
                  <div className={styles.titleText}>
                    基本信息
                  </div>
                </div>
                <div className={`${styles.formContent} ${styles.formContentBasic}`}>
                  <ProFormText 
                    label="姓名" 
                    name="name" 
                    rules={detail?.status==='look'?[]:[{ required: true }]} 
                    {...differentStatusItemParams}
                    colProps={{span:12}}
                  />
                  <ProFormSelect
                    label="性别"
                    name="sex"
                    options={[
                      {
                        label: '女',
                        value: '0',
                      },
                      {
                        label: '男',
                        value: '1',
                      },
                    ]}
                    rules={detail?.status==='look'?[]:[{ required: true }]} 
                    {...differentStatusItemParams}
                    colProps={{span:12}}
                  />
                  <ProFormDateTimePicker
                    label="出生日期"
                    name="birthTime"
                    fieldProps={{
                      className:styles.fitWidth,
                    }}
                    rules={detail?.status==='look'?[]:[{ required: true }]} 
                    {...differentStatusItemParams}
                    colProps={{span:12}}
                  />
                  <ProFormDigit
                    label="年龄"
                    name="age"
                    fieldProps={{
                      min: 0,
                      className:styles.fitWidth,
                    }}
                    rules={detail?.status==='look'?[]:[{ required: true }]} 
                    {...differentStatusItemParams}
                    colProps={{span:12}}
                  />
                </div>
              </div>
              <div className={styles.content}>
                <div className={styles.title}>
                  <img src={Title} className={styles.titleIcon} />
                  <div className={styles.titleText}>
                    家庭成员
                  </div>
                </div>
                <div className={styles.formContent}>
                  <EditableProTable<any>
                    name='member'
                    sticky={{getContainer: () =>refLayoutContent?.current}}
                    rowKey="id"
                    toolBarRender={false}
                    columns={columns}
                    recordCreatorProps={detail?.status==='look'?false:{
                      newRecordType: 'dataSource',
                      position: 'top',
                      record: () => ({
                        id: Date.now(),
                      }),
                    }}
                    editable={{
                      type: 'multiple',
                      editableKeys:detail?.status==='look'?[]:editableKeys,
                      onChange: setEditableRowKeys,
                      actionRender: (row, config, defaultDoms) => {
                        return [defaultDoms.delete];
                      },
                    }}
                    scroll={{x:'max-content'}}
                  />
                </div>
              </div>
            </div>
            {detail?.status!=='look'&&(<div className={styles.buttonGlobal}>
              <div className={styles.button}>
                <Button className={styles.cancel} onClick={onClickCancel}>
                  取消
                </Button>
                <Button type="primary" htmlType="submit" className={styles.submit}>
                  确认提交
                </Button>
              </div>
            </div>)}
          </ProForm>
        </div>
      </Spin>
    </Drawer>
  );
};

