/** Crisp SVG star — no emoji, no unicode */
export default function StarIcon({ filled = true, half = false, size = 14, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`star-svg ${className}`}
      aria-hidden="true"
    >
      {half && (
        <defs>
          <linearGradient id="halfGold" x1="0" x2="1" y1="0" y2="0">
            <stop offset="50%" stopColor="#F4B942" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.12)" />
          </linearGradient>
        </defs>
      )}
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={filled ? '#F4B942' : half ? 'url(#halfGold)' : 'rgba(255,255,255,0.12)'}
        stroke="none"
      />
    </svg>
  )
}

/** Row of 5 stars from a numeric rating */
export function StarRow({ rating = 5, size = 13 }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon
          key={i}
          size={size}
          filled={i <= Math.floor(rating)}
          half={i === Math.ceil(rating) && rating % 1 >= 0.5}
        />
      ))}
    </span>
  )
}
