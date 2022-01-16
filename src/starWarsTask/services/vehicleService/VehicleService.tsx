import axios, {AxiosResponse} from "axios";
import {VehicleDto, VehicleResult} from "./Model";

export class VehicleService {

    getVehiclesInBatch(page: number): Promise<VehicleDto[]> {
        const url = `https://swapi.py4e.com/api/vehicles/?page=${page}`;

        return axios.get<any, AxiosResponse<VehicleResult>>(url)
            .then(res => res.data.results.map(result => (
                new VehicleDto(
                    result.name,
                    result.pilots,
                    result.url,
                )
            )))
            .catch(reason => {
                console.log("Error! failure reason: ", reason);
                return [];
            })
    }

    async getVehicles(): Promise<VehicleDto[]> {
        let vehiclesDto: VehicleDto[] = [];

        for (let page = 1; page < 5; page++) {
            vehiclesDto = vehiclesDto.concat(await this.getVehiclesInBatch(page));
        }
        return vehiclesDto;
    }
}

