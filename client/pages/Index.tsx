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
import AnimatedCounter from "@/components/AnimatedCounter";
import { useLanguage } from "@/hooks/useLanguage";

export default function Index() {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-light-grey via-white to-blue-50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <h1 className="text-dark-charcoal">{t("hero.title")}</h1>
                <p className="text-xl text-dark-charcoal/70 font-raleway">
                  {t("hero.description")}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="btn-primary flex items-center justify-center gap-2 group"
                >
                  {t("hero.getStarted")}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <a
                  href="/#how-it-works"
                  className="btn-outline flex items-center justify-center"
                >
                  {t("hero.learnMore")}
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div>
                  <div className="text-2xl font-bold text-eco-green">
                    <AnimatedCounter end={50000} suffix="+" />
                  </div>
                  <p className="text-sm text-dark-charcoal/60">
                    {t("hero.activeUsers")}
                  </p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-ocean-blue">
                    <AnimatedCounter end={250} suffix="T" />
                  </div>
                  <p className="text-sm text-dark-charcoal/60">
                    {t("hero.plasticRecycled")}
                  </p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-eco-green">
                    $<AnimatedCounter end={2} suffix="M+" />
                  </div>
                  <p className="text-sm text-dark-charcoal/60">
                    {t("hero.rewardsGiven")}
                  </p>
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
            <h2 className="text-dark-charcoal">{t("howItWorks.title")}</h2>
            <p className="text-lg text-dark-charcoal/60 max-w-2xl mx-auto font-raleway">
              {t("howItWorks.description")}
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
                    {t("howItWorks.step1Title")}
                  </h3>
                  <p className="text-dark-charcoal/60 font-raleway">
                    {t("howItWorks.step1Desc")}
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
                    {t("howItWorks.step2Title")}
                  </h3>
                  <p className="text-dark-charcoal/60 font-raleway">
                    {t("howItWorks.step2Desc")}
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
                    {t("howItWorks.step3Title")}
                  </h3>
                  <p className="text-dark-charcoal/60 font-raleway">
                    {t("howItWorks.step3Desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Process Timeline */}
          <div className="mt-20 bg-light-grey rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-montserrat font-bold text-dark-charcoal mb-8 text-center">
              {t("howItWorks.journey")}
            </h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-eco-green text-white rounded-full flex items-center justify-center font-bold mb-3">
                  1
                </div>
                <p className="text-sm font-semibold text-dark-charcoal text-center">
                  {t("howItWorks.citizenSubmits")}
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
                  {t("howItWorks.collectorVerifies")}
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
                  {t("howItWorks.buyerPurchases")}
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
            <h2 className="text-dark-charcoal">{t("roles.forEveryone")}</h2>
            <p className="text-lg text-dark-charcoal/60 max-w-2xl mx-auto font-raleway">
              {t("roles.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Citizens Card */}
            <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-8 border-t-4 border-eco-green">
              <div className="flex items-center justify-center w-16 h-16 bg-eco-green/10 rounded-lg mb-6 group-hover:bg-eco-green/20 transition-colors">
                <Users className="w-8 h-8 text-eco-green" />
              </div>
              <h3 className="text-2xl font-montserrat font-bold text-dark-charcoal mb-4">
                {t("roles.citizens")}
              </h3>
              <p className="text-dark-charcoal/60 font-raleway mb-6">
                {t("roles.citizensDesc")}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-dark-charcoal/70">
                  <span className="w-2 h-2 bg-eco-green rounded-full"></span>
                  {t("roles.findNearestMachines")}
                </li>
                <li className="flex items-center gap-3 text-dark-charcoal/70">
                  <span className="w-2 h-2 bg-eco-green rounded-full"></span>
                  {t("roles.trackSubmissions")}
                </li>
                <li className="flex items-center gap-3 text-dark-charcoal/70">
                  <span className="w-2 h-2 bg-eco-green rounded-full"></span>
                  {t("roles.earnRedeemRewards")}
                </li>
                <li className="flex items-center gap-3 text-dark-charcoal/70">
                  <span className="w-2 h-2 bg-eco-green rounded-full"></span>
                  {t("roles.gamifiedChallenges")}
                </li>
              </ul>
              <Link
                to="/register?role=citizen"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {t("roles.registerCitizen")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Buyers Card */}
            <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-8 border-t-4 border-ocean-blue">
              <div className="flex items-center justify-center w-16 h-16 bg-ocean-blue/10 rounded-lg mb-6 group-hover:bg-ocean-blue/20 transition-colors">
                <TrendingUp className="w-8 h-8 text-ocean-blue" />
              </div>
              <h3 className="text-2xl font-montserrat font-bold text-dark-charcoal mb-4">
                {t("roles.buyers")}
              </h3>
              <p className="text-dark-charcoal/60 font-raleway mb-6">
                {t("roles.buyersDesc")}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-dark-charcoal/70">
                  <span className="w-2 h-2 bg-ocean-blue rounded-full"></span>
                  {t("roles.browseMarketplace")}
                </li>
                <li className="flex items-center gap-3 text-dark-charcoal/70">
                  <span className="w-2 h-2 bg-ocean-blue rounded-full"></span>
                  {t("roles.bulkOrdering")}
                </li>
                <li className="flex items-center gap-3 text-dark-charcoal/70">
                  <span className="w-2 h-2 bg-ocean-blue rounded-full"></span>
                  {t("roles.qualityVerified")}
                </li>
                <li className="flex items-center gap-3 text-dark-charcoal/70">
                  <span className="w-2 h-2 bg-ocean-blue rounded-full"></span>
                  {t("roles.competitivePricing")}
                </li>
              </ul>
              <Link
                to="/register?role=buyer"
                className="btn-secondary w-full flex items-center justify-center gap-2"
              >
                {t("roles.registerBuyer")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Collectors Card */}
            <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all p-8 border-t-4 border-eco-green">
              <div className="flex items-center justify-center w-16 h-16 bg-eco-green/10 rounded-lg mb-6 group-hover:bg-eco-green/20 transition-colors">
                <Package className="w-8 h-8 text-eco-green" />
              </div>
              <h3 className="text-2xl font-montserrat font-bold text-dark-charcoal mb-4">
                {t("roles.collectors")}
              </h3>
              <p className="text-dark-charcoal/60 font-raleway mb-6">
                {t("roles.collectorsDesc")}
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3 text-dark-charcoal/70">
                  <span className="w-2 h-2 bg-eco-green rounded-full"></span>
                  {t("roles.branchManagement")}
                </li>
                <li className="flex items-center gap-3 text-dark-charcoal/70">
                  <span className="w-2 h-2 bg-eco-green rounded-full"></span>
                  {t("roles.inventoryTracking")}
                </li>
                <li className="flex items-center gap-3 text-dark-charcoal/70">
                  <span className="w-2 h-2 bg-eco-green rounded-full"></span>
                  {t("roles.paymentManagement")}
                </li>
                <li className="flex items-center gap-3 text-dark-charcoal/70">
                  <span className="w-2 h-2 bg-eco-green rounded-full"></span>
                  {t("roles.pricingControl")}
                </li>
              </ul>
              <Link
                to="/register?role=collector"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                {t("roles.registerCollector")}
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
            <h2 className="text-dark-charcoal">{t("impact.ourImpact")}</h2>
            <p className="text-lg text-dark-charcoal/60 max-w-2xl mx-auto font-raleway">
              {t("impact.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-br from-eco-green/5 to-eco-green/10 rounded-xl p-8 text-center">
              <Leaf className="w-12 h-12 text-eco-green mx-auto mb-4" />
              <div className="text-3xl font-bold text-eco-green mb-2">
                <AnimatedCounter end={250000} suffix="K" />
              </div>
              <p className="text-dark-charcoal/60 font-raleway">
                {t("impact.plasticDiverted")}
              </p>
            </div>

            <div className="bg-gradient-to-br from-ocean-blue/5 to-ocean-blue/10 rounded-xl p-8 text-center">
              <BarChart3 className="w-12 h-12 text-ocean-blue mx-auto mb-4" />
              <div className="text-3xl font-bold text-ocean-blue mb-2">
                <AnimatedCounter end={50000} suffix="K" />
              </div>
              <p className="text-dark-charcoal/60 font-raleway">
                {t("impact.activeCitizens")}
              </p>
            </div>

            <div className="bg-gradient-to-br from-eco-green/5 to-eco-green/10 rounded-xl p-8 text-center">
              <Trophy className="w-12 h-12 text-eco-green mx-auto mb-4" />
              <div className="text-3xl font-bold text-eco-green mb-2">
                $<AnimatedCounter end={2} suffix="M+" />
              </div>
              <p className="text-dark-charcoal/60 font-raleway">
                {t("impact.totalRewards")}
              </p>
            </div>

            <div className="bg-gradient-to-br from-ocean-blue/5 to-ocean-blue/10 rounded-xl p-8 text-center">
              <Clock className="w-12 h-12 text-ocean-blue mx-auto mb-4" />
              <div className="text-3xl font-bold text-ocean-blue mb-2">
                24/7
              </div>
              <p className="text-dark-charcoal/60 font-raleway">
                {t("impact.availability")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-r from-eco-green to-ocean-blue text-white">
        <div className="container mx-auto px-4 text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-montserrat font-bold">
            {t("cta.readyMakeDifference")}
          </h2>
          <p className="text-xl font-raleway max-w-2xl mx-auto opacity-90">
            {t("cta.joinToday")}
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
              {t("hero.learnMore")}
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 md:py-32 bg-light-grey">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-dark-charcoal">{t("features.whyChoose")}</h2>
            <p className="text-lg text-dark-charcoal/60 max-w-2xl mx-auto font-raleway">
              {t("features.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <Zap className="w-10 h-10 text-eco-green mb-4" />
              <h3 className="text-xl font-montserrat font-bold text-dark-charcoal mb-3">
                {t("features.realTimeUpdates")}
              </h3>
              <p className="text-dark-charcoal/60 font-raleway">
                {t("features.realTimeUpdatesDesc")}
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <Trophy className="w-10 h-10 text-ocean-blue mb-4" />
              <h3 className="text-xl font-montserrat font-bold text-dark-charcoal mb-3">
                {t("features.gamifiedExperience")}
              </h3>
              <p className="text-dark-charcoal/60 font-raleway">
                {t("features.gamifiedExperienceDesc")}
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <BarChart3 className="w-10 h-10 text-eco-green mb-4" />
              <h3 className="text-xl font-montserrat font-bold text-dark-charcoal mb-3">
                {t("features.comprehensiveAnalytics")}
              </h3>
              <p className="text-dark-charcoal/60 font-raleway">
                {t("features.comprehensiveAnalyticsDesc")}
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <Users className="w-10 h-10 text-ocean-blue mb-4" />
              <h3 className="text-xl font-montserrat font-bold text-dark-charcoal mb-3">
                {t("features.communityDriven")}
              </h3>
              <p className="text-dark-charcoal/60 font-raleway">
                {t("features.communityDrivenDesc")}
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <Package className="w-10 h-10 text-eco-green mb-4" />
              <h3 className="text-xl font-montserrat font-bold text-dark-charcoal mb-3">
                {t("features.secureTransactions")}
              </h3>
              <p className="text-dark-charcoal/60 font-raleway">
                {t("features.secureTransactionsDesc")}
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <Leaf className="w-10 h-10 text-ocean-blue mb-4" />
              <h3 className="text-xl font-montserrat font-bold text-dark-charcoal mb-3">
                {t("features.transparentImpact")}
              </h3>
              <p className="text-dark-charcoal/60 font-raleway">
                {t("features.transparentImpactDesc")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
