import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="cta">
      <p className="cta-text">
        Have something to talk ? <br className="sm:block hidden" />
        Let’s discuss together!
      </p>
      <Link to="/contact" className="btn">
        Talk to me
      </Link>
    </section>
  );
};

export default CTA;
