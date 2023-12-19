import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import { getFilteredEvents } from "../../dummy-data";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

export default function FilteredEventPage() {
  const router = useRouter();
  const filteredData = router.query.slug;

  if (!filteredData) {
    return <p className="center">Loading...</p>;
  }
  const month = Number(filteredData[1]); //+filteredData[1]
  const year = Number(filteredData[0]); //+filteredData[0]  this is also JS syntax to convert to a number

  if (
    isNaN(month) ||
    isNaN(year) ||
    year > 2030 ||
    year < 2021 ||
    month < 1 ||
    month > 12
  ) {
    return (
      <div className="center">
        <ErrorAlert>
          <p className="center">Invalid filter please adjust your values</p>
        </ErrorAlert>
        <Button link="/events">Show All Events</Button>
      </div>
    );
  }

  const events = getFilteredEvents({ year, month });

  if (!events || events.length === 0) {
    return (
      <div className="center">
        <ErrorAlert>
          <p className="center">No Events Found</p>
        </ErrorAlert>

        <Button link="/events">Show All Events</Button>
      </div>
    );
  }

  const date = new Date(year, month - 1);
  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={events} />
    </>
  );
}
