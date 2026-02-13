import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { HiArrowLeft } from "react-icons/hi2";
import API from "../api/axios";
import { useAuth } from "../hooks/useAuth";
import { formatDateTime } from "../utils/formatDate";
import Loader from "../components/common/Loader";
import "../styles/pages/EventDetails.css";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRegistered, setIsRegistered] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch event details
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await API.get(`/events/${id}`);
        setEvent(data);
      } catch {
        toast.error("Event not found");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, navigate]);

  // Check registration status
  useEffect(() => {
    if (user && id) {
      const checkReg = async () => {
        try {
          const { data } = await API.get(`/registrations/check/${id}`);
          setIsRegistered(data.isRegistered);
        } catch {
          // Silently fail
        }
      };
      checkReg();
    }
  }, [user, id]);

  const handleRegister = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    setActionLoading(true);
    try {
      await API.post(`/registrations/${id}`);
      setIsRegistered(true);
      setEvent((prev) => ({
        ...prev,
        registeredCount: prev.registeredCount + 1,
      }));
      toast.success("Successfully registered!");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancel = async () => {
    setActionLoading(true);
    try {
      await API.delete(`/registrations/${id}`);
      setIsRegistered(false);
      setEvent((prev) => ({
        ...prev,
        registeredCount: prev.registeredCount - 1,
      }));
      toast.success("Registration cancelled");
    } catch (err) {
      toast.error(err.response?.data?.message || "Cancellation failed");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (!event) return null;

  const availableSeats = event.capacity - event.registeredCount;
  const isFull = availableSeats <= 0;

  return (
    <div className="page">
      <div className="container event-details">
        <button className="event-details-back" onClick={() => navigate(-1)}>
          <HiArrowLeft size={16} />
          Back to events
        </button>

        <div className="event-details-header">
          <div className="event-details-category">
            <span className="tag">{event.category}</span>
          </div>
          <h1 className="event-details-title">{event.name}</h1>
        </div>

        <div className="event-details-info">
          <div className="event-details-info-item">
            <span className="event-details-info-label">Date & Time</span>
            <span className="event-details-info-value">
              {formatDateTime(event.date)}
            </span>
          </div>
          <div className="event-details-info-item">
            <span className="event-details-info-label">Location</span>
            <span className="event-details-info-value">{event.location}</span>
          </div>
          <div className="event-details-info-item">
            <span className="event-details-info-label">Organizer</span>
            <span className="event-details-info-value">
              {event.organizer?.name || "Unknown"}
            </span>
          </div>
          <div className="event-details-info-item">
            <span className="event-details-info-label">Available Seats</span>
            <span className="event-details-info-value">
              {availableSeats} / {event.capacity}
            </span>
          </div>
        </div>

        <div className="event-details-description">
          <h2>About This Event</h2>
          <p>{event.description}</p>
        </div>

        {event.tags && event.tags.length > 0 && (
          <div className="event-details-tags">
            {event.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
        )}

        <div
          className="event-details-actions"
          style={{ marginTop: "var(--spacing-xl)" }}
        >
          {!user ? (
            <button
              className="btn btn-primary btn-lg"
              onClick={() => navigate("/login")}
            >
              Login to Register
            </button>
          ) : isFull && !isRegistered ? (
            <span className="event-details-sold-out">Sold Out</span>
          ) : isRegistered ? (
            <button
              className="btn btn-secondary btn-lg"
              onClick={handleCancel}
              disabled={actionLoading}
            >
              {actionLoading ? (
                <span className="spinner" />
              ) : (
                "Cancel Registration"
              )}
            </button>
          ) : (
            <button
              className="btn btn-primary btn-lg"
              onClick={handleRegister}
              disabled={actionLoading}
            >
              {actionLoading ? <span className="spinner" /> : "Register Now"}
            </button>
          )}

          <span className="event-details-seats">
            {isFull
              ? "This event is at full capacity"
              : `${availableSeats} seat${availableSeats !== 1 ? "s" : ""} remaining`}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
