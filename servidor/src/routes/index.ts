import {Router} from "express"
import {readdirSync,readdir} from "fs"

const PATH_ROUTER= `${__dirname}`
const router=Router();


const cleanFileName=(fileName:string)=>{
    const file=fileName.split('.ts').shift();
    return file;
};

readdirSync(PATH_ROUTER).filter((fileName)=>{
    const cleanName=cleanFileName(fileName);
    if(cleanName!=="index"){
        import(`./${cleanName}`).then((moduloRuta)=>{
            //console.log(`Cargando Ruta: /${cleanName}`);
            router.use(`/${cleanName}`,moduloRuta.router);
        })
    }
});

export {router};