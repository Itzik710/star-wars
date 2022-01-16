import {Vehicle, VehicleDto} from "../services/vehicleService/Model";
import {Pilot, PilotDto} from "../services/pilotService/Model";
import {PlanetDto} from "../services/planetService/Model";

export const createVehicles = (vehiclesDtos: VehicleDto[], pilotsDtos: PilotDto[], planetsDtos: PlanetDto[]): Vehicle[] => (
    vehiclesDtos.map(vehicleDto => {
        const vehiclePilots = pilotsDtos.filter(pilotDto => vehicleDto.pilots.includes(pilotDto.url));
        const pilotsPlanets = planetsDtos.filter(planetDto => vehiclePilots.map(it => it.homeworld).includes(planetDto.url));
        return new Vehicle(
            vehicleDto.name,
            vehiclePilots.map(it => {
                const homeworld = planetsDtos.find(planetDto => planetDto.url === it.homeworld);
                return new Pilot(
                    it.name,
                    homeworld!!,
                    it.vehicles,
                )
            }),
        )
    })
);
