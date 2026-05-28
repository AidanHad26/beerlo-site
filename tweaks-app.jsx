// tweaks-app.jsx — Tweaks panel for the BeerLo.net preview.
// Only loads inside the design preview (see index.html). Lets us toggle
// theme, hero layout, and hero copy variants live.

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark",
  "layout": "centered",
  "heroCopy": "settle-debate"
}/*EDITMODE-END*/;

function BeerLoTweaks() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Mirror tweaks into the live DOM + localStorage so refresh keeps state
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme',  t.theme);
    document.documentElement.setAttribute('data-layout', t.layout);
    if (typeof applyHeroCopy === 'function') applyHeroCopy(t.heroCopy);
    try { localStorage.setItem('beerlo_tweaks', JSON.stringify(t)); } catch (_) {}
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', getComputedStyle(document.body).backgroundColor);
  }, [t.theme, t.layout, t.heroCopy]);

  return (
    <TweaksPanel title="BeerLo.net">
      <TweakSection label="Theme" />
      <TweakRadio
        label="Color theme"
        value={t.theme}
        options={[
          { value: 'dark',   label: 'Dark' },
          { value: 'cream',  label: 'Cream' },
          { value: 'amber',  label: 'Amber' },
        ]}
        onChange={(v) => setTweak('theme', v)}
      />

      <TweakSection label="Hero" />
      <TweakSelect
        label="Layout"
        value={t.layout}
        options={[
          { value: 'centered',    label: 'Centered (3 phones)' },
          { value: 'split',       label: 'Split (text + phone)' },
          { value: 'phone-right', label: 'Phone-right (big type)' },
        ]}
        onChange={(v) => setTweak('layout', v)}
      />
      <TweakSelect
        label="Hero copy"
        value={t.heroCopy}
        options={[
          { value: 'settle-debate', label: 'Settle the debate.' },
          { value: 'house-elo',     label: 'ELO for your house games.' },
          { value: 'log-rank-crown',label: 'Log. Rank. Crown.' },
        ]}
        onChange={(v) => setTweak('heroCopy', v)}
      />
    </TweaksPanel>
  );
}

// Mount
const __mountTweaks = () => {
  const el = document.createElement('div');
  document.body.appendChild(el);
  ReactDOM.createRoot(el).render(<BeerLoTweaks />);
};
if (window.TweaksPanel) __mountTweaks();
else window.addEventListener('load', __mountTweaks);
