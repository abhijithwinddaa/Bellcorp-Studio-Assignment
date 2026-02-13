import EventCard from "./EventCard";
import Loader from "../common/Loader";
import "../../styles/components/EventList.css";

const EventList = ({
  events,
  loading,
  error,
  totalEvents,
  showCancelBtn,
  onCancel,
}) => {
  if (loading) return <Loader />;

  if (error) {
    return (
      <div className="event-list-empty">
        <h3>Something went wrong</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="event-list-empty">
        <h3>No events found</h3>
        <p>Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <>
      {totalEvents !== undefined && (
        <p className="event-list-count">
          Showing {events.length} of {totalEvents} event
          {totalEvents !== 1 ? "s" : ""}
        </p>
      )}
      <div className="event-grid">
        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            showCancelBtn={showCancelBtn}
            onCancel={onCancel}
          />
        ))}
      </div>
    </>
  );
};

export default EventList;
