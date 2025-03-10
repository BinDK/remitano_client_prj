import { Link } from "react-router-dom";
import { ArrowRight, UsersIcon } from "../Icons";

export default function Video({video}) {

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg
      transition-shadow duration-300">
      <Link to={video.url} target="_blank" rel="noopener noreferrer">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-48 object-cover"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{video.title}</h3>

        <div className="mt-2 flex items-center text-sm text-gray-500">
          <UsersIcon/>
          <p className="text-sm text-gray-500">
            Shared by {video.user.email}
          </p>
        </div>

        <div class="mt-4 flex justify-between items-center relative">
          <Link
            to={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-3 py-2 border border-transparent
              text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600
              hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Watch on YouTube
            <ArrowRight/>
          </Link>
          <div className="bg-rose-600 text-xs px-3 py-3
            font-semibold rounded-md shadow-lg text-white capitalize">
              { video.video_type }
          </div>
        </div>
      </div>
    </div>
  )
}
