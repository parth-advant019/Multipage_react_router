import { useLoaderData, json, defer, Await } from "react-router-dom";
import EventsList from "../components/EventsList";
import { Suspense } from "react";

function EventsPage() {
  //get data from loader
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading..</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );

  // const events = data.events;
  // return <EventsList events={events} />;
}

export default EventsPage;

async function loadEvents() {
  //browser side run
  const response = await fetch("http://localhost:8080/events");

  if (!response.ok) {
    // return { isError: true, message: "Could not fetch events" };
    // throw new Response(JSON.stringify({ message: "could not fetch events." }), {
    //   status: 500,
    // });
    throw json({ message: "could not fetch events." }, { status: 500 });
  } else {
    //return response;
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: loadEvents(),
  });
}
