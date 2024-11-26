"use client";

import { useQuery } from '@apollo/client';
import { GET_TEAMS } from '@/lib/client';
import Image from 'next/image'
import Link from 'next/link';
import dataJSON from '../public/fakeData.json';
import { useEffect, useState } from 'react';

interface GetTeamsVars {
  first: number;
  limit: number;
  season:number|null;
}

interface Team {
  id:number;
  teamName:string;
  season:number;
  finish:string;
  teamAbbr:string
}
interface AllTeams{
  id:number;
  season:number;
}
interface GetTeamsData{
  team:Team[]
  allTeams:AllTeams[]
}

export default function Home() {
  const [whichTab,setWhichTab] = useState<number|null>(null);
  const [pagination, setPagination] = useState<number>(1);
  const [mainData, setMainData] = useState<Team[]>([]);
  const originalFakeData: Team[]=(dataJSON);
  const perPage = 50;
  const [totalPages,setTotalPages] = useState<number>(1);

  const { data, loading, error,refetch } = useQuery<GetTeamsData,GetTeamsVars>(
    GET_TEAMS,
    {
      variables: { first: pagination*25-25, limit:pagination*50,season:whichTab },
      notifyOnNetworkStatusChange: true,
      fetchPolicy: 'cache-and-network',
    }
  );

  useEffect(() => {
    if(data){
      setMainData(data.team);
    }else{
      if(whichTab==null){

        setMainData(originalFakeData.slice(0,50));
      }else{
        setMainData(originalFakeData.filter((item)=>item.season==2023).slice(0,50))
      }
    }
  }, [data]);

  useEffect(() => {
    if(data){
      setTotalPages(Math.ceil(data.allTeams.length/perPage));
    }
    else{
      if(whichTab===null){
        setTotalPages(Math.ceil(originalFakeData.length/perPage));

      }else{
        setTotalPages(Math.ceil(originalFakeData.filter((item)=>item.season==2023).length/perPage));

      }
    }
  }, [data,mainData]);

  const switchTabs=(tab:number|null)=>{
    refetch({first:1*25-25,limit:1*50,season:tab}).then((response)=>{
      if(response?.errors){
        if(tab===null){
          setMainData(originalFakeData.slice(0,50));
          setPagination(1);
        }
        else{
          setMainData(originalFakeData.filter((item)=>item.season==2023).slice(0,50));
          setPagination(1);
        }
      }
    })
    setWhichTab(tab);
  }

  const setSlicedFakeData = (start:number,end:number,filter:number|null) => {
    if(filter!=null){
      const slicedData = originalFakeData.filter((item)=>item.season==filter).slice(start,end);
      console.log(originalFakeData.filter((item)=>{item.season==filter}));
      setMainData(slicedData);
    }
    else{
      const slicedData = originalFakeData.slice(start,end);
      console.log(slicedData);
      setMainData(slicedData);
    }
  }
  const loadNextPage=()=>{
    setPagination(pagination+1)
    refetch({first: (pagination+1)*25-25, limit:(pagination+1)*50}).then((response)=>{
      if(response?.errors){
        setSlicedFakeData(pagination*perPage,pagination*perPage+perPage,whichTab);
      }
    })
  }

  const loadPrevPage=()=>{
    setPagination(pagination-1)

    refetch({first: (pagination-1)*25-25, limit:(pagination-1)*50}).then((response)=>{
      if(response?.errors){
      setSlicedFakeData((pagination-2)*perPage,(pagination-2)*perPage+perPage,whichTab);
      }
    })
  }

  const loadCurrent=(page:number)=>{
    setPagination(page);
    refetch({first:page*25-25,limit:page*50}).then((response)=>{
      if(response?.errors){
        setSlicedFakeData((page-1)*perPage,(page-1)*perPage+perPage,whichTab);
      }
    })

  }

  return (
  <div className='gird'>
    <div className='flex gap-6 max-w-[77rem] mx-auto border-b-2 border-[#192721] p-5 justify-center md:justify-normal'>
      <a onClick={()=>{ if(whichTab!=1)switchTabs(null)}} className={`cursor-pointer transition-colors duration-300 ${whichTab === null ? 'text-white' : 'text-[#999F9D]'}`}>All NBA Teams</a>
      <a onClick={()=>{ if(whichTab!=2)switchTabs(2023)}} className={`cursor-pointer transition-colors duration-300 ${whichTab === 2023 ? 'text-white' : 'text-[#999F9D]'}`}>2023 season teams</a>
    </div>
    <div className='grid md:grid-cols-2 justify-center md:justify-start gap-8 mx-auto max-w-[77rem] pt-8'>
    {mainData?.map((teamItem,index:number) => (
      <Link key={index} href={`/team/${teamItem.season}/${teamItem.teamAbbr}`}>
      <div  className='bg-[#192721] rounded'>
        <div className='flex p-3 gap-2'>
          <Image alt="logo" src="/lakers.png" width={100} height={100}/>
          <div className='grid'>
          <p>{teamItem.teamName}</p>
          <p>Season:{teamItem.season}</p>
          <p>Finished {teamItem.finish}</p>
          </div>
        </div>
      </div>
      </Link>
       ))}
    </div>
    <div className='flex max-w-[77rem] mx-auto p-5 gap-2 justify-center md:justify-normal'>
      <button onClick={()=>{if(pagination!=1)loadPrevPage()}} className='bg-[#192721] h-8 w-8 flex items-center justify-center rounded'>
        <svg width="12" height="auto" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.15991 1.41L3.57991 6L8.15991 10.59L6.74991 12L0.749912 6L6.74991 0L8.15991 1.41Z" fill="white"/>
        </svg> 
      </button>

      {Array.from({length:totalPages},(_,index)=>(
        <button onClick={()=>loadCurrent(index+1)} key={index} className={`${pagination === index + 1 ? 'bg-darkGreen' : 'bg-black'} h-8 w-8 flex items-center justify-center rounded border-white border-[1px]`}>
          {index+1}
        </button>
      ))}      
      
      <button onClick={()=>{if(pagination!=totalPages)loadNextPage()}} className='bg-[#192721] h-8 w-8 flex items-center justify-center rounded'> 
        <svg width="12" height="auto" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.840088 1.41L5.42009 6L0.840088 10.59L2.25009 12L8.25009 6L2.25009 0L0.840088 1.41Z" fill="white"/>
        </svg>
      </button>
    </div>
  </div>
  );
}
