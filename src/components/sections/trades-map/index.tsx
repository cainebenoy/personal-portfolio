import Diagram from "./Diagram";
import MobileList from "./MobileList";

export default function TradesMap() {
  return (
    <section id="trades" className="px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-structural text-2xl text-ink sm:text-3xl">
          Six trades, one operator.
        </h2>

        <div className="mt-16 hidden md:block">
          <Diagram />
        </div>
        <div className="mt-12 md:hidden">
          <MobileList />
        </div>
      </div>
    </section>
  );
}
