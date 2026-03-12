import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="hero">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="hero-content"
      >
        <p className="badge">Orleu Life</p>
        <h1>Design your day with clarity and calm.</h1>
        <p className="hero-text">
          A refined productivity space to plan tasks, track progress, and build consistency beautifully.
        </p>
      </motion.div>
    </header>
  )
}