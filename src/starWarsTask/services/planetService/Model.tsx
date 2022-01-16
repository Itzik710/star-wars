import {Pilot} from "../pilotService/Model";

export class PlanetResult {
    constructor(
        public results: PlanetDto[],
    ) {
    }
}

export class PlanetDto {
    constructor(
        public name: string,
        public population: string,
        public residents: Pilot[],
        public url: string,
    ) {
    }
}
