const ErrorMessage = ({ message }) => {
  return (
    <div className="flex items-center justify-center w-full py-20">
      <div className="bg-red-50 border border-red-300 text-red-700 px-6 py-4 rounded-lg text-center max-w-md">
        <p className="text-xl font-semibold mb-1">Something went wrong</p>
        <p className="text-sm">{message || 'Please try again later.'}</p>
      </div>
    </div>
  )
}

export default ErrorMessage