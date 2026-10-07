import { motion } from 'framer-motion'
import Hero from '../components/sections/Hero'
import StorySection from '../components/sections/StorySection'
import MenuSection from '../components/sections/MenuSection'
import ReviewsSection from '../components/sections/ReviewsSection'
import OrderSection from '../components/sections/OrderSection'
import Footer from '../components/ui/Footer'

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
}

export default function Home() {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Cinematic hero with 3D burger */}
      <Hero />

      {/* Story timeline */}
      <StorySection />

      {/* Menu preview (show 6 items) */}
      <MenuSection limit={6} />

      {/* Reviews with floating cards */}
      <ReviewsSection />

      {/* Order / Contact */}
      <OrderSection />

      {/* Footer */}
      <Footer />
    </motion.div>
  )
}
