import {useSearchParams} from "react-router-dom"

function UserProfilePage() {


  const [searchParams] =useSearchParams()

  const id = searchParams.get("id")

  return (
    <div className="text-red-400">{id}</div>
  )
}

export default UserProfilePage