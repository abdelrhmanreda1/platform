import { InputField } from "../../ui/InputField";

function RegisterForm() {
  return (
    <form className="space-y-3">
      <input type="text" placeholder="Your Name" className="w-full px-3 py-3 text-sm border border-[#CCCCCC] rounded-lg focus:outline-none" />

      <div className="flex space-x-2 w-full">
        <select className="w-1/4 px-0 md:px-2 py-0 md:py-1 text-sm cursor-pointer border text-[#8D8A8A] border-[#CCCCCC] rounded-lg focus:outline-none">
          <option value="+62">+62</option>
          <option value="+1">+1</option>
          <option value="+44">+44</option>
          <option value="+20">+20</option>
        </select>
        <input type="number" placeholder="Phone Number" className="w-3/4 px-3 py-3 text-sm border border-[#CCCCCC] rounded-lg focus:outline-none" />
      </div>

      <InputField type="email" placeholder="Email Address" />
      <InputField type="password" placeholder="Password" />
      <InputField type="password" placeholder="Confirm Password" />

      <button className="w-full bg-[#003366] text-white py-3 rounded-lg hover:bg-hoverButton transition duration-300">Sign Up</button>
    </form>
  );
}

export default RegisterForm;
