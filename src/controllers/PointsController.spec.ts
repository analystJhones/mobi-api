import PointsRepository from '../repository/PointsRepository';
import PointsController from "./PointsController";

describe('PointsController tests', () => {

    it('should be load csv', async () => {

        setTimeout(() => { }, 10000)

        const pointsRepository = new PointsRepository();
        const pointsController = new PointsController(pointsRepository);

        let numberOfLoad = 0;

        await pointsController.loadPoints()
            .then((result) => {
                numberOfLoad = result.countRecords;
            })

        expect(numberOfLoad).toBe(24);

    })
});
