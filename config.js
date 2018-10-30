module.exports = {
    server: {
      host: '0.0.0.0',
      port: 5000,
    },
  
    blablaConfig: {
      token: '**',
      apiUri: 'https://public-api.blablacar.com/api/v2/trips?key=**',
      defaultQueryOptions: {
        fn: "Запорожье",
        tn: "Львов",
        db: "2018-10-30",
        locale: "ru_RU",
        limit: 100,
        radius: 300,
      },
    },
  };
  