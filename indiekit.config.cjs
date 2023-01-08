require('dotenv').config()

const process = require("node:process");

/**
 * Customise post types.
 *
 * Publication presets provide default values, but these can be overridden.
 * See: https://getindiekit.com/configuration/post-types
 *
 * Use placeholder tokens to customise file paths and URLS.
 * See: https://getindiekit.com/configuration/post-types#path-and-url-tokens
 */
const postTypes = [
  {
    type: "article",
    name: "Article",
    post: {
      path: "src/articles/{slug}.md",
      url: "article/{slug}",
    },
    media: {
      path: "src/images/{filename}"
    }
  },
  {
    type: "note",
    name: "Note",
    post: {
      path: "src/notes/{dd}-{MM}-{yyyy}-{slug}.md",
      url: "note/{dd}-{MM}-{yyyy}-{slug}",
    },
  },
];

module.exports = {
  /**
   * Set application options
   *
   * These values are used to configure application behaviour.
   * See: https://getindiekit.com/configuration/#application
   */
  application: {
    url: process.env.SITE_URL,
    mongodbUrl: process.env.MONGO_URL,
    name: "Niels.im Indiekit"
  },
  /**
   * Add plug-ins.
   *
   * In this example we have chosen to use a publication preset for Jekyll,
   * save posts and media files to GitHub repository, and added a syndicator
   * to share posts on a Mastodon server.
   *
   * See: https://getindiekit.com/configuration/#plugins
   */
  plugins: [
    "@indiekit/preset-jekyll",
    "@indiekit/store-github",
    "@indiekit/syndicator-mastodon",
  ],
  /**
   * Set publication options
   *
   * These values are used to configure application behaviour.
   * See: https://getindiekit.com/configuration/#publication
   */
  publication: {
    me: "https://niels.im",
    postTypes: postTypes,
    timezone: "Europe/Amsterdam",
  },
  /**
   * GitHub content store options.
   *
   * Other content stores are available.
   * See: https://getindiekit.com/plugins/stores
   */
  "@indiekit/store-github": {
    user: "redrohX",
    repo: "niels.im",
    branch: "master",
    token: process.env.GITHUB_TOKEN
  },
  /**
   * Mastodon syndicator options.
   *
   * Multiple syndicators can be added.
   * See: https://getindiekit.com/plugins/syndicators
   */
  "@indiekit/syndicator-mastodon": {
    checked: true,
    forced: true,
    url: "https://indieweb.social",
    user: "niels",
    accessToken: process.env.MASTODON_ACCESS_TOKEN
  },
};