/*
    1. initState: là 1 object
    2. actions: object hoặc action creator để tạo 1 object
                {
                    type: 'tên action'
                    payload: dữ liệu
                }
    3. reducer: là 1 hàm, có 2 tham số. Tham số thứ nhất là state và tham số thứ 2 là action
    4. dispatch: là 1 hàm, nhận vào 1 action và truyền action này đến reducer
*/
export const initState = {
    productList: [
        // {
        //     "img": "https://m.media-amazon.com/images/I/6125yAfsJKL._AC_UX575_.jpg",
        //     "title": "Nike Air Monarch IV",
        //     "star": 4,
        //     "reviews": 123,
        //     "prevPrice": "140",
        //     "newPrice": "200",
        //     "company": "Nike",
        //     "color": "white",
        //     "category": "sneakers",
        //     "id": 1
        // },
        // {
        //     "img": "https://m.media-amazon.com/images/I/519MRhRKGFL._AC_UX575_.jpg",
        //     "title": "Nike Air Vapormax Plus",
        //     "star": 5,
        //     "reviews": 123,
        //     "prevPrice": "140",
        //     "newPrice": "200",
        //     "company": "Nike",
        //     "color": "red",
        //     "category": "sneakers",
        //     "id": 2
        // },
        // {
        //     "img": "https://m.media-amazon.com/images/I/51+P9uAvb1L._AC_UY695_.jpg",
        //     "title": "Nike Waffle One Sneaker",
        //     "star": 4,
        //     "reviews": 123,
        //     "prevPrice": "140",
        //     "newPrice": "200",
        //     "company": "Nike",
        //     "color": "green",
        //     "category": "sneakers",
        //     "id": 3
        // },
        // {
        //     "img": "https://m.media-amazon.com/images/I/71oEKkghg-L._AC_UX575_.jpg",
        //     "title": "Nike Running Shoe",
        //     "star": 5,
        //     "reviews": 123,
        //     "prevPrice": "140",
        //     "newPrice": "200",
        //     "company": "Adidas",
        //     "color": "black",
        //     "category": "sneakers",
        //     "id": 4
        // },
        // {
        //     "img": "https://m.media-amazon.com/images/I/41M54ztS6IL._AC_SY625._SX._UX._SY._UY_.jpg",
        //     "title": "Flat Slip On Pumps",
        //     "star": 4,
        //     "reviews": 123,
        //     "prevPrice": "140",
        //     "newPrice": "200",
        //     "company": "Vans",
        //     "color": "green",
        //     "category": "flats",
        //     "id": 5
        // },
        // {
        //     "img": "https://m.media-amazon.com/images/I/71zKuNICJAL._AC_UX625_.jpg",
        //     "title": "Knit Ballet Flat",
        //     "star": 5,
        //     "reviews": 123,
        //     "prevPrice": "140",
        //     "newPrice": "50",
        //     "company": "Adidas",
        //     "color": "black",
        //     "category": "flats",
        //     "id": 6
        // },
        // {
        //     "img": "https://m.media-amazon.com/images/I/61V9APfz97L._AC_UY695_.jpg",
        //     "title": "Loafer Flats",
        //     "star": 4,
        //     "reviews": 123,
        //     "prevPrice": "140",
        //     "newPrice": "50",
        //     "company": "Vans",
        //     "color": "white",
        //     "category": "flats",
        //     "id": 7
        // },
        // {
        //     "img": "https://m.media-amazon.com/images/I/71VaQ+V6XnL._AC_UY695_.jpg",
        //     "title": "Nike Zoom Freak",
        //     "star": 5,
        //     "reviews": 123,
        //     "prevPrice": "140",
        //     "newPrice": "200",
        //     "company": "Nike",
        //     "color": "green",
        //     "category": "sneakers",
        //     "id": 8
        // },
        // {
        //     "img": "https://m.media-amazon.com/images/I/61-cBsLhJHL._AC_UY695_.jpg",
        //     "title": "Nike Men's Sneaker",
        //     "star": 4,
        //     "reviews": 123,
        //     "prevPrice": "140",
        //     "newPrice": "200",
        //     "company": "Adidas",
        //     "color": "blue",
        //     "category": "sneakers",
        //     "id": 9
        // },
        // {
        //     "img": "https://m.media-amazon.com/images/I/81xXDjojYKS._AC_UX575_.jpg",
        //     "title": "PUMA BLACK-OCE",
        //     "star": 5,
        //     "reviews": 123,
        //     "prevPrice": "140",
        //     "newPrice": "150",
        //     "company": "Puma",
        //     "color": "green",
        //     "category": "sneakers",
        //     "id": 10
        // }
    ],
    filters: {
        searchText: '',
        recommended: 'All',
        category: 'All',
        price: '0,0',
        color: 'All'
    },
    cart: {
        cartInfo: {
            totalAmount: 0
        },
        cartDetails: [

        ]
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'productList/fetchProducts': {
            return {
                ...state,
                productList: [...action.payload]
            }
        }
        case 'filters/searchText': {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    searchText: action.payload
                }
            }
        }
        case 'filters/searchRecommended': {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    recommended: action.payload
                }
            }
        }
        case 'filters/searchCategory': {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    category: action.payload
                }
            }
        }
        case 'filters/searchColor': {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    color: action.payload
                }
            }
        }
        case 'filters/searchPrice': {
            return {
                ...state,
                filters: {
                    ...state.filters,
                    price: action.payload
                }
            }
        }
        case 'cart/addToCart': {
            console.log(action.payload);
            let newCart = {
                cartInfo: { ...state.cart?.cartInfo },
                cartDetails: [ ...state.cart?.cartDetails ]
            }
            const cartItem = newCart?.cartDetails.find((item) => item.id === action?.payload?.id)
            if (cartItem?.id) {
                cartItem.count += 1;
                cartItem.amount = cartItem.count * cartItem.newPrice
            }
            else {
                newCart.cartDetails = [...newCart.cartDetails, {
                    ...action.payload,
                    count: 1,
                    amount: action.payload?.newPrice
                }]
            }
            let newTotalAmount = 0;
            for (let item of newCart?.cartDetails) {
                newTotalAmount += Number(item.amount)
            }
            newCart.cartInfo.totalAmount = newTotalAmount
            return {
                ...state,
                cart: newCart
            }
        }

        default:
            break;
    }
}

export default reducer