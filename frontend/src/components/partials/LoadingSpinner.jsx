import { PacmanLoader } from "react-spinners"

const LoadingSpinner = () => {
  return (
    <div className="absolute bottom-5 right-5">
      <PacmanLoader size={15} color="#3B82F6" />
    </div>
  )
}

export default LoadingSpinner