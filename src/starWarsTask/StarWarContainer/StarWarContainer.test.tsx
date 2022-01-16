import React from "react"
import {render, screen} from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import {getVehicleWithHighestPopulation} from "./StarWarContainer";
import {PlanetDto} from "../services/planetService/Model";
import {Pilot} from "../services/pilotService/Model";
import {Vehicle} from "../services/vehicleService/Model";

describe("<StarWarContainer />", () => {
    const vehicles: Vehicle[] = [
        new Vehicle(
            "vehicle2",
            [
                new Pilot("pilot4", new PlanetDto("planet4", "30", [], ""), []),
                new Pilot("pilot5", new PlanetDto("planet5", "unknown", [], ""), []),
                new Pilot("pilot6", new PlanetDto("planet6", "20", [], ""), []),
            ]
        ),
        new Vehicle(
            "vehicle1",
            [
                new Pilot("pilot1", new PlanetDto("planet1", "10", [], ""), []),
                new Pilot("pilot2", new PlanetDto("planet2", "20", [], ""), []),
                new Pilot("pilot3", new PlanetDto("planet3", "unknown", [], ""), [])
            ]
        ),
        new Vehicle(
            "vehicle3",
            [
                new Pilot("pilot7", new PlanetDto("planet7", "200", [], ""), []),
            ]
        )
    ];

    it("should calculate vehicle names have the highest sum of population for all its pilots’ home planets", () => {

        const actual = getVehicleWithHighestPopulation(vehicles);
        expect(actual).toEqual(vehicles[2]);

        const actualPilots = actual.pilots;
        expect(actualPilots).toEqual(vehicles[2].pilots);

        const actualPlanets = actualPilots.map(pilot => pilot.homeworld);
        expect(actualPlanets).toEqual(vehicles[2].pilots.map(pilot => pilot.homeworld));

        const actualHighestPopulation = calculateSumOfPopulation(actualPlanets);
        const expectedHighestPopulation = calculateSumOfPopulation(vehicles[2].pilots.map(pilot => pilot.homeworld));

        expect(actualHighestPopulation).toEqual(expectedHighestPopulation)
    });

    function calculateSumOfPopulation(planetDtos: PlanetDto[]): number{
        return planetDtos.map(planet => planet.population !== "unknown" ? +planet.population : 0)
            .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    }
});
