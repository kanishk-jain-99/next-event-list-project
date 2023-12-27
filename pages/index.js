import Head from "next/head";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-utils";

export default function HomePage({ featuredEvents }) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Greates Events Of All time" />
      </Head>
      <ul>
        <EventList items={featuredEvents} />
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  const data = await getFeaturedEvents();

  return {
    props: { featuredEvents: data },
    revalidate: 1800,
  };
}
