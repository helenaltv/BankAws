export default function Hero() {
  return (
    <div className="Hero">
      <section className="Mitten">
        <h5>
          Welcome to Loantema!
          <img
            className="Elipse"
            src="/images/Elipse.png"
            alt="Översta kortet"
          />
        </h5>
        <p className="kort">
          <img
            className="kort1"
            src="/images/Credit Card 1.png"
            alt="Översta kortet"
          />
          <img
            className="kort2"
            src="/images/Credit Card 2.png"
            alt="Översta kortet"
          />
        </p>
        <h1>Seamless Loans, Brighter Futures</h1>
        <button className="svart2">Get Started</button>
        <section className="Inne">
          For nearly 20 years, people have chosen Loantema to help fund their
          dreams See our 12,353 reviews on
          <img className="Line" src="/images/Line.png" alt="linna" />
          <img className="Raiting" src="/images/CTA.png" alt="raiting" />
        </section>
      </section>
    </div>
  );
}
