import React from "react";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";

function ExploreFood() {
  const [category, setCategory] = React.useState("All");
  const [searchQuery, setSearchQuery] = React.useState("");
  return (
    <>
      <div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="input-group mb-3 mt-2">
                  <select
                    className="form-select mt-2 m-1"
                    id="categorySelect"
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="All">All</option>
                    <option value="Pizza">Pizza</option>
                    <option value="Burger">Burger</option>
                    <option value="Biriyani">Biriyani</option>
                    <option value="Cake">Cake</option>
                    <option value="Ice Cream">Ice Cream</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Salads">Salads</option>
                  </select>
                  <input
                    type="text"
                    className="form-control mt-2 m-1"
                    placeholder="Search for food..."
                    aria-label="Search for food..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                    value={searchQuery}
                  />
                  <button
                    className="btn btn-outline-secondary mt-2 m-1 mx-0"
                    type="submit"
                  >
                    <i className="bi bi-search"></i>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <FoodDisplay category={category} searchQuery={searchQuery} />
    </>
  );
}

export default ExploreFood;
