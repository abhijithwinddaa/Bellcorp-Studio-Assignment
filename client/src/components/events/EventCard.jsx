import { memo } from "react";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineCalendar,
  HiOutlineMapPin,
  HiOutlineUsers,
} from "react-icons/hi2";
import { formatDate } from "../../utils/formatDate";
import "../../styles/components/EventCard.css";

const EventCard = memo(({ event, showCancelBtn, onCancel }) => {
  const navigate = useNavigate();
  const availableSeats = event.capacity - event.registeredCount;
  const isFull = availableSeats <= 0;

  const handleClick = () => {
    navigate(`/events/${event._id}`);
  };

  const handleCancel = (e) => {
    e.stopPropagation();
    if (onCancel) onCancel(event._id);
  };

  return (
    <article className="event-card" onClick={handleClick}>
      <div className="event-card-header">
        <h3 className="event-card-name">{event.name}</h3>
        <span className="tag">{event.category}</span>
      </div>

      <div className="event-card-meta">
        <span className="event-card-meta-item">
          <HiOutlineCalendar size={14} />
          {formatDate(event.date)}
        </span>
        <span className="event-card-meta-item">
          <HiOutlineMapPin size={14} />
          {event.location}
        </span>
        <span className="event-card-meta-item">
          <HiOutlineUsers size={14} />
          {event.organizer?.name || "Organizer"}
        </span>
      </div>

      <p className="event-card-description">{event.description}</p>

      <div className="event-card-footer">
        <span
          className={`event-card-seats ${isFull ? "event-card-seats--full" : ""}`}
        >
          {isFull
            ? "Sold Out"
            : `${availableSeats} seat${availableSeats !== 1 ? "s" : ""} left`}
        </span>

        {showCancelBtn && (
          <button className="btn btn-secondary btn-sm" onClick={handleCancel}>
            Cancel Registration
          </button>
        )}
      </div>
    </article>
  );
});

EventCard.displayName = "EventCard";

export default EventCard;
