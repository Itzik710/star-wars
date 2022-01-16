import {PlanetDto, PlanetResult} from "./Model";
import axios, {AxiosResponse} from "axios";

export class PlanetService {
    getPlanetsInBatch(page: number): Promise<PlanetDto[]> {
        const url = `https://swapi.py4e.com/api/planets/?page=${page}`;

        return axios.get<any, AxiosResponse<PlanetResult>>(url)
            .then(res => res.data.results.map(result => (
                new PlanetDto(
                    result.name,
                    result.population,
                    result.residents,
                    result.url,
                )
            )))
            .catch(reason => {
                console.log("Error! failure reason: ", reason);
                return [];
            })
    }

    async getPlanets(): Promise<PlanetDto[]> {
        let planetsDto: PlanetDto[] = [];

        for (let page = 1; page < 8; page++) {
            planetsDto = planetsDto.concat(await this.getPlanetsInBatch(page));
        }
        return planetsDto;
    }
}
