const cors = require('cors');
config = require('../config');


module.exports=(app)=>{

    //cors
    if(process.env.NODE_ENV=='development'){
        console.log("CORS is in development Mode")
        app.use(cors());
    }else{

        // var whitelist = ['https://decide.center', 'https://fgr-decide.surge.sh'];
        var whitelist = config.whitelist;
        var corsOptions = {
            origin: function (origin, callback) {
                if (whitelist.indexOf(origin) !== -1) {
                callback(null, true);
                } else {
                callback(new Error('Not allowed by CORS'));
                }
            }
        }

        app.use(cors(corsOptions));
    }
    // app.use(cors());
}