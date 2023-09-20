import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { IDetailData, Ipokemonlist } from "../types/interface";
import Wrapper from "../component/Wrapper";

interface IAbilityList {
  name: string;
  effect: string;
}

function Detail() {
  const { state }: { state: Ipokemonlist } = useLocation();
  const [detailData, setDetailData] = useState<IDetailData>();
  const [abilityList, setAbilityList] = useState<IAbilityList[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(state.url).then((res) => res.data);

        setDetailData({
          abilities: res.abilities,
          height: res.height,
          weight: res.weight,
          img: res.sprites.other.dream_world.front_default,
          types: res.types,
        });
      } catch (error) {
        console.log(error, "detail");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (detailData !== undefined) {
      const abilityData = async () => {
        try {
          const newAbilityList = [];
          for (let i = 0; i < detailData.abilities.length; i++) {
            const abilityApi = await axios
              .get(detailData.abilities[i].ability.url)
              .then((res) => {
                const enEntry = res.data.effect_entries.find(
                  (entry: { language: { name: string } }) =>
                    entry.language.name === "en"
                );
                return { name: res.data.name, effect: enEntry.effect };
              });
            newAbilityList.push(abilityApi);
          }
          setAbilityList(newAbilityList);
        } catch (error) {
          console.log(error, "ability");
        }
      };

      abilityData();
    }
  }, [detailData]);

  return (
    <Wrapper>
      <div onClick={() => navigate(-1)} className="x-btn">
        ×
      </div>
      <div>
        <h1>{state.name}</h1>
        <img src={detailData?.img} />
        <ul className="types">
          {detailData?.types.map((type) => (
            <li key={type.type.name} className={`${type.type.name} r-btn`}>
              {type.type.name}
            </li>
          ))}
        </ul>
        <div>Height: {detailData?.height}</div>
        <div className="mt10">Weight: {detailData?.weight}</div>
        <div className="effect box">
          <div>EFFECT</div>
          <ul>
            {abilityList?.map((i) => (
              <li key={i.name}>
                <div>{i.name} </div>
                <div>{i.effect}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Wrapper>
  );
}

export default Detail;
