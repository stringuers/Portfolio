import SecurityMeshGL from './SecurityMeshGL';

/**
 * DynamicBackground
 * - Uses CSS aurora gradient together with a GPU-accelerated WebGL mesh for the network
 *   motif. The WebGL shader is lightweight and runs efficiently on modern GPUs.
 */
export default function DynamicBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-20">
      <div className="absolute inset-0 bg-aurora" />
      <div className="absolute inset-0">
        <SecurityMeshGL />
      </div>
    </div>
  );
}
