import moment from "moment";


export  const dateformat = (date)=> { 
    return moment(date).format("llll")
}