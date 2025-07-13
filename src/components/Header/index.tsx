import React, { ReactNode, useCallback, useEffect } from 'react';
import { Button, Space, Breadcrumb } from 'antd';
import { history } from 'umi';
import styles from './index.less';
interface Props {
  item?: Array<object>;
  marginLeft?:string;
}
export default ({ item,marginLeft=34 }) => {
  return (
    <div className={styles.head }>
      <h3  style={{marginLeft}}>
        <Breadcrumb>
          {item?.map((li: any, index: any) => (
            <Breadcrumb.Item key={`${index}key`}>
              <a
                className={index === item?.length - 1 ? `${styles.title} ${styles.current}`: styles.title}
                onClick={() => {
                  if (li.path) {
                    history.push(li.path);
                  } else {
                    return;
                  }
                }}
              >
                {li.name}
              </a>
            </Breadcrumb.Item>
          ))}
        </Breadcrumb>
      </h3>
    </div>
  );
};

