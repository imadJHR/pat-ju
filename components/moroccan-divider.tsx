interface MoroccanDividerProps {
  symbol?: string
  className?: string
}

export function MoroccanDivider({ symbol = "❋", className = "" }: MoroccanDividerProps) {
  return (
    <div className={`moroccan-divider ${className}`}>
      <span className="font-great-vibes text-2xl">{symbol}</span>
    </div>
  )
}
