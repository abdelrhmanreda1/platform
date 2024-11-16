function SocialSignUp() {
  return (
    <div>
      <div className="flex items-center justify-center mt-7 mb-3 space-x-4">
        <div className="h-[1px] md:w-[80%] bg-[#8D8A8A]"></div>
        <h2 className="w-[100%] text-sm font-medium text-center text-main">Or sign up with</h2>
        <div className="h-[1px] md:w-[80%] bg-[#8D8A8A]"></div>
      </div>
      <div className="cursor-pointer">
        <img src="/SocialButton.png" alt="icon of google" className="mx-auto" />
      </div>
    </div>
  );
}

export default SocialSignUp;
