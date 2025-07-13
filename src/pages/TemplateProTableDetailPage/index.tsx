import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { history, useModel, useParams } from '@umijs/max';
import { Button, Col, Divider, message, Row, Skeleton, Space, Descriptions, Input, Spin } from 'antd';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable, EditableProTable, ProForm, ProFormText, ProFormDateTimePicker, ProFormDigit, ProFormRadio, ProFormSelect } from '@ant-design/pro-components';
import dayjs from 'dayjs';
import { decodeURIParams } from '@/utils';
import Return from '@/assets/icon/return.png';
import Title from '@/assets/icon/title.png';
import GlobalTitleBar from '@/components/GlobalTitleBar';
import { templateAddApi, templateUpdateApi } from './api';
import styles from './index.less';

export default () => {
  const {
    refLayoutContent,
    refLoading,
    refEditableFormMember,
    formDetail,
    loading, setLoading,
    record, setRecord,
    editableKeys, setEditableRowKeys,
    init,
    setRefAndStateLoading,
    templateDetail,
  } = useModel('TemplateProTableDetailPage.model');

  const { id , status }=decodeURIParams(window.location.href);

  useEffect(() => {
    return ()=>{
      init();
      formDetail?.resetFields();
    }
  }, [formDetail, init]);

  useEffect(() => {
    if (id&&status!=='add') {
      templateDetail(id);
    }
  }, [id, status, templateDetail]);

  useEffect(()=>{
    if(id&&status!=='add'&&record?.id){
      formDetail?.setFieldsValue({
        ...record,
      })
    }
  },[formDetail, id, init, record, status])

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
    if(status!=='look'){
      value.push({
        title: '操作',
        valueType: 'option',
        width: 100,
        className:styles.valueTypeOption,
      })
    }
    return value;
  },[status])

  const onClickCancel = useCallback(() => {
    history.push(`/templateProTable`);
  },[]);

  const onFinish = useCallback(async (values) => {
    try {
      if(refLoading?.current) return;
      setRefAndStateLoading(true);
      let response;
      if(status==='add'){
        response=await templateAddApi({ ...values })
      }else{
        response=await templateUpdateApi({ 
          ...record,
          ...values 
        })
      }
      if (response?.code === 200) {
        message.success('操作成功');
        onClickCancel();
      } else {
        message.error(response?.msg || '操作失败');
      }
    } catch (error) {
      message.error('系统异常');
    } finally {
      setRefAndStateLoading(false);
    }
  },[onClickCancel, record, refLoading, setRefAndStateLoading, status]);
  
  const onFinishFailed = useCallback((errorInfo) => {
    console.log(errorInfo);
  },[]);

  const differentStatusProFormParams:any = useMemo(() => {
    if(status==='look'){
      return {
        readonly:true,
        layout:"horizontal"
      }
    }else{
      return {
      }
    }
  },[status]);

  const differentStatusItemParams:any = useMemo(() => {
    if(status==='look'){
      return {
        labelCol:{ span: 12 },
        wrapperCol:{ span: 12 }
      }
    }else{
      return {
      }
    }
  },[status]);

  return (
    <Spin spinning={loading} className={styles.spin}>
      <div className={styles.root}>
        <GlobalTitleBar />
        <div className={styles.returnGlobal}>
          <div className={styles.returnContent}>
            <div 
              className={styles.return}
              onClick={onClickCancel}
            >
              <img src={Return} className={styles.returnIcon} />
              <div className={styles.returnText}>
                返回查询表格
              </div>
            </div>
          </div>
        </div>
        <ProForm<any>
          form={formDetail}
          grid
          submitter={false}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          rowProps={{
            gutter: [80, 0],
          }}
          {...differentStatusProFormParams}
        >
          <div className={`${styles.layout} ${status==='look'?styles.layoutLook:''}`} ref={refLayoutContent}>
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
                  rules={status==='look'?[]:[{ required: true }]} 
                  {...differentStatusItemParams}
                  colProps={{span:8}}
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
                  rules={status==='look'?[]:[{ required: true }]} 
                  {...differentStatusItemParams}
                  colProps={{span:8}}
                />
                <ProFormDateTimePicker
                  label="出生日期"
                  name="birthTime"
                  fieldProps={{
                    className:styles.fitWidth,
                  }}
                  rules={status==='look'?[]:[{ required: true }]} 
                  {...differentStatusItemParams}
                  colProps={{span:8}}
                />
                <ProFormDigit
                  label="年龄"
                  name="age"
                  fieldProps={{
                    min: 0,
                    className:styles.fitWidth,
                  }}
                  rules={status==='look'?[]:[{ required: true }]} 
                  {...differentStatusItemParams}
                  colProps={{span:8}}
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
                <ProForm.Item
                  label=""
                  name="member"
                  trigger="onValuesChange"
                  rules={[{ validator: async()=>{
                    try{
                      await refEditableFormMember.current.validateFields();
                      return Promise.resolve(true)
                    }catch{
                      return Promise.reject(false)
                    }
                  } }]}
                >
                  <EditableProTable<any>
                    editableFormRef={refEditableFormMember}
                    sticky={{getContainer: () =>refLayoutContent?.current}}
                    rowKey="id"
                    toolBarRender={false}
                    columns={columns}
                    recordCreatorProps={status==='look'?false:{
                      newRecordType: 'dataSource',
                      position: 'bottom',
                      record: () => ({
                        id: Date.now(),
                      }),
                    }}
                    editable={{
                      type: 'multiple',
                      editableKeys:status==='look'?[]:editableKeys,
                      onChange: setEditableRowKeys,
                      actionRender: (row, config, defaultDoms) => {
                        return [defaultDoms.delete];
                      },
                    }}
                    scroll={{x:'max-content'}}
                  />
                </ProForm.Item>
              </div>
            </div>
          </div>
          {status!=='look'&&(<div className={styles.buttonGlobal}>
            <div className={styles.buttonContent}>
              <div className={styles.button}>
                <Button className={styles.cancel} onClick={onClickCancel}>
                  取消
                </Button>
                <Button type="primary" htmlType="submit" className={styles.submit}>
                  确认提交
                </Button>
              </div>
            </div>
          </div>)}
        </ProForm>
      </div>
    </Spin>
  );
};

