let config = {
  instagramUrl: "https://www.instagram.com/assignmentwithmee/",
  whatsappNumber: "918103900543"
};

function waUrl(message = "Hi Assignment With Me! ✨ I want to discuss a project.") {
  return `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

async function loadConfig() {
  try {
    const res = await fetch("/api/config");
    if (res.ok) config = { ...config, ...(await res.json()) };
  } catch (_) {}

  ["instagramTop", "instagramWork", "instagramFooter"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = config.instagramUrl;
  });

  ["whatsappFooter", "whatsappFloat", "heroWhatsapp"].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.href = waUrl();
  });
}

document.querySelectorAll(".pricing-wa[data-package]").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const packageName = link.dataset.package;
    const message = [
      "Hi Assignment With Me! ✨",
      "",
      `I’m interested in the *${packageName}* package.`,
      "",
      "Approx. pages: ",
      "Subject / project: ",
      "Deadline: ",
      "",
      "Please share the details and final quote."
    ].join("\n");
    window.open(waUrl(message), "_blank", "noopener,noreferrer");
  });
});

document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    const select = document.querySelector('[name="service"]');
    if (select) select.value = link.dataset.service;
  });
});

const fileInput = document.querySelector('input[name="attachment"]');
const fileName = document.getElementById("fileName");
if (fileInput && fileName) {
  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    fileName.textContent = file
      ? `${file.name} selected. Send it in the WhatsApp chat after opening it.`
      : "Optional — attach a reference if helpful, or send it directly on WhatsApp.";
  });
}

const form = document.getElementById("orderForm");
const statusEl = document.getElementById("formStatus");

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());

  const fields = [
    ["Name", data.name],
    ["Their WhatsApp", data.phone],
    ["Email", data.email],
    ["For", data.audience],
    ["Service", data.service],
    ["Pages/Slides", data.quantity],
    ["Deadline", data.deadline],
    ["Budget", data.budget],
    ["Reference", data.reference]
  ].filter(([, value]) => value && String(value).trim());

  const lines = ["Hi Assignment With Me! ✨", "", "*Project Enquiry*"];
  fields.forEach(([label, value]) => lines.push(`${label}: ${value}`));
  if (data.details?.trim()) {
    lines.push("", "*Requirement:*", data.details.trim());
  }
  lines.push("", "I’d like to discuss the details and get a quote.");

  statusEl.innerHTML = `WhatsApp is opening with your message. <strong>You can add photos/files directly in the chat.</strong>`;
  window.open(waUrl(lines.join("\n")), "_blank", "noopener,noreferrer");
});

loadConfig();
