import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-utils";

export default function HomePage({ featuredEvents }) {
  return (
    <div>
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
