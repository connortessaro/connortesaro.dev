const revealNodes = [...document.querySelectorAll(".reveal")];

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const idx = revealNodes.indexOf(entry.target);
      entry.target.style.transitionDelay = `${Math.min(idx * 85, 340)}ms`;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.15 }
);

revealNodes.forEach((node) => observer.observe(node));

const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");
const runtimeConfig = window.TP_CONFIG || {};
const calendlyUrl =
  typeof runtimeConfig.calendlyUrl === "string" && runtimeConfig.calendlyUrl.trim()
    ? runtimeConfig.calendlyUrl.trim()
    : "https://calendly.com/connor-tessaropartners/15-min-meeting";

function resolveFormEndpoint(targetForm) {
  const formEndpoint = (targetForm?.dataset?.endpoint || "").trim();
  if (formEndpoint) return formEndpoint;
  if (typeof runtimeConfig.formEndpoint === "string" && runtimeConfig.formEndpoint.trim()) {
    return runtimeConfig.formEndpoint.trim();
  }
  return "";
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const payload = {
    name: String(data.get("name") || "").trim(),
    email: String(data.get("email") || "").trim(),
    team: String(data.get("team") || "").trim(),
    message: String(data.get("message") || "").trim(),
    source: "website",
    page_url: window.location.href,
    submitted_at: new Date().toISOString(),
  };

  if (!payload.name || !payload.email || !payload.team || !payload.message) {
    status.textContent = "Please complete all fields before submitting.";
    return;
  }

  const endpoint = resolveFormEndpoint(form);
  if (!endpoint) {
    status.innerHTML = `Form endpoint not configured yet. Please book directly on <a href="${calendlyUrl}" target="_blank" rel="noreferrer">Calendly</a>.`;
    return;
  }

  status.textContent = "Submitting...";
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok || body.ok !== true) {
      throw new Error(body.error || `HTTP ${response.status}`);
    }
    status.textContent = "Request captured. We will contact you shortly.";
    form.reset();
  } catch (err) {
    status.innerHTML = `Submit failed. Book directly on <a href="${calendlyUrl}" target="_blank" rel="noreferrer">Calendly</a>.`;
  }
});

const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}
