import { ScaleLoader } from "react-spinners"

const LoadingSpinner = () => {
  return (
    <div className="absolute bottom-5 right-5 z-50">
      <ScaleLoader size={15} color="#3B82F6" />
    </div>
  )
}

export default LoadingSpinner