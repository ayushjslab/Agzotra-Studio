type HeroProps = {
  name: string;
};

export default function Hero({ name }: HeroProps) {
  return (
    <section className="relative overflow-hidden py-24">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border px-4 py-1 text-sm font-medium">
            🚀 New Release
          </span>

          <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-7xl">
            Hello, {name}
          </h1>

          <p className="mt-6 text-lg text-muted-foreground">
            Build faster, scale smarter, and create exceptional experiences
            with modern React applications.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button className="rounded-lg bg-black px-6 py-3 text-white">
              Get Started
            </button>

            <button className="rounded-lg border px-6 py-3">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}