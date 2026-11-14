export const projectDetailsTranslations = {
  id: {
    "01": {
      overview: {
        problem: "Notula rapat masih dibuat secara manual, memakan waktu, dan sering melewatkan poin diskusi penting, daftar tindak lanjut, serta keputusan dalam rapat panjang.",
        solution: "ResMeet menggabungkan Faster-Whisper untuk transkripsi lokal dengan LLM Groq/Gemini untuk mengubah transkrip menjadi ringkasan eksekutif dan daftar tugas.",
        objectives: [
          "Mentranskripsikan rapat dengan akurat, termasuk percakapan banyak pembicara.",
          "Membuat ringkasan dan mengekstrak tindak lanjut menggunakan LLM Groq dan Gemini.",
          "Menyinkronkan tugas dengan lancar melalui basis data PostgreSQL.",
        ],
      },
      architecture: {
        description: "Arsitektur microservices modular yang memisahkan penerimaan audio, pemrosesan suara asinkron, sintesis LLM, dan frontend React.",
        components: [
          "Frontend: Dasbor Next.js responsif dengan pembaruan WebSocket real-time.",
          "API backend: Server REST dan WebSocket asinkron berbasis FastAPI.",
          "Pemrosesan suara: Pipeline inferensi Faster-Whisper.",
          "Lapisan AI/LLM: Groq API dan Google Gemini untuk ekstraksi JSON terstruktur.",
          "Basis data: PostgreSQL untuk log rapat dan pelacakan tugas.",
        ],
      },
      process: [
        { step: "01", title: "Penerimaan & Persiapan Audio", desc: "Merekam audio, mengurangi noise, lalu membaginya menjadi beberapa segmen." },
        { step: "02", title: "Transkripsi Suara", desc: "Menjalankan Faster-Whisper untuk menghasilkan transkrip dengan penanda waktu." },
        { step: "03", title: "Ekstraksi Informasi dengan LLM", desc: "Mengurai keputusan, tindak lanjut, dan sentimen menggunakan prompt terstruktur." },
        { step: "04", title: "Sinkronisasi Dasbor", desc: "Menyinkronkan data ke klien secara real-time dan menyimpannya ke basis data." },
      ],
      gallery: ["Ringkasan Dasbor ResMeet // Sesi Rapat Aktif", "Modul Ekstraksi Tindak Lanjut Otomatis"],
      contributions: [
        "Merancang dan membangun pipeline penerimaan FastAPI serta integrasi Faster-Whisper.",
        "Menyusun template prompt untuk mengekstrak tindak lanjut ke JSON menggunakan Groq dan Gemini.",
        "Membangun frontend Next.js responsif dengan Tailwind CSS dan antarmuka telemetri retro-futuristik.",
      ],
      challenges: [
        "Menangani percakapan yang saling tumpang tindih dan kondisi akustik yang beragam saat rapat berlangsung.",
        "Mengoptimalkan batas konteks token LLM untuk diskusi yang berlangsung berjam-jam.",
      ],
      evaluation: {
        metrics: ["Tingkat Kesalahan Kata Transkripsi (WER)", "Latensi Pembuatan Ringkasan", "Waktu Aktif API"],
        findings: "Berhasil diterapkan di lingkungan produksi dan mengurangi lebih dari 75% beban dokumentasi administratif setelah rapat.",
      },
    },
    "02": {
      overview: {
        problem: "Deteksi dini lesi kulit ganas sering terlambat karena akses ke dokter spesialis kulit terbatas di wilayah terpencil atau kurang terlayani.",
        solution: "BCCare menjalankan model jaringan saraf konvolusional terkuantisasi langsung pada perangkat edge untuk memberikan penilaian risiko awal dengan cepat.",
        objectives: [
          "Mengembangkan pengklasifikasi lesi kulit yang akurat dari citra dermoskopi.",
          "Mengoptimalkan model TensorFlow Lite agar dapat dijalankan pada perangkat Raspberry Pi.",
          "Menyediakan aplikasi Flutter lintas platform untuk pemeriksaan klinis jarak jauh.",
        ],
      },
      architecture: {
        description: "Pipeline diagnostik edge-AI yang menggabungkan pengambilan citra dermoskopi, inferensi TFLite lokal, dan komunikasi aman dengan aplikasi Flutter.",
        components: [
          "Perangkat pengambilan gambar: Raspberry Pi dengan optik makro/fluoresensi khusus.",
          "Mesin AI: CNN TensorFlow yang dikuantisasi ke TensorFlow Lite (TFLite).",
          "Aplikasi seluler: Antarmuka Flutter lintas platform untuk tenaga klinis dan operator lapangan.",
        ],
      },
      process: [
        { step: "01", title: "Kurasi & Augmentasi Data", desc: "Mengolah kumpulan citra dermoskopi standar dengan normalisasi warna." },
        { step: "02", title: "Pelatihan & Kuantisasi Model", desc: "Melatih CNN yang tangguh dan mengkuantisasi bobot agar inferensi edge lebih cepat." },
        { step: "03", title: "Integrasi Perangkat Keras", desc: "Memasang runtime model pada Raspberry Pi yang dilengkapi modul kamera." },
        { step: "04", title: "Pemasangan Klien Seluler", desc: "Menghubungkan aplikasi Flutter ke node inferensi edge melalui API jaringan lokal yang aman." },
      ],
      gallery: ["Antarmuka Terminal Diagnostik Edge BCCare", "Layar Penilaian Risiko pada Aplikasi Seluler"],
      contributions: [
        "Melatih dan mengevaluasi CNN khusus untuk klasifikasi citra dermoskopi.",
        "Melakukan kuantisasi model dan mengukur performa inferensi pada perangkat edge.",
        "Mengembangkan antarmuka aplikasi Flutter untuk pelaporan diagnostik real-time.",
      ],
      challenges: [
        "Mengatasi variasi pencahayaan dan artefak pada pengambilan citra dermoskopi di lapangan.",
        "Menyeimbangkan akurasi model dengan keterbatasan memori dan pemrosesan perangkat edge.",
      ],
      evaluation: {
        metrics: ["Akurasi Validasi", "Latensi Inferensi (Edge)", "Ukuran Model (TFLite)"],
        findings: "Pengujian menunjukkan klasifikasi yang andal dengan waktu inferensi di bawah satu detik pada perangkat dengan sumber daya terbatas.",
      },
    },
    "03": {
      overview: {
        problem: "Alur pengelolaan acara yang terpisah-pisah, pencatatan manual di spreadsheet, dan proses penjurian yang kurang transparan menyulitkan kompetisi teknologi berskala besar.",
        solution: "Firetech menyatukan informasi acara, pendaftaran tim, pengumpulan dokumen, dan rekapitulasi penilaian juri dalam satu platform web berkinerja tinggi.",
        objectives: [
          "Menyediakan portal digital terpadu untuk pendaftaran dan pengelolaan kompetisi teknologi.",
          "Mendukung penilaian kolaboratif juri secara real-time.",
          "Menjaga integritas data dan pengalaman responsif saat trafik pengguna tinggi.",
        ],
      },
      architecture: {
        description: "Aplikasi web full-stack dengan endpoint REST yang aman dan indeks basis data yang dioptimalkan.",
        components: [
          "Frontend: React SPA dengan Tailwind CSS dan tema retro-futuristik.",
          "Backend: REST API Node.js Express dengan autentikasi JWT.",
          "Basis data: MySQL relasional untuk mengelola data acara.",
        ],
      },
      process: [
        { step: "01", title: "Kebutuhan & Desain Skema", desc: "Memetakan peran peserta, juri, dan admin beserta skema basis data relasional." },
        { step: "02", title: "Pengembangan Portal", desc: "Membangun alur pendaftaran peserta dan pengumpulan berkas yang responsif." },
        { step: "03", title: "Dasbor Penilaian Juri", desc: "Menerapkan rubrik penilaian real-time dan rekapitulasi papan peringkat otomatis." },
        { step: "04", title: "Uji Beban & Peluncuran", desc: "Melakukan uji beban dan menerapkan aplikasi ke infrastruktur server produksi." },
      ],
      gallery: ["Halaman Utama Portal Firetech & Kategori Kompetisi", "Dasbor Penilaian Juri dan Papan Peringkat Real-Time"],
      contributions: [
        "Merancang autentikasi full-stack dan kontrol akses berbasis peran.",
        "Mendesain frontend React responsif dan menyederhanakan formulir pengumpulan.",
        "Mengoptimalkan kueri MySQL untuk menghitung papan peringkat secara instan.",
      ],
      challenges: [
        "Mengelola unggahan berkas dan pendaftaran bersamaan saat trafik tinggi menjelang tenggat.",
        "Menjamin penilaian juri real-time yang adil dan tidak dapat diubah.",
      ],
      evaluation: {
        metrics: ["Jumlah Tim Terdaftar", "Waktu Muat Halaman (LCP)", "Tingkat Selisih Penilaian"],
        findings: "Mendukung beberapa kompetisi teknologi nasional tanpa downtime maupun hambatan dalam proses penilaian.",
      },
    },
    "04": {
      overview: {
        problem: "Pemeriksaan kandang secara manual dapat melewatkan lonjakan gas berbahaya atau stres panas sebelum berdampak pada kesehatan ternak.",
        solution: "Smart Goat Farm menggunakan node sensor ESP32 untuk mengirim data lingkungan secara terus-menerus ke dasbor pemantauan terpusat.",
        objectives: [
          "Memantau suhu, kelembapan, dan gas amonia di dalam kandang.",
          "Mengirim data telemetri secara andal melalui MQTT dan Wi-Fi.",
          "Menyediakan dasbor analitik dengan peringatan dini untuk anomali.",
        ],
      },
      architecture: {
        description: "Arsitektur telemetri IoT terdistribusi yang menghubungkan sensor edge ke broker MQTT dan dasbor web.",
        components: [
          "Node edge: Mikrokontroler ESP32 dengan sensor DHT22 dan MQ-135.",
          "Protokol komunikasi: MQTT dengan pola publish-subscribe yang ringan.",
          "Backend/broker: Mosquitto MQTT dipadukan dengan worker penyimpanan Node.js.",
          "Dasbor: Antarmuka telemetri web dengan grafik historis.",
        ],
      },
      process: [
        { step: "01", title: "Kalibrasi Sensor & Rangkaian", desc: "Menghubungkan ESP32 ke sensor iklim dan gas serta menguji kestabilan sinyal analog." },
        { step: "02", title: "Pengembangan Firmware", desc: "Menulis firmware C++ untuk koneksi ulang Wi-Fi dan pengiriman paket MQTT yang andal." },
        { step: "03", title: "Pipeline Broker & Basis Data", desc: "Mengatur perutean pesan MQTT dan pencatatan data deret waktu." },
        { step: "04", title: "Integrasi Dasbor", desc: "Membangun indikator telemetri real-time dan ambang batas peringatan." },
      ],
      gallery: ["Node Sensor Perangkat Keras Smart Goat Farm", "Dasbor Analitik Telemetri Real-Time"],
      contributions: [
        "Memprogram firmware ESP32 untuk membaca sensor dan mengirim telemetri melalui MQTT.",
        "Mendesain casing prototipe dan rangkaian node sensor.",
        "Mengembangkan dasbor web untuk pemantauan lingkungan dan peringatan langsung.",
      ],
      challenges: [
        "Mengurangi interferensi nirkabel dan pelemahan sinyal di bangunan pertanian berstruktur logam.",
        "Menjaga kestabilan kalibrasi sensor dalam lingkungan kandang yang lembap dan korosif.",
      ],
      evaluation: {
        metrics: ["Frekuensi Pembacaan Sensor", "Keberhasilan Pengiriman Paket", "Stabilitas Daya"],
        findings: "Uji coba prototipe memvalidasi streaming telemetri jangka panjang dan peringatan dini saat ambang amonia terlampaui.",
      },
    },
  },
  en: {},
  nl: {
    "01": {
      overview: {
        problem: "Notulen worden vaak handmatig gemaakt, kosten veel tijd en missen belangrijke gesprekspunten, actiepunten en besluiten uit lange vergaderingen.",
        solution: "ResMeet combineert Faster-Whisper voor lokale transcriptie met Groq/Gemini-LLM's om transcripties om te zetten in samenvattingen en taken.",
        objectives: [
          "Vergaderingen nauwkeurig transcriberen, ook met meerdere sprekers.",
          "Samenvattingen en actiepunten maken met Groq- en Gemini-LLM's.",
          "Taken naadloos synchroniseren met PostgreSQL.",
        ],
      },
      architecture: {
        description: "Een modulaire microservicesarchitectuur scheidt audio-invoer, asynchrone spraakverwerking, LLM-synthese en de React-frontend.",
        components: [
          "Frontend: Responsief Next.js-dashboard met realtime WebSocket-updates.",
          "Backend-API: Asynchrone REST- en WebSocket-server met FastAPI.",
          "Spraakverwerking: Faster-Whisper-inferentiepipeline.",
          "AI/LLM-laag: Groq API en Google Gemini voor gestructureerde JSON-extractie.",
          "Database: PostgreSQL voor vergaderlogboeken en taakbeheer.",
        ],
      },
      process: [
        { step: "01", title: "Audio invoeren en voorbereiden", desc: "Opnamen vastleggen, ruis onderdrukken en audio in segmenten verdelen." },
        { step: "02", title: "Spraak transcriberen", desc: "Faster-Whisper uitvoeren om transcriptsegmenten met tijdstempels te maken." },
        { step: "03", title: "Informatie extraheren met LLM", desc: "Besluiten, actiepunten en sentiment structureren met prompts." },
        { step: "04", title: "Dashboard synchroniseren", desc: "Gegevens realtime synchroniseren met clients en opslaan in de database." },
      ],
      gallery: ["ResMeet-dashboard // Actieve vergadering", "Module voor automatische actiepunt-extractie"],
      contributions: [
        "De FastAPI-invoerpipeline en Faster-Whisper-integratie ontworpen en gebouwd.",
        "Promptsjablonen gemaakt voor nauwkeurige JSON-extractie met Groq en Gemini.",
        "De responsieve Next.js-frontend gebouwd met Tailwind CSS en retro-futuristische telemetrie.",
      ],
      challenges: [
        "Overlappende spraak en uiteenlopende akoestische omstandigheden tijdens vergaderingen verwerken.",
        "LLM-tokencontext optimaliseren voor gesprekken die meerdere uren duren.",
      ],
      evaluation: {
        metrics: ["Woordfoutpercentage transcriptie (WER)", "Latentie samenvatting", "API-beschikbaarheid"],
        findings: "Succesvol in productie ingezet; de administratieve documentatielast na vergaderingen daalde met meer dan 75%.",
      },
    },
    "02": {
      overview: {
        problem: "Vroege detectie van kwaadaardige huidlaesies loopt vertraging op door beperkte toegang tot dermatologen in afgelegen of onderbediende regio's.",
        solution: "BCCare voert gekwantiseerde convolutionele neurale netwerken lokaal op edge-hardware uit voor een snelle eerste risicobeoordeling.",
        objectives: [
          "Een nauwkeurige classifier voor huidlaesies ontwikkelen met dermoscopische beelden.",
          "Modellen optimaliseren voor TensorFlow Lite op Raspberry Pi.",
          "Een Flutter-app voor klinische screening op afstand aanbieden.",
        ],
      },
      architecture: {
        description: "Een edge-AI-diagnosepipeline combineert dermoscopische beeldopname, lokale TFLite-inferentie en veilige Flutter-communicatie.",
        components: [
          "Opnamehardware: Raspberry Pi met aangepaste macro-/fluorescentieoptiek.",
          "AI-engine: TensorFlow-CNN gekwantiseerd naar TensorFlow Lite (TFLite).",
          "Mobiele app: Cross-platform Flutter-interface voor zorgverleners en veldteams.",
        ],
      },
      process: [
        { step: "01", title: "Dataset samenstellen", desc: "Gestandaardiseerde dermoscopische beelden verwerken en kleuren normaliseren." },
        { step: "02", title: "Model trainen en kwantiseren", desc: "CNN-modellen trainen en gewichten kwantiseren voor snellere edge-inferentie." },
        { step: "03", title: "Hardware integreren", desc: "Modelruntime op Raspberry Pi-hardware met cameramodules installeren." },
        { step: "04", title: "Mobiele client koppelen", desc: "Flutter verbinden met de edge-node via een beveiligde lokale API." },
      ],
      gallery: ["BCCare edge-diagnoseterminal", "Risicobeoordeling in de mobiele app"],
      contributions: [
        "CNN-modellen voor classificatie van dermoscopische beelden getraind en geëvalueerd.",
        "Modellen gekwantiseerd en inferentieprestaties op edge-hardware getest.",
        "De Flutter-appinterface voor realtime diagnostische rapportage ontwikkeld.",
      ],
      challenges: [
        "Variaties in belichting en artefacten in dermoscopische beelden uit de praktijk aanpakken.",
        "Modelnauwkeurigheid afwegen tegen de beperkte bronnen van edge-apparaten.",
      ],
      evaluation: {
        metrics: ["Validatienauwkeurigheid", "Inferentielatentie (edge)", "Modelgrootte (TFLite)"],
        findings: "De tests toonden betrouwbare classificatie met inferentietijden onder één seconde op hardware met beperkte bronnen.",
      },
    },
    "03": {
      overview: {
        problem: "Versnipperde evenementprocessen, handmatige spreadsheets en ondoorzichtige jurybeoordelingen bemoeilijken grote technologiecompetities.",
        solution: "Firetech brengt evenementinformatie, teamregistratie, documentinzending en automatische juryresultaten samen in één snel webplatform.",
        objectives: [
          "Een digitaal portaal bieden voor registratie en beheer van technologiecompetities.",
          "Juryleden realtime gezamenlijk laten beoordelen.",
          "Gegevensintegriteit en een responsieve ervaring bij veel verkeer waarborgen.",
        ],
      },
      architecture: {
        description: "Een full-stack webapplicatie met beveiligde REST-endpoints en geoptimaliseerde database-indexering.",
        components: [
          "Frontend: React-SPA met Tailwind CSS en retro-futuristische thema's.",
          "Backend: Node.js Express REST-API met JWT-authenticatie.",
          "Database: Relationele MySQL-database voor evenementbeheer.",
        ],
      },
      process: [
        { step: "01", title: "Vereisten en schema", desc: "Gebruikersrollen en relationele databaseschema's vastleggen." },
        { step: "02", title: "Portaal ontwikkelen", desc: "Responsieve registratie- en inzendingsprocessen bouwen." },
        { step: "03", title: "Jurydashboard", desc: "Realtime beoordelingsrubrieken en automatische ranglijsten implementeren." },
        { step: "04", title: "Belastingstest en lancering", desc: "Belastingstests uitvoeren en naar productie implementeren." },
      ],
      gallery: ["Firetech-portaal en competitieonderdelen", "Realtime jurybeoordeling en ranglijst"],
      contributions: [
        "Full-stack authenticatie en rolgebaseerde toegangscontrole ontworpen.",
        "De responsieve React-interface en inzendingsformulieren ontworpen.",
        "MySQL-query's voor directe ranglijstberekeningen geoptimaliseerd.",
      ],
      challenges: [
        "Gelijktijdige uploads en inzendingen tijdens drukke deadlines beheren.",
        "Eerlijke, onveranderlijke realtime jurybeoordelingen waarborgen.",
      ],
      evaluation: {
        metrics: ["Verwerkte teams", "Laadtijd pagina (LCP)", "Verschil in scores"],
        findings: "Meerdere nationale technologiecompetities ondersteund zonder uitval of knelpunten bij de beoordeling.",
      },
    },
    "04": {
      overview: {
        problem: "Handmatige stalcontroles kunnen gevaarlijke gaspieken of hittestress missen voordat de gezondheid van het vee wordt aangetast.",
        solution: "Smart Goat Farm gebruikt ESP32-sensornodes om omgevingsgegevens continu naar een centraal dashboard te sturen.",
        objectives: [
          "Temperatuur, luchtvochtigheid en ammoniak in stallen bewaken.",
          "Telemetrie betrouwbaar via MQTT en wifi verzenden.",
          "Een analysedashboard met vroege waarschuwingen voor afwijkingen bieden.",
        ],
      },
      architecture: {
        description: "Een gedistribueerde IoT-telemetriearchitectuur verbindt edge-sensoren met een MQTT-broker en webdashboard.",
        components: [
          "Edge-nodes: ESP32-microcontrollers met DHT22- en MQ-135-sensoren.",
          "Communicatie: Lichtgewicht MQTT publish-subscribe-protocol.",
          "Backend/broker: Mosquitto MQTT met een Node.js-opslagworker.",
          "Dashboard: Webinterface voor telemetrie met historische grafieken.",
        ],
      },
      process: [
        { step: "01", title: "Sensoren kalibreren", desc: "ESP32 aansluiten op klimaatsensoren en analoge signaalstabiliteit testen." },
        { step: "02", title: "Firmware ontwikkelen", desc: "C++-firmware schrijven voor wifi-herverbinding en betrouwbare MQTT-publicatie." },
        { step: "03", title: "Broker- en datapipeline", desc: "MQTT-routering en historische tijdreeksregistratie instellen." },
        { step: "04", title: "Dashboard integreren", desc: "Realtime telemetriemeters en waarschuwingsdrempels bouwen." },
      ],
      gallery: ["Smart Goat Farm-hardwaresensornode", "Realtime telemetrie-analysedashboard"],
      contributions: [
        "ESP32-firmware geprogrammeerd voor sensormetingen en MQTT-telemetrie.",
        "De prototypebehuizing en sensornode-elektronica ontworpen.",
        "Een webdashboard voor live omgevingsbewaking en waarschuwingen ontwikkeld.",
      ],
      challenges: [
        "Draadloze interferentie en signaalverlies in metalen agrarische gebouwen beperken.",
        "Sensoren stabiel gekalibreerd houden in vochtige en corrosieve stallen.",
      ],
      evaluation: {
        metrics: ["Meetfrequentie sensor", "Succesvolle pakketbezorging", "Stroomstabiliteit"],
        findings: "Prototypetests bevestigden langdurige telemetrie en vroege ammoniakwaarschuwingen in een stalomgeving.",
      },
    },
  },
  ja: {
    "01": {
      overview: {
        problem: "議事録の作成は手作業で時間がかかり、長時間の会議では重要な議論、タスク、決定事項を見落としがちです。",
        solution: "ResMeetはFaster-Whisperによるローカル文字起こしとGroq/GeminiのLLMを組み合わせ、議事録を要約とタスクに変換します。",
        objectives: [
          "複数人が参加する会議を高精度で文字起こしする。",
          "GroqとGeminiを使って要約とアクション項目を抽出する。",
          "PostgreSQLとタスク管理をシームレスに同期する。",
        ],
      },
      architecture: {
        description: "音声取り込み、非同期音声推論、LLM処理、Reactフロントエンドを分離したモジュール型マイクロサービス構成です。",
        components: [
          "フロントエンド：リアルタイムWebSocket更新に対応するNext.jsダッシュボード。",
          "バックエンドAPI：FastAPIによる非同期REST・WebSocketサーバー。",
          "音声処理：Faster-Whisper推論パイプライン。",
          "AI/LLM層：構造化JSON抽出のためのGroq APIとGoogle Gemini。",
          "データベース：会議ログとタスク管理用のPostgreSQL。",
        ],
      },
      process: [
        { step: "01", title: "音声の取り込みと前処理", desc: "録音を取り込み、ノイズを除去して音声を分割します。" },
        { step: "02", title: "音声文字起こし", desc: "Faster-Whisperでタイムスタンプ付きの文字起こしを生成します。" },
        { step: "03", title: "LLMによる情報抽出", desc: "プロンプトを使って決定事項、タスク、感情を構造化します。" },
        { step: "04", title: "ダッシュボード同期", desc: "クライアントとリアルタイム同期し、データベースに保存します。" },
      ],
      gallery: ["ResMeetダッシュボード // 会議中の画面", "アクション項目の自動抽出モジュール"],
      contributions: [
        "FastAPIの取り込みパイプラインとFaster-Whisper連携を設計・実装しました。",
        "GroqとGeminiでアクション項目をJSON抽出するプロンプトを作成しました。",
        "Tailwind CSSとレトロフューチャーなUIを用いてNext.jsの画面を構築しました。",
      ],
      challenges: [
        "会議中に重なる発話や多様な音響環境に対応すること。",
        "長時間の議論に合わせてLLMのトークンコンテキストを最適化すること。",
      ],
      evaluation: {
        metrics: ["文字起こし単語誤り率 (WER)", "要約生成の遅延", "API稼働率"],
        findings: "本番環境への導入に成功し、会議後の事務的な文書作成作業を75%以上削減しました。",
      },
    },
    "02": {
      overview: {
        problem: "遠隔地や医療支援が限られた地域では皮膚科専門医へのアクセスが難しく、悪性病変の早期発見が遅れています。",
        solution: "BCCareは量子化した畳み込みニューラルネットワークをエッジ端末上で実行し、初期リスクをすばやく判定します。",
        objectives: [
          "ダーモスコピー画像を使った高精度な皮膚病変分類モデルを開発する。",
          "Raspberry Pi上で動作するTensorFlow Liteモデルに最適化する。",
          "遠隔スクリーニング用のFlutterアプリを提供する。",
        ],
      },
      architecture: {
        description: "ダーモスコピー画像の取得、ローカルTFLite推論、安全なFlutter通信を組み合わせたエッジAI診断パイプラインです。",
        components: [
          "撮影機器：専用マクロ・蛍光光学系を備えたRaspberry Pi。",
          "AIエンジン：TensorFlow CNNをTensorFlow Lite (TFLite) に量子化。",
          "モバイルアプリ：医療従事者や現場スタッフ向けのFlutterアプリ。",
        ],
      },
      process: [
        { step: "01", title: "データセットの整備", desc: "標準化された皮膚鏡画像を処理し、色を正規化します。" },
        { step: "02", title: "モデル学習と量子化", desc: "CNNを学習し、エッジ推論を高速化するため重みを量子化します。" },
        { step: "03", title: "ハードウェア連携", desc: "カメラ付きRaspberry Piにモデルランタイムを導入します。" },
        { step: "04", title: "モバイル接続", desc: "安全なローカルAPI経由でFlutterアプリをエッジ端末に接続します。" },
      ],
      gallery: ["BCCareエッジ診断端末の画面", "モバイルアプリのリスク判定画面"],
      contributions: [
        "皮膚鏡画像分類用のCNNを学習・評価しました。",
        "モデルを量子化し、エッジ端末で推論性能を測定しました。",
        "リアルタイム診断レポート用のFlutterアプリを開発しました。",
      ],
      challenges: [
        "現場で撮影した画像の照明差やノイズに対応すること。",
        "エッジ端末のメモリ・処理制限とモデル精度を両立すること。",
      ],
      evaluation: {
        metrics: ["検証精度", "エッジ推論時間", "モデルサイズ (TFLite)"],
        findings: "性能が限られた端末でも、1秒未満の推論時間で安定した分類性能を確認しました。",
      },
    },
    "03": {
      overview: {
        problem: "分散したイベント運営、手作業の表計算管理、不透明な審査プロセスが大規模な技術コンテストを難しくしています。",
        solution: "Firetechは大会情報、チーム登録、書類提出、審査集計を1つの高性能なWebプラットフォームに統合します。",
        objectives: [
          "技術コンテストの登録と運営を行う統合ポータルを提供する。",
          "審査員によるリアルタイムの共同採点を可能にする。",
          "高負荷時もデータの整合性と快適な操作性を保つ。",
        ],
      },
      architecture: {
        description: "安全なRESTエンドポイントと最適化されたデータベースインデックスを備えたフルスタックWebアプリです。",
        components: [
          "フロントエンド：Tailwind CSSとレトロフューチャーなテーマを使ったReact SPA。",
          "バックエンド：JWT認証を備えたNode.js Express REST API。",
          "データベース：大会情報管理用のリレーショナルMySQL。",
        ],
      },
      process: [
        { step: "01", title: "要件とスキーマ設計", desc: "参加者、審査員、管理者の役割とデータベース構造を整理します。" },
        { step: "02", title: "ポータル開発", desc: "参加登録と提出のためのレスポンシブなフローを構築します。" },
        { step: "03", title: "審査ダッシュボード", desc: "リアルタイム採点と自動ランキングを実装します。" },
        { step: "04", title: "負荷テストと公開", desc: "負荷テストを実施し、本番サーバーにデプロイします。" },
      ],
      gallery: ["Firetechポータルと大会カテゴリ", "リアルタイム審査・ランキング画面"],
      contributions: [
        "フルスタック認証とロールベースのアクセス制御を設計しました。",
        "レスポンシブなReact画面と提出フォームを設計しました。",
        "ランキングを即時計算するためにMySQLクエリを最適化しました。",
      ],
      challenges: [
        "締め切り直前の高トラフィック時に同時アップロードを管理すること。",
        "リアルタイム採点の公平性と改ざん防止を確保すること。",
      ],
      evaluation: {
        metrics: ["対応登録チーム数", "ページ読み込み時間 (LCP)", "採点差異率"],
        findings: "複数の全国規模の技術コンテストを、停止や採点のボトルネックなしで運営しました。",
      },
    },
    "04": {
      overview: {
        problem: "手作業の畜舎点検では、有害ガスの急増や熱ストレスを家畜の健康に影響する前に発見できないことがあります。",
        solution: "Smart Goat FarmはESP32センサーノードを使い、環境データを中央監視ダッシュボードへ継続送信します。",
        objectives: [
          "畜舎の温度、湿度、アンモニア濃度を監視する。",
          "MQTTとWi-Fiでテレメトリを安定して送信する。",
          "異常を早期に知らせる分析ダッシュボードを提供する。",
        ],
      },
      architecture: {
        description: "エッジセンサーをMQTTブローカーとWebダッシュボードに接続する分散型IoTテレメトリ構成です。",
        components: [
          "エッジノード：DHT22とMQ-135を備えたESP32。",
          "通信：軽量なpublish-subscribe方式のMQTT。",
          "バックエンド/ブローカー：Node.js保存ワーカーとMosquitto MQTT。",
          "ダッシュボード：履歴グラフを備えたWebテレメトリ画面。",
        ],
      },
      process: [
        { step: "01", title: "センサー調整と回路", desc: "ESP32に環境センサーを接続し、アナログ信号の安定性を確認します。" },
        { step: "02", title: "ファームウェア開発", desc: "Wi-Fi再接続とMQTT送信に対応するC++ファームウェアを作成します。" },
        { step: "03", title: "ブローカーとデータ処理", desc: "MQTTメッセージのルーティングと時系列データの保存を設定します。" },
        { step: "04", title: "ダッシュボード連携", desc: "リアルタイム表示と警告しきい値を構築します。" },
      ],
      gallery: ["Smart Goat Farmのセンサーノード", "リアルタイムテレメトリ分析ダッシュボード"],
      contributions: [
        "センサー計測とMQTT送信を行うESP32ファームウェアを開発しました。",
        "プロトタイプ筐体とセンサーノード回路を設計しました。",
        "環境監視とアラート用のWebダッシュボードを開発しました。",
      ],
      challenges: [
        "金属構造の農業施設で無線干渉や信号減衰を抑えること。",
        "高湿度で腐食性のある環境でもセンサー校正を維持すること。",
      ],
      evaluation: {
        metrics: ["センサー測定間隔", "パケット配信成功率", "電源の安定性"],
        findings: "試作畜舎で、長期テレメトリとアンモニア濃度の早期警告を検証しました。",
      },
    },
  },
  de: {
    "01": {
      overview: {
        problem: "Protokolle werden oft manuell erstellt, kosten viel Zeit und lassen wichtige Diskussionspunkte, Aufgaben und Entscheidungen aus langen Sitzungen aus.",
        solution: "ResMeet kombiniert Faster-Whisper für lokale Transkription mit Groq-/Gemini-LLMs, um Transkripte in Zusammenfassungen und Aufgaben umzuwandeln.",
        objectives: [
          "Meetings auch mit mehreren Sprechern präzise transkribieren.",
          "Mit Groq und Gemini Zusammenfassungen und Aufgaben extrahieren.",
          "Aufgaben nahtlos mit PostgreSQL synchronisieren.",
        ],
      },
      architecture: {
        description: "Eine modulare Microservices-Architektur trennt Audioaufnahme, asynchrone Spracherkennung, LLM-Verarbeitung und React-Frontend.",
        components: [
          "Frontend: Responsives Next.js-Dashboard mit Echtzeit-WebSocket-Updates.",
          "Backend-API: Asynchroner REST- und WebSocket-Server mit FastAPI.",
          "Sprachverarbeitung: Faster-Whisper-Inferenzpipeline.",
          "KI-/LLM-Schicht: Groq API und Google Gemini für strukturierte JSON-Extraktion.",
          "Datenbank: PostgreSQL für Meetingprotokolle und Aufgabenverwaltung.",
        ],
      },
      process: [
        { step: "01", title: "Audioaufnahme und Vorverarbeitung", desc: "Aufnahmen erfassen, Rauschen reduzieren und Audio in Abschnitte teilen." },
        { step: "02", title: "Spracherkennung", desc: "Faster-Whisper erstellt Transkriptabschnitte mit Zeitstempeln." },
        { step: "03", title: "Informationsextraktion mit LLM", desc: "Entscheidungen, Aufgaben und Stimmung mithilfe strukturierter Prompts erfassen." },
        { step: "04", title: "Dashboard-Synchronisierung", desc: "Daten in Echtzeit mit Clients synchronisieren und in der Datenbank speichern." },
      ],
      gallery: ["ResMeet-Dashboard // Aktive Besprechung", "Modul zur automatischen Aufgabenerkennung"],
      contributions: [
        "Die FastAPI-Aufnahmepipeline und Faster-Whisper-Integration entworfen und umgesetzt.",
        "Prompt-Vorlagen zur präzisen JSON-Extraktion mit Groq und Gemini entwickelt.",
        "Das responsive Next.js-Frontend mit Tailwind CSS und retro-futuristischer Telemetrie gestaltet.",
      ],
      challenges: [
        "Überlappende Sprache und unterschiedliche akustische Bedingungen bei Live-Meetings behandeln.",
        "LLM-Tokenkontexte für mehrstündige Diskussionen optimieren.",
      ],
      evaluation: {
        metrics: ["Wortfehlerrate der Transkription (WER)", "Latenz der Zusammenfassung", "API-Verfügbarkeit"],
        findings: "Erfolgreich produktiv eingesetzt und den administrativen Dokumentationsaufwand nach Meetings um über 75 % reduziert.",
      },
    },
    "02": {
      overview: {
        problem: "Die Früherkennung bösartiger Hautläsionen verzögert sich, wenn in abgelegenen oder unterversorgten Regionen Dermatologen fehlen.",
        solution: "BCCare führt quantisierte neuronale Faltungsnetze lokal auf Edge-Hardware aus und ermöglicht so eine schnelle erste Risikoeinschätzung.",
        objectives: [
          "Einen präzisen Klassifikator für Hautläsionen anhand dermoskopischer Bilder entwickeln.",
          "Modelle für TensorFlow Lite auf Raspberry Pi optimieren.",
          "Eine Flutter-App für klinische Untersuchungen aus der Ferne bereitstellen.",
        ],
      },
      architecture: {
        description: "Eine Edge-KI-Diagnosepipeline kombiniert dermoskopische Bildaufnahme, lokale TFLite-Inferenz und sichere Flutter-Kommunikation.",
        components: [
          "Aufnahmehardware: Raspberry Pi mit spezieller Makro-/Fluoreszenzoptik.",
          "KI-Engine: TensorFlow-CNN, quantisiert für TensorFlow Lite (TFLite).",
          "Mobile App: Plattformübergreifende Flutter-Oberfläche für Klinik- und Außendienstteams.",
        ],
      },
      process: [
        { step: "01", title: "Datensatz aufbereiten", desc: "Standardisierte dermoskopische Bildsammlungen verarbeiten und Farben normalisieren." },
        { step: "02", title: "Modelltraining und Quantisierung", desc: "CNN-Modelle trainieren und Gewichte für schnelle Edge-Inferenz quantisieren." },
        { step: "03", title: "Hardware integrieren", desc: "Modelllaufzeit auf Raspberry Pi-Geräten mit Kameramodulen bereitstellen." },
        { step: "04", title: "Mobile App verbinden", desc: "Flutter über eine sichere lokale API mit dem Edge-Knoten verbinden." },
      ],
      gallery: ["BCCare-Diagnoseterminal am Edge-Gerät", "Risikoeinstufung in der mobilen App"],
      contributions: [
        "CNN-Modelle zur Klassifikation dermoskopischer Bilder trainiert und bewertet.",
        "Modelle quantisiert und die Inferenzleistung auf Edge-Hardware getestet.",
        "Die Flutter-App für die Echtzeit-Diagnoseberichterstattung entwickelt.",
      ],
      challenges: [
        "Beleuchtungsunterschiede und Bildartefakte bei Aufnahmen im Feld ausgleichen.",
        "Modellgenauigkeit mit den Speicher- und Rechenlimits von Edge-Geräten vereinbaren.",
      ],
      evaluation: {
        metrics: ["Validierungsgenauigkeit", "Inferenzlatenz (Edge)", "Modellgröße (TFLite)"],
        findings: "Die Tests zeigten zuverlässige Klassifikation mit Inferenzzeiten unter einer Sekunde auf leistungsschwacher Hardware.",
      },
    },
    "03": {
      overview: {
        problem: "Getrennte Veranstaltungsabläufe, manuelle Tabellen und undurchsichtige Juryverfahren erschweren große Technologiewettbewerbe.",
        solution: "Firetech bündelt Veranstaltungsinformationen, Teamregistrierung, Dokumenteneinreichung und Jury-Auswertung in einer leistungsfähigen Webplattform.",
        objectives: [
          "Ein digitales Portal für Anmeldung und Verwaltung von Technologiewettbewerben bieten.",
          "Gemeinsame Bewertungen durch Jurys in Echtzeit ermöglichen.",
          "Datenintegrität und eine reaktionsschnelle Nutzung bei hoher Last gewährleisten.",
        ],
      },
      architecture: {
        description: "Eine Full-Stack-Webanwendung mit sicheren REST-Endpunkten und optimierter Datenbankindizierung.",
        components: [
          "Frontend: React-SPA mit Tailwind CSS und retro-futuristischen Designs.",
          "Backend: Node.js Express REST-API mit JWT-Authentifizierung.",
          "Datenbank: Relationale MySQL-Datenbank zur Veranstaltungsverwaltung.",
        ],
      },
      process: [
        { step: "01", title: "Anforderungen und Schema", desc: "Rollen und relationale Datenbankschemata festlegen." },
        { step: "02", title: "Portalentwicklung", desc: "Responsive Registrierungs- und Einreichungsabläufe erstellen." },
        { step: "03", title: "Jury-Dashboard", desc: "Echtzeit-Bewertungsraster und automatische Ranglisten einführen." },
        { step: "04", title: "Belastungstest und Start", desc: "Lasttests durchführen und die Plattform produktiv bereitstellen." },
      ],
      gallery: ["Firetech-Portal und Wettbewerbsbereiche", "Echtzeit-Jurybewertung und Rangliste"],
      contributions: [
        "Full-Stack-Authentifizierung und rollenbasierte Zugriffskontrolle konzipiert.",
        "Die responsive React-Oberfläche und Einreichungsformulare gestaltet.",
        "MySQL-Abfragen für sofortige Ranglistenberechnungen optimiert.",
      ],
      challenges: [
        "Gleichzeitige Uploads bei hohem Andrang vor Anmeldeschlüssen verwalten.",
        "Faire und manipulationssichere Jurybewertungen in Echtzeit sicherstellen.",
      ],
      evaluation: {
        metrics: ["Verarbeitete Teams", "Seitenladezeit (LCP)", "Abweichung der Wertungen"],
        findings: "Mehrere nationale Technologiewettbewerbe ohne Ausfälle oder Engpässe bei der Bewertung unterstützt.",
      },
    },
    "04": {
      overview: {
        problem: "Manuelle Stallkontrollen übersehen mitunter gefährliche Gasspitzen oder Hitzestress, bevor die Gesundheit der Tiere beeinträchtigt wird.",
        solution: "Smart Goat Farm nutzt ESP32-Sensorknoten, um Umgebungsdaten kontinuierlich an ein zentrales Überwachungsdashboard zu senden.",
        objectives: [
          "Temperatur, Luftfeuchtigkeit und Ammoniak in Ställen überwachen.",
          "Telemetriedaten zuverlässig per MQTT und WLAN übertragen.",
          "Ein Analyse-Dashboard mit frühzeitigen Anomaliewarnungen bereitstellen.",
        ],
      },
      architecture: {
        description: "Eine verteilte IoT-Telemetriearchitektur verbindet Edge-Sensoren mit einem MQTT-Broker und einem Web-Dashboard.",
        components: [
          "Edge-Knoten: ESP32-Mikrocontroller mit DHT22- und MQ-135-Sensoren.",
          "Kommunikation: Leichtgewichtiges MQTT-Publish-Subscribe-Protokoll.",
          "Backend/Broker: Mosquitto MQTT mit einem Node.js-Speicherprozess.",
          "Dashboard: Webbasierte Telemetrie mit historischen Diagrammen.",
        ],
      },
      process: [
        { step: "01", title: "Sensoren kalibrieren", desc: "ESP32 mit Klima- und Gassensoren verbinden und analoge Signale prüfen." },
        { step: "02", title: "Firmware entwickeln", desc: "C++-Firmware für WLAN-Wiederverbindung und zuverlässige MQTT-Nachrichten schreiben." },
        { step: "03", title: "Broker- und Datenpipeline", desc: "MQTT-Nachrichtenrouting und Zeitreihenprotokollierung einrichten." },
        { step: "04", title: "Dashboard integrieren", desc: "Echtzeit-Telemetrieanzeigen und Alarmschwellen entwickeln." },
      ],
      gallery: ["Smart Goat Farm-Sensorhardware", "Echtzeit-Telemetrie-Analyse-Dashboard"],
      contributions: [
        "ESP32-Firmware für Sensormessungen und MQTT-Telemetrie programmiert.",
        "Prototypgehäuse und Sensorknotenschaltung entworfen.",
        "Web-Dashboard zur Live-Überwachung und Alarmierung entwickelt.",
      ],
      challenges: [
        "Funkstörungen und Signalabschwächung in landwirtschaftlichen Metallgebäuden reduzieren.",
        "Die Sensorkalibrierung in feuchten und korrosiven Stallumgebungen stabil halten.",
      ],
      evaluation: {
        metrics: ["Sensor-Messintervall", "Erfolgreiche Paketübertragung", "Stromstabilität"],
        findings: "Prototypversuche bestätigten langfristiges Telemetriestreaming und frühe Warnungen bei erhöhtem Ammoniak.",
      },
    },
  },
};
