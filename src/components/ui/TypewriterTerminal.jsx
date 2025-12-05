import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export default function TypewriterTerminal({ lines }) {
  const [displayed, setDisplayed] = useState([])

  useEffect(() => {
    const timeouts = []
    setDisplayed([])

    lines.forEach((line, idx) => {
      const timeoutId = setTimeout(() => {
        setDisplayed((prev) => [...prev, line])
      }, idx * 600)
      timeouts.push(timeoutId)
    })

    return () => {
      timeouts.forEach((timeoutId) => clearTimeout(timeoutId))
    }
  }, [lines])

  return (
    <div className="terminal-block text-stCream/80">
      <div className="text-stRed mb-2">{'>'} STATUS :: ONLINE</div>
      {displayed.map((line, idx) => (
        <p key={line + idx} className="pb-1">
          <span className="text-stBlue">$</span> {line}
        </p>)
      )}
    </div>
  )
}

TypewriterTerminal.propTypes = {
  lines: PropTypes.arrayOf(PropTypes.string).isRequired
}
