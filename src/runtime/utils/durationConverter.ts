// `+'x'` is NaN, which would poison the whole sum; an unparseable part counts as 0.
const toNumber = (text: string | undefined): number => {
  const value = +(text?.trim() || '0')
  return Number.isFinite(value) ? value : 0
}

export function durationToMinutes(duration: string): number {
  let hours = 0
  let minutes = 0

  const lowerDuration = duration.toLowerCase()

  if (lowerDuration.includes(':')) {
    const [h, m] = lowerDuration.split(':').map(toNumber)
    hours = h ?? 0
    minutes = m ?? 0
  }
  else {
    if (lowerDuration.includes('h')) {
      hours = toNumber(lowerDuration.split('h')[0])
      const remainder = lowerDuration.split('h')[1] || ''

      if (remainder.includes('m'))
        minutes = toNumber(remainder.split('m')[0])
      else if (/^\d+$/.test(remainder))
        minutes = +remainder
    }
    else if (lowerDuration.includes('m')) {
      minutes = toNumber(lowerDuration.split('m')[0])
    }
    else if (/^\d+$/.test(lowerDuration)) {
      minutes = +lowerDuration
    }
  }

  return hours * 60 + minutes
}

export function formattedDuration(duration: string): string {
  const minutes = durationToMinutes(duration)
  const hours = Math.trunc(minutes / 60)
  const remainingMinutes = minutes % 60

  if (minutes === 0)
    return '0'
  return `${hours > 0 ? `${hours}h` : ''}${hours > 0 && remainingMinutes > 0 ? ' ' : ''}${remainingMinutes > 0 ? `${remainingMinutes}m` : ''}`
}
