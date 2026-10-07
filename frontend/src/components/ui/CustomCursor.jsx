import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef()
  const followerRef = useRef()
  const pos = useRef({ x: 0, y: 0 })
  const followerPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current

    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (cursor) {
        cursor.style.transform = `translate(${e.clientX - 6}px, ${e.clientY - 6}px)`
      }
    }

    const animate = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.12
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.12
      if (follower) {
        follower.style.transform = `translate(${followerPos.current.x - 20}px, ${followerPos.current.y - 20}px)`
      }
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    const raf = requestAnimationFrame(animate)

    // Hover effects
    const addHover = () => {
      if (cursor) cursor.style.transform += ' scale(2.5)'
      if (follower) {
        follower.style.width = '60px'
        follower.style.height = '60px'
        follower.style.borderColor = 'rgba(255,107,0,0.8)'
      }
    }
    const removeHover = () => {
      if (follower) {
        follower.style.width = '40px'
        follower.style.height = '40px'
        follower.style.borderColor = 'rgba(255,107,0,0.5)'
      }
    }

    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="cursor" />
      <div ref={followerRef} className="cursor-follower" />
    </>
  )
}
