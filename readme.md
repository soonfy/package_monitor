# monitor-node

## API

### getIP()

### getPC()

### update(mongoose)
参数是 **mongoose对象**，监控日志存储在 **monitors集合**  

## 示例
  ```
  let monitor = require('monitor-node');
  let mongoose = require('mongoose');
  mongoose.connect(log-uri);
  let task = monitor.update(mongoose);
  console.log(task);
  ```