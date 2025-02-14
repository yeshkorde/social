

import { Outlet } from 'react-router-dom'
import LeftSideBar from '../components/LeftSideBar'
import RightSideBar from '../components/RightSideBar'
import { useLocation } from 'react-router-dom'
import Menu from '../components/mobile/Menu'


function MainLayout() {

  const location = useLocation()


  const privatePaths = ["/","/profile","/create","/userProfile"]

  return (
    <div className='h-full w-full justify-center xl:justify-between sm:flex sm:justify-center lg:p-4'>
      {
        privatePaths.includes(location.pathname) ? <LeftSideBar/>:""
      }
        <Outlet/>
       {
        location.pathname === "/"?<RightSideBar/>:""
       }
          <Menu/>
    </div>
  )
}

export default MainLayout