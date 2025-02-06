import FollowBtn from "./FollowBtn";
import propTypes from "prop-types"
function UserCard({ user }) {


  const hnadleLode = (e) => {
    if (e.target.naturalHeight > 1350) {
      e.target.classList.add("object-top");
    } else if(e.target.naturalHeight < 1000){
      e.target.classList.add("object-top");
    }else{
      e.target.classList.add("object-top");
    }
  };


  

  return (
    <div className="h-20 w-full bg-white  userCard shadow-[3px_3px_30px]  dark:bg-black dark:border dark:border-[#2b2b2b] shadow-[#e6e6e6] dark:shadow-[#000] p-4 rounded-3xl gap-4 flex items-center ">
      <div className="h-14 w-14  rounded-full bg-white flex items-center justify-center p-1  dark:border-[#2b2b2b] shadow-[1px_1px_30px] shadow-[#e6e6e6]  dark:bg-black dark:border dark:shadow-[#000]">
        <img
          src={user.profileImage}
          onLoad={hnadleLode}
          alt=""
          className="h-full w-full rounded-full object-cover object-top"
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[12px] ibm-plex-sans-semibold dark:text-white">
          {user.userName}
        </p>
        <p className="text-[10px] ibm-plex-sans-semibold text-[#424242] dark:text-[#c3c3c3]">
          Followers {user.followers.length}
        </p>
      </div>
      <FollowBtn user={user}/>
    </div>
  );
}

UserCard.propTypes = {
  user: propTypes.shape({
    userName: propTypes.string.isRequired,
    profileImage: propTypes.string.isRequired,
    followers: propTypes.arrayOf(propTypes.object).isRequired,
  }).isRequired,
};


export default UserCard;
