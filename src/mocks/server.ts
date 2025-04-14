import dayjs from "dayjs";
import { createServer, Model, Response } from "miragejs";

import { nanoid } from "./nanoid";
import { TollPassage, TollRules, Vehicle, VehicleType } from "./types";
import {
  calculateDailyFee,
  getTollFee,
  isTollFreeVehicle,
  tollRules,
} from "./utils";

// Initialize the mock server
export function makeServer({ environment = "development" } = {}) {
  const server = createServer({
    environment,

    models: {
      vehicle: Model.extend<Partial<Vehicle>>({}),
      passage: Model.extend<Partial<TollPassage>>({}),
      tollRule: Model.extend<Partial<TollRules>>({}),
    },

    seeds(server) {
      // Seed with some vehicle types
      server.create("vehicle", {
        id: "1",
        type: VehicleType.Car,
        make: "Toyota",
        model: "Corolla",
        year: 2015,
        color: "Blue",
        registrationNumber: "ABC123",
      });
      server.create("vehicle", {
        id: "2",
        type: VehicleType.Motorbike,
        make: "Yamaha",
        model: "YZF-R3",
        year: 2018,
        color: "Red",
        registrationNumber: "XYZ789",
      });
      server.create("vehicle", {
        id: "3",
        type: VehicleType.Emergency,
        make: "Ford",
        model: "Explorer",
        year: 2020,
        color: "White",
        registrationNumber: "EMG001",
      });
      server.create("vehicle", {
        id: "4",
        type: VehicleType.Diplomat,
        make: "Mercedes",
        model: "S-Class",
        year: 2019,
        color: "Black",
        registrationNumber: "DPL002",
      });
      server.create("vehicle", {
        id: "5",
        type: VehicleType.Bus,
        make: "Volvo",
        model: "7900",
        year: 2017,
        color: "Yellow",
        registrationNumber: "BUS003",
      });
      server.create("vehicle", {
        id: "6",
        type: VehicleType.Truck,
        make: "Scania",
        model: "R450",
        year: 2016,
        color: "Green",
        registrationNumber: "TRK004",
      });
      server.create("vehicle", {
        id: "7",
        type: VehicleType.Military,
        make: "Humvee",
        model: "M998",
        year: 2012,
        color: "Camouflage",
        registrationNumber: "MIL005",
      });
      server.create("vehicle", {
        id: "8",
        type: VehicleType.Foreign,
        make: "BMW",
        model: "X5",
        year: 2021,
        color: "Silver",
        registrationNumber: "FRN006",
      });
      server.create("vehicle", {
        id: "9",
        type: VehicleType.Tractor,
        make: "John Deere",
        model: "5075E",
        year: 2014,
        color: "Green",
        registrationNumber: "TRC007",
      });

      // Seed with sample passages
      const today = dayjs().toISOString().split("T")[0];
      const yesterday = dayjs().subtract(1, "day").toISOString().split("T")[0];

      // Sample car passages during different times
      server.create("passage", {
        id: nanoid(),
        vehicleId: "1",
        timestamp: `${today}T07:15:00.000Z`,
        location: "North Entrance",
        fee: 18,
      });

      server.create("passage", {
        id: nanoid(),
        vehicleId: "1",
        timestamp: `${today}T08:45:00.000Z`,
        location: "East Entrance",
        fee: 8,
      });

      server.create("passage", {
        id: nanoid(),
        vehicleId: "1",
        timestamp: `${today}T16:30:00.000Z`,
        location: "South Entrance",
        fee: 18,
      });

      server.create("passage", {
        id: nanoid(),
        vehicleId: "1",
        timestamp: `${yesterday}T07:15:00.000Z`,
        location: "North Entrance",
        fee: 18,
      });

      server.create("passage", {
        id: nanoid(),
        vehicleId: "1",
        timestamp: `${yesterday}T08:45:00.000Z`,
        location: "East Entrance",
        fee: 8,
      });

      server.create("passage", {
        id: nanoid(),
        vehicleId: "1",
        timestamp: `${yesterday}T16:30:00.000Z`,
        location: "South Entrance",
        fee: 18,
      });

      // Motorbike passage (free)
      server.create("passage", {
        id: nanoid(),
        vehicleId: "2",
        timestamp: `${today}T12:00:00.000Z`,
        location: "West Entrance",
        fee: 0,
      });

      // Emergency vehicle (free)
      server.create("passage", {
        id: nanoid(),
        vehicleId: "3",
        timestamp: `${today}T14:22:00.000Z`,
        location: "North Entrance",
        fee: 0,
      });
    },

    routes() {
      this.namespace = "api";

      // Get all available vehicle types
      this.get("/vehicles", (schema) => {
        return schema.all("vehicle");
      });

      // Get toll rules
      this.get("/toll-rules", () => {
        return tollRules;
      });

      // Get vehicle by registration number
      this.get("/vehicles/:registrationNumber", (schema, request) => {
        const registrationNumber = request.params.registrationNumber;
        const vehicle = schema.where("vehicle", { registrationNumber } as never)
          .models[0];
        if (!vehicle) {
          return new Response(404, {}, { error: "Vehicle not found" });
        }
        return vehicle;
      });

      // Get all toll passages for vehicle id
      this.get("/passages/:vehicleId", (schema, request) => {
        const vehicleId = request.params.vehicleId;
        const passages = schema.where("passage", { vehicleId } as never).models;
        return passages;
      });

      // Calculate toll fee for a specific vehicle and time
      this.post("/calculate-toll", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);

        if (!attrs.vehicleType || !attrs.timestamp) {
          return new Response(
            400,
            {},
            { error: "Vehicle type and timestamp are required" }
          );
        }

        const fee = getTollFee(attrs.timestamp, attrs.vehicleType);

        return {
          fee,
          vehicleType: attrs.vehicleType,
          timestamp: attrs.timestamp,
          isFree: fee === 0,
          reason: isTollFreeVehicle(attrs.vehicleType)
            ? "Vehicle type is toll-free"
            : fee === 0
            ? "Time or date is toll-free"
            : "Standard toll applies",
        };
      });

      // Record a new toll passage
      this.post("/passages", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);

        if (!attrs.vehicleType || !attrs.timestamp || !attrs.location) {
          return new Response(400, {}, { error: "Missing required fields" });
        }

        // Find or create the vehicle - use 'attrs' to match the MirageJS model properties
        let vehicle = schema.where("vehicle", {
          attrs: { type: attrs.vehicleType },
        }).models[0];
        if (!vehicle) {
          vehicle = schema.create("vehicle", {
            id: nanoid(),
            type: attrs.vehicleType,
          });
        }

        // Calculate fee
        const fee = getTollFee(attrs.timestamp, attrs.vehicleType);

        // Create the passage
        const passage = schema.create("passage", {
          id: nanoid(),
          vehicleId: vehicle.id,
          timestamp: attrs.timestamp,
          location: attrs.location,
          fee,
        });

        return passage;
      });

      // Get passages for a date
      this.get(
        "/passages",
        (
          schema,
          request: {
            queryParams: {
              date?: string;
              numberOfDays?: string;
              vehicleId?: string;
            };
          }
        ) => {
          const { date, vehicleId } = request.queryParams;
          let passages = schema.all("passage").models;

          // Filter by date if provided
          if (date) {
            const dateStart = new Date(date);
            dateStart.setHours(0, 0, 0, 0);
            const dateEnd = new Date(date);
            if (request.queryParams.numberOfDays) {
              const days = Number(request.queryParams.numberOfDays);
              if (days > 30) {
                dateEnd.setMonth(dateEnd.getMonth() + Math.floor(days / 30));
                dateEnd.setDate(dateEnd.getDate() + (days % 30));
              } else {
                dateEnd.setDate(dateEnd.getDate() + days);
              }
            }
            dateEnd.setHours(23, 59, 59, 999);
            passages = passages.filter((passage) => {
              const passageDate = new Date(
                (passage.attrs as TollPassage).timestamp
              );
              return (
                dayjs(passageDate).isBefore(dayjs(dateEnd)) &&
                dayjs(passageDate).isAfter(dayjs(dateStart))
              );
            });
          }

          // Filter by vehicleId directly
          if (vehicleId) {
            passages = passages.filter(
              (passage) =>
                (passage.attrs as TollPassage).vehicleId === vehicleId
            );
          }

          // Group passages by date
          const passagesByDate: Record<string, TollPassage[]> = passages.reduce(
            (acc, passage) => {
              const date = (passage.attrs as TollPassage).timestamp.split(
                "T"
              )[0];
              if (!acc[date]) {
                acc[date] = [];
              }
              acc[date].push({
                id: (passage.attrs as TollPassage).id,
                timestamp: (passage.attrs as TollPassage).timestamp,
                vehicleId: (passage.attrs as TollPassage).vehicleId,
                fee: (passage.attrs as TollPassage).fee,
                location: (passage.attrs as TollPassage).location,
              });
              return acc;
            },
            {} as Record<string, TollPassage[]>
          );

          // Calculate daily summaries
          const dailySummaries = Object.keys(passagesByDate).map((date) => {
            const passages = passagesByDate[date];
            const totalFee = calculateDailyFee(passages);
            const cappedFee = Math.min(totalFee, tollRules.maxDailyFee);

            return {
              date,
              passages,
              totalFee: cappedFee,
              maxDailyFeeApplied: totalFee > tollRules.maxDailyFee,
            };
          });

          return { dailySummaries };
        }
      );
    },
  });

  return server;
}
