# NextJS & static data
Examples of different usage of static files with nextjs

## option A:

Just add `getInitialProps` with reading file of file and disable `fs` in `package.json`
This code can be in `_app` code for easy reuse

Disadvantage:

- fs.ReadFile in bundle
- Doesn't work client-side for obvious reason

## option B

dynamic import inside `getInitialProps`

Nice and elegant solution, work with next link

## option C

Read data inside `_document.js` and provide it inside query then extract it in `getInitialProps` of page
Optionally do it in `_app.js` to provide such data for all pages

## option D

Create custom server and pass data here, you can probably pass this data also in static prerendering
https://github.com/zeit/next.js/tree/canary/examples/pass-server-data 

## option E

Instead of reading data from disk read it using api - they are public anyway, so it simplify code and make it working with next link (and it's preloading)

### Useful notes from next documentation:
For the initial page load, `getInitialProps` will execute on the server only. `getInitialProps` will only be executed on the client when navigating to a different route via the `Link` component or using the routing APIs.

https://arunoda.me/blog/ssr-and-server-only-modules
