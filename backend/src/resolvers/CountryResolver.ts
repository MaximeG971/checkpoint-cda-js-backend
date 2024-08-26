import { Country } from "../entities/country";
import { Continent } from "../entities/continent";
import { Query, Resolver, Mutation, Arg, InputType, Field } from "type-graphql";

@InputType()
class CountryInput {
  @Field()
  name: string;

  @Field()
  code: string;

  @Field()
  emoji: string;

  @Field()
  continent: string;
}

@Resolver(Country)
class CountryResolver {
  @Query(() => [Country])
  async getAllCountries() {
    return await Country.find({ relations: ["continent"] });
  }

  @Query(() => Country)
  async getCountry(@Arg("code") code: string) {
    return await Country.findOne({ where: { code }, relations: ["continent"] });
  }

  @Mutation(() => String)
  async addCountry(@Arg("data") newCountry: CountryInput) {
    const continent = await Continent.findOne({
      where: { name: newCountry.continent },
    });

    if (!continent) {
      throw new Error("Continent not found");
    }

    const country = Country.create({
      ...newCountry,
      continent,
    });

    await country.save();
    return "Country successfully created";
  }
}

export default CountryResolver;
