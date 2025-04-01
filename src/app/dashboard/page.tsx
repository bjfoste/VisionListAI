import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import Image from "next/image"
import { PrismaClient, Prisma } from "@prisma/client"

const prisma = new PrismaClient()

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/login')
  }

  // Fetch user details with extended information
  const userDetails = await prisma.user.findUnique({
    where: { email: session.user?.email || '' },
    include: {
      uploadedImages: {
        orderBy: { uploadedAt: 'desc' },
        take: 5
      },
      listingGenerations: {
        orderBy: { generatedAt: 'desc' },
        take: 5,
        include: {
          images: true
        }
      }
    }
  })

  const userSubscription = await prisma.userSubscription.findUnique({
    where: { userId: userDetails?.id }
  })

  // Calculate usage statistics
  const totalUploads = userDetails?.uploadedImages.length || 0
  const totalListings = userDetails?.listingGenerations.length || 0
  const successfulListings = userDetails?.listingGenerations.filter(
    (listing: any) => listing.status === 'COMPLETED'
  ).length || 0

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* User Profile Section */}
        <div className="bg-white shadow-md rounded-lg p-6 flex items-center space-x-6">
          {session.user?.image ? (
            <Image 
              src={session.user.image} 
              alt="User profile" 
              width={96} 
              height={96} 
              className="rounded-full"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-3xl">
              {session.user?.name ? session.user.name[0].toUpperCase() : 'U'}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {session.user?.name || 'User'}
            </h1>
            <p className="text-gray-600">{session.user?.email}</p>
          </div>
        </div>

        {/* Subscription and Usage Section */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">
              Subscription Details
            </h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-medium">Current Plan:</span>{' '}
                {userSubscription?.tier || 'Free'}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Listings Used:</span>{' '}
                {totalListings}/{userSubscription?.maxListingsPerMonth || 2}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Successful Listings:</span>{' '}
                {successfulListings}
              </p>
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                Upgrade Plan
              </button>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-green-800">
              Image Upload
            </h2>
            <form className="space-y-4">
              <div className="border-2 border-dashed border-green-300 p-6 text-center">
                <input 
                  type="file" 
                  multiple 
                  accept="image/*" 
                  className="hidden" 
                  id="image-upload"
                />
                <label 
                  htmlFor="image-upload" 
                  className="cursor-pointer text-green-600 hover:text-green-800"
                >
                  Click to upload images
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  Max {userSubscription?.maxImagesPerListing || 20} images per listing
                </p>
              </div>
              <button 
                type="submit" 
                className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
              >
                Generate Listing
              </button>
            </form>
          </div>
        </div>

        {/* Recent Uploads and Listings */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Recent Uploads
            </h2>
        {userDetails?.uploadedImages.length ? (
          <div className="space-y-2">
            {userDetails.uploadedImages.map((image: any) => (
              <div key={image.id} className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">{image.fileName}</span>
                <span className="text-xs text-gray-500">
                  {new Date(image.uploadedAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No recent uploads</p>
        )}
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Listing Generation History
            </h2>
        {userDetails?.listingGenerations.length ? (
          <div className="space-y-2">
            {userDetails.listingGenerations.map((listing: any) => (
              <div key={listing.id} className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-600">
                    Listing {listing.id.slice(-6)}
                  </span>
                  <span className={`ml-2 px-2 py-1 rounded text-xs ${
                    listing.status === 'COMPLETED' 
                      ? 'bg-green-100 text-green-800' 
                      : listing.status === 'PROCESSING'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {listing.status}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(listing.generatedAt).toLocaleDateString()}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No listing generations</p>
        )}
          </div>
        </div>
      </div>
    </div>
  )
}
