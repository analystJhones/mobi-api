class Record {

    placa: string;
    data_posicao: string;
    velocidade: number;
    longitude: number;
    latitude: number;
    ignicao: boolean;

    constructor(placa: string,
        data_posicao: string,
        velocidade: number,
        longitude: number,
        latitude: number,
        ignicao: boolean){

        this.placa = placa;
        this.data_posicao = data_posicao;
        this.velocidade = velocidade;
        this.longitude = longitude;
        this.latitude = latitude;
        this.ignicao = ignicao;
    }
}

export default Record;