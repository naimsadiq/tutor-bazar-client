import React from "react";
import TuitionRequirementCard from "../../components/Card/TuitionRequirementCard";
import TeacherCard from "../../components/Card/TeacherCard";
import Banner from "../../components/Banner/Banner";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <main className="max-w-7xl mx-auto py-20">
        <TuitionRequirementCard></TuitionRequirementCard>
        <TeacherCard></TeacherCard>
      </main>
    </div>
  );
};

export default Home;
