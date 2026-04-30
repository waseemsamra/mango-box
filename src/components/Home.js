import React from 'react';
import Navigation from './Navigation';
import Hero from './Hero';
import SeasonalMangoes from './SeasonalMangoes';
import MangoVarieties from './MangoVarieties';
import DailyVegetables from './DailyVegetables';
import CustomerFavorites from './CustomerFavorites';
import Footer from './Footer';

const Home = () => {
  return (
    <>
      <Navigation currentPage="home" />
      <main>
        <Hero />
        <SeasonalMangoes />
        <MangoVarieties />
        <DailyVegetables />
        <CustomerFavorites />
      </main>
      <Footer />
    </>
  );
};

export default Home;
