import React from "react";
import { useDispatch, useSelector } from "react-redux";
import filtersSlice from "../../reducers/filtersSlice";
import { searchRecommendedSelector } from "../../redux-toolkit/selectors";

const recommendedList = [
    {
        value: 'All',
        name: 'All Products'
    },
    {
        value: 'Nike',
        name: 'Nike'
    },
    {
        value: 'Adidas',
        name: 'Adidas'
    },
    {
        value: 'Puma',
        name: 'Puma'
    },
    {
        value: 'Vans',
        name: 'Vans'
    }
]
function Recommended() {
    
    const recommended = useSelector(searchRecommendedSelector)
    const dispatch = useDispatch()
    return (
        <div className="py-2 d-flex flex-column justify-content-center">
            <h5>Recommended</h5>
            <div className="form-group">
                {
                    recommendedList.map(recmd => (
                        <button key={recmd.value}
                            className={
                                `btn btn-sm btn-outline-secondary me-1
                                    ${recmd.value === recommended ? 'active' : ''}
                                `
                            }
                            type="button"
                            onClick={() => dispatch(filtersSlice.actions.setSearchRecommended(recmd.value))}
                        >
                            {recmd.name}
                        </button>
                    ))
                }
            </div>
        </div>
    )
}

export default Recommended;