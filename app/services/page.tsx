import ServicesComponents from "../components/ServiceCard";
export default function Services() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-6">
         <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight my-10 text-center">
        Our{" "}
        <span className="text-red-600 landing-page-title-font tracking-[0.15em]">
          Services
        </span>
      </h1>
      <ServicesComponents />
    </div>
  );
}
