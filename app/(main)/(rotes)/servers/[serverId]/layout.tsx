import { currentProfile } from "@/lib/currentProfile";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const ServerIdLayout = async ({
    children,
    params
  }: Readonly<{
    children: React.ReactNode;
  }>)=> {

    const profile = await currentProfile();
    
    if(!profile){
        return auth().redirectToSignIn();
    }

    const server = await db.server.findUnique({
        where : {
            id : params.serverId,
            members : {
                some : {
                    profileId : profile.id
                }
            }
        }
    })

    if(!server){
        return redirect('/')
    }

    return (
     <div className="h-full">
        <div className="sm:hidden md:flex h-full w-60 z-20 flex-col fixed inset-y-0">
            server sidebar
        </div>
        <div className="h-full md:pl-60">
            {children}
        </div>
    </div> );
}
 
export default ServerIdLayout;