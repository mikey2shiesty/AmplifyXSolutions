import { motion } from 'framer-motion'

export default function VirtualTourFloorPlan({ rooms, currentRoom, onRoomChange, onClose, propertyTitle }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[110] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-slate-900 border border-white/10 p-8 md:p-12 max-w-lg w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="eyebrow mb-1">Floor Plan</div>
            <div className="font-display text-xl font-semibold">{propertyTitle}</div>
          </div>
          <button onClick={onClose} className="p-2 text-white/50 hover:text-white transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        {/* SVG floor plan */}
        <div className="relative aspect-[4/3] bg-slate-800 border border-white/5 overflow-hidden">
          <svg viewBox="0 0 100 80" className="w-full h-full">
            {/* Outer walls */}
            <rect x="5" y="5" width="90" height="70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />

            {/* Room dividers */}
            <line x1="40" y1="5" x2="40" y2="45" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" />
            <line x1="5" y1="45" x2="65" y2="45" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" />
            <line x1="65" y1="5" x2="65" y2="75" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" />

            {/* Room labels and clickable areas */}
            {rooms.map((room) => (
              <g key={room.id} onClick={() => onRoomChange(room.id)} className="cursor-pointer">
                <circle
                  cx={room.floorPlan.x}
                  cy={room.floorPlan.y}
                  r={room.id === currentRoom ? 5 : 3.5}
                  fill={room.id === currentRoom ? '#14b8a6' : 'rgba(255,255,255,0.15)'}
                  className="transition-all duration-300"
                />
                {room.id === currentRoom && (
                  <circle
                    cx={room.floorPlan.x}
                    cy={room.floorPlan.y}
                    r="8"
                    fill="none"
                    stroke="#2dd4bf"
                    strokeWidth="0.5"
                    opacity="0.5"
                  >
                    <animate attributeName="r" from="5" to="10" dur="2s" repeatCount="indefinite" />
                    <animate attributeName="opacity" from="0.6" to="0" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                <text
                  x={room.floorPlan.x}
                  y={room.floorPlan.y + (room.id === currentRoom ? 10 : 8)}
                  textAnchor="middle"
                  fill={room.id === currentRoom ? '#2dd4bf' : 'rgba(255,255,255,0.5)'}
                  fontSize="3"
                  fontFamily="Inter, sans-serif"
                  className="uppercase select-none pointer-events-none"
                  letterSpacing="0.15em"
                >
                  {room.name}
                </text>
              </g>
            ))}
          </svg>
        </div>

        <div className="mt-6 text-[11px] uppercase tracking-[0.2em] text-white/40 text-center">
          Click a room to navigate · Floor plan is illustrative only
        </div>
      </motion.div>
    </motion.div>
  )
}
