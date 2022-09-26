import axios from "axios";

export function getProductsApi(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/product')
        
        return dispatch({
        type: 'GET_PRODUCTS',
        payload: json.data    
        })
    }
}