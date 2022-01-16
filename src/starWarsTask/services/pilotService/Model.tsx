import {PlanetDto} from "../planetService/Model";

export class Pilot {
    constructor(
        public name: string,
        public homeworld: PlanetDto,
        public vehicles: string[],
    ) {
    }
}

export class PilotDto {
    constructor(
        public name: string,
        public homeworld: string,
        public vehicles: string[],
        public url: string,
    ) {
    }
}

export class PilotResult {
    constructor(
        public results: PilotDto[],
    ) {
    }
}
