
(() => {
  const projects = [{"id": "bank-cctv", "name": "Enterprise Bank CCTV Infrastructure Upgrade", "category": "CCTV • Networking • Storage • Data Center", "summary": "Enterprise surveillance modernization design involving approximately 54 IP cameras, centralized video management, failover architecture and long-term storage planning.", "technologies": ["Digifort VMS", "Dahua IP Cameras", "Huawei Networking", "Huawei OceanStor", "Huawei Servers", "Core & Access Switching", "HA / Failover", "~180-day retention"], "role": ["Solution architecture", "Presales engineering", "BOQ preparation", "Camera and storage planning", "Network architecture", "Server planning", "Vendor coordination", "Technical documentation"], "challenge": "Build a resilient centralized surveillance architecture that balances camera count, video management, server failover and long-retention storage.", "solution": "Developed an end-to-end design covering camera, network, VMS, server and storage layers with high-availability and retention considerations.", "outcome": "Produced an enterprise solution-design and BOQ framework for a resilient centralized surveillance platform.", "status": "Solution Design"}, {"id": "warehouse-wifi", "name": "Large Warehouse Enterprise Wi-Fi Deployment", "category": "Enterprise Wi-Fi • Networking", "summary": "Designed and supported a high-density wireless solution for a large warehouse and office environment with challenging rack geometry and RF conditions.", "technologies": ["Huawei AirEngine", "iMaster NCE / CloudCampus", "FortiGate", "Enterprise VLANs", "High-Density Wi-Fi"], "role": ["Wireless planning", "AP model selection", "Network architecture", "VLAN planning", "Switch planning", "Firewall integration", "Deployment support", "Optimization and troubleshooting"], "challenge": "Deliver reliable wireless coverage in an approximately 90 m × 93 m × 13 m warehouse with racks reaching roughly 12 m.", "solution": "Planned AP placement and models across warehouse, office and outdoor areas, integrated switching/firewall/VLAN design and supported optimization.", "outcome": "Deployment planning evolved to approximately 49 APs with focus on coverage, capacity and operational reliability.", "status": "Design & Delivery"}, {"id": "ble-tracking", "name": "BLE Vehicle Workshop Tracking Solution", "category": "IoT • Automation • Tracking", "summary": "Designed a BLE-based vehicle movement tracking concept across an automotive workshop with operational and customer notification workflows.", "technologies": ["BLE", "Workflow Automation", "WhatsApp", "SMS", "Mobile App", "Email"], "role": ["Workflow design", "Tracking concept", "Notification architecture", "Operational mapping"], "challenge": "Make workshop vehicle status visible across multiple operational stages without relying on repeated manual checks.", "solution": "Mapped BLE-tracked movement across Reception → Inspection → Service Bay → Quality Control → Washing → Ready → Pickup.", "outcome": "Created a workflow concept linking physical movement to operational visibility and multi-channel notifications.", "status": "Concept Design"}, {"id": "network-migration", "name": "Enterprise Network Infrastructure Migration", "category": "Networking • Data Center", "summary": "Planned migration and replacement of more than 25 enterprise Huawei switches across core and access infrastructure.", "technologies": ["Huawei Switching", "Core / Access Architecture", "Migration Planning", "Data Center Racks"], "role": ["Existing infrastructure assessment", "Switch migration planning", "Core/access architecture", "BOQ preparation", "Presales engineering", "Vendor coordination", "Rack considerations", "Technical proposal"], "challenge": "Replace aging enterprise switching while protecting topology, rack, service and migration dependencies.", "solution": "Structured the migration around current-state assessment, core/access mapping, BOQ development and coordinated implementation planning.", "outcome": "Produced a migration-ready technical approach covering equipment, architecture and delivery considerations.", "status": "Migration Planning"}, {"id": "villa-fiber", "name": "Multi-Villa Fiber & Network Infrastructure", "category": "Fiber • Network Infrastructure", "summary": "Designed an infrastructure concept and BOQ for approximately 30 villas, around 100 network/service points, 30 network racks and a centralized core network.", "technologies": ["Fiber Backbone", "Core Network", "Structured Cabling", "Network Racks", "Pathway Planning"], "role": ["Network architecture", "Fiber planning", "Rack planning", "BOQ preparation", "Costing", "Implementation methodology"], "challenge": "The site had no existing fiber infrastructure or usable intermediate manholes.", "solution": "Developed a new pathway and fiber concept with centralized core architecture and distributed rack planning.", "outcome": "Created a practical infrastructure and costing framework for a greenfield multi-villa network.", "status": "Infrastructure Design"}, {"id": "anpr", "name": "ANPR Camera Deployment", "category": "CCTV • ANPR", "summary": "Delivered an ANPR implementation covering camera installation, network/IP configuration, loop integration, NVR integration and functional testing.", "technologies": ["ANPR Cameras", "IP Networking", "Vehicle Detection Loops", "NVR", "Push Events"], "role": ["Camera installation", "Network configuration", "IP configuration", "Loop integration", "NVR integration", "Push notification verification", "Testing", "Completion documentation"], "challenge": "Make the camera, network and vehicle-detection loops operate as one reliable event workflow.", "solution": "Integrated the camera, detection loops and recorder, validated event flow and completed testing/documentation.", "outcome": "Delivered a completed field implementation with verified detection and recording workflow.", "status": "Completed Deployment"}, {"id": "vlan", "name": "Enterprise VLAN & Firewall Architecture", "category": "Network Architecture", "summary": "Worked with segmented enterprise networks using FortiGate firewall infrastructure across administrative, guest, CCTV, voice, storage and service domains.", "technologies": ["FortiGate", "VLANs", "Inter-VLAN Policy", "LAN Segmentation", "Routing"], "role": ["Segmentation design", "VLAN planning", "Policy consideration", "Troubleshooting", "Infrastructure coordination"], "challenge": "Separate multiple departments and technology domains while keeping the environment manageable and secure.", "solution": "Used VLAN segmentation and controlled inter-VLAN access to isolate traffic, improve management and simplify troubleshooting.", "outcome": "Architecture supports security, traffic isolation, clearer troubleshooting and controlled communication between network zones.", "status": "Architecture"}, {"id": "aryvik", "name": "Aryvik – AI Voice Assistant & 3D Avatar", "category": "AI • Linux • Docker • 3D • Automation", "summary": "Personal AI assistant experiment combining browser voice interaction, neural text-to-speech and a real-time animated VRM avatar on self-hosted infrastructure.", "technologies": ["Raspberry Pi 5", "Linux", "Docker", "Python", "FastAPI / Uvicorn", "Three.js", "VRM", "Azure TTS", "WebSockets", "Blendshapes", "Web Speech API", "Tailscale"], "role": ["Architecture", "Linux hosting", "Docker deployment", "Frontend integration", "TTS pipeline", "WebSocket integration", "Avatar rendering", "Lip-sync troubleshooting"], "challenge": "Synchronize speech, browser interaction and 3D facial animation on lightweight self-hosted hardware.", "solution": "Built a Dockerized TTS/API service and a Three.js/VRM renderer connected by WebSockets and speech events.", "outcome": "Working prototype with voice input, neural speech output, avatar mouth movement, facial expressions and remote access.", "status": "Personal R&D"}, {"id": "n8n", "name": "n8n AI Automation Platform", "category": "Automation • Docker • AI", "summary": "Created and managed a self-hosted n8n automation environment on Raspberry Pi for bots, webhooks, API orchestration and AI workflow experiments.", "technologies": ["n8n", "Docker", "Docker Compose", "Raspberry Pi", "Linux", "Telegram", "Webhooks", "Tailscale", "AI Integrations"], "role": ["Self-hosting", "Container deployment", "Webhook configuration", "Telegram integration", "Remote access", "Troubleshooting"], "challenge": "Operate reliable automation workflows on a compact self-hosted platform with secure remote access.", "solution": "Containerized the automation platform and integrated Telegram, webhooks and Tailscale-based access.", "outcome": "Reusable personal automation platform supporting messaging, API and AI workflow experiments.", "status": "Active Lab"}, {"id": "homelab", "name": "Raspberry Pi Home Lab & Private Cloud", "category": "Home Lab • Linux • Docker", "summary": "Built a Raspberry Pi 5-based personal infrastructure lab for Linux, containers, storage, remote access, automation and AI experimentation.", "technologies": ["Raspberry Pi 5", "Debian Linux", "Docker", "Docker Compose", "SSD Storage", "NAS", "Tailscale", "Immich", "n8n", "Jitsi", "AI Services"], "role": ["System administration", "Storage design", "Container operations", "Remote access", "Monitoring", "Service troubleshooting"], "challenge": "Combine multiple storage devices and services into a small, maintainable always-on lab.", "solution": "Organized storage, Docker workloads, remote-access services and application stacks around a Linux-based home-lab platform.", "outcome": "A practical environment for infrastructure testing, self-hosting, automation and continuous learning.", "status": "Active Lab"}, {"id": "nfc", "name": "AI / NFC Embedded Technology Lab", "category": "Embedded Systems • IoT • R&D", "summary": "Experimental embedded development and NFC testing on an ESP32-S3 wearable platform, positioned as a learning and R&D environment rather than production deployment.", "technologies": ["ESP32-S3", "LILYGO T-Watch Ultra", "NFC", "C++", "Embedded Firmware", "Serial Debugging"], "role": ["Firmware experimentation", "Hardware testing", "Serial debugging", "NFC protocol learning"], "challenge": "Understand NFC behavior and embedded constraints on a compact wearable platform.", "solution": "Iterated firmware builds, debugged hardware communication and tested controlled lab workflows.", "outcome": "Hands-on embedded systems learning focused on debugging, protocol behavior and device integration.", "status": "R&D / Learning"}, {"id": "signage", "name": "Digital Display & Kiosk Infrastructure", "category": "AV • Digital Signage", "summary": "Experience supporting interactive kiosks, non-interactive kiosks, wall-mounted displays, digital signage infrastructure and related network/hardware coordination.", "technologies": ["Interactive Kiosks", "Digital Displays", "OptiSigns CMS", "Networking", "Supporting Hardware"], "role": ["Infrastructure support", "Documentation", "Spare planning", "Network coordination", "Technical delivery"], "challenge": "Coordinate display hardware, network connectivity and operational support across multiple display formats.", "solution": "Structured device, spare, connectivity and CMS considerations around deployment requirements.", "outcome": "Supported maintainable digital display and kiosk infrastructure with clear technical documentation.", "status": "Delivery Experience"}];
  const modal = document.getElementById('projectModal');
  const body = document.getElementById('projectModalBody');
  const close = document.getElementById('projectModalClose');

  function openProject(id) {
    const p = projects.find(x => x.id === id);
    if (!p || !modal || !body) return;
    body.innerHTML = `<div class="v17-modal-content">
      <span class="v17-kicker">${p.category}</span>
      <h2>${p.name}</h2>
      <p>${p.summary}</p>
      <div class="v17-tags">${p.technologies.map(t => `<span>${t}</span>`).join('')}</div>
      <div class="v17-modal-grid">
        <section class="v17-modal-block"><small>Challenge</small><p>${p.challenge}</p></section>
        <section class="v17-modal-block"><small>Solution</small><p>${p.solution}</p></section>
        <section class="v17-modal-block"><small>My Role</small><ul>${p.role.map(r => `<li>${r}</li>`).join('')}</ul></section>
        <section class="v17-modal-block"><small>Outcome</small><p>${p.outcome}</p></section>
      </div>
    </div>`;
    modal.showModal();
  }

  document.querySelectorAll('.v17-project-card').forEach(card => {
    card.addEventListener('click', () => openProject(card.dataset.project));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProject(card.dataset.project);
      }
    });
  });
  close?.addEventListener('click', () => modal.close());
  modal?.addEventListener('click', e => { if (e.target === modal) modal.close(); });

  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  const lbCap = document.getElementById('lightboxCaption');
  const lbClose = document.getElementById('lightboxClose');
  document.querySelectorAll('[data-lightbox]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!lb || !lbImg) return;
      lbImg.src = btn.dataset.lightbox;
      lbImg.alt = btn.dataset.caption || 'Portfolio media';
      if (lbCap) lbCap.textContent = btn.dataset.caption || '';
      lb.showModal();
    });
  });
  lbClose?.addEventListener('click', () => lb.close());
  lb?.addEventListener('click', e => { if (e.target === lb) lb.close(); });

  document.querySelectorAll('.v17-gallery-filters button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.v17-gallery-filters button').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.v17-gallery > button').forEach(item => {
        const cats = (item.dataset.cat || '').split(' ');
        item.classList.toggle('is-hidden', f !== 'all' && !cats.includes(f));
      });
    });
  });

  const counterTargets = document.querySelectorAll('[data-counter]');
  if ('IntersectionObserver' in window && counterTargets.length) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const end = Number(el.dataset.counter);
        const suffix = el.dataset.suffix || '';
        const start = performance.now();
        function tick(now) {
          const p = Math.min(1, (now - start) / 900);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(end * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, {threshold:.6});
    counterTargets.forEach(el => io.observe(el));
  }
})();
