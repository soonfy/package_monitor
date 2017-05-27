import * as mongoose from 'mongoose';
import * as monitor from './index';


const test = async () => {
  try {
    console.log(`test.`);
    let conn = mongoose.connect('mongodb://localhost/demo');
    let task = await monitor.update(conn);
    console.log(task);
    process.exit();
  } catch (error) {
    console.error(error);
  }
}

// test();
import * as os from 'os';
console.log(os.userInfo());
console.log(process.title);
console.log(process.cwd());
console.log(process.argv[1]);
console.log(module.parent);
