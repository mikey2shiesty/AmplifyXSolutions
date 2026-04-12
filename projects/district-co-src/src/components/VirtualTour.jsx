import { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import VirtualTourFloorPlan from './VirtualTourFloorPlan.jsx'

export default function VirtualTour({ rooms, propertyTitle }) {
  const [currentRoom, setCurrentRoom] = useState(rooms[0].id)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showFloorPlan, setShowFloorPlan] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const dragState = useRef({ startX: 0, startY: 0, offsetX: 0, offsetY: 0, lastX: 0, velocityX: 0 })
  const rafRef = useRef(null)

  const room = rooms.find((r) => r.id === currentRoom)

  const clamp = (val, min, max) => Math.min(Math.max(val, min), max)

  const applyTransform = useCallback(() => {
    if (!imageRef.current) return
    const { offsetX, offsetY } = dragState.current
    imageRef.current.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`
  }, [])

  const onPointerDown = useCallback((e) => {
    if (e.target.closest('.tour-hotspot') || e.target.closest('.tour-ui')) return
    e.preventDefault()
    setIsDragging(true)
    const d = dragState.current
    d.startX = e.clientX - d.offsetX
    d.startY = e.clientY - d.offsetY
    d.velocityX = 0
    d.lastX = e.clientX
    containerRef.current?.setPointerCapture(e.pointerId)
  }, [])

  const onPointerMove = useCallback((e) => {
    if (!isDragging) return
    e.preventDefault()
    const d = dragState.current
    const container = containerRef.current
    const image = imageRef.current
    if (!container || !image) return

    const maxX = (image.offsetWidth - container.offsetWidth) / 2
    const maxY = (image.offsetHeight - container.offsetHeight) / 2

    d.velocityX = e.clientX - d.lastX
    d.lastX = e.clientX
    d.offsetX = clamp(e.clientX - d.startX, -maxX, maxX)
    d.offsetY = clamp(e.clientY - d.startY, -maxY, maxY)
    applyTransform()
  }, [isDragging, applyTransform])

  const onPointerUp = useCallback((e) => {
    if (!isDragging) return
    setIsDragging(false)
    containerRef.current?.releasePointerCapture(e.pointerId)

    // Momentum
    let velocity = dragState.current.velocityX
    const decay = () => {
      if (Math.abs(velocity) < 0.5) return
      velocity *= 0.92
      const d = dragState.current
      const container = containerRef.current
      const image = imageRef.current
      if (!container || !image) return
      const maxX = (image.offsetWidth - container.offsetWidth) / 2
      d.offsetX = clamp(d.offsetX + velocity, -maxX, maxX)
      applyTransform()
      rafRef.current = requestAnimationFrame(decay)
    }
    rafRef.current = requestAnimationFrame(decay)
  }, [isDragging, applyTransform])

  useEffect(() => {
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [])

  // Reset position when room changes
  useEffect(() => {
    dragState.current.offsetX = 0
    dragState.current.offsetY = 0
    applyTransform()
  }, [currentRoom, applyTransform])

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      containerRef.current?.closest('.tour-wrapper')?.requestFullscreen?.().catch(() => {
        setIsFullscreen(true)
      })
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.().catch(() => {})
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false)
        document.exitFullscreen?.().catch(() => {})
      }
    }
    const onFsChange = () => {
      if (!document.fullscreenElement) setIsFullscreen(false)
    }
    window.addEventListener('keydown', onEsc)
    document.addEventListener('fullscreenchange', onFsChange)
    return () => {
      window.removeEventListener('keydown', onEsc)
      document.removeEventListener('fullscreenchange', onFsChange)
    }
  }, [isFullscreen])

  return (
    <div className={`tour-wrapper ${isFullscreen ? 'fixed inset-0 z-[100] bg-slate-950' : 'relative'}`}>
      <div className="eyebrow mb-5 flex items-center gap-3">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/><path d="M2 12h20M12 2c2.5 3 4 7 4 10s-1.5 7-4 10c-2.5-3-4-7-4-10s1.5-7 4-10" stroke="currentColor" strokeWidth="2"/></svg>
        3D Virtual Tour
      </div>

      <div
        ref={containerRef}
        className={`relative overflow-hidden bg-slate-900 select-none ${
          isFullscreen ? 'w-full h-full' : 'aspect-[16/9] max-h-[600px]'
        } ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        style={{ touchAction: 'none' }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={room.id}
            ref={imageRef}
            src={room.image}
            alt={room.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[180%] min-h-[120%] max-w-none object-cover pointer-events-none"
            draggable={false}
          />
        </AnimatePresence>

        {/* Hotspots */}
        {room.hotspots.map((hotspot) => (
          <button
            key={hotspot.id}
            onClick={() => setCurrentRoom(hotspot.targetRoom)}
            className="tour-hotspot absolute z-20 group"
            style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%`, transform: 'translate(-50%, -50%)' }}
          >
            <span className="flex items-center gap-2">
              <span className="relative flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-50" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-teal-400 border-2 border-slate-950" />
              </span>
              <span className="hidden group-hover:block bg-slate-950/90 text-white text-[10px] uppercase tracking-[0.2em] px-3 py-1.5 whitespace-nowrap backdrop-blur">
                {hotspot.label}
              </span>
            </span>
          </button>
        ))}

        {/* Top UI bar */}
        <div className="tour-ui absolute top-0 inset-x-0 p-4 flex items-center justify-between z-30 bg-gradient-to-b from-slate-950/70 to-transparent">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/80">{room.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowFloorPlan(true)} className="p-2 bg-white/10 hover:bg-white/20 transition-colors rounded" title="Floor Plan">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>
            </button>
            <button onClick={toggleFullscreen} className="p-2 bg-white/10 hover:bg-white/20 transition-colors rounded" title="Fullscreen">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5"><path d="M8 3H5a2 2 0 00-2 2v3M21 8V5a2 2 0 00-2-2h-3M3 16v3a2 2 0 002 2h3M16 21h3a2 2 0 002-2v-3"/></svg>
            </button>
          </div>
        </div>

        {/* Bottom room strip */}
        <div className="tour-ui absolute bottom-0 inset-x-0 p-4 z-30 bg-gradient-to-t from-slate-950/80 to-transparent">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {rooms.map((r) => (
              <button
                key={r.id}
                onClick={() => setCurrentRoom(r.id)}
                className={`shrink-0 px-4 py-2 text-[10px] uppercase tracking-[0.2em] rounded transition-all duration-300 whitespace-nowrap ${
                  r.id === currentRoom
                    ? 'bg-teal-500 text-slate-950 font-semibold'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 backdrop-blur'
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>

        {/* Drag hint */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ delay: 3, duration: 1 }}
          className="tour-ui absolute inset-0 flex items-center justify-center z-10 pointer-events-none"
        >
          <div className="bg-slate-950/80 backdrop-blur px-6 py-4 flex items-center gap-3 text-white/80 text-sm">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 4.5V3m0 1.5c0 .828-.672 1.5-1.5 1.5S11 5.328 11 4.5M14 4.5c0-.828-.672-1.5-1.5-1.5S11 3.672 11 4.5M11 4.5V3"/><path d="M6 14v-3a2 2 0 012-2h1M18 14v-3a2 2 0 00-2-2h-1"/><path d="M8 19l-2-2 2-2M16 19l2-2-2-2"/></svg>
            Drag to explore · Click markers to navigate
          </div>
        </motion.div>
      </div>

      {/* Floor plan overlay */}
      <AnimatePresence>
        {showFloorPlan && (
          <VirtualTourFloorPlan
            rooms={rooms}
            currentRoom={currentRoom}
            onRoomChange={(id) => { setCurrentRoom(id); setShowFloorPlan(false) }}
            onClose={() => setShowFloorPlan(false)}
            propertyTitle={propertyTitle}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
