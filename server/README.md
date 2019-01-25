# 后端接口业务相关说明

## 用户模块

- [x] 用户管理添加(/user/reg)
  - 0-> 超级管理员；1-> 普通管理员；超级管理员不允许随意注册；
  - 系统初始化时会默认创建一个 admin/admin 超级管理员账号；
- [ ] 用户管理删除(/user/delete)
- [ ] 用户管理修改(/user/update)
  - 用户头像修改时，物理删除原来的图片；
- [x] 单个用户信息查询(/user/info)
- [ ] 所有用户列表查询(/user/list)

## 菜单模块

- [ ] category  菜单分类
  - [ ] 添加 (/category/add)
  - [ ] 删除(当前分类下没有菜单才可以删除)(/category/delete)
  - [ ] 修改(/category/update)
  - [ ] 查询 (/category/query)
- [ ] menu 菜单
  - [ ] 添加 (必须关联菜单分类)(/menu/add)
  - [ ] 删除(/menu/delete)
  - [ ] 修改(/menu/update)
  - [ ] 查询(/menu/query)

## API 返回数据格式

```javascript
// 正常请求返回 code为1为正常，会有data字段；不为1则为异常，会有一个errMsg字段
{
  code: 1,
  data: ''
}

{
  code: 0,
  errMsg: '必填参数不能为空', // code不为1的时候, 会有这个字段
}
```

## 接口文档更新

文档使用[http://apidocjs.com/](http://apidocjs.com/)根据接口代码注释规范自动生成文档，生成、更新方式如下:

```js
// 安装命令行工具
npm install apidoc -g

// 运行更新命令
npm run doc

// 生成完成后启动服务，访问 http://127.0.0.1:3030/apidoc/ 可查看文档
npm run dev
```
