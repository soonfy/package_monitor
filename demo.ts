import * as mongoose from 'mongoose';
import * as monitor from './index';

// mongoose.connect('mongodb://localhost/demo');

const test = async () => {
  try {
    console.log(`test.`);
    // let task = await monitor.update(mongoose);
    let task = monitor.getPC();
    console.log(task);
    process.exit();
  } catch (error) {
    console.error(error);
  }
}

test();
