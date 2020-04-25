if (process.env.NODE_ENV == "production"){
    console.log('Running on Production environment');
    module.exports = require('./prod')
} else {
    console.log('Running on Test environment');
    module.exports = require('./dev')
}
