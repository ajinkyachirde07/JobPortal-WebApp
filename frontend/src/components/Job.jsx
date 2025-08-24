import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';

const Job = ({ job }) => {
    const navigate = useNavigate();

    const daysAgoFunction = (mongodbTime) => {
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference = currentTime - createdAt;
        return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
    }

    return (
        <div className="p-4 sm:p-5 rounded-md shadow-xl bg-white border border-gray-100 w-full">
            
            {/* Top row (date + bookmark) */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <p className="text-xs sm:text-sm text-gray-500">
                    {daysAgoFunction(job?.createdAt) === 0
                        ? "Today"
                        : `${daysAgoFunction(job?.createdAt)} days ago`}
                </p>
                <Button variant="outline" className="rounded-full self-end sm:self-auto" size="icon">
                    <Bookmark />
                </Button>
            </div>

            {/* Company Info */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 my-3">
                <Button className="p-4 sm:p-6 w-fit" variant="outline" size="icon">
                    <Avatar>
                        <AvatarImage src={job?.company?.logo} />
                    </Avatar>
                </Button>
                <div>
                    <h1 className="font-medium text-base sm:text-lg">{job?.company?.name}</h1>
                    <p className="text-xs sm:text-sm text-gray-500">India</p>
                </div>
            </div>
            


            
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge className="text-blue-700 font-bold text-xs sm:text-sm" variant="ghost">
                    {job?.position}+ Positions
                </Badge>
                <Badge className="text-[#F83002] font-bold text-xs sm:text-sm" variant="ghost">
                    {job?.jobType}
                </Badge>
                <Badge className="text-[#7209b7] font-bold text-xs sm:text-sm" variant="ghost">
                    {job?.salary} LPA
                </Badge>
            </div>

            {/* Job Details */}
            <div>
                <h1 className="font-bold text-base sm:text-lg my-2">{job?.title}</h1>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-3">{job?.description}</p>
            </div>

             <footer>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mt-4">
                <Button
                    onClick={() => navigate(`/description/${job?._id}`)}
                    variant="outline"
                    className="w-full sm:w-auto"
                >
                    Details
                </Button>
                {/* <Button className="bg-[#7209b7] w-full sm:w-auto">
                    Save For Later
                </Button> */}
            </div>
            </footer>
        </div>
    )
}

Job.propTypes = {
    job: PropTypes.object.isRequired
};

export default Job
