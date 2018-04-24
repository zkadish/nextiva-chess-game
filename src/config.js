const config = {

};

const configProd = {
  apiDomain: 'http://193.240.226.254:8080',
};

const configDev = {
  apiDomain: 'http://0.0.0.0:8080',
};



if (process.env.NODE_ENV === 'production') {
  Object.assign(config, configProd);
} else if (process.env.NODE_ENV === 'development') {
  Object.assign(config, configDev);
}

export default config;