import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Image from "next/image"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-8">
          <div className="flex items-center space-x-4 mb-8">
            {session.user?.image ? (
              <Image 
                src={session.user.image} 
                alt="User profile" 
                width={64} 
                height={64} 
                className="rounded-full"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {session.user?.name ? session.user.name[0].toUpperCase() : 'U'}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, {session.user?.name || 'User'}
              </h1>
              <p className="text-gray-600">{session.user?.email}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-blue-800">
                Your Listings
              </h2>
              <p className="text-gray-600">
                You haven&apos;t created any listings yet.
              </p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                Create New Listing
              </button>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4 text-green-800">
                Account Details
              </h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-medium">Current Plan:</span> Free
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Listings Used:</span> 0/2
                </p>
                <button className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
                  Upgrade Plan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
