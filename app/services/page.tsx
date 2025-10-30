import ServicesComponents from "../components/ServiceCard";
export default function Services() {
  return (
    <div className="container mx-auto p-6 mt-7">
      <section id="features" className="bg-white">
        <div className="container mx-auto max-w-7xl px-6">
          <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-6 text-center">
            Our{" "}
            <span className="text-red-600 landing-page-title-font tracking-[0.15em]">
              Services
            </span>
          </h1>
          <ServicesComponents />
        </div>
      </section>
    </div>
  );
}
