import dynamic from "next/dynamic"
import Link from "next/link"
import Async, { createInstance } from "react-async"
import DevTools from "react-async-devtools"

import Debug from "../../components/debug"

const CHUCK_URL = "https://api.chucknorris.io/jokes/random"
const COUNTRIES_URL = "https://restcountries.eu/rest/v2/all"

const loadURL = ({ url }, { signal }) => {
  return fetch(url, { signal })
    .then(res => (res.ok ? res : Promise.reject(res)))
    .then(res => res.json())
}

const loadCache = {}
const load = ({ url }, { signal }) => {
  if (!loadCache[url]) {
    loadCache[url] = loadURL({ url }, { signal })
  }
  return loadCache[url]
}

const AsyncCountries = createInstance(
  {
    promiseFn: load,
    url: COUNTRIES_URL,
    debugLabel: COUNTRIES_URL.substr(8)
  },
  "AsyncCountries"
)

const LazyCountries = createInstance(
  {
    deferFn: (args, props, controller) => load(props, controller),
    url: COUNTRIES_URL,
    debugLabel: COUNTRIES_URL.substr(8)
  },
  "LazyCountries"
)

const Flags = ({ data, start = 1, end = 11 }) => (
  <>
    {Object.values(data)
      .slice(start, end)
      .map(d => (
        <img
          src={d.flag}
          alt={d.name}
          title={d.name}
          key={d.alpha3Code}
          width="33"
          hspace="2"
        />
      ))}
  </>
)

const LazyFlags = () => (
  <LazyCountries>
    <LazyCountries.Initial>
      {({ error, isPending, run }) => (
        <div onMouseOver={run}>
          <p>
            This text is only rendered while the promise has not fulfilled yet.
          </p>
        </div>
      )}
    </LazyCountries.Initial>
    <LazyCountries.Loading>Loading flags...</LazyCountries.Loading>
    <LazyCountries.Fulfilled>
      {data => <Flags data={data} />}
    </LazyCountries.Fulfilled>
  </LazyCountries>
)

function PageD(props) {
  return (
    <main>
      <h1>
        <a href="https://github.com/async-library/react-async">
          React async sample
        </a>
      </h1>
      <DevTools />
      <Async promiseFn={load} url={CHUCK_URL} debugLabel="chuck">
        <Async.Loading>Loading joke...</Async.Loading>
        <Async.Fulfilled>
          {({ value }) => (
            <div>
              <strong>Chuck joke: </strong> {value}
            </div>
          )}
        </Async.Fulfilled>
      </Async>
      <hr />
      <LazyFlags />
      <hr />
      <LazyFlags />
      <hr />
      <LazyFlags />
      <hr />
      <LazyFlags />
      <hr />
      <LazyFlags />
      <h2>Lazy load countries</h2>
      <LazyCountries>
        <LazyCountries.Initial>
          {({ error, isPending, run }) => (
            <div onMouseOver={run}>
              <p>
                This text is only rendered while the promise has not fulfilled
                yet.
              </p>
            </div>
          )}
        </LazyCountries.Initial>
        <LazyCountries.Loading>Loading...</LazyCountries.Loading>
        <LazyCountries.Fulfilled>
          {data => <Flags data={data} />}
        </LazyCountries.Fulfilled>
      </LazyCountries>
      <hr />
      <AsyncCountries>
        something here
        <AsyncCountries.Fulfilled>
          {data => <Flags data={data} />}
        </AsyncCountries.Fulfilled>
      </AsyncCountries>
      <hr />
      <Async
        deferFn={(args, props, controller) => load(props, controller)}
        url={COUNTRIES_URL}
        debugLabel="countries"
      >
        <Async.Initial>
          {({ error, isPending, run }) => (
            <div>
              <p>
                This text is only rendered while the promise has not fulfilled
                yet.
              </p>
              <button onClick={run}>Run</button>
              {error && <p>{error.message}</p>}
            </div>
          )}
        </Async.Initial>
        <Async.Loading>Loading...</Async.Loading>
        <Async.Fulfilled>
          {data => (
            <div>
              <strong>Loaded some data:</strong>
              <small>
                <Debug {...data} />
              </small>
            </div>
          )}
        </Async.Fulfilled>
        <Async.Rejected>
          {error => `Something went wrong: ${error.message}`}
        </Async.Rejected>
      </Async>
    </main>
  )
}

// PageD.getInitialProps = async ({ query }) => {
//   return { query }
// }

export default PageD
