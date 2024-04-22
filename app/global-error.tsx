'use client'

const ErrorPage = ({
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}

export default ErrorPage
