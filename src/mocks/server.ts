import { createServer, Model, Response } from "miragejs";

import { nanoid } from "./nanoid";
import { TollPassage, TollRules, Vehicle } from "./types";
import { calculateDailyFee, getTollFee, isTollFreeVehicle, tollRules } from "./utils";

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
      server.create("vehicle", { id: "1", type: "Car" });
      server.create("vehicle", { id: "2", type: "Motorbike" });
      server.create("vehicle", { id: "3", type: "Emergency" });
      server.create("vehicle", { id: "4", type: "Diplomat" });
      server.create("vehicle", { id: "5", type: "Bus" });
      server.create("vehicle", { id: "6", type: "Truck" });

      // Seed with sample passages
      const today = new Date().toISOString().split('T')[0];

      // Sample car passages during different times
      server.create("passage", {
        id: nanoid(),
        vehicleId: "1",
        timestamp: `${today}T07:15:00.000Z`,
        location: "North Entrance",
        fee: 18
      });

      server.create("passage", {
        id: nanoid(),
        vehicleId: "1",
        timestamp: `${today}T08:45:00.000Z`,
        location: "East Entrance",
        fee: 8
      });

      server.create("passage", {
        id: nanoid(),
        vehicleId: "1",
        timestamp: `${today}T16:30:00.000Z`,
        location: "South Entrance",
        fee: 18
      });

      // Motorbike passage (free)
      server.create("passage", {
        id: nanoid(),
        vehicleId: "2",
        timestamp: `${today}T12:00:00.000Z`,
        location: "West Entrance",
        fee: 0
      });

      // Emergency vehicle (free)
      server.create("passage", {
        id: nanoid(),
        vehicleId: "3",
        timestamp: `${today}T14:22:00.000Z`,
        location: "North Entrance",
        fee: 0
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

      // Calculate toll fee for a specific vehicle and time
      this.post("/calculate-toll", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);

        if (!attrs.vehicleType || !attrs.timestamp) {
          return new Response(400, {}, { error: "Vehicle type and timestamp are required" });
        }

        const fee = getTollFee(attrs.timestamp, attrs.vehicleType);

        return {
          fee,
          vehicleType: attrs.vehicleType,
          timestamp: attrs.timestamp,
          isFree: fee === 0,
          reason: isTollFreeVehicle(attrs.vehicleType)
            ? "Vehicle type is toll-free"
            : (fee === 0 ? "Time or date is toll-free" : "Standard toll applies")
        };
      });

      // Record a new toll passage
      this.post("/passages", (schema, request) => {
        const attrs = JSON.parse(request.requestBody);

        if (!attrs.vehicleType || !attrs.timestamp || !attrs.location) {
          return new Response(400, {}, { error: "Missing required fields" });
        }

        // Find or create the vehicle - use 'attrs' to match the MirageJS model properties
        let vehicle = schema.where("vehicle", { attrs: { type: attrs.vehicleType } }).models[0];
        if (!vehicle) {
          vehicle = schema.create("vehicle", { id: nanoid(), type: attrs.vehicleType });
        }

        // Calculate fee
        const fee = getTollFee(attrs.timestamp, attrs.vehicleType);

        // Create the passage
        const passage = schema.create("passage", {
          id: nanoid(),
          vehicleId: vehicle.id,
          timestamp: attrs.timestamp,
          location: attrs.location,
          fee
        });

        return passage;
      });

      // Get passages for a date
       this.get("/passages", (schema, request: { queryParams: { date?: string; vehicleType?: string } }) => {
         const { date, vehicleType } = request.queryParams;
         let passages = schema.all("passage").models;
        if (date) {
           const dateStart = new Date(date);
           dateStart.setHours(0, 0, 0, 0);
          const dateEnd = new Date(date);
           dateEnd.setHours(23, 59, 59, 999);
          passages = passages.filter(passage => {
             const passageDate = new Date((passage.attrs as TollPassage).timestamp);
             return passageDate >= dateStart && passageDate <= dateEnd;
           });
         }
        if (vehicleType) {
           const vehicleIds = schema.where("vehicle", { attrs: { type: vehicleType }}).models.map(v => v.id);
           passages = passages.filter(passage => vehicleIds.includes((passage.attrs as TollPassage).vehicleId));
         }
        // Group passages by date
         const passagesByDate: Record<string, TollPassage[]> = passages.reduce((acc, passage) => {
           const date = (passage.attrs as TollPassage).timestamp.split('T')[0];
           if (!acc[date]) {
             acc[date] = [];
           }
          // Find vehicle type - use schema.where instead of schema.find
           const vehicles = schema.where("vehicle", { attrs: { id: (passage.attrs as TollPassage).vehicleId } }).models;
           const vehicle = vehicles.length > 0 ? vehicles[0] : null;
          acc[date].push({
             id: (passage.attrs as TollPassage).id,
             timestamp: (passage.attrs as TollPassage).timestamp,
             vehicleId: vehicle ? (vehicle.attrs as Vehicle).type : "Unknown",
             fee: (passage.attrs as TollPassage).fee,
             location: (passage.attrs as TollPassage).location
           });
          return acc;
         }, {} as Record<string, TollPassage[]>);
        // Calculate daily totals
         const dailySummaries = Object.keys(passagesByDate).map(date => {
           const passages = passagesByDate[date];
          // Group by vehicle for toll calculation
           const passagesByVehicle: Record<string, Array<{ timestamp: string; vehicleId: string }>> = passages.reduce((acc, passage) => {
             if (!acc[passage.vehicleId]) {
               acc[passage.vehicleId] = [];
             }
             acc[passage.vehicleId].push({
               timestamp: passage.timestamp,
               vehicleId: passage.vehicleId
             });
             return acc;
           }, {} as Record<string, Array<{ timestamp: string; vehicleId: string }>>);
          // Calculate fee for each vehicle
           let totalFee = 0;
           Object.values(passagesByVehicle).forEach((vehiclePassages) => {
             totalFee += calculateDailyFee(vehiclePassages);
           });
          // Cap at max daily fee
           const cappedFee = Math.min(totalFee, tollRules.maxDailyFee);
          return {
             date,
             passages,
             totalFee: cappedFee,
             maxDailyFeeApplied: totalFee > tollRules.maxDailyFee
           };
         });
        return { dailySummaries };
       });
    },
  });

  return server;
}
