import dayjs from 'dayjs';
import { random } from 'lodash';

let data = new Array(60).fill(0).map((item, index) => {
  return {
    id: String(Math.random()),
    name: `刘德华${index}`,
    sex: String(random(0,1)),
    birthTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    age: random(0,100),
    member:new Array(2).fill(0).map((memberItem, memberIndex) => {
      return {
        id: String(Math.random()),
        memberName: `刘德华家人${memberIndex}`,
        memberSex: String(random(0,1)),
        memberBirthTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
        memberAge: random(0,100),
      }
    })
  }
});

export default {
  'GET /api/v1/template/list': (req: any, res: any) => {
    const { current, pageSize } = req.query;
    const start = Number(current - 1) * Number(pageSize);
    const end = start + Number(pageSize);
    res.json({
      data: data.slice(start, end),
      total: data.length,
      msg: '请求成功',
      code: 200,
      success: true,
    });
  },
  'GET /api/v1/template/detail/:id': (req: any, res: any) => {
    const { id } = req.params;
    const findItem = data.find((item) => (String(item.id) === String(id)));
    res.json({
      data: findItem,
      msg: '请求成功',
      code: 200,
      success: true,
    });
  },
  'DELETE /api/v1/template/delete': (req: any, res: any) => {
    const { ids } = req.body;
    data = data.filter((item) => (!ids.includes(item.id)));
    res.json({
      data: ids,
      msg: '删除成功',
      code: 200,
      success: true,
    });
  },
  'POST /api/v1/template/add': (req: any, res: any) => {
    const { body } = req;
    const newItem = {
      ...body,
      id: String(Math.random()),
    }
    data.unshift(newItem);
    res.json({
      data: newItem,
      msg: '新增成功',
      code: 200,
      success: true,
    });
  },
  'PUT /api/v1/template/update': (req: any, res: any) => {
    const { body } = req;
    let updateItem:any;
    data.forEach((item, index) => {
      if(String(item.id) === String(body.id)){
        updateItem={
          ...item,
          ...body,
        }
        data[index] = updateItem
      }
    })
    res.json({
      data: updateItem,
      msg: '更新成功',
      code: 200,
      success: true,
    });
  },
};


