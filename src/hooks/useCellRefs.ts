import { useRef } from "react";

const useCellRefs = (rows: number, columns: number) => {
  const cellRefs = useRef<
    Array<Array<React.MutableRefObject<HTMLInputElement | null>>>
  >([]);

  for (let i = 0; i < rows; i++) {
    cellRefs.current.push(
      Array.from({ length: columns }, () =>
        useRef<HTMLInputElement | null>(null)
      )
    );
  }

  return cellRefs;
};

export default useCellRefs;
