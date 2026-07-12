import { LV3, lv3Label, lv3Phone } from '../theme/tokens';
import { MUSES, PHASE_TO_MUSE } from '../data/muses';
import { useLune, LuneStore, activePhase, luneNav } from '../store/luneStore';
import { WarmAurora, Glass } from '../components/Glass';
import { PhoneStatus, HomeBar } from '../components/PhoneStatus';
import { LV3TabBar } from '../components/LV3TabBar';
import { todayLabel } from '../utils/format';

const DAY_LETTERS = ['D', 'L', 'M', 'M', 'J', 'V', 'S']; // getDay(): 0=dim ... 6=sam
const ENERGY_LABELS = ['Très basse', 'Basse', 'Stable', 'Bonne', 'Haute'];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function last7Days() {
  const days = [];
  const now = new Date();
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    days.push({ iso: d.toISOString().slice(0, 10), letter: DAY_LETTERS[d.getDay()], today: i === 0 });
  }
  return days;
}

export function Journal() {
  const st = useLune();
  const muse = PHASE_TO_MUSE[activePhase(st)];
  const m = MUSES[muse];
  const mood = st.journalMood || 'calme';
  const setMood = (v) => LuneStore.set(s => ({ journalMood: v, moodLog: { ...(s.moodLog || {}), [todayISO()]: v } }));
  const symptoms = new Set(st.journalSymptoms || []);
  const toggle = (id) => LuneStore.set(s => {
    const n = new Set(s.journalSymptoms || []);
    n.has(id) ? n.delete(id) : n.add(id);
    return { journalSymptoms: [...n] };
  });
  const energy = st.journalEnergy || 3;
  const setEnergy = (v) => LuneStore.set({ journalEnergy: v });
  const note = st.journalNote || '';
  const setNote = (v) => LuneStore.set({ journalNote: v });

  const moods = [
    { k: 'rad', l: 'Rayonnante', e: '☀︎' },
    { k: 'good', l: 'Bien', e: '◐' },
    { k: 'calme', l: 'Calme', e: '☾' },
    { k: 'flat', l: 'Plate', e: '◯' },
    { k: 'down', l: 'Sombre', e: '☁︎' },
  ];

  const symptomsList = [
    { k: 'cramps', l: 'Crampes' },
    { k: 'bloating', l: 'Ballonnements' },
    { k: 'cravings', l: 'Fringales' },
    { k: 'tired', l: 'Fatigue' },
    { k: 'tender', l: 'Sensible' },
    { k: 'libido', l: 'Libido ↑' },
    { k: 'focus', l: 'Focus' },
    { k: 'sociable', l: 'Sociable' },
  ];

  // Historique réel des 7 derniers jours, depuis moodLog (aujourd'hui retombe sur le mood courant)
  const moodLog = st.moodLog || {};
  const past7 = last7Days().map(d => ({ ...d, m: moodLog[d.iso] || (d.today ? mood : null) }));

  const sleepDisplay = st.healthConnected ? `${st.health.sleepH} h` : '—';

  return (
    <div style={lv3Phone(muse)}>
      <WarmAurora muse={muse} />

      <PhoneStatus dark={true} />

      <div style={{ position: 'absolute', inset: 0, overflowY: 'auto', overflowX: 'hidden' }}>
        {/* Header */}
        <div style={{ padding: '14px 18px 0' }}>
          <div className="lv3-mono" style={{ ...lv3Label, fontSize: 9.5, color: LV3.ink3 }}>JOURNAL · {todayLabel()}</div>
          <div className="lv3-serif" style={{ fontSize: 30, fontStyle: 'italic', marginTop: 6, lineHeight: 1 }}>
            Comment tu te <em style={{ color: m.palette.accent }}>sens</em> ?
          </div>
        </div>

        {/* Mood picker — emoji cards */}
        <div style={{ padding: '20px 16px 12px' }}>
          <div style={{ ...lv3Label, color: LV3.ink3, marginBottom: 10, paddingLeft: 4 }}>Mood</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
            {moods.map(mo => {
              const isA = mo.k === mood;
              return (
                <button key={mo.k} onClick={() => setMood(mo.k)} aria-pressed={isA} style={{
                  padding: '14px 4px 10px', border: 'none', cursor: 'pointer',
                  borderRadius: 18,
                  background: isA ? `linear-gradient(135deg, ${m.palette.accent}26, ${LV3.rose}10)` : 'rgba(255,255,255,0.04)',
                  outline: isA ? `1px solid ${m.palette.accent}` : `1px solid ${LV3.faint}`,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                  fontFamily: 'Manrope, sans-serif',
                  transition: 'all .2s',
                }}>
                  <span style={{ fontSize: 22, color: isA ? m.palette.accent : LV3.ink2 }}>{mo.e}</span>
                  <span className="lv3-mono" style={{ fontSize: 8.5, letterSpacing: '.08em', color: isA ? m.palette.accent : LV3.ink3 }}>{mo.l}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sleep & energy */}
        <div style={{ padding: '4px 16px 12px' }}>
          <Glass tight style={{ padding: '16px 16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              <div
                onClick={() => !st.healthConnected && luneNav('health')}
                role={st.healthConnected ? undefined : 'button'}
                tabIndex={st.healthConnected ? undefined : 0}
                onKeyDown={(e) => { if (!st.healthConnected && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); luneNav('health'); } }}
                style={{ cursor: st.healthConnected ? 'default' : 'pointer' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14, color: LV3.lavender }}>☾</span>
                  <span className="lv3-mono" style={{ ...lv3Label, fontSize: 9, color: LV3.ink3 }}>Sommeil</span>
                </div>
                <div className="lv3-serif" style={{ fontSize: 28, fontStyle: 'italic', lineHeight: 1, marginTop: 6 }}>{sleepDisplay}</div>
                <div className="lv3-mono" style={{ fontSize: 10, color: LV3.ink3, marginTop: 3 }}>
                  {st.healthConnected ? 'via Apple Santé' : 'Connecter Apple Santé ›'}
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14, color: m.palette.accent }}>⚡</span>
                  <span className="lv3-mono" style={{ ...lv3Label, fontSize: 9, color: LV3.ink3 }}>Énergie</span>
                </div>
                <div className="lv3-serif" style={{ fontSize: 28, fontStyle: 'italic', lineHeight: 1, marginTop: 6 }}>{energy}/5</div>
                <input
                  type="range" min="1" max="5" value={energy}
                  onChange={e => setEnergy(Number(e.target.value))}
                  aria-label="Niveau d'énergie"
                  style={{ width: '100%', marginTop: 6, accentColor: m.palette.accent }}
                />
                <div className="lv3-mono" style={{ fontSize: 10, color: LV3.ink3 }}>{ENERGY_LABELS[energy - 1]}</div>
              </div>
            </div>
          </Glass>
        </div>

        {/* Symptoms multi-select */}
        <div style={{ padding: '4px 16px 12px' }}>
          <div style={{ ...lv3Label, color: LV3.ink3, marginBottom: 10, paddingLeft: 4 }}>Symptômes · cycle</div>
          <Glass tight style={{ padding: '14px 14px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {symptomsList.map(s => {
                const isA = symptoms.has(s.k);
                return (
                  <button key={s.k} onClick={() => toggle(s.k)} aria-pressed={isA} style={{
                    padding: '7px 13px', borderRadius: 99, border: 'none', cursor: 'pointer',
                    background: isA ? `${m.palette.accent}26` : 'rgba(255,255,255,0.04)',
                    color: isA ? m.palette.accent : LV3.ink2,
                    fontSize: 11.5, fontFamily: 'Manrope, sans-serif', fontWeight: isA ? 600 : 400,
                    outline: `1px solid ${isA ? m.palette.accent : LV3.glassLine}`,
                    transition: 'all .2s',
                  }}>
                    {s.l}
                  </button>
                );
              })}
            </div>
          </Glass>
        </div>

        {/* Free note */}
        <div style={{ padding: '4px 16px 12px' }}>
          <div style={{ ...lv3Label, color: LV3.ink3, marginBottom: 10, paddingLeft: 4 }}>Note libre</div>
          <Glass tight style={{ padding: '16px 16px' }}>
            <textarea
              value={note}
              onChange={e => setNote(e.target.value)}
              placeholder="Comment s'est passée ta journée ?"
              rows={4}
              aria-label="Note libre du journal"
              style={{
                width: '100%', resize: 'vertical', border: 'none', outline: 'none', background: 'transparent',
                color: LV3.ink, fontFamily: "'Fraunces', serif", fontStyle: 'italic', fontSize: 16, lineHeight: 1.5,
              }}
            />
            <div className="lv3-mono" style={{ fontSize: 9, color: LV3.ink3, marginTop: 10, letterSpacing: '.10em' }}>{note.length} caractère{note.length > 1 ? 's' : ''}</div>
          </Glass>
        </div>

        {/* 7 day strip */}
        <div style={{ padding: '4px 16px 18px' }}>
          <div style={{ ...lv3Label, color: LV3.ink3, marginBottom: 10, paddingLeft: 4 }}>Tes 7 derniers jours</div>
          <Glass tight style={{ padding: '14px 14px' }}>
            <div style={{ display: 'flex', gap: 6, justifyContent: 'space-between' }}>
              {past7.map((d, i) => {
                const mo = moods.find(x => x.k === d.m);
                return (
                  <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                    <div className="lv3-mono" style={{ fontSize: 9, color: d.today ? m.palette.accent : LV3.ink3, letterSpacing: '.08em' }}>{d.letter}</div>
                    <div style={{
                      width: '100%', aspectRatio: '1', borderRadius: '50%',
                      background: d.today ? `${m.palette.accent}33` : 'rgba(255,255,255,0.04)',
                      border: d.today ? `1px solid ${m.palette.accent}` : `1px solid ${LV3.glassLine}`,
                      marginTop: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 15, color: d.today ? m.palette.accent : LV3.ink2,
                    }}>
                      {mo?.e || ''}
                    </div>
                  </div>
                );
              })}
            </div>
          </Glass>
        </div>

        <div style={{ height: 100 }} />
      </div>

      <LV3TabBar active="jour" muse={muse} />
      <HomeBar />
    </div>
  );
}
