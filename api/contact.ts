import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = 'Skynode Partners <noreply@skynodepartners.com>';

const SEGMENT_EMAIL: Record<string, string> = {
  'ai-compute':    'edge@skynodepartners.com',
  'broadcasting':  'broadcasting@skynodepartners.com',
  'private-comms': 'communications@skynodepartners.com',
  'experimental':  'experimental@skynodepartners.com',
};

const SEGMENT_LABEL: Record<string, string> = {
  'ai-compute':    'AI / Compute',
  'broadcasting':  'Broadcasting',
  'private-comms': 'Private Communications',
  'experimental':  'Experimental / Emerging',
  'not-sure':      'Not sure yet',
};

const USE_CASE_LABEL: Record<string, string> = {
  'broadcast-fm':  'Broadcast FM',
  'broadcast-tv':  'Broadcast TV',
  'private-p25':   'Private Comms / P25',
  'private-5g':    'Private 5G',
  'private-p2p':   'P2P Data Links',
  'edge-colo':     'Edge Colocation',
  'ai-inference':  'AI / Inference',
  'experimental':  'Experimental Systems',
};

const MARKET_LABEL: Record<string, string> = {
  'new-york':    'New York',
  'florida':     'Florida',
  'illinois':    'Illinois',
  'connecticut': 'Connecticut',
  'other':       'Other / Multi-metro',
};

