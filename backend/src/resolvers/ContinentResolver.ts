import { Continent } from "../entities/continent";
import { Query, Resolver } from "type-graphql";

@Resolver(Continent)
class ContinentResolver {
  @Query(() => [Continent])
  async getAllContinents() {
    return await Continent.find({ relations: ["countries"] });
  }
}

export default ContinentResolver;
