import { useInView } from "react-intersection-observer";
import Button from "../layouts/Button";
import { FC } from "react";

const HomeComponent: FC = () => {
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: paragraphRef, inView: paragraphInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    delay: 500,
  });

  return (
    <div className="min-h-screen flex justify-center items-center lg:px-32 px-5 bg-hero-image bg-cover bg-no-repeat">
      <div className="w-full lg:w-2/3 space-y-5 text-center">
        <h1
          ref={titleRef}
          className={`text-white font-semibold text-5xl drop-shadow-lg ${
            titleInView ? "animate-fadeInDown" : "opacity-0"
          }`}
        >
          - Serendib Restaurant & Bar -
        </h1>
        <p
          ref={paragraphRef}
          className={`text-white text-lg lg:text-5xl drop-shadow-lg ${
            paragraphInView ? "animate-fadeInDown" : "opacity-0"
          }`}
        >
          THE BEST SRI LANKAN FOOD IN MALAYSIA
        </p>
        <div>
          <Button title="Order Now" />
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;
