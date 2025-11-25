import { Star } from "lucide-react";

type Props = { rating: number; size?: number };

export function RatingStars({ rating, size = 16 }: Props) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className="fill-amber-400 text-amber-400"
          style={{ width: size, height: size, opacity: rating >= star ? 1 : 0.3 }}
        />
      ))}
    </div>
  );
}
