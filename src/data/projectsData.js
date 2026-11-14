export const projectsData = [
  {
    id: "01",
    title: "ResMeet",
    subtitle: "AI Meeting & Task Intelligence System",
    category: "AI / Machine Learning",
    description: "Sistem kecerdasan rapat untuk transkripsi otomatis, ringkasan instan, ekstraksi keputusan kunci, dan kategorisasi pembahasan mendalam berbasis LLM.",
    techStack: ["Next.js", "FastAPI", "PostgreSQL", "Faster-Whisper", "Groq", "Gemini"],
    year: "2024",
    status: "DEPLOYED // PROD",
    image: "/dafnal.webp",
    link: "https://github.com/Dafnalllll",
    github: "https://github.com/Dafnalllll",
    overview: {
      objectives: [
        "Automated speech-to-text transcription with high accuracy for multi-speaker meetings.",
        "Instant summarization and action-item extraction using advanced LLMs (Groq & Gemini).",
        "Seamless task management synchronization with PostgreSQL backend."
      ],
      problem: "Traditional meeting minutes are manually intensive, often missing crucial discussion points, action items, and structural decisions across long institutional sessions.",
      solution: "ResMeet deploys an automated pipeline combining Faster-Whisper for robust local transcription and LLM inference engines (Groq/Gemini) to distill raw transcripts into actionable executive summaries and task nodes."
    },
    architecture: {
      description: "Modular microservices architecture separating audio ingestion, asynchronous speech inference, LLM synthesis, and the React frontend.",
      components: [
        "Frontend: Next.js responsive dashboard with real-time WebSocket updates.",
        "Backend API: FastAPI asynchronous REST & WebSocket server.",
        "Speech Processing Engine: Faster-Whisper inference pipeline.",
        "AI / LLM Layer: Groq API & Google Gemini for structured JSON extraction.",
        "Database: PostgreSQL for persistent meeting logs and task tracking."
      ]
    },
    process: [
      { step: "01", title: "Audio Ingestion & Preprocessing", desc: "Recording capture and noise cancellation preprocessing before chunking." },
      { step: "02", title: "Speech-to-Text Transcription", desc: "Executing Faster-Whisper to generate time-stamped transcript segments." },
      { step: "03", title: "LLM Information Extraction", desc: "Prompt-engineered structured parsing for decisions, action items, and sentiment." },
      { step: "04", title: "Dashboard Synchronization", desc: "Real-time client synchronization and database persistence." }
    ],
    gallery: [
      { src: "/dafnal.webp", caption: "ResMeet Dashboard Overview // Active Meeting Session" },
      { src: "/dafnal.webp", caption: "Automated Action Item Extraction Module" }
    ],
    contributions: [
      "Designed and implemented the FastAPI backend ingestion pipeline and Faster-Whisper wrapper.",
      "Engineered prompt templates for precise JSON extraction of action items using Groq and Gemini.",
      "Built the responsive Next.js frontend with Tailwind CSS and retro-futuristic telemetry UI."
    ],
    evaluation: {
      metrics: [
        { label: "Transcription Word Error Rate (WER)", value: "< 4.2%" },
        { label: "Summary Generation Latency", value: "~1.8s" },
        { label: "API Uptime", value: "99.9%" }
      ],
      findings: "Successfully deployed in production environments, reducing post-meeting administrative documentation overhead by over 75%."
    },
    challenges: [
      "Handling overlapping speech segments and diverse acoustic environments during live meeting captures.",
      "Optimizing LLM token context windows for lengthy multi-hour discussions."
    ]
  },
  {
    id: "02",
    title: "BCCare",
    subtitle: "Skin Lesion Classification",
    category: "AI / Machine Learning",
    description: "Prototipe klasifikasi lesi kulit dengan deep learning, citra dermoskopi dan fluoresensi, serta integrasi edge computing untuk deteksi dini.",
    techStack: ["Python", "TensorFlow", "TFLite", "Raspberry Pi", "Flutter"],
    year: "2024",
    status: "RESEARCH // BETA",
    image: "/dafnal.webp",
    link: "https://github.com/Dafnalllll",
    github: "https://github.com/Dafnalllll",
    overview: {
      objectives: [
        "Develop an accurate deep learning classifier for dermatological lesions using dermoscopic images.",
        "Optimize models for edge deployment via TensorFlow Lite on Raspberry Pi hardware.",
        "Provide a cross-platform Flutter companion app for remote clinical screenings."
      ],
      problem: "Delayed early detection of malignant skin lesions due to limited access to dermatological specialists in remote or underserved healthcare regions.",
      solution: "BCCare bridges the diagnostic gap by running quantized convolutional neural network models locally on edge hardware, enabling instant preliminary risk stratification."
    },
    architecture: {
      description: "Edge-AI diagnostic pipeline combining dermoscopic image capture, localized TFLite inference, and secure Flutter mobile client communication.",
      components: [
        "Capture Hardware: Raspberry Pi with customized macro/fluorescence optics.",
        "AI Engine: TensorFlow CNN quantized to TensorFlow Lite (TFLite).",
        "Mobile App: Flutter cross-platform interface for clinicians and field operators."
      ]
    },
    process: [
      { step: "01", title: "Dataset Curation & Augmentation", desc: "Processing standardized dermoscopic image repositories with color normalization." },
      { step: "02", title: "Model Training & Quantization", desc: "Training robust CNN architectures and quantizing weights for low-latency edge execution." },
      { step: "03", title: "Hardware Integration", desc: "Deploying model runtimes onto Raspberry Pi edge hardware with camera modules." },
      { step: "04", title: "Mobile Client Pairing", desc: "Connecting Flutter frontend to edge inference node via secure local network API." }
    ],
    gallery: [
      { src: "/dafnal.webp", caption: "BCCare Edge Diagnostic Terminal Interface" },
      { src: "/dafnal.webp", caption: "Mobile Companion App Risk Stratification Screen" }
    ],
    contributions: [
      "Trained and evaluated custom convolutional neural networks for dermoscopic image classification.",
      "Performed model quantization and benchmarked inference performance on edge hardware.",
      "Developed the Flutter mobile application interface for real-time diagnostic reporting."
    ],
    evaluation: {
      metrics: [
        { label: "Validation Accuracy", value: "94.6%" },
        { label: "Inference Latency (Edge)", value: "320ms" },
        { label: "Model Size (TFLite)", value: "4.8 MB" }
      ],
      findings: "Demonstrated reliable classification performance on test benchmarks while maintaining sub-second inference speeds on constrained hardware."
    },
    challenges: [
      "Overcoming illumination variations and artifacts inherent in field dermoscopic captures.",
      "Balancing model accuracy with strict memory and processing constraints of edge devices."
    ]
  },
  {
    id: "03",
    title: "Firetech 2026",
    subtitle: "Technology Competition Platform",
    category: "Competition",
    description: "Platform kompetisi teknologi komprehensif untuk informasi lomba, pendaftaran peserta terintegrasi, dan sistem penilaian juri secara real-time.",
    techStack: ["React", "Tailwind CSS", "Node.js", "MySQL"],
    year: "2025",
    status: "ACTIVE // STABLE",
    image: "/dafnal.webp",
    link: "https://github.com/Dafnalllll",
    github: "https://github.com/Dafnalllll",
    overview: {
      objectives: [
        "Provide a seamless digital portal for technology competition registration and event management.",
        "Enable real-time collaborative scoring and evaluation for judges.",
        "Ensure robust data integrity and responsive user experience under high concurrent traffic."
      ],
      problem: "Fragmented event management workflows, manual spreadsheet tracking, and opaque judging processes during large-scale national technology competitions.",
      solution: "Firetech unifies event discovery, team registration, document submission, and automated jury tabulation into a single high-performance web platform."
    },
    architecture: {
      description: "Full-stack monolithic web application with secure REST endpoints and optimized database indexing.",
      components: [
        "Frontend: React SPA styled with Tailwind CSS and retro-futuristic themes.",
        "Backend: Node.js Express REST API with JWT authentication.",
        "Database: MySQL relational database structured for relational event tracking."
      ]
    },
    process: [
      { step: "01", title: "Requirements & Schema Design", desc: "Mapping user roles (Participant, Judge, Admin) and relational database schemas." },
      { step: "02", title: "Core Portal Development", desc: "Building responsive participant registration and submission workflows." },
      { step: "03", title: "Jury Scoring Dashboard", desc: "Implementing real-time scoring rubrics and automated leaderboard aggregation." },
      { step: "04", title: "Stress Testing & Launch", desc: "Conducting load tests and deploying to production server infrastructure." }
    ],
    gallery: [
      { src: "/dafnal.webp", caption: "Firetech Portal Landing & Competition Tracks" },
      { src: "/dafnal.webp", caption: "Real-time Judge Scoring & Leaderboard Dashboard" }
    ],
    contributions: [
      "Architected the full-stack user authentication and role-based access control system.",
      "Designed the responsive React frontend interface and streamlined submission forms.",
      "Optimized MySQL queries for instant leaderboard score calculation."
    ],
    evaluation: {
      metrics: [
        { label: "Registered Teams Handled", value: "500+" },
        { label: "Page Load Time (LCP)", value: "< 1.1s" },
        { label: "Scoring Discrepancy Rate", value: "0%" }
      ],
      findings: "Successfully supported multiple national technology competitions with zero downtime or scoring bottlenecks."
    },
    challenges: [
      "Managing concurrent file uploads and submissions during high-traffic registration deadlines.",
      "Ensuring strict fairness and immutability in real-time jury scoring calculations."
    ]
  },
  {
    id: "04",
    title: "Smart Goat Farm",
    subtitle: "IoT Environmental Monitoring",
    category: "IoT",
    description: "Konsep monitoring suhu, kelembapan, kadar amonia, dan kualitas lingkungan kandang ternak berbasis IoT dengan dashboard analitik.",
    techStack: ["ESP32", "IoT Sensors", "MQTT", "Dashboard"],
    year: "2024",
    status: "PROTOTYPE // HARDWARE",
    image: "/dafnal.webp",
    link: "https://github.com/Dafnalllll",
    github: "https://github.com/Dafnalllll",
    overview: {
      objectives: [
        "Monitor vital environmental parameters (temperature, humidity, ammonia gas) in livestock barns.",
        "Transmit telemetry data reliably using lightweight MQTT protocols over Wi-Fi.",
        "Provide an intuitive analytics dashboard for early anomaly alerts."
      ],
      problem: "Traditional livestock facility monitoring relies on manual spot-checks, often failing to detect noxious gas spikes or thermal stress before livestock health is impacted.",
      solution: "Smart Goat Farm deploys distributed ESP32 sensor nodes equipped with electrochemical gas and climate sensors to continuously stream environmental metrics to a centralized monitoring dashboard."
    },
    architecture: {
      description: "Distributed IoT telemetry architecture connecting sensor edge units to an MQTT broker and web dashboard.",
      components: [
        "Edge Nodes: ESP32 microcontrollers with DHT22 and MQ-135 sensors.",
        "Communication Protocol: MQTT lightweight publish-subscribe protocol.",
        "Backend / Broker: Mosquitto MQTT broker paired with Node.js storage worker.",
        "Dashboard: Web-based telemetry interface with historical charts."
      ]
    },
    process: [
      { step: "01", title: "Sensor Calibration & Circuitry", desc: "Wiring ESP32 with climate and gas sensors and testing analog signal stability." },
      { step: "02", title: "Firmware Development", desc: "Writing C++ firmware for reliable Wi-Fi reconnection and MQTT packet publishing." },
      { step: "03", title: "Broker & Database Pipeline", desc: "Setting up MQTT message routing and historical time-series logging." },
      { step: "04", title: "Dashboard Integration", desc: "Building real-time telemetry gauges and alert threshold indicators." }
    ],
    gallery: [
      { src: "/dafnal.webp", caption: "Smart Goat Farm Hardware Sensor Node" },
      { src: "/dafnal.webp", caption: "Real-time Telemetry Analytics Dashboard" }
    ],
    contributions: [
      "Programmed ESP32 firmware for sensor reading and robust MQTT telemetry transmission.",
      "Designed the physical prototype enclosure and sensor node circuitry.",
      "Developed the web dashboard interface for live environmental monitoring and alerts."
    ],
    evaluation: {
      metrics: [
        { label: "Sensor Reading Frequency", value: "Every 10s" },
        { label: "Packet Delivery Success", value: "99.4%" },
        { label: "Battery / Power Stability", value: "24/7 Active" }
      ],
      findings: "Successfully validated continuous long-term telemetry streaming and early ammonia threshold alerting in prototype barn trials."
    },
    challenges: [
      "Mitigating wireless interference and signal attenuation in metal-structured agricultural buildings.",
      "Ensuring long-term sensor calibration stability in humid and corrosive barn environments."
    ]
  }
];

export const categories = ["All", "AI / Machine Learning", "Competition", "IoT", "Web"];
