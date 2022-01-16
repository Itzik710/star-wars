import {Pilot} from "../pilotService/Model";

export class Vehicle {
    constructor(
        public name: string,
        public pilots: Pilot[],
    ) {
    }
}

export class VehicleDto {
    constructor(
        public name: string,
        public pilots: string[],
        public url: string,
    ) {
    }
}

export class VehicleResult {
    constructor(
        public results: VehicleDto[],
    ) {
    }
}
