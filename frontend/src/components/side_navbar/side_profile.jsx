import avatar from "../../../public/avatar.png";

export default function SideProfile({profile}){
    return <div className="size-[64px] rounded-[500px] mt-2 shrink-0 cursor-pointer" title={`${profile.fullName}`}>

        <img src={profile.profilePic || avatar} alt="nigga"
        className="rounded-[500px] size-[64px]"/>
    </div>
}