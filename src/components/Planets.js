import { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const Planets = () => {
  const [page, setPage] = useState(1);
  const fetchPlanets = async (page = 1) => {
    const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
    return res.json();
  };
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    error,
    isPreviousData,
  } = useQuery(["planets", page], () => fetchPlanets(page), {
    keepPreviousData: true,
  });
  console.log(page);
  return (
    <div>
      <h2>Planets</h2>
      {isError && <h2>{error.message}</h2>}
      {isLoading && <h2>Loading...</h2>}
      {isSuccess && (
        <div>
          {data?.results?.map((planet) => {
            return <Planet key={planet.name} planet={planet} />;
          })}
          {
            //Math.max take in two numbers and returns the biggest here if old is 3 so 3-1=2 2>1 so returns 2
          }
          <button
            disabled={page === 1}
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
          >
            Previous Page
          </button>
          <span style={{ margin: "0 20px" }}>{page}</span>
          <button
            style={{ marginBottom: "200px" }}
            onClick={() => {
              if (!isPreviousData && data.next) {
                setPage((old) => old + 1);
              }
            }}
            disabled={isPreviousData || !data?.next}
          >
            Next Page
          </button>
        </div>
      )}
    </div>
  );
};

export default Planets;
