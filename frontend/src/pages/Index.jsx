
export default function Index(){
    return (
        <>
    <div className="bg-gray-100">
      {/* Header Section */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-800">Payment Wallet</div>
          <nav className="space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-800">Home</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Features</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">About</a>
            <a href="#" className="text-gray-600 hover:text-gray-800">Contact</a>
          </nav>
          <div>
            <a href="/Signin" className="text-gray-600 hover:text-gray-800 mx-3">Sign In</a>
            <a href="/Signup" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Sign Up</a>
          </div>
        </div>
      </header>

      {/* Main Section */}
      <main className="container mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-800 mb-4">
              The Best Payment Wallet for You
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-6">
              Experience the ease of managing your finances with our secure and user-friendly payment wallet app.
            </p>
            <a href="#" className="bg-blue-500 text-white px-8 py-3 rounded hover:bg-blue-600">
              Get Started
            </a>
          </div>
          <div className="w-full md:w-1/2 mt-8 md:mt-0">
            <img src='/img/gif1.gif' alt="Payment Wallet App" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </main>
    </div>
        </>
    )
};