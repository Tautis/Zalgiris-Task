"use client";
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useQuery } from '@apollo/client';
import Modal from '@/components/modal';
import { GET_TEAM_AND_PLAYER } from '@/lib/client';

interface QueryVariables{
    season:number;
    teamAbbr:string;
}

interface Team{
    wins:number;
    loss:number;
    coaches:string;
    topWsPlayer:string;
    teamName:string;
}

interface Player{
    playerName:string;
    position:string;
    age:number;
    threePercent:number;
    assists:number;
    totalRb:number;
    points:number;
    steals:number;
}

interface QueryData{
    team:Team;
    playerTotals:Player[];
}
type Props ={
    params:{id:string;abr:string}
}

const positionMap: { [key: string]: string } = {
    G: "Point guard/shooting guard",
    SG: "Shooting guard",
    PG: "Point guard",
    GF: "Guard/forward",
    F: "Small forward/power forward",
    SF: "Small forward",
    PF: "Power forward",
    FC: "Forward/center",
    C: "Center",
  };

const Team = ({params}:Props) =>{
    const [year,setYear] = useState<number>(Number);
    const [abr,setAbr] = useState<string>(String);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const fakeData:QueryData = {
            team: {
                teamName:"Zalgiris",
                wins:10,
                loss:51,
                coaches:"Andrea Trinchieri",
                topWsPlayer:"Deividas Sirvytis",
            },
            playerTotals:[
                {
                playerName:"Mantas Juzenas",
                position:"SG",
                age:21,
                threePercent:0.1,
                assists:15,
                totalRb:2,
                points:2,
                steals:0,
            },
            {
                playerName:"Lonnie Walker IV",
                position:"SG",
                age:22,
                threePercent:0.8,
                assists:25,
                totalRb:5,
                points:24,
                steals:4,
            },
            {
                playerName:"Lonnie Walker IV",
                position:"SG",
                age:23,
                threePercent:0.8,
                assists:25,
                totalRb:5,
                points:24,
                steals:4,
            },
            {
                playerName:"Lonnie Walker IV",
                position:"SG",
                age:24,
                threePercent:0.8,
                assists:25,
                totalRb:5,
                points:24,
                steals:4,
            },
            {
                playerName:"Lonnie Walker IV",
                position:"SG",
                age:25,
                threePercent:0.8,
                assists:25,
                totalRb:5,
                points:24,
                steals:4,
            },
            {
                playerName:"Lonnie Walker IV",
                position:"SG",
                age:26,
                threePercent:0.8,
                assists:25,
                totalRb:5,
                points:24,
                steals:4,
            },
            {
                playerName:"Lonnie Walker IV",
                position:"SG",
                age:27,
                threePercent:0.8,
                assists:25,
                totalRb:5,
                points:24,
                steals:4,
            },
            {
                playerName:"Lonnie Walker IV",
                position:"SG",
                age:222,
                threePercent:0.8,
                assists:25,
                totalRb:5,
                points:24,
                steals:4,
            }
        ]
    }

    const [mainData,setMainData] = useState<QueryData | null>(null);

    const [activeModal,setActiveModal] = useState<number | null>(null)
    const openModal = (index:number) => setActiveModal(index);
    const closeModal = () => setActiveModal(null);

    const handleMouseMove = (event: React.MouseEvent) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        setMousePosition({ x, y });
    };

    useEffect(() => {
        const getParams = async ()=>{
            const {id,abr} = await params;
            setYear(parseInt(id));
            setAbr(abr);
            console.log(abr);
        }
        
        getParams();
    }, [params]);

    const { data, loading, error,refetch } = useQuery<QueryData,QueryVariables>(
        GET_TEAM_AND_PLAYER,
        {
          variables: { season:year,teamAbbr:abr },
          notifyOnNetworkStatusChange: true,
          fetchPolicy: 'cache-and-network',
        }
    );
     
    useEffect(() => {
        if(data){
            setMainData(data);
        }else if(error){
            setMainData(fakeData);
        }
    }, [data,error]);
    return(
        <div className='pt-12 font-inter p-4 lg:p-4'>
            <div className='grid md:flex mx-auto md:max-w-[75rem] max-w-[25rem] justify-around gap-10'>
            <div className="relative flex-1 flex items-center justify-center bg-cover bg-center rounded-lg">
                <div className="absolute inset-0 bg-green-backdrop bg-cover bg-center opacity-60 rounded-lg"></div>
                <Image className="relative mx-auto my-12 py-5" alt="logo" src="/lakers.png" width={519} height={342}/>
            </div>
                <div className='grid w-full gap-4 flex-1'>
                    <div className='grid content-center gap-1'>
                        <p className='text-sm font-inter font-semibold text-fadedText'><span className='text-white pr-1'>{year}</span>SEASON</p>
                        <p className='text-5xl font-semibold'>{mainData?.team.teamName}</p>
                    </div>
                    <div className='flex gap-4 '>
                        <div className='grid bg-[#192721] w-full text-center rounded-lg content-center p-3.5'>
                            <p className='text-sm text-fadedText'>Wins</p>
                            <p className='text-2xl font-bold'>{mainData?.team.wins}</p>
                        </div>
                        <div className='grid bg-[#192721] w-full text-center rounded-lg content-center p-3.5'>
                            <p className='text-sm text-fadedText'>Losses</p>
                            <p className='text-2xl font-bold'>{mainData?.team.loss}</p>
                        </div>
                    </div>
                    <div className='grid gap-4'>
                        <div className='bg-[#192721] w-full text-center rounded-lg content-center p-3 md:p-9'>
                            <p className='text-sm text-fadedText'>Coach</p>
                            <p className='text-2xl font-bold'>{mainData?.team.coaches}</p>
                        </div>
                        <div className='bg-[#192721] w-full text-center rounded-lg content-center p-3 md:p-9'>
                            <p className='text-sm text-fadedText'>Top Ws Player</p>
                            <p className='text-2xl font-bold'>{mainData?.team.topWsPlayer}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='max-w-[75rem] mx-auto pt-20'>
                <h1 className='text-2xl font-bold py-7 lg:text-3xl'>Players</h1>
                <div className='grid md:gap-x-2 gap-y-2 md:grid-cols-3 md:p-0'>
                {mainData?.playerTotals.map((playerItem, index:number)=>{
                    const [firstname, lastname] = playerItem.playerName.split(" ");
                    return(
                    <div onMouseEnter={handleMouseMove} className='overflow-visible relative w-full mx-auto md:aspect-[197/240] group/item bg-[#192721] md:bg-none rounded-lg' key={index}>
                        <div className='md:hidden block p-4 m-2' onClick={()=>openModal(index)}>
                        <p className='text-xl font-bold'>{firstname} {lastname}</p>
                        </div>
                        <div className='overflow-hidden w-full h-full pt-3 md:block hidden'>
                            <div className="absolute inset-0 bg-green-backdrop bg-cover bg-center opacity-60"></div>
                            <img src="/ule.png" className='relative object-contain h-full w-full lg:group-hover/item:scale-110 transition-all duration-200'/>
                        </div>
                        <div className='absolute z-10 bottom-0 h-48 v w-full bg-[linear-gradient(180deg,rgba(11,60,29,0)_0%,rgba(9,45,23,1)_70%)] md:block hidden'>

                            <div className='relative grid place-content-end h-full justify-start pl-9 pb-6 text-3xl font-bold leading-9 '>
                                {firstname.toUpperCase()}
                                <span className='text-greenText'>
                                    {lastname.toUpperCase()}
                                </span>
                                <span className='md:text-sm text-grayedText '>
                                    {positionMap[playerItem.position].toUpperCase() || "Unknown Position"}
                                </span> 
                            </div>
                        </div>

                        <div className='hidden lg:block absolute bottom-0 opacity-0 invisible lg:group-hover/item:opacity-100 lg:group-hover/item:visible z-50 w-2/4 bg-darkGreen h-fit overflow-visible transition-all duration-500 ease-in-out' style={{top: mousePosition.y-300,left: mousePosition.x + 20,}}>
                            <div className='relative grid justify-start m-3'>
                                <p className='font-bold text-xl	'>Age</p>
                                <p className='text-greenText font-semibold text-'>{playerItem.age}</p>
                                <p className='font-bold text-xl	'>3pt Percentage</p>
                                <p className='text-greenText font-semibold'>{Math.round(playerItem.threePercent*100)}%</p>
                                <p className='font-bold text-xl	'>Total assists</p>
                                <p className='text-greenText font-semibold'>{playerItem.assists}</p>
                                <p className='font-bold text-xl	'>Total rebounds</p>
                                <p className='text-greenText font-semibold'>{playerItem.totalRb}</p>
                                <p className='font-bold text-xl	'>Total points</p>
                                <p className='text-greenText font-semibold'>{playerItem.points}</p>
                                <p className='font-bold text-xl	'>Total steals</p>
                                <p className='text-greenText font-semibold' >{playerItem.steals}</p>
                            </div>
                        </div>
                        
                        
                    <Modal isOpen={activeModal===index} onClose={closeModal}>
                                <p className='font-bold text-xl	'>Age</p>
                                <p className='text-greenText font-semibold text-'>{playerItem.age}</p>
                                <p className='font-bold text-xl	'>3pt Percentage</p>
                                <p className='text-greenText font-semibold'>{Math.round(playerItem.threePercent*100)}%</p>
                                <p className='font-bold text-xl	'>Total assists</p>
                                <p className='text-greenText font-semibold'>{playerItem.assists}</p>
                                <p className='font-bold text-xl	'>Total rebounds</p>
                                <p className='text-greenText font-semibold'>{playerItem.totalRb}</p>
                                <p className='font-bold text-xl	'>Total points</p>
                                <p className='text-greenText font-semibold'>{playerItem.points}</p>
                                <p className='font-bold text-xl	'>Total steals</p>
                                <p className='text-greenText font-semibold' >{playerItem.steals}</p>
                    </Modal>
                    </div>
                    
                )})}
                </div>

            </div>
            
        </div>
)
}
export default Team