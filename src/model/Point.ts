class  Point {

    nome: string;
    raio: number;
    latitude:number;
    longitude: number;

    constructor(nome: string, raio: number, latitude: number, longitude: number){
        this.nome = nome;
        this.raio = raio;
        this.latitude = latitude;
        this.longitude = longitude;
    }
}

export default Point;
