interface RattingProps {
  max: number;
  icon: React.ReactNode;
  fillIcon: React.ReactNode;
  rating: number;
  setRatting?: (rating: number) => void | null;
}

export default function Ratting(props: RattingProps) {
  const { max, icon, fillIcon, rating, setRatting } = props;
  const isClickable = setRatting ? true : false;

  return (
    <>
      {[...Array(max)].map((_, index: number) => {
        index += 1;
        return (
          <button
            type="button"
            disabled={!isClickable}
            onClick={() => (setRatting ? setRatting(index) : _)}
            className={`text-2xl md:text-3xl lg:text-5xl font-bold ${
              isClickable ? "cursor-pointer" : "cursor-none"
            }`}
          >
            {index <= rating ? fillIcon : icon}
          </button>
        );
      })}
    </>
  );
}
