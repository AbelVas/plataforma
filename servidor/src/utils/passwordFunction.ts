import {hash,compare} from "bcryptjs"

const encrypt=async(passPlana:string)=>{
    const passwordHash=await hash(passPlana,10);
    return passwordHash;
}
const verified=async (passPlana:string,passwordHash:string)=>{
    const isCorrect=await compare(passPlana, passwordHash);
    return isCorrect;
}
export {encrypt, verified};
