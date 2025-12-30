import ServicesComponents from "../components/ServiceCard";
export default function Services() {
  return (
    <div className="flex flex-col  justify-center items-center p-6">
      <div className="text-center mb-10">
        <h1 className="font-extrabold text-4xl text-white mb-3">Our Services</h1>
        <p className="text-muted-foreground max-w-xl">
          Explore our diverse portfolio of digital assets, product photography,
          and creative campaigns.
        </p>
      </div>
      <ServicesComponents />
    </div>
  );
}
