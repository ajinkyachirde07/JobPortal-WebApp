import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(
            res.data.job.applications.some(
              (application) => application.applicant === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  

  return (
    <div className="w-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto my-10 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-bold text-2xl sm:text-3xl">
              {singleJob?.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <Badge className="text-blue-700 font-bold" variant="ghost">
                {singleJob?.position}+ vacancy
              </Badge>
              <Badge className="text-[#F83002] font-bold" variant="ghost">
                {singleJob?.jobType} Industry
              </Badge>
              <Badge className="text-[#7209b7] font-bold" variant="ghost">
                {singleJob?.salary} LPA
              </Badge>
            </div>
          </div>

          {/* {user?.role === "student" && (
            <Button
              onClick={isApplied ? null : applyJobHandler}
              disabled={isApplied}
              className={`w-full sm:w-auto rounded-lg ${
                isApplied
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#7209b7] hover:bg-[#5f32ad]"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          )} */}
        </div>

        {/* Job Description */}
        <section className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-3 text-justify">
            <div
              className="my-6 prose max-w-none"
              dangerouslySetInnerHTML={{ __html: singleJob?.about }}
            />

            <h2 className="font-bold text-lg mt-6">How to Apply</h2>
            <p className="mt-2">
              Freshers who are passionate about technology and eager to grow in
              their career should not miss this chance. This role is a golden
              opportunity to work with mentors, gain real-world experience, and
              start strong in the IT industry.
            </p>
            <p className="mt-2">👉 [Apply link is given below]</p>

            <h2 className="font-bold text-lg mt-6">Final Thoughts</h2>
            <p className="mt-2">
              If you are a B.Tech 2025 fresher looking to build your career in
              software development, this role offers the perfect balance of
              learning and growth. Don’t wait — kickstart your career today! 🌟
            </p>

            <Button
              onClick={() => window.open(singleJob?.applylink, "_blank")}
              className="bg-[#7209b7] mt-4 w-full sm:w-auto"
            >
              Apply Link
            </Button>

            <div className="mt-6">
              <strong>
                Join our WhatsApp Channel:{" "}
                <a
                  href="https://www.whatsapp.com/channel/0029Vb5pzqx9Gv7NQVii641u"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <mark>Click Here</mark>
                </a>
              </strong>
            </div>

            <h3 className="font-bold mt-6">
              Posted Date:{" "}
              <span className="font-normal text-gray-800">
                {singleJob?.createdAt.split("T")[0]}
              </span>
            </h3>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default JobDescription;
