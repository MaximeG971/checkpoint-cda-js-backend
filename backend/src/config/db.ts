import { Country } from "../entities/country";
import { Continent } from "../entities/continent";
import { DataSource } from "typeorm";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "db.sqlite",
  synchronize: true,
  logging: ["error", "query"],
  entities: [Country, Continent],
});
