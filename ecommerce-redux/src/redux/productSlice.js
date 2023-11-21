const initState = [
    {
        "img": "https://m.media-amazon.com/images/I/6125yAfsJKL._AC_UX575_.jpg",
        "title": "Nike Air Monarch IV",
        "star": 4,
        "reviews": 123,
        "prevPrice": "140",
        "newPrice": "200",
        "company": "Nike",
        "color": "white",
        "category": "sneakers",
        "id": 1
    },
    {
        "img": "https://m.media-amazon.com/images/I/519MRhRKGFL._AC_UX575_.jpg",
        "title": "Nike Air Vapormax Plus",
        "star": 4,
        "reviews": 123,
        "prevPrice": "140",
        "newPrice": "200",
        "company": "Nike",
        "color": "red",
        "category": "sneakers",
        "id": 2
    },
    {
        "img": "https://m.media-amazon.com/images/I/51+P9uAvb1L._AC_UY695_.jpg",
        "title": "Nike Waffle One Sneaker",
        "star": 4,
        "reviews": 123,
        "prevPrice": "140",
        "newPrice": "200",
        "company": "Nike",
        "color": "green",
        "category": "sneakers",
        "id": 3
    },
    {
        "img": "https://m.media-amazon.com/images/I/71oEKkghg-L._AC_UX575_.jpg",
        "title": "Nike Running Shoe",
        "star": 4,
        "reviews": 123,
        "prevPrice": "140",
        "newPrice": "200",
        "company": "Adidas",
        "color": "black",
        "category": "sneakers",
        "id": 4
    },
    {
        "img": "https://m.media-amazon.com/images/I/41M54ztS6IL._AC_SY625._SX._UX._SY._UY_.jpg",
        "title": "Flat Slip On Pumps",
        "star": 4,
        "reviews": 123,
        "prevPrice": "140",
        "newPrice": "200",
        "company": "Vans",
        "color": "green",
        "category": "flats",
        "id": 5
    },
    {
        "img": "https://m.media-amazon.com/images/I/71zKuNICJAL._AC_UX625_.jpg",
        "title": "Knit Ballet Flat",
        "star": 4,
        "reviews": 123,
        "prevPrice": "140",
        "newPrice": "50",
        "company": "Adidas",
        "color": "black",
        "category": "flats",
        "id": 6
    },
    {
        "img": "https://m.media-amazon.com/images/I/61V9APfz97L._AC_UY695_.jpg",
        "title": "Loafer Flats",
        "star": 4,
        "reviews": 123,
        "prevPrice": "140",
        "newPrice": "50",
        "company": "Vans",
        "color": "white",
        "category": "flats",
        "id": 7
    },
    {
        "img": "https://m.media-amazon.com/images/I/71VaQ+V6XnL._AC_UY695_.jpg",
        "title": "Nike Zoom Freak",
        "star": 4,
        "reviews": 123,
        "prevPrice": "140",
        "newPrice": "200",
        "company": "Nike",
        "color": "green",
        "category": "sneakers",
        "id": 8
    },
    {
        "img": "https://m.media-amazon.com/images/I/61-cBsLhJHL._AC_UY695_.jpg",
        "title": "Nike Men's Sneaker",
        "star": 4,
        "reviews": 123,
        "prevPrice": "140",
        "newPrice": "200",
        "company": "Adidas",
        "color": "blue",
        "category": "sneakers",
        "id": 9
    },
    {
        "img": "https://m.media-amazon.com/images/I/81xXDjojYKS._AC_UX575_.jpg",
        "title": "PUMA BLACK-OCE",
        "star": 4,
        "reviews": 123,
        "prevPrice": "140",
        "newPrice": "150",
        "company": "Puma",
        "color": "green",
        "category": "sneakers",
        "id": 10
    }
]
const productReducer = (state = initState, action) => {
    switch (action.type) {
        case '':{
            return [
                ...state
            ]
        }
        default:{
            return state
        }
    }
}

export default productReducer;