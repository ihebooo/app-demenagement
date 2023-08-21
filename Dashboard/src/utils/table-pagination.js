import moment from 'moment'

const calculateRange = (data, rowsPerPage) => {
    const range = [];
    const num = Math.ceil(data.length / rowsPerPage);
    for (let i = 1; i <= num; i++) {
        range.push(i);
    }
    return range;
}

const sliceData = (data, page, rowsPerPage) => {
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
}  

export {
    calculateRange,
    sliceData
}


export function formatDate(date){

    
    return moment(date).format("YYYY-MM-DD HH:mm")

}