import { useEffect, useState } from "react";
import "./assets/reset.css";
import "./assets/style.scss";
import ViewAll from "./component/ViewAll";
import ViewType from "./component/ViewType";
import { useRecoilState } from "recoil";
import { viewMenuAtom } from "./recoil/recoil";
import Wrapper from "./component/Wrapper";

const view = [{ name: "ALL" }, { name: "TYPE" }];

function App() {
  const [viewMenu, setViewMenu] = useRecoilState(viewMenuAtom);
  const [lineStyle, setLineStyle] = useState({
    width: 0,
    left: 0,
    top: 8,
  });

  useEffect(() => {
    const firstList = document.querySelector<HTMLLIElement>(
      "nav > .view-toggle >  div:first-child"
    );

    if (firstList) {
      setLineStyle({
        width: firstList.clientWidth,
        left: firstList.offsetLeft,
        top: firstList.offsetTop + firstList.offsetHeight + 8,
      });
    }
  }, []);

  const onClickMenu = (e: React.MouseEvent<HTMLDivElement>, name: string) => {
    setLineStyle({
      width: e.currentTarget.offsetWidth,
      left: e.currentTarget.offsetLeft,
      top: e.currentTarget.offsetTop + e.currentTarget.offsetHeight + 8,
    });

    setViewMenu(name);
  };

  return (
    <Wrapper>
      <h1>POKEMON</h1>
      <main>
        <nav>
          <div className="view-toggle">
            {view.map((i) => (
              <div
                className={viewMenu === i.name ? "on" : ""}
                onClick={(e) => onClickMenu(e, i.name)}
                key={i.name}
              >
                {i.name}
              </div>
            ))}
          </div>
          <div
            className="line"
            style={{
              width: `${lineStyle.width}px`,
              left: `${lineStyle.left}px`,
              top: `${lineStyle.top}px`,
            }}
          />
        </nav>

        {viewMenu === "ALL" ? <ViewAll /> : <ViewType />}
      </main>
    </Wrapper>
  );
}

export default App;
