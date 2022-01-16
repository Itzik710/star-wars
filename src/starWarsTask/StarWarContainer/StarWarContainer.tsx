import React, {useEffect, useState} from 'react';
import TableComponent from "../components/TableComponent/TableComponent";
import {Row} from "../components/TableComponent/Model";
import ChartComponent from "../components/ChartComponent/ChartComponent";
import {Bar} from "../components/ChartComponent/Model";
import styles from "./StarWarContainer.module.css"
import {VehicleService} from "../services/vehicleService/VehicleService";
import {PilotService} from "../services/pilotService/PilotService";
import {PlanetService} from "../services/planetService/PlanetService";
import {Vehicle} from "../services/vehicleService/Model";
import {PlanetDto} from "../services/planetService/Model";
import {createVehicles} from "../utills/CreateVehiclesUtill";

interface StarWarContainerProps {
}

const vehicleService = new VehicleService();
const pilotService = new PilotService();
const planetService = new PlanetService();

const StarWarContainer: React.FC<StarWarContainerProps> = ({}) => {
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [planets, setPlanets] = useState<PlanetDto[]>([]);

    useEffect(() => {
        getStarWarsData();
    }, []);

    // If I would work on this API, I would create one DTO object in server that will retrieve all the data and call only one end-point
    const getStarWarsData = async () => {
        const planetsDto: PlanetDto[] = await planetService.getPlanets();

        setVehicles(createVehicles(await vehicleService.getVehicles(), await pilotService.getPilots(), planetsDto));
        setPlanets(planetsDto);
    };

    return (
        <div className={styles.center}>
            {
                vehicles && vehicles.length ?
                    <TableComponent
                        rows={createTableRows(getVehicleWithHighestPopulation(vehicles))}
                    />
                    : undefined
            }
            {
                planets && planets.length ?
                    <div className={styles.bar}>
                        <ChartComponent
                            bars={createBars(planets)}
                        />
                    </div>
                    : undefined
            }
        </div>
    )
};

// calculate vehicle names have the highest sum of population for all its pilots’ home planets
export const getVehicleWithHighestPopulation = (vehicles: Vehicle[]): Vehicle => (
    vehicles.reduce((previousValue, currentValue) => getVehicleWithHigherPopulation(previousValue, currentValue))
);

const getVehicleWithHigherPopulation = (vehicle1: Vehicle, vehicle2: Vehicle): Vehicle => (
    calculateVehicleSumOfPopulation(vehicle1) > calculateVehicleSumOfPopulation(vehicle2) ? vehicle1 : vehicle2
);

const calculateVehicleSumOfPopulation = (vehicle: Vehicle): number => (
    vehicle.pilots.map(it => (
        it.homeworld.population !== "unknown" ? +it.homeworld.population : 0
    )).reduce((population1, population2) => population1 + population2, 0)
);

const createTableRows = (vehicle: Vehicle): Row<any>[] => {
    return [
        new Row<string>("Vehicle name with the largest sum: ", vehicle.name),
        new Row<string[]>("Related home planets and their respective population: ", createPlanetsRow(vehicle)),
        new Row<string[]>("Related pilot names: ", createPilotsRow(vehicle))
    ];
};

const createPlanetsRow = (vehicle: Vehicle): string[] => (
    vehicle.pilots.map(pilot => pilot.homeworld).map(planet => `(${planet.name}, ${planet.population}) `)
);

const createPilotsRow = (vehicle: Vehicle) => (
    vehicle.pilots.map(pilot => `(${pilot.name}) `)
);

const createBars = (planets: PlanetDto[]): Bar[] => {
    const requiredPlanets = ["Tatooine", "Alderaan", "Naboo", "Bespin", "Endor"];

    return planets.filter(planet => requiredPlanets.includes(planet.name) && planet.population !== "unknown")
        .map(planet => new Bar(planet.name, +planet.population))
};

export default StarWarContainer;
