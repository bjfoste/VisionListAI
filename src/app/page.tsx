import Image from "next/image";

export default function Home() {
  const features = [
    {
      icon: "🖼️",
      title: "AI-Powered Image Analysis",
      description: "Automatically extract product details, measurements, and condition from your product images."
    },
    {
      icon: "📝",
      title: "Intelligent Listing Generation",
      description: "Create optimized, SEO-friendly eBay listings with AI-generated titles and descriptions."
    },
    {
      icon: "💡",
      title: "Pricing Intelligence",
      description: "Get real-time market insights and recommended pricing based on similar listings."
    }
  ];

  const serviceTiers = [
    {
      name: "Free",
      price: "$0",
      features: [
        "Up to 2 active listings",
        "Maximum 4 listings per day",
        "Basic AI image analysis",
        "Standard listing optimization",
        "No pricing research",
        "No custom SKU generation"
      ],
      buttonText: "Get Started"
    },
    {
      name: "Starter",
      price: "$29.99/month",
      features: [
        "Up to 25 listings per month",
        "Advanced AI image analysis",
        "Detailed market pricing insights",
        "Custom SKU generation",
        "Priority support"
      ],
      buttonText: "Choose Starter"
    },
    {
      name: "Pro",
      price: "$99.99/month",
      features: [
        "Up to 100 listings per month",
        "Advanced AI image analysis",
        "Comprehensive market insights",
        "Bulk listing management",
        "Custom SKU generation",
        "Dedicated support",
        "Early access to new features"
      ],
      buttonText: "Go Pro"
    },
    {
      name: "Enterprise",
      price: "$249.99/month",
      features: [
        "Unlimited listings",
        "Premium AI image analysis",
        "Advanced market insights",
        "Bulk listing management",
        "Custom SKU generation",
        "Dedicated account manager",
        "API access",
        "Priority feature requests"
      ],
      buttonText: "Enterprise Solution"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-8 flex items-center justify-between">
        <Image
          src="/VisionListAILOGO.png"
          alt="VisionListAI logo"
          width={200}
          height={70}
          priority
        />
        <nav className="space-x-4">
          <a href="#features" className="hover:text-blue-600">Features</a>
          <a href="#pricing" className="hover:text-blue-600">Pricing</a>
          <a href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700">Login</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Revolutionize Your eBay Selling with AI
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Automate your listing creation, optimize pricing, and save hours of work
        </p>
        <a 
          href="/signup" 
          className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg hover:bg-blue-700 transition"
        >
          Start Free Trial
        </a>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features for eBay Sellers
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="container mx-auto px-4 py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-12">
          Flexible Pricing for Every Seller
        </h2>
        <div className="grid md:grid-cols-4 gap-8">
          {serviceTiers.map((tier, index) => (
            <div 
              key={index} 
              className={`bg-white p-6 rounded-lg shadow-md text-center ${
                tier.name === "Enterprise" ? "border-2 border-blue-600" : ""
              }`}
            >
              <h3 className="text-2xl font-semibold mb-4">{tier.name}</h3>
              <p className="text-4xl font-bold mb-6">{tier.price}</p>
              <ul className="mb-8 space-y-2">
                {tier.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="text-gray-600">
                    ✓ {feature}
                  </li>
                ))}
              </ul>
              <a 
                href="/signup" 
                className={`w-full py-3 rounded-full ${
                  tier.name === "Enterprise" 
                    ? "bg-blue-600 text-white hover:bg-blue-700" 
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                {tier.buttonText}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="container mx-auto px-4 py-16 text-center bg-blue-600 text-white">
        <h2 className="text-3xl font-bold mb-4">
          Transform Your eBay Selling Today
        </h2>
        <p className="text-xl mb-8">
          Join thousands of sellers saving time and increasing their profits
        </p>
        <a 
          href="/signup" 
          className="bg-white text-blue-600 px-8 py-3 rounded-full text-lg hover:bg-gray-100 transition"
        >
          Start Your Free Trial
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          <div>
            <Image
              src="/VisionListAILOGO.png"
              alt="VisionListAI logo"
              width={200}
              height={70}
            />
            <p className="mt-4 text-gray-400">
              Empowering eBay sellers with AI-driven listing solutions
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-blue-400">Features</a></li>
              <li><a href="#pricing" className="hover:text-blue-400">Pricing</a></li>
              <li><a href="/contact" className="hover:text-blue-400">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">Twitter</a>
              <a href="#" className="hover:text-blue-400">LinkedIn</a>
              <a href="#" className="hover:text-blue-400">Facebook</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
