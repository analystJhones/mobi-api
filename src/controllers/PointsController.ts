import * as fs from "fs";
import * as path from "path";
import { CastingContext, CastingFunction, parse } from 'csv-parse';
import PointsRepository from '../repository/PointsRepository';
import RecordsRepository from "../repository/RecordsRepository";
import Point from '../model/Point';
import Record from '../model/Record';
import Car from '../model/Car';
import UtilDate from '../utils/UtilDate';
import UtilGeolocation from '../utils/UtilGeolocation';

interface ReturnLoad{
  message: string;
  countRecords : number;
}

class PointsController {

  private pointsRepository: PointsRepository;

  constructor(pointsRepository: PointsRepository){
    this.pointsRepository = pointsRepository;
  }

  public loadPoints(): Promise<ReturnLoad> {
    return new Promise((resolve, reject) => {

      const csvFilePath = path.resolve(__dirname, '../../resources/points.csv');
  
      const headers = ['nome', 'raio', 'latitude', 'longitude'];

      const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

      const castFunction : CastingFunction =(value: string, context: CastingContext) =>{
        if (context.column === 'raio') {
          return parseInt(value, 10);
        }
        if (context.column === 'latitude') {
          return Number(value);
        }
        if (context.column === 'longitude') {
          return Number(value);
        }

        return value;
      };

      parse(fileContent, {
        delimiter: ',',
        fromLine: 2,
        columns: headers,
        cast: castFunction
        // cast: (columnValue: string, context: { column: string; }) :  => {
        //   if (context.column === 'raio') {
        //     return parseInt(columnValue, 10);
        //   }
        //   if (context.column === 'latitude') {
        //     return Number(columnValue);
        //   }
        //   if (context.column === 'longitude') {
        //     return Number(columnValue);
        //   }

        //   return columnValue;
        // }
      }, (error: any, result: Point[]) => {
        if (error) {
          reject(error);
        } else {
          result.forEach(point => {
            this.pointsRepository.addPoint(point);
          });

          const returnLoad : ReturnLoad = {
            message: 'Loaded finish',
            countRecords : result.length
          }

          resolve(returnLoad);
        }
      });
    })
  }
  
  public getRecordsOfPoint(_id: string){

    return new Promise((resolve, reject) => {
      this.pointsRepository.findPoint(_id)
      .then(point => {

        const recordsRepository = new RecordsRepository();
        recordsRepository.all()
          .then(records => {

            const carsInRecordsPoints : string[] = [];

            const recordsOfPoint = records.filter( (record: Record)  => {

              const distance = UtilGeolocation.distanciaLatLongEmKm(point, record);

              if (distance <= point.raio) {
                carsInRecordsPoints.push(record.placa);
                return record;
              }
            });

            const carsWithOutDuplicatees =  [... new Set(carsInRecordsPoints)];

            const carsOnPoints: Car[] = [];

            carsWithOutDuplicatees.forEach(placa => {
              const recordsSpecificCar: Record[] = []
              recordsOfPoint.forEach( (record: Record) => {
                if (placa == record.placa) {
                  recordsSpecificCar.push(record);
                }
              });

              const initialRecord = recordsSpecificCar[0];
              const lastRecord = recordsSpecificCar[recordsSpecificCar.length-1];
              const duration = UtilDate.diffIntoDates(new Date(initialRecord.data_posicao), new Date(lastRecord.data_posicao));
              const car = new Car(placa, initialRecord.data_posicao, lastRecord.data_posicao, duration);
              carsOnPoints.push(car);
            })

            resolve(carsOnPoints);

          })
          .catch(error => {
            console.log("error", error);
            reject(error.message)
          })
      })
      .catch(error => {
        reject(error.message)
      })

    });
  }

}

export default PointsController;