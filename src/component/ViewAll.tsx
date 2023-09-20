import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentPageNumAtom, pageRangeAtom } from "../recoil/recoil";
import { useRecoilState } from "recoil";
import { IData, Ipokemonlist } from "../types/interface";
import axios from "axios";

function ViewAll() {
  const navigate = useNavigate();
  const [pokemonList, setPokemonList] = useState<Ipokemonlist[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0);
  const [currentPageNum, setCurrentPageNum] =
    useRecoilState(currentPageNumAtom);
  const [pageRange, setPageRange] = useRecoilState(pageRangeAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res: IData = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?offset=${
            (currentPageNum - 1) * 20
          }&limit=20`
        );

        if (res.status === 200) {
          setPokemonList(res.data.results);
          setTotalPage(Math.ceil(res.data.count / 20));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [currentPageNum]);

  const onClickPrev = () => {
    if (currentPageNum !== 1) {
      setCurrentPageNum((prev) => prev - 1);
    } else if (currentPageNum === 1) {
      return;
    }

    if (currentPageNum % 5 === 1) {
      setPageRange((prev) => prev - 5);
    }
  };

  const onClickNext = () => {
    if (currentPageNum !== totalPage) {
      setCurrentPageNum((prev) => prev + 1);
    } else if (currentPageNum === totalPage) {
      return;
    }

    if (currentPageNum % 5 === 0) {
      setPageRange((prev) => prev + 5);
    }
  };

  return (
    <div>
      <ul className="card">
        {pokemonList.map((pokemon) => (
          <li
            key={pokemon.name}
            className="box"
            onClick={() =>
              navigate(`/${pokemon.name}`, {
                state: { name: pokemon.name, url: pokemon.url },
              })
            }
          >
            {pokemon.name}
          </li>
        ))}
      </ul>

      <aside>
        <button onClick={onClickPrev}>{"<"}</button>
        <ul className="paging">
          {Array.from({ length: totalPage }, (_, index) => index + 1)
            .slice(pageRange, pageRange + 5)
            .map((num) => (
              <li
                key={num}
                className={currentPageNum === num ? "on" : ""}
                onClick={() => setCurrentPageNum(num)}
              >
                {num}
              </li>
            ))}
        </ul>
        <button onClick={onClickNext}>{">"}</button>
      </aside>
    </div>
  );
}

export default ViewAll;
