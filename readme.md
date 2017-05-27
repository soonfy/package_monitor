# monitor-node

## API

### getIP()

### getPC()

### update(argv)
参数 argv 是 **mongoose对象**或者**connection实例**，监控日志存储在 **monitors集合**  

## 示例
  ```
  let monitor = require('monitor-node');
  let mongoose = require('mongoose');
  let conn = mongoose.connect(log-uri);
  let task = monitor.update(conn);
  console.log(task);
  ```

## 备注
1. 数据库记录只保存 1 天。  
  ```
  monitorSchema.index({ date: 1 }, { expireAfterSeconds: 3600 });
  ```
  