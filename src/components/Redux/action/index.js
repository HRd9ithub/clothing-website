export const AddItem = (itemDetail) => {
    return{
        type : "ADDITEM",
        payload : itemDetail
    }
}
export const DeleItem = (itemDetail) => {
    return{
        type : "DELITEM",
        payload : itemDetail
    }
}
export const IncQuantity = (item) => {
    return{
        type : "INCQUANTITY",
        payload : item
    }
}
export const DecQuantity = (item) => {
    return{
        type : "DECQUANTITY",
        payload : item
    }
}
export const Empty = () => {
    return{
        type : "EMPTY"
    }
}
