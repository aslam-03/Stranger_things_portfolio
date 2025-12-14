import { motion } from 'framer-motion'
import SectionTitle from '../ui/SectionTitle'
import { skills } from '../../data/content'

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24">
      <SectionTitle label="Chapter 03" subtitle="Skill Matrix" />
      <div className="grid gap-8 md:grid-cols-3">
        {skills.map((group) => (
          <motion.div
            key={group.category}
            className="glass-panel p-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm uppercase tracking-[0.4em] text-stRed">{group.category}</p>
            <div className="mt-5 space-y-4">
              {group.items.map((skill) => (
                <div key={skill.label} className="space-y-1">
                  <div className="flex items-center justify-between text-xs text-stCream/70">
                    <span>{skill.label}</span>
                    <span>{skill.note}</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/5">
                    <motion.div
                      className="h-full rounded-full bg-gradient-to-r from-stRed to-stRed/60"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: 'easeInOut' }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
