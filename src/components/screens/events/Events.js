import React from 'react';
import Hero from '../../common/Hero.js';
import Header from '../../common/Header.js';
import HeaderMobile from '../../common/HeaderMobile.js';
import Footer from '../../common/Footer.js';
import Main from '../../common/Main.js';
import EventsIntro from './EventsIntro';
import EventCardsBlock from './EventCardsBlock';

class Events extends React.Component {
  render(){

    return (
      <div>
        <Hero
          page_title="Events"
          page_hero_image="/events_hero.jpg"
          page_hero_image_mobile="/events_hero_mobile.jpg"
        />

        <Header />
        <HeaderMobile />

        <Main>
          <EventsIntro />
          <EventCardsBlock />
        </Main>

        <Footer />
      </div>
    );
  }
}

export default Events;
