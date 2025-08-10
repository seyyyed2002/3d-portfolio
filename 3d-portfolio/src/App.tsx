import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import ThreeScene from './components/ThreeScene'

function App() {
  return (
    <div className="min-h-screen grid grid-rows-[auto,1fr] bg-neutral-900 text-neutral-100 antialiased">
      <header className="px-6 py-4 flex items-center justify-between border-b border-neutral-800">
        <h1 className="text-lg font-semibold tracking-tight">My 3D Portfolio</h1>
        <nav className="space-x-6 text-sm">
          <a href="#work" className="text-neutral-300 hover:text-teal-400">Work</a>
          <a href="#about" className="text-neutral-300 hover:text-teal-400">About</a>
          <a href="#contact" className="text-neutral-300 hover:text-teal-400">Contact</a>
        </nav>
      </header>

      <main className="relative">
        <Canvas
          className="!absolute inset-0"
          shadows
          camera={{ position: [3, 3, 5], fov: 50 }}
        >
          <ThreeScene />
          <OrbitControls enableDamping />
        </Canvas>

        <div className="relative pointer-events-none">
          <section className="h-[80vh] grid place-items-center">
            <div className="pointer-events-auto text-center px-6">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight">Hi, I&apos;m Your Name</h2>
              <p className="mt-4 text-neutral-300 text-lg">Creative Developer · 3D · Web</p>
            </div>
          </section>

          <section id="work" className="container mx-auto px-6 pb-16">
            <h3 className="text-2xl font-semibold mb-6">Selected Work</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-neutral-800/60 rounded-lg p-4 border border-neutral-700">Project A</div>
              <div className="bg-neutral-800/60 rounded-lg p-4 border border-neutral-700">Project B</div>
              <div className="bg-neutral-800/60 rounded-lg p-4 border border-neutral-700">Project C</div>
            </div>
          </section>

          <section id="about" className="container mx-auto px-6 pb-16">
            <h3 className="text-2xl font-semibold mb-4">About</h3>
            <p className="text-neutral-300 max-w-2xl">Add your bio here. Highlight your tools, experience, and passions.</p>
          </section>

          <section id="contact" className="container mx-auto px-6 pb-24">
            <h3 className="text-2xl font-semibold mb-4">Contact</h3>
            <p className="text-neutral-300">Email: you@example.com</p>
          </section>
        </div>
      </main>
    </div>
  )
}

export default App
