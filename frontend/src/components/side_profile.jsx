

export default function SideProfile({profile}){
    return <div className="size-[64px] rounded-[500px] mt-2 shrink-0 cursor-pointer">

        <img src={profile}
        className="rounded-[500px] size-[64px]"/>
    </div>
}