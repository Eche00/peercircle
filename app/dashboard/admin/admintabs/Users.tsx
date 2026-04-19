'use client'

import { Search } from '@mui/icons-material'
import SessionsSkeleton from '../../ui/SessionsSkeleton'
import useAdminData from '@/utils/logics/admin'


function Users() {
    const { filteredUsers,
        users,
        loading,
        search,
        setSearch,
        role,
        setRole,
        pointsFilter,
        setPointsFilter } = useAdminData()


    return (
        <>
            {loading ? (
                <SessionsSkeleton />
            ) : (
                <div>
                    {/* SEARCH + FILTERS */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                        {/* SEARCH */}
                        <div className="relative w-full sm:max-w-sm">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                                fontSize="small"
                            />
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search by name or email..."
                                className="w-full bg-[#0F1116] rounded-lg pl-10 pr-4 py-2 text-sm border border-[#5E13FD] focus:outline-none"
                            />
                        </div>

                        {/* FILTERS */}
                        <div className="flex flex-row gap-3 w-full sm:w-auto">

                            {/* ROLE FILTER */}
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                className="flex-1 sm:flex-none bg-[#0F1116] rounded-lg px-3 py-2 text-sm border border-[#5E13FD] cursor-pointer"
                            >
                                <option value="all">All Roles</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>

                            {/* TRUST POINTS FILTER */}
                            <select
                                value={pointsFilter}
                                onChange={(e) => setPointsFilter(e.target.value)}
                                className="flex-1 sm:flex-none bg-[#0F1116] rounded-lg px-3 py-2 text-sm border border-[#5E13FD] cursor-pointer"
                            >
                                <option value="all">All Points</option>
                                <option value="high">Above 100</option>
                                <option value="low">Below 100</option>
                            </select>

                        </div>
                    </div>
                    {/* TABLE WRAPPER */}

                    <div className="bg-[#212329] border border-gray-800 rounded-2xl p-4 md:p-6 shadow-lg overflow-x-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-sm font-semibold bg-[#5E13FD]/20 border border-[#5E13FD]/30 text-[#C9A9FF] px-2 rounded-full">
                                Users:
                                <span className="ml-2 text-sm  font-normal">
                                    {filteredUsers.length}
                                </span>
                            </h2>
                        </div>

                        {/* HEADER ROW */}
                        <div className="hidden md:grid grid-cols-5 text-sm text-gray-400 pb-3 border-b border-gray-700">
                            <span>Name</span>
                            <span>Email</span>
                            <span>Role</span>
                            <span>Trust Points</span>
                            <span className="text-right">Joined</span>
                        </div>

                        {/* BODY */}
                        <div className="divide-y divide-gray-700">
                            {filteredUsers.length === 0 ? (
                                <p className="text-center text-gray-400 py-6">
                                    No users found.
                                </p>
                            ) : (
                                filteredUsers.map((user) => (
                                    <div
                                        key={user.id}
                                        className="py-4 text-sm md:grid md:grid-cols-5 md:items-center"
                                    >
                                        {/* MOBILE */}
                                        <div className="md:hidden flex flex-col gap-2 text-xs">
                                            <div className="flex justify-between">
                                                <p className="font-medium">
                                                    {user.fullName}
                                                </p>
                                                <span className="text-gray-400">
                                                    {user.role}
                                                </span>
                                            </div>

                                            <p className="text-gray-400">
                                                {user.email}
                                            </p>

                                            <div className="flex justify-between text-gray-400">
                                                <span>
                                                    TP: {user.trustPoints}
                                                </span>
                                                <span>
                                                    {new Date(
                                                        user.createdAt
                                                    ).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>

                                        {/* DESKTOP */}
                                        <div className="hidden md:contents">
                                            <span className="font-medium text-white">
                                                {user.fullName}
                                            </span>

                                            <span className="text-gray-300">
                                                {user.email}
                                            </span>

                                            <span
                                                className={`px-2 py-1 rounded-full text-xs w-fit ${user.role === 'admin'
                                                    ? 'bg-[#5E13FD]/20 border border-[#5E13FD]/30 text-[#C9A9FF]'
                                                    : 'bg-gray-500/20 text-gray-300'
                                                    }`}
                                            >
                                                {user.role}
                                            </span>

                                            <span className="text-gray-300">
                                                {user.trustPoints}
                                            </span>

                                            <span className="text-gray-400 text-right">
                                                {new Date(
                                                    user.createdAt
                                                ).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Users