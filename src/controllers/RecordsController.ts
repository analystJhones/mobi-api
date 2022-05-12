import Record from "../model/Record";
import RecordsRepository from "../repository/RecordsRepository";
import * as fs from "fs";
import * as path from "path";
import { CastingContext, CastingFunction, parse } from 'csv-parse';

interface ReturnLoad{
  message: string;
  countRecords : number;
}

class RecordsController {

  private recordsRepository: RecordsRepository;

  constructor(recordsRepository: RecordsRepository){
    this.recordsRepository = recordsRepository;
  }

  public loadPoints(): Promise<ReturnLoad> {
    return new Promise((resolve, reject) => {

      const csvFilePath = path.resolve(__dirname, '../../resources/records.csv');

      const headers = ['placa', 'data_posicao', 'velocidade', 'longitude', 'latitude', 'ignicao'];

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
      }, (error, result: Record[]) => {
        if (error) {
          reject(error);
        } else {
          result.forEach(record => {
            this.recordsRepository.addRecord(record);
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
}

export default RecordsController;
