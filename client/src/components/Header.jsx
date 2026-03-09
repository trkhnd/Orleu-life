import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="hero">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="hero-content"
      >
        <p className="badge">Orleu Life</p>
        <h1>Track your routine, agenda, and daily progress beautifully.</h1>
        <p className="hero-text">
          A smart and interactive productivity space to help users stay consistent,
          organized, and motivated every day.
        </p>
      </motion.div>
    </header>
  )
}