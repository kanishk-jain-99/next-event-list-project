import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";
import { getEventById, getFeaturedEvents } from "../../helpers/api-utils";
import Head from "next/head";

export default function EventPage({ selectedEvent }) {
  if (!selectedEvent) {
    return (
      <div className="center">
        <p className="center">Loading...</p>
      </div>
    );
  }
  return (
    <>
      <Head>
        <title>{selectedEvent[0].title}</title>
        <meta name="events" content="Greates Events Of All time" />
      </Head>
      <EventSummary title={selectedEvent[0].title} />
      <EventLogistics
        date={selectedEvent[0].date}
        address={selectedEvent[0].location}
        image={selectedEvent[0].image}
        imageAlt={selectedEvent[0].title}
      />
      <EventContent>
        <p>{selectedEvent[0].description}</p>
      </EventContent>
    </>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const data = await getEventById(eventId);

  return {
    props: { selectedEvent: data },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();

  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: paths,
    fallback: "blocking",
  };
}
