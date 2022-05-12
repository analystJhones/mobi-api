class  Car {

    placa: string;
    initialDate: string;
    finishDate:string;
    duration: any;

    constructor(placa: string, initialDate: string, finishDate: string, duration : any){
        this.placa = placa;
        this.initialDate = initialDate;
        this.finishDate = finishDate;
        this.duration  = duration
    }
}

export default Car;
