import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import Cursor from "@/components/Cursor";
import ScrollProgress from "@/components/ScrollProgress";
import BackgroundEffects from "@/components/BackgroundEffects";
import FloatingSocial from "@/components/FloatingSocial";
import MusicToggle from "@/components/MusicToggle";

import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Journey from "@/sections/Journey";
import Stats from "@/sections/Stats";
import Gallery from "@/sections/Gallery";
import Equipment from "@/sections/Equipment";
import Services from "@/sections/Services";
import Awards from "@/sections/Awards";
import Instagram from "@/sections/Instagram";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/Contact";

import { useLenis } from "@/hooks/useLenis";
import { faqs } from "@/data/testimonials";

const TITLE = "Pathan Zaid Khan — Photographer & B.Tech Student";
const DESCRIPTION =
  "A cinematic photography portfolio by Pathan Zaid Khan, engineering student and self-taught photographer: portraits, events, campus festivals and street work, hand-graded frame by frame.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const [revealed, setRevealed] = useState(false);
  useLenis();

  return (
    <>
      <Loader onDone={() => setRevealed(true)} />
      <BackgroundEffects />
      <Cursor />
      <ScrollProgress />
      <Header />
      <FloatingSocial />
      <MusicToggle />

      <main className="relative z-10">
        <Hero start={revealed} />
        <About />
        <Journey />
        <Stats />
        <Gallery />
        <Equipment />
        <Services />
        <Awards />
        <Instagram />
        <Testimonials />
        <Contact />
      </main>

      <Footer />
    </>
  );
}