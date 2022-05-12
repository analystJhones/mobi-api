import mongoose, { ConnectOptions } from "mongoose";

const db = 'mongodb://127.0.0.1:27017/mobiDB';

const connectDB = async () => {
    try {
      console.log(db);
      await mongoose
      .connect(`${db}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then((res: any) => {
        console.log(
          'Connected to Distribution API Database - Initial Connection'
        );
      })
      .catch((err: any) => {
        console.log(
          `Initial Distribution API Database connection error occured -`,
          err
        );
        process.exit(1);
      });
    }catch (error) {
      console.log(error);
      process.exit(1);
    }

}

export default connectDB;
