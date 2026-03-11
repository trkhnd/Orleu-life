import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="hero">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="hero-content"
      >
        <p className="badge">Orleu Life</p>
        <h1>Build a better day, one routine at a time.</h1>
        <p className="hero-text">
          Organize your agenda, track your habits, monitor your daily progress,
          and stay focused with a clean and interactive productivity dashboard.
        </p>
      </motion.div>
    </header>
  )
}