import { templatePostApi, templateGetApi, templateDeleteApi, templatePutApi} from '../../api';
import {
  ProSkeleton,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useRef, useState ,useCallback} from 'react';
import { useModel } from '@umijs/max';
import styles from './index.less';

export default () => {
  const {
    componentParamsPrivate,
    setComponentParamsPrivate
  } = useModel('TemplateEventTracking.model');

  const onClickTemplateComponentPrivate = useCallback(async () => {
    setComponentParamsPrivate({
      ...componentParamsPrivate,
      test:componentParamsPrivate.test+1,
    })
  },[componentParamsPrivate, setComponentParamsPrivate]);

  return (
    <>
      <Button
        type="primary"
        onClick={()=>onClickTemplateComponentPrivate()}
        className={styles.gapInTemplateComponentPrivate}
      >
        TemplateComponentPrivate{componentParamsPrivate.test}
      </Button>
    </>
  );
};

