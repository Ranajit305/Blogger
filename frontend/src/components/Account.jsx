import React from 'react'
import { useAuthStore } from '../stores/useAuthStore'
import { useBlogStore } from '../stores/useBlogStore'
import { Link } from 'react-router-dom';

const Account = ({ isOpen, setIsOpen, setName }) => {

    const { user, logout } = useAuthStore();
    const { blogLogout } = useBlogStore();

    const handleLogout = () => {
        setName('');
        logout();
        blogLogout();
    }

    return (
        <div className="relative">
            <img
                className="w-8 h-8 sm:w-10 sm:h-10 cursor-pointer rounded-full border border-gray-300 object-cover"
                src={user.profilePic || "avatar.png"}
                alt="Avatar"
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
            />
            {isOpen && (
                <div
                    className="absolute right-0 w-40 bg-white shadow-lg rounded-lg py-2"
                    onMouseEnter={() => setIsOpen(true)}
                    onMouseLeave={() => setIsOpen(false)}
                >
                    <Link
                        to="/account"
                        className="block px-4 py-2 hover:bg-gray-100 text-slate-600 hover:text-black"
                    >
                        Account
                    </Link>

                    <Link
                        to="/blog"
                        className="block px-4 py-2 hover:bg-gray-100 text-slate-600 hover:text-black"
                    >
                        Blog
                    </Link>
                    <hr className="h-0.5 bg-gray-500 w-[90%] mt-1 mb-1 mx-auto" />
                    <button
                        onClick={handleLogout}
                        className="w-full block px-4 py-2 cursor-pointer text-start hover:bg-gray-100 text-red-500 hover:text-red-600"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    )
}

export default Account