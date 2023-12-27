import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { getAllEvents } from "../../dummy-data";
import Head from "next/head";

export default function AllEventsPage({ events }) {
  const router = useRouter();

  function findEventsHandler(month, year) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta name="events" content="Greates Events Of All time" />
      </Head>
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
