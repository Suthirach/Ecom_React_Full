import numeral from "numeral";
// import { format } from "react-number-format/types/pattern_format";

export const numberFormat=(num)=>{
    return numeral(num).format('0,0')
} 