interface RattingProps {
  max: number;
  icon: React.ReactNode;
  fillIcon: React.ReactNode;
  rating: number;
  setRatting: (rating: number) => void;

}

export default function Ratting(props: RattingProps) {
  const { max, icon, fillIcon, rating, setRatting } = props;

  return (
    <div className="flex justify-center gap-2">
      {[...Array(max)].map((_, index: number) => {
        index += 1;
        return (
          <button
            type="button"
            onClick={() => setRatting(index)}
            className="text-2xl font-bold"
          >
            {index <= rating ? (
              fillIcon
            ) : (
              icon
            )}
          </button>
        );
      })}
    </div>
  );
}
