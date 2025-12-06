import React from "react";
import TuitionRequirementCard from "../../components/Card/TuitionRequirementCard";
import TeacherCard from "../../components/Card/TeacherCard";
import Banner from "../../components/Banner/Banner";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <TuitionRequirementCard></TuitionRequirementCard>
      <TeacherCard></TeacherCard>
    </div>
  );
};

export default Home;
