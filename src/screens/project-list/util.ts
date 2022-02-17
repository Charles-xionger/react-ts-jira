import { useUrlQueryParam } from "utils/url";
import { useMemo } from "react";

export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
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

  return Object.is(Number(value), NaN) ? undefined : Number(value);
};
