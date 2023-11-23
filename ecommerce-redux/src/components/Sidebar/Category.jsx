import React from "react";

const categories = [
    "All", "Sneakers", "Flats", "Sandals", "Heels"
]
function Category() {
    return (
        <div className="py-2 d-flex flex-column justify-content-center">
            <h5>Category</h5>
            <div className="form-group">
                {
                    categories.map(cat => (
                        <div key={cat} className="form-check py-1">
                            <input className="form-check-input" type="radio" name="category"
                                value={cat}
                                defaultChecked={cat === 'All'}
                            />
                            <label 
                                role="button"
                                className={`form-check-label ${cat === 'All' ? 'text-decoration-underline fw-bolder' : ''}`}
                            >
                                {cat}
                            </label>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Category;