const config = {};

//mLab
//config.mongoUri = 'mongodb://rrudy90023:sanctuary3437@ds237574.mlab.com:37574/sanctuary3437';

//Atlas
config.mongoUri = 'mongodb+srv://rrudy90023:FOhLChxMoAn3kpNq@s17.3sgsp.mongodb.net/sanctuary3437?retryWrites=true&w=majority';

//Local
//config.mongoUri = 'mongodb://localhost:27017/gardennfc';

config.cookieMaxAge = 30 * 24 * 3600 * 1000;
//config.corsURL = 'https://rudes.de/s17'
module.exports = config;