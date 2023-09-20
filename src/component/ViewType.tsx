import axios from "axios";
import { useEffect, useState } from "react";
import { Ipokemonlist } from "../types/interface";
import { useNavigate } from "react-router-dom";

function ViewType() {
  const navigate = useNavigate();
  const [typeList, setTypeList] = useState<Ipokemonlist[]>([]);
  const [type, setType] = useState({
    name: "normal",
    url: "https://pokeapi.co/api/v2/type/1/"
  });
  const [pokemonList, setPokemonList] = useState<{ pokemon: Ipokemonlist }[]>(
    []
  );

  useEffect(() => {
    const typeListData = async () => {
      try {
        let res = await axios
          .get("https://pokeapi.co/api/v2/type")
          .then((res) => {
            if (res.status === 200) {
              return res.data.results;
            }
          });

        setTypeList(res);
        return res;
      } catch (error) {
        console.log(error);
      }
    };

    typeListData();
  }, []);

  useEffect(() => {
    const typeData = async () => {
      try {
        let res = await axios.get(type.url).then((res) => {
          if (res.status === 200) {
            return res.data.pokemon;
          }
        });

        setPokemonList(res);
      } catch (error) {
        console.log(error);
      }
    };

    typeData();
  }, [type.name]);

  console.log(type.name);

  return (
    <div>
      <ul className="types">
        {typeList.map((i) => (
          <li
            key={i.name}
            className={`r-btn ${i.name === type.name ? type.name : "normal"}`}
            onClick={() => setType({ name: i.name, url: i.url })}
          >
            {i.name}
          </li>
        ))}
      </ul>

      <div className="type-list">
        <div className={`${type.name} title r-btn`}>{type.name}</div>

        <ul className="card">
          {pokemonList.map((pokemon) => (
            <li
              key={pokemon.pokemon.name}
              onClick={() =>
                navigate(`/${pokemon.pokemon.name}`, {
                  state: {
                    name: pokemon.pokemon.name,
                    url: pokemon.pokemon.url
                  }
                })
              }
            >
              {pokemon.pokemon.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ViewType;
