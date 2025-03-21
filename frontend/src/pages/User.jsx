import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore';
import OtherBlog from '../components/OtherBlog';
import { Loader } from 'lucide-react'

const User = () => {

  const { getUserAccount, user, otherUser, blogs, isGettingAccount, subscribeOrUnsubscribe } = useAuthStore();
  const { userId } = useParams();

  useEffect(() => {
    getUserAccount(userId);
    window.scrollTo(0, 0);
  }, [userId])

  return (
    <div className="min-h-screen p-5 w-full md:w-[75%] mx-auto">
      {isGettingAccount ? (
        <div className="flex items-center justify-center">
          <Loader className="animate-spin text-blue-500 size-7" />
        </div>
      ) : (
        <div className="bg-white rounded-lg">
          <div className="flex items-center justify-between p-3 text-sm sm:text-base pl-5 pr-5">
            <div className="flex items-center gap-2">
              <img
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
                src={otherUser?.profilePic || '/avatar.png'}
                alt=""
              />
              <div>
                  <p className="text-sm sm:text-base">{otherUser?.name}</p>
                  <p className="text-sm sm:text-base">
                    Followers: {otherUser?.followers?.length}
                  </p>
              </div>
              
            </div>
            <div>
              <button
                onClick={() => subscribeOrUnsubscribe(otherUser._id)}
                className={`p-2 rounded-lg cursor-pointer ${user?.subscribe?.includes(userId) ? "bg-red-500 text-white" : "bg-green-500 text-black"
                  }`}
              >
                {user?.subscribe?.includes(userId) ? "Unsubscribe" : "Subscribe"}
              </button>
            </div>
          </div>
          <hr className="w-[95%] mx-auto" />
          <div>
            {blogs?.length === 0 ? (
              <div className='p-5 text-center text-2xl'>
                <h1>No Blogs Posted</h1>
              </div>
            ) : (
              <div>
                <h1 className="text-lg sm:text-2xl text-center pt-5">
                  All Blogs
                </h1>
                {blogs?.map((blog, index) => (
                  <OtherBlog key={index} blog={blog} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default User