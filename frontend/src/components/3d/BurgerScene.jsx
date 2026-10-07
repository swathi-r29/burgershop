import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { ContactShadows, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Check if mobile client
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

/* ─── Smoke / Steam Particles ─── */
function SmokeParticles({ count = isMobile ? 15 : 45, position = [0, 0, 0], assembled = false }) {
  const mesh = useRef()
  const matRef = useRef()
  
  const texture = useMemo(() => {
    return new THREE.TextureLoader().load('/assets/burger/smoke.png')
  }, [])

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 2.5
      pos[i * 3 + 1] = Math.random() * 2.8 - 0.8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2.5
    }
    return pos
  }, [count])

  const speeds = useMemo(
    () => new Float32Array(count).fill(0).map(() => 0.003 + Math.random() * 0.006),
    [count]
  )

  useFrame(() => {
    if (!mesh.current) return
    const arr = mesh.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] // Rise up
      arr[i * 3]     += Math.sin(Date.now() * 0.0004 + i) * 0.002 // Drift sideways
      
      // Reset if too high
      if (arr[i * 3 + 1] > 2.2) {
        arr[i * 3 + 1] = -0.8
        arr[i * 3]     = (Math.random() - 0.5) * 2.5
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true

    // Dynamic opacity update based on scroll trigger
    let progress = 0
    try {
      const trigger = ScrollTrigger.getById('hero-scroll')
      if (trigger) {
        progress = trigger.progress
      }
    } catch (e) {}

    let targetOpacity = assembled ? 0.08 : 0.03
    if (progress > 0 && progress <= 0.2) {
      const p = progress / 0.2
      targetOpacity = THREE.MathUtils.lerp(assembled ? 0.08 : 0.03, 0.22, p)
    } else if (progress > 0.2 && progress <= 0.5) {
      const p = (progress - 0.2) / 0.3
      targetOpacity = THREE.MathUtils.lerp(0.22, 0.02, p)
    } else if (progress > 0.5 && progress <= 0.8) {
      const p = (progress - 0.5) / 0.3
      targetOpacity = THREE.MathUtils.lerp(0.02, 0.08, p)
    } else if (progress > 0.8) {
      targetOpacity = 0.08
    }

    if (matRef.current) {
      matRef.current.opacity += (targetOpacity - matRef.current.opacity) * 0.08
    }
  })

  return (
    <points ref={mesh} position={position}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={0.3}
        map={texture}
        color="#ffffff"
        transparent
        opacity={0.03}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ─── Ambient Embers ─── */
function EmberParticles({ count = isMobile ? 20 : 60 }) {
  const mesh = useRef()
  const matRef = useRef()
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 7
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6
    }
    return pos
  }, [count])

  const speeds = useMemo(
    () => new Float32Array(count).fill(0).map(() => 0.008 + Math.random() * 0.015),
    [count]
  )

  useFrame((state) => {
    if (!mesh.current) return
    
    // Dynamic updates based on scroll trigger
    let progress = 0
    try {
      const trigger = ScrollTrigger.getById('hero-scroll')
      if (trigger) {
        progress = trigger.progress
      }
    } catch (e) {}

    // Embers opacity, size and speed boost during 40% - 60% scroll morph
    let targetOpacity = 0.2
    let targetSize = 0.022
    let speedMultiplier = 1.0

    if (progress > 0.2 && progress < 0.8) {
      const dist = Math.abs(progress - 0.5) // 0 to 0.3
      const factor = Math.max(0, 1 - dist / 0.3) // peaks at 0.5
      targetOpacity = 0.2 + factor * 0.65 // peaks at 0.85
      targetSize = 0.022 + factor * 0.028 // peaks at 0.05
      speedMultiplier = 1.0 + factor * 3.5 // rise faster
    }

    if (matRef.current) {
      matRef.current.opacity += (targetOpacity - matRef.current.opacity) * 0.08
      matRef.current.size += (targetSize - matRef.current.size) * 0.08
    }

    mesh.current.rotation.y = state.clock.elapsedTime * 0.04
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.08
    
    const arr = mesh.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += speeds[i] * speedMultiplier // Embers rise
      if (arr[i * 3 + 1] > 3.0) {
        arr[i * 3 + 1] = -3.0
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={0.022}
        color="#FF7A00"
        transparent
        opacity={0.2}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/* ─── Falling Sesame Particles ─── */
function SesameParticles({ count = isMobile ? 25 : 85 }) {
  const mesh = useRef()
  
  const texture = useMemo(() => {
    return new THREE.TextureLoader().load('/assets/burger/sesame-particle.png')
  }, [])

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 8
      pos[i * 3 + 1] = Math.random() * 8 + 3 // Start high
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return pos
  }, [count])

  const speeds = useMemo(
    () => new Float32Array(count).fill(0).map(() => 0.016 + Math.random() * 0.024),
    [count]
  )

  useFrame(() => {
    if (!mesh.current) return
    const arr = mesh.current.geometry.attributes.position.array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] -= speeds[i] // Fall down
      arr[i * 3]     += Math.sin(Date.now() * 0.0008 + i) * 0.003 // Sway
      
      // Reset if too low
      if (arr[i * 3 + 1] < -4.0) {
        arr[i * 3 + 1] = 4.0 + Math.random() * 3
        arr[i * 3]     = (Math.random() - 0.5) * 8
      }
    }
    mesh.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.11}
        map={texture}
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}

