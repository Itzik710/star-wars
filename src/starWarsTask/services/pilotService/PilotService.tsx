import {PilotDto, PilotResult} from "./Model";
import axios, {AxiosResponse} from "axios";

export class PilotService {

    getPilotsInBatch(page: number): Promise<PilotDto[]> {
        const url = `https://swapi.py4e.com/api/people/?page=${page}`;

        return axios.get<any, AxiosResponse<PilotResult>>(url)
            .then(res => res.data.results.map(result => (
                new PilotDto(
                    result.name,
                    result.homeworld,
                    result.vehicles,
                    result.url,
                )
            )))
            .catch(reason => {
                console.log("Error! failure reason: ", reason);
                return [];
            })
    }

    async getPilots(): Promise<PilotDto[]> {
        let pilotsDto: PilotDto[] = [];

        for (let page = 1; page < 10; page++) {
            pilotsDto = pilotsDto.concat(await this.getPilotsInBatch(page));
        }
        return pilotsDto;
    }
}
