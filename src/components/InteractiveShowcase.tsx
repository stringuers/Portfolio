import LiveCodeSnippet from './ui/LiveCodeSnippet';
import ProjectCard from './ProjectCard';
import SkillVisualizer from './SkillVisualizer';

export default function InteractiveShowcase() {
  const projects = [
    {
      title: 'Secure IoT Gateway',
      description: 'Edge gateway for telemetry with TLS, auth, and monitoring.',
      stack: ['Node', 'MQTT', 'Docker', 'Postgres'],
      threatModel:
        'Protects device credentials, enforces mTLS, and validates input at the edge; mitigation: strict input schema and rate-limiting.',
    },
    {
      title: 'Threat-Intel Pipeline',
      description: 'Realtime pipeline for indicators and enrichment.',
      stack: ['Python', 'Kafka', 'Redis', 'Elastic'],
      threatModel: 'Isolation via containers, auth tokens, and encrypted storage for sensitive indicators.',
    },
  ];

  const skills = [
    { name: 'JavaScript / TS', level: 88 },
    { name: 'Cybersecurity', level: 82 },
    { name: 'DevOps', level: 76 },
    { name: 'Embedded', level: 68 },
  ];

  return (
    <section id="showcase" className="relative z-10 py-16">
      <div className="container mx-auto px-4">
        <h3 className="text-2xl font-bold mb-6">Interactive Showcase</h3>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2">
            <LiveCodeSnippet />
          </div>

          <div>
            <SkillVisualizer skills={skills} />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <ProjectCard key={p.title} title={p.title} description={p.description} stack={p.stack} threatModel={p.threatModel} />
          ))}
        </div>
      </div>
    </section>
  );
}