/* ─── Fire Overlay Background ─── */
function FireOverlay() {
  const texture = useMemo(() => {
    return new THREE.TextureLoader().load('/assets/burger/fire-overlay.png')
  }, [])

  return (
    <mesh position={[0, -2.4, -4.5]} rotation={[0, 0, 0]}>
      <planeGeometry args={[16, 10]} />
      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.12}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

/* ─── Main Background Scene ─── */
export default function BurgerScene({ assembled = false, onAssembled }) {
  const rimLightRef = useRef()
  const backLightRef = useRef()

  // Invoke callback immediately since scene loading is instantaneous
  useEffect(() => {
    if (onAssembled) onAssembled()
  }, [onAssembled])

  useFrame(() => {
    // Check if ScrollTrigger is loaded and find the timeline progress
    let progress = 0
    try {
      const trigger = ScrollTrigger.getById('hero-scroll')
      if (trigger) {
        progress = trigger.progress
      }
    } catch (e) {
      // Fallback
    }

    // 1. Warm rim light lerp + scroll boost
    if (rimLightRef.current) {
      const baseTarget = assembled ? 2.2 : 0.5
      let scrollBoost = 0
      if (progress > 0.2 && progress < 0.8) {
        const dist = Math.abs(progress - 0.5) // 0 to 0.3
        scrollBoost = Math.max(0, 1 - dist / 0.3) * 2.3
      }
      const targetIntensity = baseTarget + scrollBoost
      rimLightRef.current.intensity += (targetIntensity - rimLightRef.current.intensity) * 0.08
    }

    // 2. Soft backlight scroll boost
    if (backLightRef.current) {
      let scrollBoost = 0
      if (progress > 0.2 && progress < 0.8) {
        const dist = Math.abs(progress - 0.5)
        scrollBoost = Math.max(0, 1 - dist / 0.3) * 1.8
      }
      const targetIntensity = 1.2 + scrollBoost
      backLightRef.current.intensity += (targetIntensity - backLightRef.current.intensity) * 0.08
    }
  })

  return (
    <>
      {/* Cinematic Post-processing */}
      <EffectComposer>
        <Bloom luminanceThreshold={0.5} luminanceSmoothing={0.9} intensity={0.18} />
        <Vignette eskil={false} offset={0.2} darkness={0.55} />
      </EffectComposer>

      {/* Lighting environment */}
      <Environment preset="city" />

      {/* Lights Rig */}
      <ambientLight intensity={0.15} />
      
      <spotLight
        position={[0, 10, 4]}
        angle={0.22}
        penumbra={1}
        intensity={6.0}
        color="#ffffff"
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      
      {/* Orange rim light */}
      <pointLight ref={rimLightRef} position={[4, 4, 4]} intensity={0.5} color="#FF7A00" />
      
      {/* Soft backlight */}
      <pointLight ref={backLightRef} position={[-4, 2, -4]} intensity={1.2} color="#FF4500" />

      {/* Shadows */}
      <ContactShadows
        position={[0, -0.65, 0]}
        opacity={0.45}
        scale={8}
        blur={2.5}
        far={1.5}
        color="#000000"
      />

      {/* Textures and particle emitters */}
      <FireOverlay />
      <EmberParticles />
      <SmokeParticles position={[0, 0, 0]} assembled={assembled} />
      <SesameParticles />
    </>
  )
}
