import React from "react";
import Banner from "../../components/Banner/Banner";
import LatestTuitionPosts from "./LatestTuitionPosts";
import LatestTeacherProfile from "./LatestTeacherProfile";
import HowItWorks from "./HowItWorks";
import WhyChooseUs from "./WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <main className="max-w-7xl mx-auto py-20">
        {/* latest tuition post  */}
        <section>
          <LatestTuitionPosts></LatestTuitionPosts>
        </section>
        {/* latest teacher profile */}
        <section>
          <LatestTeacherProfile></LatestTeacherProfile>
        </section>
        <section>
          <HowItWorks></HowItWorks>
        </section>
        <section>
          <WhyChooseUs></WhyChooseUs>
        </section>
      </main>
    </div>
  );
};

export default Home;