function esc(s: string) {
  return String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function row(label: string, value: string) {
  const v = value || '—';
  return `<tr>
    <td style="padding:5px 16px 5px 0;font-size:13px;color:#6b7280;white-space:nowrap;vertical-align:top;font-weight:500">${label}</td>
    <td style="padding:5px 0;font-size:13px;color:#111827;line-height:1.5">${v}</td>
  </tr>`;
}

const HEADER = (title: string) => `
  <div style="background:#0a1628;padding:28px 32px;border-radius:10px 10px 0 0">
    <p style="color:#5BE49B;font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;margin:0 0 6px">Skynode Partners</p>
    <h1 style="color:#fff;font-size:20px;font-weight:900;margin:0;letter-spacing:-0.01em">${esc(title)}</h1>
  </div>`;

const FOOTER_HTML = `<p style="font-size:12px;color:#9ca3af;margin-top:28px;border-top:1px solid #f3f4f6;padding-top:16px">Skynode Partners · New York · Florida · Illinois · Connecticut<br>This email was generated from a form submission on skynodepartners.com.</p>`;

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end('Method Not Allowed');

  if (!process.env.RESEND_API_KEY) {
    return res.status(500).json({ error: 'Email service not configured.' });
  }

  try {
    const b = req.body;

    if (b.type === 'customer') {
      const segments: string[] = b.primarySegments ?? [];
      const useCases: string[] = b.useCases ?? [];
      const markets: string[] = b.markets ?? [];

      const primarySegment = segments[0] ?? 'not-sure';
      const to = SEGMENT_EMAIL[primarySegment] ?? 'info@skynodepartners.com';

      const segmentLabels = segments.map(s => SEGMENT_LABEL[s] ?? s).join(', ') || '—';
      const useCaseLabels = useCases.map(u => USE_CASE_LABEL[u] ?? u).join(', ') || '—';
      const marketLabels  = markets.map(m => MARKET_LABEL[m] ?? m).join(', ') || '—';
      const firstName = esc(b.name ?? '').split(' ')[0] || 'there';

      const notifyHtml = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto">
        ${HEADER('New Customer Inquiry')}
        <div style="background:#fff;padding:28px 32px;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 10px 10px">
          <table style="width:100%;border-collapse:collapse;margin-bottom:4px">
            ${row('Name',         esc(b.name))}
            ${row('Company',      esc(b.company))}
            ${row('Email',        `<a href="mailto:${esc(b.email)}" style="color:#0ea5e9">${esc(b.email)}</a>`)}
            ${row('Phone',        esc(b.phone))}
            ${row('Segment',      segmentLabels)}
            ${row('Use Case(s)',   useCaseLabels)}
            ${row('Market(s)',    marketLabels)}
            ${row('Specific Area',esc(b.specificArea))}
            ${row('Timeline',     esc(b.timeline))}
            ${row('# of Sites',   esc(b.numSites))}
            ${row('How they heard',esc(b.howHeard))}
          </table>
          ${b.details ? `<div style="margin-top:16px;background:#f9fafb;border-radius:8px;padding:16px;border:1px solid #e5e7eb">
            <p style="font-size:11px;color:#6b7280;margin:0 0 8px;font-weight:700;text-transform:uppercase;letter-spacing:.08em">Project Details</p>
            <p style="font-size:13px;color:#111827;margin:0;line-height:1.65;white-space:pre-wrap">${esc(b.details)}</p>
          </div>` : ''}
          ${FOOTER_HTML}
        </div>
      </div>`;

      const confirmHtml = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto">
        ${HEADER('We got your inquiry.')}
        <div style="background:#fff;padding:28px 32px;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 10px 10px">
          <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 14px">Hi ${firstName},</p>
          <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 14px">Thanks for reaching out — your inquiry has been received and routed to the right person at Skynode. We'll follow up within one business day.</p>
          <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 24px">In the meantime, you're welcome to browse our node catalog at <a href="https://skynodepartners.com/skynodes" style="color:#5BE49B;font-weight:600">skynodepartners.com/skynodes</a>.</p>
          <div style="background:#0a1628;border-radius:8px;padding:16px 20px;display:inline-block">
            <p style="margin:0;font-size:13px;color:#9ca3af">Questions? Reply directly to this email or reach us at</p>
            <a href="mailto:info@skynodepartners.com" style="color:#5BE49B;font-size:13px;font-weight:600">info@skynodepartners.com</a>
          </div>
          ${FOOTER_HTML}
        </div>
      </div>`;

      await Promise.all([
        resend.emails.send({
          from: FROM,
          to,
          replyTo: b.email,
          subject: `Skynode Inquiry — ${esc(b.name)} (${segmentLabels})`,
          html: notifyHtml,
        }),
        resend.emails.send({
          from: FROM,
          to: b.email,
          subject: 'We received your Skynode inquiry',
          html: confirmHtml,
        }),
      ]);

    } else {
      // Property owner track
      const firstName = esc(b.poName ?? '').split(' ')[0] || 'there';

      const notifyHtml = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto">
        ${HEADER('New Property Inquiry')}
        <div style="background:#fff;padding:28px 32px;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 10px 10px">
          <table style="width:100%;border-collapse:collapse;margin-bottom:4px">
            ${row('Name',               esc(b.poName))}
            ${row('Title',              esc(b.poTitle))}
            ${row('Building / Company', esc(b.poBuildingName))}
            ${row('Email',              `<a href="mailto:${esc(b.poEmail)}" style="color:#0ea5e9">${esc(b.poEmail)}</a>`)}
            ${row('Phone',              esc(b.poPhone))}
            ${row('Address / Area',     esc(b.poAddress))}
            ${row('Building Type',      esc(b.poBuildingType))}
            ${row('Roof Accessible',    esc(b.poRoofAccess))}
            ${row('Power on Roof',      esc(b.poPower))}
          </table>
          ${b.poNotes ? `<div style="margin-top:16px;background:#f9fafb;border-radius:8px;padding:16px;border:1px solid #e5e7eb">
            <p style="font-size:11px;color:#6b7280;margin:0 0 8px;font-weight:700;text-transform:uppercase;letter-spacing:.08em">Notes</p>
            <p style="font-size:13px;color:#111827;margin:0;line-height:1.65;white-space:pre-wrap">${esc(b.poNotes)}</p>
          </div>` : ''}
          ${FOOTER_HTML}
        </div>
      </div>`;

      const confirmHtml = `<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto">
        ${HEADER('We received your property inquiry.')}
        <div style="background:#fff;padding:28px 32px;border:1px solid #e5e7eb;border-top:0;border-radius:0 0 10px 10px">
          <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 14px">Hi ${firstName},</p>
          <p style="font-size:15px;color:#374151;line-height:1.7;margin:0 0 14px">Thanks for submitting your building for evaluation. Our team will review it and follow up within one business day to let you know if it's a potential fit for the Skynode platform.</p>
          <div style="background:#0a1628;border-radius:8px;padding:16px 20px">
            <p style="margin:0;font-size:13px;color:#9ca3af">Questions? Reach us at</p>
            <a href="mailto:info@skynodepartners.com" style="color:#5BE49B;font-size:13px;font-weight:600">info@skynodepartners.com</a>
          </div>
          ${FOOTER_HTML}
        </div>
      </div>`;

      await Promise.all([
        resend.emails.send({
          from: FROM,
          to: 'nodes@skynodepartners.com',
          replyTo: b.poEmail,
          subject: `Property Inquiry — ${esc(b.poBuildingName || b.poName)}`,
          html: notifyHtml,
        }),
        resend.emails.send({
          from: FROM,
          to: b.poEmail,
          subject: 'We received your property inquiry',
          html: confirmHtml,
        }),
      ]);
    }

    res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error('contact API error:', err);
    res.status(500).json({ error: 'Failed to send. Please email info@skynodepartners.com directly.' });
  }
}
