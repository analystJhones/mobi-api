import moment from "moment";

class UtilDate {

    public static diffIntoDates(dateInitial: Date, finalDate: Date): string {

        const initialDate = moment(new Date(dateInitial));
        const lastDate = moment(new Date(finalDate));
        const ms = moment(lastDate).diff(moment(initialDate));
        const d = moment.duration(ms);
        return Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
    }
}

export default UtilDate;