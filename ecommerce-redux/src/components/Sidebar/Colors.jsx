import React from "react";

const colors = [
    "All", "Black", "Blue", "Red", "Green", 'White'
]
function Colors() {
    return (
        <div className="py-2 d-flex flex-column justify-content-center">
            <h5>Colors</h5>
            <div className="form-group">
                {
                    colors.map(color => (
                        <div key={color} className="form-check py-1">
                            <input className="form-check-input" type="radio" name="color"
                                value={color}
                                defaultChecked={color === 'All'}
                                style={color === 'All' ? { backgroundImage: 'linear-gradient(to right, red, green)' } : color !== 'White' ? { backgroundColor: color } : {}}
                            />
                            <label 
                                role="button"
                                className={`form-check-label ${color === 'All' ? 'text-decoration-underline fw-bolder' : ''}`}
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