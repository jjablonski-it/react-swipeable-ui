import {
  ComponentType,
  ReactElement,
  ReactNode,
  useEffect,
  useState,
} from "react";
import useWindowsScroll from "../hooks/useWindowsScroll";

interface Props {
  children: ReactNode;
  page: number;
}

function Scroll({ children, page = 0 }: Props) {
  const [currentPage, setCurrentPage] = useState(page);
  const { direction } = useWindowsScroll();

  const CurrentPage: ComponentType = children[currentPage];

  console.log("direction", direction);

  useEffect(() => {}, [direction]);

  return <CurrentPage key={currentPage} />;
}

export default Scroll;
