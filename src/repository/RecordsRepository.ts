import Record from "../model/Record";
import RecordEntity from "../database/entities/RecordEntity";

class RecordsRepository {
  private records: Record[];

  constructor() {
    this.records = [];
  }

  public all(): Promise<any> {
    return new Promise ((resolve, reject) => {
      RecordEntity.find((error, records) => {
        if (error) {
          reject(error.message);
        } else {
          resolve(records);
        }
      });
    })
  }

  public addRecord({ placa,
    data_posicao,
    velocidade,
    longitude,
    latitude,
    ignicao }: Record) {

    const record = new Record(placa,
      data_posicao,
      velocidade,
      longitude,
      latitude,
      ignicao);

    RecordEntity.create(record);
  }
}

export default RecordsRepository;