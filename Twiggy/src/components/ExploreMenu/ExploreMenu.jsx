import React from "react";
import { useRef } from "react";
import { categories } from "../../assets/assets";
import "./ExploreMenu.css"; // Assuming you have a CSS file for styles

const ExploreMenu = ({ category, setCategory }) => {
  const menuRef = useRef(null);

  const scrollMenu = (direction) => {
    if (menuRef.current) {
      const scrollAmount = 200; // Adjust this value for scroll speed
      menuRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
    console.log("scrolling..." + direction);
  };

  return (
    <div className="explore-menu position-relative">
      <h1 className="text-center my-4">
        Explore Our Menu
        <div className="d-flex">
          <i
            className="bi bi-arrow-left-circle-fill fs-1 text-secondary me-3 scroll-icon"
            onClick={() => scrollMenu("left")}
          ></i>
          <i
            className="bi bi-arrow-right-circle-fill fs-1 text-secondary ms-3 scroll-icon"
            onClick={() => scrollMenu("right")}
          ></i>
        </div>
      </h1>

      <p>Expore our curated lists of dishes from top categories</p>
      <div
        ref={menuRef}
        className="d-flex justify-content-between gap-4 overflow-auto explore-menu-list"
      >
        {categories.map((item, index) => (
          <div
            key={index}
            className="explore-menu-list-item text-center p-3"
            onClick={() =>
              setCategory((prev) => (prev === item.name ? "All" : item.name))
            }
          >
            <img
              src={item.image}
              alt={item.name}
              className={
                item.name === category
                  ? "img-fluid rounded-circle mb-2 active"
                  : "img-fluid rounded-circle mb-2 grayscale"
              }
              style={{ width: "100px", height: "100px" }}
            />
            <h5>{item.name}</h5>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreMenu;
