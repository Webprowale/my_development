"use client";
import { useState, useEffect } from "react";
import Lenis from "lenis";
import Hero from "@/components/home/hero";
import Navbar from "@/components/home/navbar";
import Features from "@/components/home/features";
import Offer from "@/components/home/offer";
import React from "react";
import Products from "@/components/home/products";
import Explore from "@/components/home/explore";
import Showcase from "@/components/home/showcase";
import Footer from "@/components/home/footer";
import TextOpacity from "@/components/home/TextOpacity";
import Offerandfeatures from "@/components/home/offerandfeatures";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/home/preloader";

type Props = {};

const Home = (props: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const lenis = new Lenis();

  //   function raf(time: number) {
  //     if (lenis) {
  //       lenis.raf(time);
  //     }

  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);
  // });

  useEffect(() => {
    (async () => {
      setTimeout(() => {
        setIsLoading(false);
        document.body.style.cursor = "default";
        window.scrollTo(0, 0);
      }, 3000);
    })();
  }, []);

  return (
    <main className="bg-primary100 font-satoshi relative">
      <AnimatePresence mode="wait">
        {isLoading && <Preloader />}
      </AnimatePresence>

      <Navbar />
      <AnimatePresence mode="wait">
        <Hero />
      </AnimatePresence>
      <Offerandfeatures />
      <Products />
      <Explore />
      <Showcase />
      <TextOpacity />
      <Footer />
    </main>
  );
};

export default Home;
