import { useUrlQueryParam } from "utils/url";
import { useMemo } from "react";

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  console.log(param, "paramQuery");
  return [
    useMemo(
      () =>
        ({ ...param, personId: numberIsNotNaN(param.personId) } || undefined),
      [param]
    ),
    setParam,
  ] as const;
};

const numberIsNotNaN = (value: any) => {
  // NaN === NaN => false
  const numberIsNotNaN = Object.is(Number(value), NaN)
    ? undefined
    : Number(value);
  console.log(numberIsNotNaN, "numberIsNotNaN");

  return numberIsNotNaN;
};
