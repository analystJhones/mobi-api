import Point from "../model/Point";
import Record from "../model/Record";

class UtilGeolocation {

    public static distanciaLatLongEmKm(point: Point, record: Record): number {

        const r = 6371;

        const dLat = this.deg2rad(record.latitude - point.latitude);

        const dLng = this.deg2rad(record.longitude - point.longitude);

        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(this.deg2rad(point.latitude)) * Math.cos(this.deg2rad(point.latitude)) * Math.sin(dLng / 2) * Math.sin(dLng / 2), c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return Math.round(r * c * 1000);

    }
    
    public static deg2rad(deg: number): number {
        return deg * (Math.PI / 180);
    }
}

export default UtilGeolocation;