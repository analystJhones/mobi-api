class  Car {

    placa: string;
    initialDate: string;
    finishDate:string;
    duration: string;

    constructor(placa: string, initialDate: string, finishDate: string, duration : string){
        this.placa = placa;
        this.initialDate = initialDate;
        this.finishDate = finishDate;
        this.duration  = duration
    }
}

export default Car;
