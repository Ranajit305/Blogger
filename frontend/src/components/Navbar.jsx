import React, { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import Login from "./Login";
import Account from "./Account";

const Navbar = () => {
  const { user, searchUser, searchedUsers, removeSearchedUser } = useAuthStore();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const [name, setName] = useState('');
  const [search, setSearch] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    searchUser(name)
    setName('');
    setSearch(true);
  }

  const closeSearch = () => {
    setSearch(false);
    removeSearchedUser();
  }

  const handleUserSelect = (userId) => {
    navigate(`/user/${userId}`);
    setSearch(false);
    removeSearchedUser();
  }

  return (
    <>
      <div className="bg-slate-600 text-white flex justify-between items-center px-6 py-3 shadow-md">
        {!user ? (
          <div className="w-full flex items-center justify-between text-sm md:text-base">
            <h1
              onClick={() => navigate("/")}
              className="text-xl sm:text-2xl cursor-pointer hover:text-gray-200 transition-all"
            >
              Blogger
            </h1>
            <button onClick={() => setLoginModal(true)} className="bg-white text-slate-600 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all cursor-pointer">
              Login
            </button>
          </div>
        ) : (
          <>
            <h1
              onClick={() => navigate("/")}
              className="text-xl sm:text-2xl font-bold tracking-wide cursor-pointer hover:text-gray-200 transition-all"
            >
              Blogger
            </h1>

            {/* Input Area */}
            <form onSubmit={handleSearch} className='flex items-center justify-between border border-gray-500 rounded-lg pl-1 pr-2 w-[50%] text-sm sm:text-base'>
              <input value={name} onChange={(e) => setName(e.target.value)} className='p-2 rounded-lg outline-none flex-1 min-w-0' type="text" placeholder='Search users' />
              <Search type='submit' onClick={handleSearch} className='cursor-pointer flex-shrink-0 size-4 sm:size-6' />
            </form>

            {/* Searched Users */}
            {search ? (
                <div className="space-y-4 fixed inset-0 mx-auto mt-18">
                  <div className="bg-white sm:w-[30%] mx-auto p-2 rounded-lg flex flex-col items-center shadow-2xl">
                    <div className="flex items-center justify-between w-full p-2 text-gray-600">
                      <h1 className="text-xl">Users</h1>
                      <X onClick={() => closeSearch()} className="cursor-pointer" />
                    </div>
                    <div className="space-y-3 w-full max-w-md">
                      {searchedUsers && searchedUsers.length > 0 ? (
                        searchedUsers.map((user, index) => (
                          <div
                            onClick={() => handleUserSelect(user._id)}
                            key={index}
                            className="flex items-center mx-auto p-3 bg-white rounded-xl shadow-md hover:shadow-xl border border-gray-200 transition-all duration-300 cursor-pointer hover:bg-gray-100"
                          >
                            <img
                              src={user.profilePic || '/avatar.png'}
                              alt={user.name}
                              className="w-12 h-12 rounded-full object-cover border border-gray-300"
                            />
                            <p className="ml-4 text-gray-800 font-semibold text-base sm:text-lg">{user.name}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-center py-4">No Users Found</p>
                      )}
                    </div>

                  </div>
                  
                </div>
            ) : (
              null
            )}


            <Account isOpen={isOpen} setIsOpen={setIsOpen} setName={setName} />
          </>
        )}
        {loginModal && <Login setLoginModal={setLoginModal} setIsOpen={setIsOpen} />}
      </div >

    </>
  );
};

export default Navbar;
