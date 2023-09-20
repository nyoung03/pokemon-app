import Header from "./Header";

interface IProps {
  children: React.ReactNode;
}

function Wrapper(props: IProps) {
  return (
    <div id="wrap">
      <Header />
      {props.children}
    </div>
  );
}

export default Wrapper;
