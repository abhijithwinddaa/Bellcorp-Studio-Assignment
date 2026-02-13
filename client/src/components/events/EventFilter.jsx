import { memo, useState, useEffect } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import API from "../../api/axios";
import "../../styles/components/EventFilter.css";

const EventFilter = memo(
  ({
    search,
    category,
    location,
    onSearchChange,
    onCategoryChange,
    onLocationChange,
    onClear,
  }) => {
    const [categories, setCategories] = useState([]);
    const [locations, setLocations] = useState([]);

    useEffect(() => {
      const fetchFilters = async () => {
        try {
          const [catRes, locRes] = await Promise.all([
            API.get("/events/categories"),
            API.get("/events/locations"),
          ]);
          setCategories(catRes.data);
          setLocations(locRes.data);
        } catch {
          // Filters fail silently — non-critical
        }
      };
      fetchFilters();
    }, []);

    const hasFilters = search || category || location;

    return (
      <div className="event-filter">
        <div className="search-input" style={{ position: "relative" }}>
          <HiMagnifyingGlass
            size={16}
            style={{
              position: "absolute",
              left: 12,
              top: "50%",
              transform: "translateY(-50%)",
              color: "var(--text-placeholder)",
            }}
          />
          <input
            type="text"
            className="input"
            placeholder="Search events..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{ paddingLeft: 36 }}
          />
        </div>

        <select
          className="select filter-select"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <select
          className="select filter-select"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
        >
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        {hasFilters && (
          <button className="event-filter-clear" onClick={onClear}>
            Clear filters
          </button>
        )}
      </div>
    );
  },
);

EventFilter.displayName = "EventFilter";

export default EventFilter;
