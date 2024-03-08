/* eslint-disable react/prop-types */
import { turnDecimal } from "./utils/formatters";
import divider from "../assets/icons/divider.svg";
import weighten from "../assets/icons/weight.svg";
import straighten from "../assets/icons/straighten.svg";
import { v4 as uuvid } from "uuid";

export default function PokemonAboutDetails({
  name,
  weight,
  height,
  abilities,
}) {
  const turnDecimalWeight = turnDecimal(weight);
  const turnDecimalHeight = turnDecimal(height);

  return (
    <div className="pokemonDetails_body">
      <div className="pokemonDetails_section_weight">
        <div className="pokemonDetails_img_and_valor">
          <img
            className="pokemon_weight_img"
            src={weighten}
            alt={`${name} weight`}
          />
          <p className="pokemon_weight_title">{turnDecimalWeight}Kg</p>
        </div>

        <div className="pokemon_details_weight">Weight</div>
      </div>

      <div>
        <img
          className="divider"
          src={divider}
          alt="divider"
        />
      </div>

      <div className="pokemonDetails_section_height">
        <div className="pokemonDetails_img_and_valor">
          <img
            className="pokemon_height_img"
            src={straighten}
            alt={`${name} height`}
          />
          <p className="pokemon_height_title">{turnDecimalHeight}m</p>
        </div>
        <div className="pokemon_details_height">Height</div>
      </div>

      <div>
        <img
          className="divider"
          src={divider}
          alt="divider"
        />
      </div>

      <div className="pokemonDetails_section_abilities">
        <div className="pokemonDetails_abilities">
          {abilities.map((ability) => (
            <div
              key={uuvid()}
              className="ability"
            >
              {ability.ability.name}
            </div>
          ))}
        </div>
        <div className="pokemon_details_abilities">Moves</div>
      </div>
    </div>
  );
}
