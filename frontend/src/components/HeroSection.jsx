import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className='text-center px-4 sm:px-8 lg:px-16'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm sm:text-base'>No.1 Tech Job Update and Resourses Website</span>
                <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold leading-snug'>
                    Search, Apply & <br /> Get Your <span className='text-[#6A38C2]'>Dream Jobs</span>
                </h1>
                <p className='text-sm sm:text-base text-gray-600 max-w-2xl mx-auto'>
                  we provides the latest tech job updates, coding roadmaps, resume tips, and career growth insights. We ensure you get verified opportunities and valuable resources to build a successful career!
                </p>

                <div className='flex flex-col sm:flex-row w-full sm:w-3/4 lg:w-2/5 mx-auto shadow-lg border border-gray-200 rounded-full overflow-hidden'>
                    <input
                        type="text"
                        placeholder='Find your dream jobs'
                        onChange={(e) => setQuery(e.target.value)}
                        className='outline-none border-none w-full px-4 py-2 text-sm sm:text-base'
                    />
                    <Button 
                        onClick={searchJobHandler} 
                        className="bg-[#6A38C2] rounded-none sm:rounded-r-full px-4 py-2"
                    >
                        <Search className='h-5 w-5' />
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
