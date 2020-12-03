//This file is used to create a base 64 encoded string for dynamic auth service

const fs = require('fs');

fs.access('config.json', (err) => {
    if (err) {
        //err if not config.json file exists
        console.log("config.json file is requried!");
        console.log("Error:", err)
    } else {
        //config.json file exists

        let base64data;
        try {

            // Read in config.json file
            let config = require("./config.json");
            console.log("config.json:", config)

            // convert into a binary buffer and then the buffer into a base64 encoded string
            let jsonString = JSON.stringify(config);
            let buff = Buffer.from(jsonString)
            base64data = buff.toString('base64');

            
            let env_filename_to_create = ".env"
            let free_env_filename = false
            if (fs.existsSync('.env') && process.argv[2]!=='overwrite') {
                console.log(".env exists.");
                let i = 0;
                while (!free_env_filename) {

                    if (fs.existsSync(i + '_copy.env')) {
                        console.log(`The file ${i + '_copy.env'} exists.`);
                    } else {
                        console.log(`The file ${i + '_copy.env'}  does not exist.`);
                        env_filename_to_create = i + '_copy.env'
                        free_env_filename = true
                    }
                    i++;
                }
            }

            // Compose env file.
            env_contents = `FGRCONFIG=${base64data}\n`;
            if (config.node_env) env_contents += `NODE_ENV=${config.node_env}\n`;
            if (config.port) env_contents += `PORT=${config.port}\n`;

            // Create env file
            fs.writeFile(env_filename_to_create, env_contents, (err) => {
                if (err) throw err;
                //Successfully created env file
                console.log(`Successfuly created ${env_filename_to_create}!`);
            });

        } catch (error) {
            console.log(`Error Creating .env fromc config.json ${error}...`)
        }
    }
});
