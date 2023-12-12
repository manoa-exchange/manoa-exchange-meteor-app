module.exports = {
  servers: {
    one: {
      host: 'manoaexchange.com',
      username: 'root',
      password: '38Spec!al'
    }
  },
  app: {
    // if you edit the app 'name' field, be sure to run 'mup stop' if the app is already running.
    // otherwise you will have two apps deployed at once, with unpredictable results.
    name: 'manoa-exchange',
    path: '../',
    servers: { one: {}, },
    buildOptions: { serverOnly: true },
    env: {
      ROOT_URL: 'https://manoaexchange.com',
      MONGO_URL: 'mongodb://mongodb/meteor',
      MONGO_OPLOG_URL: 'mongodb://mongodb/local',
    },
    docker: { image: 'zodern/meteor:latest' },
    enableUploadProgressBar: true
  },
  mongo: { version: '5.0', servers: { one: {} }
  },
  proxy: {
    domains: 'manoaexchange.com',
    ssl: {
      letsEncryptEmail: 'ksato7@hawaii.edu',
      forceSSL: true
    }
  },
};
