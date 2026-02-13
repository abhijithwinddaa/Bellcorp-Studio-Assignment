import { useState, useCallback } from "react";
import { useEvents } from "../hooks/useEvents";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";
import Pagination from "../components/common/Pagination";
import "../styles/pages/Home.css";

const Home = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [page, setPage] = useState(1);

  const { events, totalPages, totalEvents, loading, error } = useEvents({
    search,
    category,
    location,
    page,
  });

  const handleSearchChange = useCallback((value) => {
    setSearch(value);
    setPage(1);
  }, []);

  const handleCategoryChange = useCallback((value) => {
    setCategory(value);
    setPage(1);
  }, []);

  const handleLocationChange = useCallback((value) => {
    setLocation(value);
    setPage(1);
  }, []);

  const handleClear = useCallback(() => {
    setSearch("");
    setCategory("");
    setLocation("");
    setPage(1);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="page">
      <div className="container">
        <div className="home-header">
          <h1 className="home-title">Discover Events</h1>
          <p className="home-subtitle">
            Browse and register for upcoming events in your area
          </p>
        </div>

        <EventFilter
          search={search}
          category={category}
          location={location}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onLocationChange={handleLocationChange}
          onClear={handleClear}
        />

        <EventList
          events={events}
          loading={loading}
          error={error}
          totalEvents={totalEvents}
        />

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Home;
