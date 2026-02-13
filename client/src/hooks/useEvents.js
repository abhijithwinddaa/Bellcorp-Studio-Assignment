import { useState, useEffect } from "react";
import API from "../api/axios";
import { useDebounce } from "./useDebounce";

export const useEvents = ({
  search = "",
  category = "",
  location = "",
  page = 1,
}) => {
  const [events, setEvents] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalEvents, setTotalEvents] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = { page, limit: 12 };
        if (debouncedSearch) params.search = debouncedSearch;
        if (category) params.category = category;
        if (location) params.location = location;

        const { data } = await API.get("/events", { params });
        setEvents(data.events);
        setTotalPages(data.totalPages);
        setTotalEvents(data.totalEvents);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [debouncedSearch, category, location, page]);

  return { events, totalPages, totalEvents, loading, error };
};
