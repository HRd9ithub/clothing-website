const AddItem = [];

const AddProduct = (state = AddItem, action) => {
    switch (action.type) {
        case "ADDITEM":
            const item = state.findIndex((elem) => {
                return elem.id === action.payload.id
            })
            if (item === -1) {
                return [
                    ...state,
                    action.payload
                ]
            } else {
                return state = state.map(curElem =>
                    curElem.id === action.payload.id ? {
                        ...curElem,
                        quantity: curElem.quantity + 1
                    } :
                    curElem
                    )
                }
                break;
                case "DELITEM":
                    return state = state.filter((elem) => {
                        return elem.id !== action.payload.id
                    })
            break;
            
        case "INCQUANTITY":
            return state = state.map(val =>
                val.id === action.payload.id ? {
                    ...val,
                    quantity: val.quantity + 1
                } :
                    val
                    )
                    break;
                    
                    case "DECQUANTITY":
                        return state = state.map(val =>
                            val.id === action.payload.id && action.payload.quantity > 1 ? {
                                ...val,
                                quantity: val.quantity - 1
                            } :
                    val,
            )
            break;
            case "EMPTY":
                return state =[]
                break;
        default:
            return state;
            break;
        }
    }
    export default AddProduct;