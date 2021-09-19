import { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const People = () => {
  const [page, setPage] = useState(1);
  const fetchPeople = async (page = 1) => {
    const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
    return res.json();
  };
  const {
    data,
    isLoading,
    isError,
    isSuccess,
    error,
    isFetching,
    isPreviousData,
  } = useQuery(["people", page], () => fetchPeople(page), {
    keepPreviousData: true,
  });
  return (
    <div>
      <h2>People</h2>
      {isError && <h2>{error.message}</h2>}
      {isLoading && <h2>Loading...</h2>}
      {isSuccess && (
        <div>
          {data.results.map((person) => {
            return <Planet key={person.name} person={person} />;
          })}
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

export default People;
