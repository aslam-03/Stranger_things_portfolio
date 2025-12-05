import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'

export default function ContactSection() {
  const [status, setStatus] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus('Message dispatched through the Upside Down. I will respond soon!')
    event.currentTarget.reset()
  }

  return (
    <section id="contact" className="py-24">
      <SectionTitle label="Final Chapter" subtitle="Contact the Operator" />
      <motion.form
        onSubmit={handleSubmit}
        className="glass-panel border border-white/10 p-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.4em]">
            Name
            <input
              name="name"
              required
              className="rounded-md border border-white/10 bg-white/5 px-4 py-3 text-base text-white focus:border-stRed focus:outline-none"
              placeholder="Jane Hopper"
            />
          </label>
          <label className="flex flex-col gap-2 text-xs uppercase tracking-[0.4em]">
            Email
            <input
              type="email"
              name="email"
              required
              className="rounded-md border border-white/10 bg-white/5 px-4 py-3 text-base text-white focus:border-stRed focus:outline-none"
              placeholder="jhopper@hawkinslab.io"
            />
          </label>
        </div>
        <label className="mt-6 flex flex-col gap-2 text-xs uppercase tracking-[0.4em]">
          Message
          <textarea
            name="message"
            rows="5"
            required
            className="rounded-md border border-white/10 bg-white/5 px-4 py-3 text-base text-white focus:border-stRed focus:outline-none"
            placeholder="Tell me about your next anomaly..."
          />
        </label>
        <motion.button
          type="submit"
          className="mt-8 w-full rounded-full border border-stRed/60 bg-stRed px-8 py-4 text-sm uppercase tracking-[0.6em] text-white shadow-neon"
          whileHover={{ scale: 1.02, boxShadow: '0 0 35px rgba(229,9,20,0.7)' }}
          whileTap={{ scale: 0.98 }}
        >
          Contact Me
        </motion.button>
        {status && <p className="mt-4 text-center text-stCream/70">{status}</p>}
      </motion.form>
    </section>
  )
}
