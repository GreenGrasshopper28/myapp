export const API_KEY = 'AIzaSyD3sFJjAs-96k76MF_bIW3afABYk2wi_mU';

export const value_converter = (value)=>{
    if(value>1000000000){
        return (value/1000000000).toFixed(1) + 'B'
    }else if(value>1000000){
        return (value/1000000).toFixed(1) + 'M'
    }else if(value>1000){
        return (value/1000).toFixed(1) + 'K'
    }else{
        return value
    }
}


