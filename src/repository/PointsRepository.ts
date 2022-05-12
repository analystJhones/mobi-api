import Point from "../model/Point";
import PointDB from "../database/entities/PointEntity";

class PointsRepository {
  
  public all() : Promise<any> {
    return new Promise((resolve, reject) => {
      PointDB.find((error, points) => {
        if (error) {
          reject(error.message);
        } else {
          resolve(points);
        }
      });
    });
  }

  public addPoint({nome, raio, latitude, longitude}: Point) {
    const point = new Point(nome, raio, latitude, longitude);

    PointDB.create(point);
  }

  public findPoint(_id: string) : Promise<any> {
    return new Promise((resolve, reject) => {
      PointDB.findById(_id, (error: any, book: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(book);
        }
      });
    });
  }
}

export default PointsRepository;
