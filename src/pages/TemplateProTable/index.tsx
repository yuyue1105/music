import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Button, message, Popconfirm, Space, Upload } from 'antd';
import {DownloadOutlined,PlusOutlined,UploadOutlined,} from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { history, useModel } from '@umijs/max';
import { uuidv4 } from '@antv/xflow';
import { downloadFile, encodeURIParams } from '@/utils';
import { cloneDeep, debounce } from 'lodash';
import { templateDeleteApi, templateExportApi, templateListApi } from './api';
import DetailModal from './components/DetailModal';
import DetailDrawer from './components/DetailDrawer';
import styles from './index.less';

export default () => {
  const {
    refLayoutContent
  } = useModel('global');
  const {
    refAction,
    refForm,
    formDetail,
    selectedRowKeys,setSelectedRowKeys,
    detail, setDetail,
    searchParams, setSearchParams,
    searchSorter, setSearchSorter
  } = useModel('TemplateProTable.model');

  const onClickDetail=useCallback((params)=>{
    setDetail((prev)=>{
      return {
        ...prev,
        visible:true,
        ...params
      }
    });
  },[setDetail])

  // const onClickDetail=useCallback((params)=>{
  //   const urlParams={
  //     status:params?.status,
  //     id:params?.record?.id,
  //   }
  //   history.push(`/templateProTableDetailPage?${encodeURIParams(urlParams)}`);
  // },[])

  const filterUnSelectedRowKeysAndSet = useCallback((unSelectedRowKeys) => {
    const newSelectedRowKeys = cloneDeep(selectedRowKeys);
    unSelectedRowKeys.forEach(itemUn => {
      const index = newSelectedRowKeys.findIndex((itemNew)=>itemNew===itemUn)
      if (index !== -1) {
        newSelectedRowKeys.splice(index, 1)
      }
    })
    setSelectedRowKeys([...newSelectedRowKeys])
  },[selectedRowKeys, setSelectedRowKeys])

  const onConfirmDelete = useCallback(async (ids: any) => {
    try {
      const response: any = await templateDeleteApi({
        ids,
      });
      if (response?.code === 200) {
        message.success(response?.msg || '删除成功');
        filterUnSelectedRowKeysAndSet(ids);
        const { total, pageSize, current }=searchParams
        let afterDeleteLastPageNumber=Math.ceil((total-ids.length)/pageSize);
        if(afterDeleteLastPageNumber<=0){
          refAction?.current?.setPageInfo?.({current:1})
        }else
        if(afterDeleteLastPageNumber<current){
          refAction?.current?.setPageInfo?.({current:afterDeleteLastPageNumber})
        }
        refAction?.current?.reload?.();
      } else {
        message.error(response?.msg || '删除失败');
      }
    } catch (error) {
      message.error('系统异常');
    } finally {
    }
  },[filterUnSelectedRowKeysAndSet, refAction, searchParams]);

  const columns: ProColumns<any>[]  = useMemo(()=>{
    const value: ProColumns<any>[] =[];
    value.push({
      title: '序号',
      dataIndex: 'index',
      width: 100,
      search: false,
      render: (_, record, index, action: any) => {
        const { pageInfo } = action;
        const { current, pageSize } = pageInfo;
        return `${index + 1 + (current - 1) * pageSize}`;
      },
    })
    value.push({
      title: '姓名',
      dataIndex: 'name',
      width: 100,
      sorter: { multiple: 1 },
      defaultSortOrder: searchSorter?.name,
      initialValue: searchParams?.name,
    })
    value.push({
      title: '性别',
      dataIndex: 'sex',
      width: 100,
      sorter: { multiple: 1 },
      defaultSortOrder: searchSorter?.sex,
      initialValue: searchParams?.sex,
      valueEnum: {
        '0': '女',
        '1': '男',
      },
    })
    value.push({
      title: '出生日期',
      dataIndex: 'birthTime',
      width: 100,
      sorter: { multiple: 1 },
      defaultSortOrder: searchSorter?.birthTime,
      initialValue: [searchParams?.startBirthTime,searchParams?.endBirthTime],
      valueType: 'dateTimeRange',
      search: {
        transform: (value) => {
          return {
            startBirthTime: value[0],
            endBirthTime: value[1],
          };
        },
      },
      render: (_, record, index, action: any) => {
        const { birthTime }=record;
        return birthTime || '-';
      },
    })
    value.push({
      title: '年龄',
      dataIndex: 'age',
      width: 100,
      sorter: { multiple: 1 },
      defaultSortOrder: searchSorter?.age,
      initialValue: [searchParams?.startAge,searchParams?.endAge],
      valueType: 'digitRange',
      fieldProps: {
        min: 0,
      },
      search: {
        transform: (value) => {
          return {
            startAge: value[0],
            endAge: value[1],
          };
        },
      },
      render: (_, record, index, action: any) => {
        const { age }=record;
        return age || '-';
      },
    })
    value.push({
      title: '操作',
      dataIndex: 'operate',
      width: 100,
      search: false,
      fixed: 'right',
      render: (_, record, index, action: any) => {
        return (
          <Space >
            <Button
              type="link"
              onClick={() => onClickDetail({
                status:'edit',
                record,
              })}
              className={styles.button}
            >
              编辑
            </Button>
            <Button
              type="link"
              onClick={() => onClickDetail({
                status:'look',
                record,
              })}
              className={styles.button}
            >
              详情
            </Button>
            <Popconfirm
              title="删除数据"
              description="确定要删除此数据吗？"
              onConfirm={() => onConfirmDelete([record?.id])}
              okButtonProps={{
                danger: true,
              }}
            >
              <Button 
                type="link" 
                danger 
                className={styles.button}
              >
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    })
    return value;
  },[searchSorter?.name, searchSorter?.sex, searchSorter?.birthTime, searchSorter?.age, searchParams?.name, searchParams?.sex, searchParams?.startBirthTime, searchParams?.endBirthTime, searchParams?.startAge, searchParams?.endAge, onClickDetail, onConfirmDelete])

  const onClickExport = useCallback(async (params) => {
    try {
      message.success("导出程序已启动,请稍后在浏览器下载目录查看");
      const response = await templateExportApi(params);
      downloadFile(response);
    } catch (error) {
      message.error('系统异常');
    } finally {
    }
  },[]);

  const uploadingId = useMemo(() => uuidv4(), []);
  const onChangeUpload=useCallback(({file,fileList,event}) => {
    if (['uploading'].includes(file.status)) {
      message.loading({
        key: uploadingId,
        duration: 0,
        content: '上传中, 请稍后',
      });
    }
    if (['error'].includes(file.status)) {
      message.destroy(uploadingId);
      message.error('上传失败!');
    }
    if (['done'].includes(file.status)) {
      message.destroy(uploadingId);
      message.success('上传成功!');
      refAction?.current?.reloadAndRest?.()
    }
  },[refAction, uploadingId])

  const toolBarRender = useCallback((action, rows) => [
    <Button
      key="add"
      type="primary"
      icon={<PlusOutlined />}
      onClick={()=>onClickDetail({
        status:'add',
        record:{},
      })}
    >
      新增
    </Button>,
    <Upload 
      action='/jx-iig-service/gateway/upload'
      key="import" 
      headers={{
        Authorization: `${localStorage.getItem('token')}` || '',
      }}
      onChange={(info:any) => onChangeUpload(info)}
      accept='.xls,.xlsx'
      showUploadList={false}
    >
      <Button icon={<UploadOutlined />}>导入</Button>
    </Upload>,
    <Button 
      key="export" 
      type="primary" 
      icon={<DownloadOutlined />}
      onClick={() => {
        // const {total,...restSearchParams} = searchParams
        // const params={
        //   ...restSearchParams,
        //   sorter:searchSorter
        // }
        const params={
          "category": 2,
          "warehouseId": "1666620766376333313",
          "type": 1
        }
        onClickExport(params)
      }}
    >
      导出
    </Button>,
  ],[onChangeUpload, onClickDetail, onClickExport])

  const rowSelection= useMemo(()=>({
    selectedRowKeys,
    onSelect(record, selected, selectedRows) {
      if (selected) {
        setSelectedRowKeys([...new Set([...selectedRowKeys, record.id])])
      } else {
        filterUnSelectedRowKeysAndSet([record.id]);
      }
    },
    onSelectAll(selected, selectedRows, changeRows) {
      const changeRowsIds=changeRows.map(item => item.id);
      if (selected) {
        setSelectedRowKeys([...new Set([...selectedRowKeys, ...changeRowsIds])])
      } else {
        filterUnSelectedRowKeysAndSet(changeRowsIds);
      }
    }
  }),[filterUnSelectedRowKeysAndSet, selectedRowKeys, setSelectedRowKeys])

  return (
    <div className={styles.root}>
      <ProTable
        actionRef={refAction}
        formRef={refForm}
        onReset={()=>{
          let newFieldsValue:any={};
          columns.forEach((item:any) => {
            newFieldsValue[item?.dataIndex]=null;
          })
          refForm.current?.setFieldsValue(newFieldsValue)
          refForm.current?.submit();
        }}
        params={{}}
        request={async (params, sorter, filter) => {
          const response: any = await templateListApi({
            ...params,
            sorter
          });
          setSearchParams((prev)=>{
            return {
              ...prev,
              ...params,
              total:response?.total||0,
            }
          })
          setSearchSorter((prev)=>{
            return {
              ...prev,
              ...sorter,
            }
          })
          return {
            data:response?.data,
            total:response?.total||0,
            success:response?.code === 200,
          }
        }}
        columns={columns}
        rowSelection={rowSelection}
        toolBarRender={toolBarRender}
        tableAlertRender={() => {
          return (
            <Space>
              <span>已选 {selectedRowKeys.length ?? '0'} 项</span>
              <a style={{ marginInlineStart: 8 }} onClick={() => setSelectedRowKeys([])}>
                取消选择
              </a>
            </Space>
          );
        }}
        tableAlertOptionRender={() => {
          return (
            <Space>
              <Popconfirm
                title="批量删除"
                description="确定要删除选中数据吗？"
                onConfirm={() => onConfirmDelete(selectedRowKeys)}
                okButtonProps={{
                  danger: true,
                }}
              >
                <Button 
                  type="link" 
                  danger
                  className={styles.button}
                >
                  批量删除
                </Button>
              </Popconfirm>
              <Button 
                type="link" 
                className={styles.button}
                onClick={() => {
                  // const params={
                  //   ids: selectedRowKeys
                  // }
                  const params={
                    "category": 2,
                    "warehouseId": "1666620766376333313",
                    "type": 1
                  }
                  onClickExport(params)
                }}
              >
                导出数据
              </Button>
            </Space>
          );
        }}
        sticky={{getContainer: () =>refLayoutContent?.current}}
        rowKey="id"
        pagination={{
          defaultPageSize:10,
          showSizeChanger:true,
          showQuickJumper: true,
        }}
        scroll={{x:'max-content'}}
        defaultSize="small"
      />
      <DetailModal />
      {/* <DetailDrawer /> */}
    </div>
  );
};


