import * as os from 'os';
import * as path from 'path';

export interface PC {
  username: string,
  uid: number,
  gid: number,
  task: string,
  date: Date
}

/**
 *
 *  获取ip, mac
 *
 */
const getIP = (interfaces = os.networkInterfaces()) => {
  try {
    const pppREG = /ppp(\d+)/gim;
    let map;
    for (let dev in interfaces) {
      let ppp = dev.match(pppREG);
      if (ppp) {
        let iface = interfaces[dev];
        for (let i = 0, len = iface.length; i < len; i++) {
          let alias = iface[i];
          if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
            map = {
              ip: alias.address,
              mac: alias.mac
            }
          }
        }
        break;
      } else {
        if (map) {
          continue;
        }
        let iface = interfaces[dev];
        for (let i = 0, len = iface.length; i < len; i++) {
          let alias = iface[i];
          if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
            map = {
              ip: alias.address,
              mac: alias.mac
            }
          }
        }
      }
    }
    return map;
  } catch (error) {
    console.error(error);
    console.error(`getIp error.`);
  }
}

/**
 *
 *  获取pc的name, ip, mac
 *
 */
const getPC = () => {
  try {
    let user = os.userInfo();
    let {username, uid, gid} = user;
    let parent = module.parent, cwd = process.cwd(),task;
    if (typeof parent === 'string') {
      task = cwd + '/' + parent;
    } else if (parent && typeof parent === 'object') {
      task = parent.filename;
    } else {
      // default
      task = cwd + '/' + parent;
    }
    let pc: PC = {
      username,
      uid,
      gid,
      task,
      date: new Date()
    };
    return pc;
  } catch (error) {
    console.error(error);
    console.error(`getPC error.`);
  }
}

let STATUS = true,
  Model;

/**
 *
 *  需要输入参数 mongoose
 *  更新mongodb
 *
 */
const update = async (mongoose) => {
  try {
    let pc = getPC();

    if (STATUS) {
      const Schema = mongoose.Schema;
      const monitorSchema = new Schema({
        task: {
          type: String,
        },
        username: {
          type: String,
        },
        uid: {
          type: Number,
        },
        gid: {
          type: Number,
        },
        date: {
          type: Date,
        },
      })
      monitorSchema.index({ task: 1, uid: 1, gid: 1 });
      monitorSchema.index({ date: 1 }, { expireAfterSeconds: 3600 });
      Model = mongoose.model('MONITOR', monitorSchema, 'monitors');
      STATUS = !STATUS;
    }

    let monitor = await Model.findOneAndUpdate({
      task: pc.task,
      uid: pc.uid,
      gid: pc.gid
    }, {
        $set: pc
      }, { upsert: true, new: true });
    return monitor;
  } catch (error) {
    console.error(error);
    console.error(`updateDB error.`);
  }
}

export {
  getIP,
  getPC,
  update
}
