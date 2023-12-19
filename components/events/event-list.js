import EventItem from "./event-item";
import classes from "./event-list.module.css";

export default function EventList({ items }) {
  return (
    <ul className={classes.list}>
      {items.map((item) => {
        return (
          <EventItem
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.image}
            date={item.date}
            location={item.location}
          />
        );
      })}
    </ul>
  );
}