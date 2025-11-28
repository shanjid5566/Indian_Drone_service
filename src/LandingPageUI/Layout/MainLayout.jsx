import React from 'react';
import SmoothScroll from '../../components/utility/SmoothScroll';

import Hero from './../Pages/Hero';
import Statistics from './../Pages/Statistics';
import Industry from './../Pages/Industry';
import Gallery from './../Pages/Gallery';
import BlogResearch from './../Pages/BlogResearch';
import FAQ from './../Pages/FAQ';
import TrainingNCertification from '../Components/TrainingNCertification';
import JoinCampaign from '../Components/JoinCampaign';
import MilestoneGallery from '../Components/MilestoneGallery';

const MainLayout = () => {
  return (
    <SmoothScroll>
      <div>
        <Hero />
        <Statistics />
        <Industry />
        <TrainingNCertification />
        <JoinCampaign />
        <MilestoneGallery />
        <Gallery />
        <BlogResearch />
        <FAQ />
        {/* <CTAFooter/> */}
      </div>
    </SmoothScroll>
  );
};

export default MainLayout;
