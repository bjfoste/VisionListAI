import { getProviders, signIn } from "next-auth/react"
import Image from "next/image"

export default async function LoginPage() {
  const providers = await getProviders()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <Image 
            src="/VisionListAILOGO.png" 
            alt="VisionListAI Logo" 
            width={200} 
            height={70} 
            className="mx-auto"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to VisionListAI
          </h2>
        </div>
        <div className="space-y-4">
          {providers && Object.values(providers).map((provider) => {
            if (provider.type === 'oauth') {
              return (
                <div key={provider.name}>
                  <button
                    onClick={() => signIn(provider.id)}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    {provider.name === 'Google' && (
                      <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                        <svg 
                          className="h-5 w-5 text-white" 
                          fill="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.613 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.827 0 .48 5.387.48 12s5.347 12 12 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.64 0-.76-.053-1.467-.173-2.08z" />
                        </svg>
                      </span>
                    )}
                    Continue with {provider.name}
                  </button>
                </div>
              )
            }
            return null
          })}
        </div>
        
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with email
            </span>
          </div>
        </div>

        <form 
          onSubmit={(e) => {
            e.preventDefault()
            const email = (e.target as HTMLFormElement).email.value
            signIn('email', { email, callbackUrl: '/dashboard' })
          }} 
          className="space-y-4"
        >
          <div>
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Send Magic Link
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
