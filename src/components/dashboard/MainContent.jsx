import PostItemUser from "./PostItemUser";

const MainContent = ({ posts }) => {
  return (
    <div>
      {posts.map((post, index) => (
        <PostItemUser key={index} post={post} />
      ))}
    </div>
  );
};

export default MainContent;
