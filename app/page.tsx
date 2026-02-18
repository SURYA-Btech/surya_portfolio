import BackgroundVideo from "@/components/landing/BackgroundVideo";
import ThreeScene from "@/components/landing/ThreeScene";
import ShootingStar from "@/components/landing/ShootingStar";
import Hero from "@/components/landing/Hero";
import CustomCursor from "@/components/landing/CustomCursor";
import IntroTimeline from "@/components/landing/IntroTimeline";

export default function Home() {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      <CustomCursor />
      <BackgroundVideo />
      <ThreeScene />
      <ShootingStar />
      <Hero />
      <IntroTimeline />
    </main>
  );
}
