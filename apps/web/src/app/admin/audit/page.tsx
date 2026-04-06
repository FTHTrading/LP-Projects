import { mockAuditEvents } from '@/lib/mock-data';

export const metadata = { title: 'Audit Log | Admin' };

export default function AuditPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1">Immutable Audit Log</h1>
        <p className="text-sm text-obsidian-400">
          Every admin action, token operation, and compliance decision is permanently logged with
          actor identity, timestamp, and hash chain integrity.
        </p>
      </div>

      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-obsidian-800">
                {['Time', 'Event Type', 'Actor', 'Role', 'Action', 'Target'].map((h) => (
                  <th key={h} className="py-2.5 px-4 text-left text-xs font-semibold uppercase tracking-caps text-obsidian-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {mockAuditEvents.map((event) => (
                <tr key={event.id} className="border-b border-obsidian-800/50 hover:bg-obsidian-800/20">
                  <td className="py-3 px-4 text-xs font-mono text-obsidian-400 whitespace-nowrap">
                    {new Date(event.timestamp).toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] uppercase tracking-caps text-obsidian-300 border border-obsidian-700 px-2 py-0.5 rounded">
                      {event.eventType}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-obsidian-300 font-mono">{event.actorId ?? '—'}</td>
                  <td className="py-3 px-4 text-xs text-obsidian-400 capitalize">{event.actorRole ?? 'system'}</td>
                  <td className="py-3 px-4 text-obsidian-200 max-w-xs">{event.action}</td>
                  <td className="py-3 px-4 text-xs text-obsidian-400 font-mono">{event.targetType}:{event.targetId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
