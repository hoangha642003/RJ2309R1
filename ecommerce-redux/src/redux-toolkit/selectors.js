import { createSelector } from "@reduxjs/toolkit";

export const productListSelector = (state) => state.productList.products
export const searchTextSelector = (state) => state.filters.searchText
export const searchCategorySelector = (state) => state.filters.category
export const searchColorSelector = (state) => state.filters.color
export const searchPriceSelector = (state) => state.filters.price
export const searchRecommendedSelector = (state) => state.filters.recommended
export const cartSelector = (state) => state.cart

export const filtersProductListSelector = createSelector(
    productListSelector,
    searchTextSelector,
    searchCategorySelector,
    searchColorSelector,
    searchPriceSelector,
    searchRecommendedSelector,
    (productList, searchText, category, color, price, recommended) => {
        let queryProductList = [...productList]
        if (searchText) {
            queryProductList = queryProductList.filter((p) => p.title.toLowerCase().includes(searchText.toLowerCase()))
        }
        if (category !== 'All') {
            queryProductList = queryProductList.filter((p) => p.category.toLowerCase() === category.toLowerCase())
        }
        if (recommended !== 'All') {
            queryProductList = queryProductList.filter((p) => p.company.toLowerCase() === recommended.toLowerCase())
        }
        if (color !== 'All') {
            queryProductList = queryProductList.filter((p) => p.color.toLowerCase() === color.toLowerCase())
        }
        if (price !== '0,0') {
            const [min, max] = price.split(',')
            if (min !== max) {
                queryProductList = queryProductList.filter((p) => p.newPrice > Number(min) && p.newPrice <= Number(max))
            }
            else {
                queryProductList = queryProductList.filter((p) => p.newPrice > Number(min))
            }
        }
        return queryProductList
    }
)

