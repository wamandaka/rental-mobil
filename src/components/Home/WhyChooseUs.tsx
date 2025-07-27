import Car from "../../assets/Audi 2.png";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { GiGearStickPattern } from "react-icons/gi";

const dataOffers = [
  {
    icon: <FaMoneyCheckDollar size={20} className="text-sky-500" />,
    title: "Best price guarantee",
    description: "Find a lower price? We’ll refund you 100% of the difference.",
  },
  {
    icon: <CiUser size={20} className="text-sky-500" />,
    title: "24/7 Customer Support",
    description: "We are here to help you anytime, anywhere.",
  },
  {
    icon: <GiGearStickPattern size={20} className="text-sky-500" />,
    title: "Wide Range of Cars",
    description: "Choose from a variety of cars that suit your needs.",
  },
  {
    icon: <FaMoneyCheckDollar size={20} className="text-sky-500" />,
    title: "Flexible Booking",
    description: "Book your car with flexible options that fit your schedule.",
  },
];
const WhyChooseUs = () => {
  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
            <div className="relative hidden lg:block lg:overflow-hidden">
              <div className="">
                <img src={Car} alt="" />
              </div>
            </div>

            <div>
              <div className="max-w-lg md:max-w-none">
                <p className="uppercase px-3 text-center py-2 bg-sky-200 text-sky-500 font-medium w-40 rounded-md">
                  why choose us
                </p>
                <h2 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                  We offer the best experience with our rental deals
                </h2>

                {dataOffers.map((offer, index) => (
                  <div key={index} className="flex items-center gap-4 mt-4">
                    {/* icon */}
                    <span className="p-5 bg-sky-200 rounded-xl">
                      {offer.icon}
                    </span>
                    <div>
                      <h1 className="font-medium text-black text-xl">
                        {offer.title}
                      </h1>
                      <p className="mt-2 text-gray-500">{offer.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyChooseUs;
