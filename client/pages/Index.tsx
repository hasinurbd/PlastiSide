import {
  ArrowRight,
  Zap,
  TrendingUp,
  Users,
  Leaf,
  Package,
  Trophy,
  BarChart3,
  Clock,
} from "lucide-react";
import Layout from "@/components/Layout";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-light-grey via-white to-blue-50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-dark-charcoal">
                  Turn Plastic Into Rewards
                </h1>
                <p className="text-xl text-dark-charcoal/70 font-raleway">
                  Join thousands making a difference. Recycle plastic, earn
                  rewards, and help build a sustainable future with PlastiSide.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="btn-primary flex items-center justify-center gap-2 group"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="/#how-it-works"
                  className="btn-outline flex items-center justify-center"
                >
                  Learn More
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div>
                  <div className="text-2xl font-bold text-eco-green">50K+</div>
                  <p className="text-sm text-dark-charcoal/60">Active Users</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-ocean-blue">250T</div>
                  <p className="text-sm text-dark-charcoal/60">
                    Plastic Recycled
                  </p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-eco-green">$2M+</div>
                  <p className="text-sm text-dark-charcoal/60">Rewards Given</p>
                </div>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="relative hidden md:flex items-center justify-center">
              <div className="relative w-full aspect-square max-w-md">
                {/* Animated background circles */}
                <div className="absolute inset-0 bg-eco-green rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute inset-12 bg-ocean-blue rounded-full opacity-20 animate-pulse animation-delay-300"></div>
                <div className="absolute inset-24 bg-eco-green rounded-full opacity-30"></div>

                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="flex justify-center gap-4 flex-wrap">
                      <div className="bg-white rounded-lg p-4 shadow-lg">
                        <Leaf className="w-8 h-8 text-eco-green" />
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-lg">
                        <Trophy className="w-8 h-8 text-ocean-blue" />
                      </div>
                      <div className="bg-white rounded-lg p-4 shadow-lg">
                        <Zap className="w-8 h-8 text-eco-green" />
                      </div>
                    </div>
                    <p className="font-montserrat font-bold text-dark-charcoal">
                      Recycle + Earn
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-dark-charcoal">How It Works</h2>
            <p className="text-lg text-dark-charcoal/60 max-w-2xl mx-auto font-raleway">
              Simple, transparent, and rewarding. Get started in three easy
              steps.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-eco-green/10 rounded-full flex items-center justify-center border-2 border-eco-green">
                  <Package className="w-10 h-10 text-eco-green" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-montserrat font-bold text-dark-charcoal">
                    Register & Locate
                  </h3>
                  <p className="text-dark-charcoal/60 font-raleway">
                    Create your free account and find the nearest vending
                    machine in your area.
                  </p>
                </div>
              </div>
              {/* Arrow connector - hidden on mobile */}
              <div className="hidden md:block absolute top-20 -right-14 text-eco-green">
                <ArrowRight className="w-8 h-8" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-ocean-blue/10 rounded-full flex items-center justify-center border-2 border-ocean-blue">
                  <Zap className="w-10 h-10 text-ocean-blue" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-montserrat font-bold text-dark-charcoal">
                    Submit Plastic
                  </h3>
                  <p className="text-dark-charcoal/60 font-raleway">
                    Deposit your clean plastic items into the smart vending
                    machine.
                  </p>
                </div>
              </div>
              {/* Arrow connector - hidden on mobile */}
              <div className="hidden md:block absolute top-20 -right-14 text-ocean-blue">
                <ArrowRight className="w-8 h-8" />
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-eco-green/10 rounded-full flex items-center justify-center border-2 border-eco-green">
                  <Trophy className="w-10 h-10 text-eco-green" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-montserrat font-bold text-dark-charcoal">
                    Earn Rewards
                  </h3>
                  <p className="text-dark-charcoal/60 font-raleway">
                    Get instant rewards you can redeem for discounts and prizes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Process Timeline */}
          <div className="mt-20 bg-light-grey rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-montserrat font-bold text-dark-charcoal mb-8 text-center">
              The Plastic Journey
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-eco-green text-white rounded-full flex items-center justify-center font-bold mb-3">
                  1
                </div>
                <p className="text-sm font-semibold text-dark-charcoal text-center">
                  Citizen Submits
                </p>
              </div>
              <div className="flex items-center justify-center text-eco-green mb-8 md:mb-0">
                <div className="hidden md:block h-1 w-full bg-eco-green/30"></div>
                <ArrowRight className="w-6 h-6 mx-2" />
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-ocean-blue text-white rounded-full flex items-center justify-center font-bold mb-3">
                  2
                </div>
                <p className="text-sm font-semibold text-dark-charcoal text-center">
                  Collector Verifies
                </p>
              </div>
              <div className="flex items-center justify-center text-ocean-blue mb-8 md:mb-0">
                <div className="hidden md:block h-1 w-full bg-ocean-blue/30"></div>
                <ArrowRight className="w-6 h-6 mx-2" />
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-eco-green text-white rounded-full flex items-center justify-center font-bold mb-3">
                  3
                </div>
                <p className="text-sm font-semibold text-dark-charcoal text-center">
                  Buyer Purchases
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section
        id="roles"
        className="py-20 md:py-32 bg-gradient-to-b from-white to-light-grey"
      >
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-dark-charcoal">For Everyone</h2>
            <p className="text-lg text-dark-charcoal/60 max-w-2xl mx-auto font-raleway">
              Three distinct experiences designed for every participant in the
              circular economy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Citizens Card */}
            <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-8 border-t-4 border-eco-green">
              <div className="flex items-center justify-center w-16 h-16 bg-eco-green/10 rounded-lg mb-6 group-hover:bg-eco-green/20 transition-colors">
                <Users className="w-8 h-8 text-eco-green" />
              </div>
              <h3 className="text-2xl font-montserrat font-bold text-dark-charcoal mb-4">
                Citizens
              </h3>
              <p className="text-dark-charcoal/60 font-raleway mb-6">
                Earn rewards by recycling plastic through our smart vending
                machines. Track your impact and redeem rewards.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-dark-charcoal/70">
                  <span className="w-2 h-2 bg-eco-green rounded-full"></span>
                  Find nearest machines
                </li>
                <li className="flex items-center gap-3 text-dark-charcoal/70">
                  <span className="w-2 h-2 bg-eco-green rounded-full"></span>
                  Track submissions
                </li>
                <li className="flex items-center gap-3 text-dark-charcoal/70">
                  <span className="w-2 h-2 bg-eco-green rounded-full"></span>
                  Earn & redeem rewards
                </li>
                <li className="flex items-center gap-3 text-dark-charcoal/70">
                  <span className="w-2 h-2 bg-eco-green rounded-full"></span>
                  Gamified challenges
                </li>
              </ul>
              <Link
                to="/register?role=citizen"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                Register as Citizen
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Buyers Card */}
            <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-8 border-t-4 border-ocean-blue">
              <div className="flex items-center justify-center w-16 h-16 bg-ocean-blue/10 rounded-lg mb-6 group-hover:bg-ocean-blue/20 transition-colors">
                <TrendingUp className="w-8 h-8 text-ocean-blue" />
              </div>
              <h3 className="text-2xl font-montserrat font-bold text-dark-charcoal mb-4">
                Buyers
              </h3>
              <p className="text-dark-charcoal/60 font-raleway mb-6">
                Purchase collected, processed plastic directly from our
                marketplace with guaranteed quality.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-dark-charcoal/70">
                  <span className="w-2 h-2 bg-ocean-blue rounded-full"></span>
                  Browse marketplace
                </li>
                <li className="flex items-center gap-3 text-dark-charcoal/70">
                  <span className="w-2 h-2 bg-ocean-blue rounded-full"></span>
                  Bulk ordering
                </li>
                <li className="flex items-center gap-3 text-dark-charcoal/70">
                  <span className="w-2 h-2 bg-ocean-blue rounded-full"></span>
                  Quality verified
                </li>
                <li className="flex items-center gap-3 text-dark-charcoal/70">
                  <span className="w-2 h-2 bg-ocean-blue rounded-full"></span>
                  Competitive pricing
                </li>
              </ul>
              <Link
                to="/register?role=buyer"
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                Register as Buyer
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Collectors Card */}
            <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-8 border-t-4 border-eco-green">
              <div className="flex items-center justify-center w-16 h-16 bg-eco-green/10 rounded-lg mb-6 group-hover:bg-eco-green/20 transition-colors">
                <Package className="w-8 h-8 text-eco-green" />
              </div>
              <h3 className="text-2xl font-montserrat font-bold text-dark-charcoal mb-4">
                Collectors
              </h3>
              <p className="text-dark-charcoal/60 font-raleway mb-6">
                Manage your branch's collection centers, inventory, and payments
                through a comprehensive dashboard.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-dark-charcoal/70">
                  <span className="w-2 h-2 bg-eco-green rounded-full"></span>
                  Branch management
                </li>
                <li className="flex items-center gap-3 text-dark-charcoal/70">
                  <span className="w-2 h-2 bg-eco-green rounded-full"></span>
                  Inventory tracking
                </li>
                <li className="flex items-center gap-3 text-dark-charcoal/70">
                  <span className="w-2 h-2 bg-eco-green rounded-full"></span>
                  Payment management
                </li>
                <li className="flex items-center gap-3 text-dark-charcoal/70">
                  <span className="w-2 h-2 bg-eco-green rounded-full"></span>
                  Pricing control
                </li>
              </ul>
              <Link
                to="/register?role=collector"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                Register as Collector
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 md:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-dark-charcoal">Our Impact</h2>
            <p className="text-lg text-dark-charcoal/60 max-w-2xl mx-auto font-raleway">
              Together, we're building a healthier planet one plastic unit at a
              time.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-eco-green/5 to-eco-green/10 rounded-xl p-8 text-center">
              <Leaf className="w-12 h-12 text-eco-green mx-auto mb-4" />
              <div className="text-3xl font-bold text-eco-green mb-2">250K</div>
              <p className="text-dark-charcoal/60 font-raleway">
                Tons of plastic diverted from landfills
              </p>
            </div>

            <div className="bg-gradient-to-br from-ocean-blue/5 to-ocean-blue/10 rounded-xl p-8 text-center">
              <BarChart3 className="w-12 h-12 text-ocean-blue mx-auto mb-4" />
              <div className="text-3xl font-bold text-ocean-blue mb-2">50K</div>
              <p className="text-dark-charcoal/60 font-raleway">
                Active citizens participating
              </p>
            </div>

            <div className="bg-gradient-to-br from-eco-green/5 to-eco-green/10 rounded-xl p-8 text-center">
              <Trophy className="w-12 h-12 text-eco-green mx-auto mb-4" />
              <div className="text-3xl font-bold text-eco-green mb-2">$2M+</div>
              <p className="text-dark-charcoal/60 font-raleway">
                In total rewards distributed
              </p>
            </div>

            <div className="bg-gradient-to-br from-ocean-blue/5 to-ocean-blue/10 rounded-xl p-8 text-center">
              <Clock className="w-12 h-12 text-ocean-blue mx-auto mb-4" />
              <div className="text-3xl font-bold text-ocean-blue mb-2">
                24/7
              </div>
              <p className="text-dark-charcoal/60 font-raleway">
                Collection center availability
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-eco-green to-ocean-blue text-white">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl font-raleway max-w-2xl mx-auto opacity-90">
            Join PlastiSide today and start earning rewards while helping create
            a sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-eco-green font-semibold rounded-lg hover:bg-light-grey transition-colors flex items-center justify-center gap-2 group"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="/#how-it-works"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-eco-green transition-colors"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-32 bg-light-grey">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-dark-charcoal">Why Choose PlastiSide?</h2>
            <p className="text-lg text-dark-charcoal/60 max-w-2xl mx-auto font-raleway">
              Experience the platform built for the circular economy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <Zap className="w-10 h-10 text-eco-green mb-4" />
              <h3 className="text-xl font-montserrat font-bold text-dark-charcoal mb-3">
                Real-Time Updates
              </h3>
              <p className="text-dark-charcoal/60 font-raleway">
                Instant notifications on submissions, rewards, and inventory
                changes.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <Trophy className="w-10 h-10 text-ocean-blue mb-4" />
              <h3 className="text-xl font-montserrat font-bold text-dark-charcoal mb-3">
                Gamified Experience
              </h3>
              <p className="text-dark-charcoal/60 font-raleway">
                Earn badges, compete on leaderboards, and unlock exclusive
                rewards.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <BarChart3 className="w-10 h-10 text-eco-green mb-4" />
              <h3 className="text-xl font-montserrat font-bold text-dark-charcoal mb-3">
                Comprehensive Analytics
              </h3>
              <p className="text-dark-charcoal/60 font-raleway">
                Track your impact and progress with detailed dashboards and
                reports.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <Users className="w-10 h-10 text-ocean-blue mb-4" />
              <h3 className="text-xl font-montserrat font-bold text-dark-charcoal mb-3">
                Community Driven
              </h3>
              <p className="text-dark-charcoal/60 font-raleway">
                Join a thriving community of eco-conscious citizens and
                businesses.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <Package className="w-10 h-10 text-eco-green mb-4" />
              <h3 className="text-xl font-montserrat font-bold text-dark-charcoal mb-3">
                Secure Transactions
              </h3>
              <p className="text-dark-charcoal/60 font-raleway">
                Bank-level encryption and verified user profiles ensure safety.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <Leaf className="w-10 h-10 text-ocean-blue mb-4" />
              <h3 className="text-xl font-montserrat font-bold text-dark-charcoal mb-3">
                Transparent Impact
              </h3>
              <p className="text-dark-charcoal/60 font-raleway">
                See exactly where your plastic goes and the real-world impact.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
