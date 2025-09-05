export default function Hero() {
  return (
    <section className="h-screen bg-[url('/home-sm.jpg')] md:bg-[url('/home.jpg')]  bg-cover bg-center flex flex-col items-center justify-center text-center px-4">
      {/* Headline */}
      <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white drop-shadow-lg mb-4">
        Welcome to Aesthetic Pixel Studio
      </h1>

      {/* Subheadline */}
      <p className="text-base sm:text-lg md:text-xl text-white max-w-2xl drop-shadow-md mb-6">
        Capturing timeless moments with creativity and precision.
      </p>

      {/* CTA Button */}
      <a
        href="/portfolio"
        className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium text-sm sm:text-base hover:bg-primary/90 transition">
        Get your Free quote
      </a>
    </section>
  )
}
