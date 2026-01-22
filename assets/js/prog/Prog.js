import React, { useState } from 'react'
import { useBandsContext } from '../shared/BandsProvider'
import ProgCalendar from './ProgCalendar'
import ProgTable from './ProgTable'

const Prog = () => {
  const { bands, setBands } = useBandsContext()

  const displayModes = [
    {
      value: 'calendar',
      label: 'Planning',
      element: () => <ProgCalendar bands={bands} setBands={setBands} />
    },
    {
      value: 'table',
      label: 'Tableau',
      element: () => <ProgTable bands={bands} />
    }
  ]

  const [displayMode, setDisplayMode] = useState(displayModes[0].value)

  return (
    <>
      <h1>Programmation</h1>
      <div className="flex end">
        <div class="btn-group">
          {displayModes.map(({ label, value }, index) => (
            <button
              key={index}
              class={`btn btn-primary ${displayMode === value ? 'active' : ''}`}
              onClick={() => setDisplayMode(value)}
              aria-current="page"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {displayModes.find((m) => m.value === displayMode).element()}
    </>
  )
}

export default Prog
