import getSuspender from "./getSuspender";

function fetchData(url: string) {
  const promise = fetch(url)
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((err) => null);

  return getSuspender(promise);
}

export default fetchData;
