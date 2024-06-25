
import FormEvent from "src/app/_sections/forms/formEvent";
import EventPage from "src/app/_sections/event";

export const metadata = {
  title: 'Event',
};


export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  return <div>
    <EventPage id={id}/>
  </div>
}
