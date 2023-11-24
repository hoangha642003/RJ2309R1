import React from "react";
import { useDispatch, useSelector } from "react-redux";
import filtersSlice from "../../reducers/filtersSlice";

const colors = [
    "All", "Black", "Blue", "Red", "Green", 'White'
]
function Colors() {
    const currentColor = useSelector((state) => state.filters.color)
    const dispatch = useDispatch()
    return (
        <div className="py-2 d-flex flex-column justify-content-center">
            <h5>Colors</h5>
            <div className="form-group">
                {
                    colors.map((color, index) => (
                        <div key={color} className="form-check py-1">
                            <input className="form-check-input" type="radio" name="color"
                                id={`color_${index}`}
                                value={color}
                                defaultChecked={color === 'All'}
                                style={color === 'All' ? { backgroundImage: 'linear-gradient(to right, red, green)' } : color !== 'White' ? { backgroundColor: color } : {}}
                                onChange={(e) => dispatch(filtersSlice.actions.setSearchColor(e.target.value))}
                            />
                            <label
                                htmlFor={`color_${index}`}
                                role="button"
                                className={`form-check-label ${color === currentColor ? 'text-decoration-underline fw-bolder' : ''}`}
                            >
                                {color}
                            </label>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Colors;