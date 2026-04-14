import Hero from "./homepage/Hero";
import Aim from "./homepage/Aim";
import Features from "./homepage/Features";

function page() {
  return (
    <div>
      {/* Homepage container */}
      <main>
        <Hero />
        <Aim />
        <Features />
      </main>
    </div>
  );
}

export default page;
