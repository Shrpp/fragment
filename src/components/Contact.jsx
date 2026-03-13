import { useState } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/myknpwqb";

export default function Contact() {
  const [status, setStatus] = useState("idle");
  const [fields, setFields] = useState({ name: "", email: "", message: "" });

  const set = (k) => (e) => setFields((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(fields),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setFields({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  const inputCls = `
    w-full bg-surface2 border border-line
    font-mono text-[13px] text-text tracking-[0.04em]
    px-4 py-3 outline-none
    placeholder:text-dim
    focus:border-neon/50 focus:shadow-[0_0_0_1px_rgba(255,255,255,0.08)]
    transition-all duration-200
  `;

  return (
    <section
      id="contact"
      className="px-20 py-24 max-w-[1200px] mx-auto max-sm:px-4 max-sm:py-12"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-16">
        <span className="font-mono text-[11px] text-neon tracking-[0.1em] shrink-0 text-glow-sm">
          [04]
        </span>
        <span className="font-sans text-[11px] font-bold tracking-[0.22em] uppercase text-muted shrink-0">
          Let's Work Together
        </span>
        <div className="flex-1 h-px bg-line" />
      </div>

      <div className="grid grid-cols-[1fr_480px] gap-20 items-start max-lg:grid-cols-1 max-lg:gap-12">

        <div>
          <h2
            className="font-sans font-extrabold text-[clamp(32px,5vw,56px)] leading-[1.05]
                         tracking-[-0.03em] text-text mb-6"
          >
            Have a project
            <br />
            <span className="text-neon text-glow-lg">in mind?</span>
          </h2>
          <p className="font-mono text-[13px] leading-[1.9] text-muted max-w-[380px] mb-10">
            I'm open to freelance contracts, full-time remote roles, and
            interesting side projects. Drop a message and I'll get back to you
            within 24 hours.
          </p>

  
          <div className="flex flex-col gap-3">
            {[
              {
                label: "GitHub",
                value: "Shrpp",
                href: "https://github.com/Shrpp",
              },
              {
                label: "LinkedIn",
                value: "luismlc",
                href: "https://linkedin.com/in/luismlc/",
              },
              { label: "Email",   value: "me@shrpp.dev", href: "mailto:me@shrpp.dev" },
            ].map(({ label, value, href }) => (
              <div
                key={label}
                className="flex items-center gap-3 font-mono text-[11px] tracking-[0.08em]"
              >
                <span className="text-neon/40 w-20 shrink-0">{label}</span>
                {href ? (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted hover:text-text hover:text-glow-sm transition-all duration-200"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="text-muted">{value}</span>
                )}
              </div>
            ))}
          </div>
        </div>


        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] tracking-[0.18em] text-neon/40 uppercase">
                Name
              </label>
              <input
                type="text"
                required
                value={fields.name}
                onChange={set("name")}
                placeholder="Your name"
                className={inputCls}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] tracking-[0.18em] text-neon/40 uppercase">
                Email
              </label>
              <input
                type="email"
                required
                value={fields.email}
                onChange={set("email")}
                placeholder="you@email.com"
                className={inputCls}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-[9px] tracking-[0.18em] text-neon/40 uppercase">
              Message
            </label>
            <textarea
              required
              rows={6}
              value={fields.message}
              onChange={set("message")}
              placeholder="Tell me about the project..."
              className={inputCls + " resize-none"}
            />
          <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
          </div>


          <button
            type="submit"
            disabled={status === "sending" || status === "success"}
            className="
              relative mt-1 px-6 py-3.5 self-start
              font-mono text-[11px] tracking-[0.18em] uppercase
              border border-neon/30 text-neon
              hover:border-neon hover:bg-neon/5 hover:shadow-neon-border hover:text-glow-sm
              disabled:opacity-40 disabled:cursor-not-allowed
              transition-all duration-200 group overflow-hidden
            "
          >

            <div
              className="absolute left-0 inset-y-0 w-[2px] bg-neon opacity-0
                            group-hover:opacity-100 group-hover:shadow-neon-sm transition-all duration-200"
            />
            {status === "sending"
              ? "// Sending..."
              : status === "success"
                ? "// Message sent ✓"
                : "// Send message →"}
          </button>

          {status === "error" && (
            <p className="font-mono text-[10px] tracking-[0.08em] text-red-400/70 mt-1">
              // Transmission failed — try again or reach out directly.
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
