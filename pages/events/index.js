import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../dummy-data";

export default function AllEventsPage({ events }) {
  const router = useRouter();

  function findEventsHandler(month, year) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
}

export async function getStaticProps(context) {
  const data = await getAllEvents();

  return {
    props: { events: data },
    revalidate: 60,
  };
}
