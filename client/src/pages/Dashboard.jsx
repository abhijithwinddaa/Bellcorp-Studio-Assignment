import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";
import { useAuth } from "../hooks/useAuth";
import { isUpcoming, isPast } from "../utils/formatDate";
import EventList from "../components/events/EventList";
import Loader from "../components/common/Loader";
import "../styles/pages/Dashboard.css";

const Dashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const { data } = await API.get("/registrations/my");
        setEvents(data);
      } catch {
        toast.error("Failed to load your registrations");
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  const upcomingEvents = useMemo(
    () =>
      events
        .filter((e) => isUpcoming(e.date))
        .sort((a, b) => new Date(a.date) - new Date(b.date)),
    [events],
  );

  const pastEvents = useMemo(
    () =>
      events
        .filter((e) => isPast(e.date))
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
    [events],
  );

  const handleCancel = useCallback(async (eventId) => {
    try {
      await API.delete(`/registrations/${eventId}`);
      setEvents((prev) => prev.filter((e) => e._id !== eventId));
      toast.success("Registration cancelled");
    } catch (err) {
      toast.error(err.response?.data?.message || "Cancellation failed");
    }
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="page">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">My Dashboard</h1>
          <p className="dashboard-subtitle">
            Welcome back, {user?.name}. Here are your registered events.
          </p>
        </div>

        <div className="dashboard-section">
          <h2 className="dashboard-section-title">
            Upcoming Events ({upcomingEvents.length})
          </h2>
          {upcomingEvents.length > 0 ? (
            <EventList
              events={upcomingEvents}
              loading={false}
              showCancelBtn
              onCancel={handleCancel}
            />
          ) : (
            <div className="dashboard-empty">
              <p>You haven't registered for any upcoming events.</p>
              <Link to="/">Browse events to get started</Link>
            </div>
          )}
        </div>

        <div className="dashboard-section">
          <h2 className="dashboard-section-title">
            Past Events ({pastEvents.length})
          </h2>
          {pastEvents.length > 0 ? (
            <EventList events={pastEvents} loading={false} />
          ) : (
            <div className="dashboard-empty">
              <p>No past events yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
