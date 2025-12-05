import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import { certifications } from '../../data/content'

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-24">
      <SectionTitle label="Chapter 05" subtitle="Credentials & Seals" />
      <div className="grid gap-6 md:grid-cols-3">
        {certifications.map((cert, idx) => (
          <motion.a
            key={cert.name}
            href={cert.link}
            target="_blank"
            rel="noreferrer"
            className="glass-panel block rotate-[-1deg] rounded-xl border border-white/5 p-5 transition hover:-translate-y-2 hover:rotate-1"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: idx * 0.05 }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-stBlue">{cert.issuer}</p>
            <h3 className="mt-3 text-lg text-stCream">{cert.name}</h3>
            <p className="mt-2 text-stCream/60">Issued · {cert.year}</p>
            {cert.description && <p className="mt-3 text-sm text-stCream/70">{cert.description}</p>}
            {cert.tags && cert.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2 text-[0.55rem] uppercase tracking-[0.3em] text-stCream/60">
                {cert.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <div className="mt-4 text-[0.6rem] uppercase tracking-[0.5em] text-stRed">Verify →</div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
