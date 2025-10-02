export default function Hero() {
  return (
     <section className="h-screen bg-[url('/apsHome.gif')] md:bg-[url('/apsHome.gif')] bg-cover bg-center flex flex-col items-center justify-center text-center">
      {/* Headline */}
      <h1 className="text-6xl sm:text-4xl md:text-6xl font-bold text-[#f0f0f0] drop-shadow-3xl mb-4">
        Welcome to Aesthetic Pixel Studio
      </h1>

      {/* Subheadline */}
      <p className="text-base sm:text-lg md:text-xl text-white max-w-2xl drop-shadow-md mb-6">
       From lens to final touch — high-quality photography, videography, and retouching that makes your brand shine
      </p>
      {/* CTA Button */}
      <a
        href="/portfolio"
        className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm sm:text-base hover:bg-primary/90 transition">
        View our Portfolio
      </a>
    </section>
  );
}