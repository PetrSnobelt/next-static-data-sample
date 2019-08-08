/* eslint-disable no-param-reassign, no-unused-vars, import/no-extraneous-dependencies */
const path = require("path")
// const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")
const webpack = require("webpack")

const isProd = process.env.NODE_ENV === "production"

module.exports = {
  // async exportPathMap(defaultPathMap) {
  //   return pages
  // },

  exportPathMap: async function(
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    // console.log("export", defaultPathMap, dev, dir, outDir, distDir, buildId )
    return {
      '/': { page: '/' },
      '/now': { page: "/[name]" },
      // '/now': { page: "/[name]", query: { name: 'now' }   },
      '/next': { page: "/[name]", query: { name: 'next' } },
      // Solution A
      '/A/1': { page: "/A/1" },
      '/A/now': { page: "/A/1", query: { name: 'now' } },
      '/A/next': { page: "/A/1", query: { name: 'next' } },
      // Solution B
      '/B': { page: "/B" },
      '/B/now': { page: "/B", query: { name: 'now' } },
      '/B/next': { page: "/B", query: { name: 'next' } },

      // Solution C
      '/C': { page: "/C" },
    }
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders }) => {
    // Perform customizations to webpack config
    // config.externals = (config.externals || []).concat("fs")

    // Important: return the modified config
    return config
  },
}
