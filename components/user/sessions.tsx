"use client"; // Add this line to mark the component as a client component
import React, { useEffect, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Spinner from '../shared/spinner';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

function User({image, name}:{image:string, name:string}){
    return (
        <Avatar>
        <AvatarImage 
            src={image ||''} // Use an empty string as a fallback if user.image is undefined
            alt={name||'User Avatar'} // Provide an alt text for accessibility
        />
        <AvatarFallback
            className='bg-primary text-background'
            style={{
                boxShadow: 'inset 0px 10px 10px -5px rgba(255,255, 255, .3), inset 0px -10px 10px -5px rgba(0,0, 0, .1)',
            }}
        >
            {name?.slice(0, 2)||'KL'} {/* Show initials if name is not available */}
        </AvatarFallback>
    </Avatar>
    )
};

async function toggleSession(index:number){
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/addsession/toggle/${index}`,{method:"POST"})
}

const Sessions = () => {
    const [query, setQuery] = useState<null| {name:string, email:string, id:string, picture:string}[]>(null);
    const [loading, setLoading] = useState(true);
    const [swithchingSession, isSwitchingSession] = useState(false)
    
    useEffect(() => {
        // Fetch data only on component mount
        const fetchData = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/addsession/get`);
                const data = await response.json();
                setQuery(data);
            } catch (error) {
                console.error('Failed to fetch sessions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Empty dependency array ensures this runs only once
  if(swithchingSession){
    return <div className='absolute w-full h-full backdrop-blur-sm top-0 left-0 flex items-center justify-center  z-10'>
        <Spinner/>
    </div>
  }
    if (loading) {
        return <div className='w-full flex items-center'><Spinner/></div>;
    }

    if (!query||query.length<1) {
        return <></>;
    }
if(query && query.length>0)
    return (
        <div className='flex flex-col gap-2 w-full'>
             {query.map((s,i)=>
             <div
             role='button'
             tabIndex={1}
             onClick={async()=>{
                isSwitchingSession(true)
                await toggleSession(i).then(()=>window.location.reload())
                toast("reloading please wait")
                
            }}
                
             key={i}
             className={cn(
                'flex items-center gap-3 w-full border-b   transition-all duration-300 ease-in-out cursor-pointer py-2',
                i===query.length-1 && 'border-none'
             )}>
              <User image={s.picture} name={s.name} />
           <div className="text flex flex-col">
           <p className='font-semibold'>{s.name}</p>
           <p className='text-xs text-muted-foreground'>{s.email.split('@')[0].slice(0,1)}***{s.email.split('@')[1]}</p>
           </div>
             </div>
            )}
        </div>
    );
};

export default Sessions;
