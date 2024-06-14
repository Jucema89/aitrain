const fs = require('fs-extra');
const writeFile = fs.writeFile;

// Configure Angular `environment.ts` file path
const envDirectory = './src/environments'
const targetPath = `${envDirectory}/environment.ts`;
const targetProdPath = `${envDirectory}/environment-prod.ts`;
const targetDevPath = `${envDirectory}/environment-dev.ts`;
// `environment.ts` file structure

const colors = require('colors');
require('dotenv').config();

const envConfigFile = `export const environment = {
    apiBaseUrl: '${process.env["API_BASE_URL"]}',
    appUrl: '${process.env["APP_URL"]}',
    nodeEnv: '${process.env["NODE_ENV"]}',
};
`;

if(!fs.existsSync(envDirectory)){
    console.log(colors.magenta(`Environment directory ${envDirectory} doesn't exist`));
    fs.mkdirSync(envDirectory, { recursive: true });
    console.log('Environment directory created')
}

if(fs.existsSync(envDirectory)){
    console.log(colors.magenta('The file `environment.ts` will be written with the following content: \n'));
    console.log(colors.grey(envConfigFile));
    writeFile(targetPath, envConfigFile, function (err: any) {
       if (err) {
           throw console.error(err);
       } else {
           console.log(colors.magenta(`Angular environment.ts file generated correctly at ${targetPath} \n`));
       }
    });

  
    const env = `${process.env["NODE_ENV"]}`;
    const enviromentsAvailable = ['develop', 'test', 'production'];

    if(!enviromentsAvailable.includes(env)) {
        console.log(colors.magenta(`secret NODE_ENV no esta definida con los ambientes definidos ${enviromentsAvailable.toString()}`));
    }

    switch (env) {
        case 'develop':
            //make development environment
            writeFile(targetDevPath, envConfigFile, function (err: any) {
                if (err) {
                    throw console.error(err);
                } else {
                    console.log(colors.magenta(`Angular environment-dev.ts file generated correctly at ${targetDevPath} \n`));
                }
            });
            break;

        case 'production':
             //make production environment
            writeFile(targetProdPath, envConfigFile, function (err: any) {
                if (err) {
                    throw console.error(err);
                } else {
                    console.log(colors.magenta(`Angular environment-prod.ts file generated correctly at ${targetProdPath} \n`));
                }
            });
            break
    
        default:
            //default make development environment
            writeFile(targetDevPath, envConfigFile, function (err: any) {
                if (err) {
                    throw console.error(err);
                } else {
                    console.log(colors.magenta(`Angular environment-dev.ts file generated correctly at ${targetDevPath} \n`));
                }
            });
            break;
    }
    
}
