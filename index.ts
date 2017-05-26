import * as os from 'os';
import * as path from 'path';
import { monitorModel } from './model';

export interface PC {
  name: string,
  ip: string,
  mac: string
}

/**
 *
 *  获取ip, mac
 *
 */
const getIP = (interfaces = os.networkInterfaces()) => {
  try {
    const pppREG = /ppp(\d+)/gim;
    let map = {
      ip: 'string',
      mac: 'string'
    };
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
    let interfaces = os.networkInterfaces();
    let name = os.hostname();
    let map = getIP(interfaces);
    let pc: PC = {
      name: name,
      ip: map.ip,
      mac: map.mac
    };
    return pc;
  } catch (error) {
    console.error(error);
    console.error(`getPC error.`);
  }
}

/**
 *
 *  需要输入参数 mongoose
 *  更新mongodb
 *
 */
const update = async (mongoose) => {
  try {
    let cwd = process.cwd(),
      pwd = process.argv[1],
      task = path.relative(cwd, pwd),
      {name, ip, mac} = getPC();

    const Schema = mongoose.Schema;
    const monitorSchema = new Schema({
      task: {
        type: String,
      },
      name: {
        type: String,
      },
      ip: {
        type: String,
      },
      mac: {
        type: String,
      },
      update: {
        type: Date,
      },
    })
    const monitorModel = mongoose.model('MONITOR', monitorSchema, 'monitors');

    let monitor = await monitorModel.findOneAndUpdate({
      task,
      name,
      ip,
      mac
    }, {
        $set: {
          task,
          name,
          ip,
          mac,
          update: new Date()
        }
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
