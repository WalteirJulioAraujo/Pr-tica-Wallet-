
import * as financialRepository from "../Repositories/financialRepository.js"

export async function newEvent(value,type,user){

    if (!value || !type) {
    return null;
    }

    if (!['INCOME', 'OUTCOME'].includes(type)) {
    return null;
    }

    if (value < 0) {
    return null;
    }
    
    return await financialRepository.createEvent(user,value,type);
}

export async function searchEvent(user){
    return await financialRepository.searchEvent(user);
}

export async function sumEvent(user){
    const events = await financialRepository.searchEvent(user);
    const sum = events.reduce((total, event) => event.type === 'INCOME' ? total + event.value : total - event.value, 0);
    return sum;
}