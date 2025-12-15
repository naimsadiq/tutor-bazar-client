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
      <main>
        {/* latest tuition post  */}
        <section className="bg-gray-50 dark:bg-gray-900">
          <LatestTuitionPosts></LatestTuitionPosts>
        </section>
        {/* latest teacher profile */}
        <section className="bg-gray-50 dark:bg-gray-900">
          <LatestTeacherProfile></LatestTeacherProfile>
        </section>
        <section className="bg-gray-50 dark:bg-gray-900">
          <HowItWorks></HowItWorks>
        </section>
        <section className="bg-white dark:bg-gray-900">
          <WhyChooseUs></WhyChooseUs>
        </section>
      </main>
    </div>
  );
};

export default Home;
