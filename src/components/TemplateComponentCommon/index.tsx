import {
  ProSkeleton,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useRef, useState ,useCallback} from 'react';
import { useModel } from '@umijs/max';
import styles from './index.less';

export default () => {
  const [
    componentParamsCommon,
    setComponentParamsCommon
  ] = useState({
    test:1
  });

  const onClickTemplateComponentPrivate = useCallback(async () => {
    setComponentParamsCommon({
      ...componentParamsCommon,
      test:componentParamsCommon.test+1,
    })
  },[componentParamsCommon]);

  return (
    <>
      <Button
        type="primary"
        onClick={()=>onClickTemplateComponentPrivate()}
        className={styles.gapInTemplateComponentCommon}
      >
        TemplateComponentCommon{componentParamsCommon.test}
      </Button>
    </>
  );
};