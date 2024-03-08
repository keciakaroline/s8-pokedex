/* eslint-disable react/prop-types */
import { pokemonType, formatStat, calculateWidth } from "./utils/formatters";
import { v4 as uuvid } from "uuid";

export default function PokemonStats({ types, stats }) {
  const typeColor = pokemonType(types);

  return (
    <div>
      {stats.map((stat) => {
        const formattedStat = formatStat(stat.base_stat);
        const width = calculateWidth(stat.base_stat);

        return (
          <div
            key={uuvid()}
            className="pokemonDetails_stats_valor_bar"
          >
            <p className="statsValor">{formattedStat}</p>

            <div
              className={`statsBar_progress statsBar_progress_pokemon-type--${typeColor}`}
            >
              <div
                className={`statsBar statsBar_pokemon-type--${typeColor}`}
                style={{ width }}
              ></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
