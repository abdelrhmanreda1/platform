import EducationSection from "../components/profile/EducationSection";
import ExperiencesSection from "../components/profile/ExperiencesSection";
import PostsSection from "../components/profile/PostsSection";
import ProfileCard from "../components/profile/ProfileCard";
import SkillsSection from "../components/profile/SkillsSection";

function Profile() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 md:gap-8">
        <div className="col-span-1">
          <ProfileCard />
          <SkillsSection />
        </div>

        <div className="col-span-2">
          <ExperiencesSection />
          <EducationSection />
          <PostsSection />
        </div>
      </div>
    </div>
  );
}

export default Profile;
