
# PROMPT — Cinematic Retro Futuristic Project Showcase

## 1. Role & Objective

Bertindak sebagai Senior Creative Frontend Engineer yang ahli dalam React, GSAP, ScrollTrigger, Three.js, dan interactive web experiences.

Saya ingin mengembangkan section **Projects** pada website portofolio pribadi saya menjadi pengalaman visual *Cinematic Retro Futuristic* yang interaktif, elegan, imersif, dan profesional.

Saat ini, section Projects menggunakan layout dua halaman menyerupai buku terbuka dengan card proyek di sisi kiri dan kanan. Pertahankan identitas visual dan struktur dasarnya, tetapi tingkatkan kualitas interaksi, transisi, depth, dan storytelling visual secara signifikan.

**Jangan membuat website baru dari nol.** Prioritaskan modifikasi terhadap implementasi yang sudah ada, dengan mempertahankan komponen, data proyek, tautan, dan navigasi yang masih relevan.

## 2. Technology Stack

Gunakan teknologi berikut:

- React + Vite
- JavaScript JSX
- Tailwind CSS
- GSAP
- GSAP ScrollTrigger
- Three.js
- Lucide React untuk ikon jika diperlukan

Gunakan GSAP sebagai sistem utama untuk orkestrasi animasi dan Three.js untuk elemen visual 3D yang benar-benar memberikan nilai tambah.

Jangan menambahkan library lain jika kebutuhan dapat dipenuhi dengan teknologi yang sudah tersedia.

## 3. Visual Direction

Gunakan pendekatan visual **Cinematic Retro Futuristic Editorial**.

Karakter desain:

- Clean editorial layout dengan grid putih dan garis teknis tipis.
- Palet monochrome: putih, off-white, charcoal, dan hitam.
- Amber sebagai warna aksen utama, sekitar `#C3851D`.
- Tipografi tegas, modern, dan berkarakter teknis.
- Elemen HUD, nomor proyek, status sistem, garis koordinat, dan indikator progres.
- Depth dan perspektif 3D yang subtil tetapi terasa nyata.
- Motion design sinematik dengan easing yang halus dan terkontrol.
- Whitespace yang cukup agar informasi proyek tetap mudah dibaca.

Hindari tampilan seperti dashboard template generik, neon berlebihan, glow di semua elemen, glitch terus-menerus, atau animasi yang mengganggu pembacaan konten.

## 4. Main Feature — Scroll-Driven Project Showcase

Jadikan section Projects sebagai satu pengalaman scroll interaktif menggunakan GSAP ScrollTrigger.

### A. Pinned Project Section

- Pin section Projects ketika pengguna memasuki area showcase.
- Pertahankan layout card dua halaman seperti buku terbuka.
- Gunakan scroll untuk berpindah dari satu proyek ke proyek berikutnya.
- Buat setiap transisi terasa seperti perpindahan adegan film.
- Tampilkan satu proyek aktif pada setiap tahap transisi.
- Sinkronkan indikator proyek dan progress bar dengan posisi scroll.
- Setelah proyek terakhir, lepaskan pin dan lanjutkan scroll ke section berikutnya secara natural.

Gunakan `scrub` jika sesuai agar pergerakan dapat dikendalikan maju dan mundur oleh pengguna melalui scroll.

Jangan memblokir scroll secara paksa atau membuat navigasi terasa tersendat.

### B. Cinematic Card Transition

Ketika berpindah proyek:

1. Card aktif bergerak sedikit ke arah kamera virtual.
2. Card mengalami scale, rotation, dan perubahan depth secara terkontrol.
3. Card lama bergerak menjauh dengan perspektif 3D.
4. Card berikutnya masuk dari belakang atau dari sisi yang sesuai dengan komposisi.
5. Informasi proyek lama keluar secara berurutan.
6. Informasi proyek baru masuk dengan stagger berdasarkan hierarki visual.
7. Garis HUD dan aksen amber menyala sesaat untuk menandai pergantian proyek.
8. Progress indicator dan nomor proyek diperbarui sesuai proyek aktif.

Gunakan `perspective`, `transform-style: preserve-3d`, dan transformasi 3D CSS jika memadai.

Gunakan `gsap.timeline()` untuk menyatukan animasi. Hindari membuat banyak animasi independen yang saling bertabrakan.

### C. Book-Inspired Composition

Pertahankan karakter dua halaman dari desain saat ini:

- Halaman kiri menjadi area visual utama proyek, seperti preview aplikasi, screenshot, video, atau ilustrasi.
- Halaman kanan menjadi area informasi, meliputi ID proyek, tahun, judul, kategori, deskripsi, teknologi, dan tautan.
- Pertahankan garis pemisah vertikal sebagai pusat komposisi.
- Tambahkan bayangan lipatan buku dan depth subtil di sekitar bagian tengah.
- Saat berpindah proyek, gunakan animasi perspektif yang memberikan kesan lembar editorial digital yang bergerak.

Jangan memaksakan efek membalik halaman yang realistis jika hasilnya mengorbankan keterbacaan atau menyebabkan masalah layout.

## 5. Three.js — Subtle 3D Atmosphere

Integrasikan Three.js sebagai elemen visual pendukung, bukan sebagai pengganti keseluruhan UI React.

Buat satu elemen 3D utama yang konsisten dengan estetika teknis, misalnya:

- Wireframe geometris abstrak.
- Partikel kecil yang bergerak perlahan.
- Garis koordinat atau node digital.
- Objek geometris dengan material gelap dan pencahayaan amber yang subtil.

Ketentuan:

- Tempatkan objek 3D pada area yang tidak menutupi informasi proyek.
- Gunakan kamera dengan pergerakan halus dan terbatas.
- Sinkronkan rotasi, posisi, atau intensitas cahaya dengan progress scroll menggunakan GSAP.
- Tambahkan parallax ringan berdasarkan pergerakan kursor pada desktop.
- Hindari model 3D kompleks yang tidak diperlukan.
- Jangan membuat efek 3D terlalu dominan dibandingkan card.
- Gunakan satu scene bersama selama section aktif jika memungkinkan, bukan membuat ulang renderer untuk setiap card.

Three.js harus menjadi enhancement yang bermakna. Jika sebuah efek lebih efisien menggunakan CSS, gunakan CSS.

## 6. Interactive Lighting & Microinteractions

Tambahkan detail interaksi yang halus:

- Border card berubah menjadi amber saat hover.
- Cahaya lembut mengikuti posisi kursor pada area visual card.
- Elemen teknis bergerak sedikit berdasarkan posisi pointer.
- Tombol source code dan live demo memiliki feedback hover yang jelas.
- Status proyek dapat menggunakan label seperti `DEPLOYED // PROD`, `IN DEVELOPMENT`, atau status aktual dari data proyek.
- Nomor proyek menggunakan format konsisten, misalnya `02 / 04`.
- Progress indicator memperlihatkan posisi proyek aktif.

Pastikan hover effects tidak mengganggu animasi scroll dan tetap berfungsi pada perangkat touchscreen.

## 7. Project Content & Data

Jangan mengubah informasi proyek yang sudah ada tanpa alasan.

Gunakan struktur data proyek yang terpisah dari komponen visual agar mudah dikelola.

Setiap proyek dapat memiliki:

- `id`
- `title`
- `year`
- `category`
- `description`
- `technologies`
- `image` atau media preview
- `sourceUrl`
- `demoUrl`
- `status`

Gunakan data aktual yang sudah tersedia di dalam repository. Jangan mengarang tautan, status deployment, tahun, atau teknologi proyek.

Jika informasi tertentu tidak tersedia, pertahankan fallback yang sesuai.

Pastikan animasi transisi tidak menyebabkan data proyek aktif dan tautannya tertukar.

## 8. Animation Direction & Timing

Gunakan motion design yang memiliki hierarki:

- Project transition: sekitar 0,8–1,4 detik.
- Text stagger: sekitar 0,04–0,10 detik antar elemen.
- Hover interaction: sekitar 0,2–0,4 detik.
- Camera movement: halus, terbatas, dan tidak agresif.

Angka tersebut merupakan titik awal, bukan aturan mutlak. Sesuaikan dengan hasil visual dan durasi scroll.

Prioritaskan easing yang sinematik dan natural. Hindari penggunaan animasi linear untuk semua elemen.

Jangan menganimasikan terlalu banyak properti secara bersamaan tanpa tujuan visual.

## 9. Technical Implementation Requirements

### GSAP

- Register `ScrollTrigger` dengan benar.
- Gunakan `gsap.context()` atau pendekatan cleanup yang sesuai dengan lifecycle React.
- Bersihkan timeline, ScrollTrigger, event listeners, dan animation instances ketika komponen unmount.
- Pastikan implementasi kompatibel dengan React Strict Mode.
- Hindari pembuatan ScrollTrigger berulang saat state berubah.
- Gunakan `invalidateOnRefresh` dan `refresh` secara tepat ketika layout memang berubah.

### Three.js

- Gunakan satu renderer untuk scene utama jika memungkinkan.
- Atur ukuran canvas mengikuti container.
- Gunakan `ResizeObserver` atau pendekatan responsif yang sesuai.
- Hentikan animation loop dan lepaskan resource GPU ketika komponen unmount.
- Dispose geometri, material, tekstur, dan renderer sesuai kebutuhan.
- Batasi jumlah partikel dan beban rendering.
- Hindari penggunaan post-processing berat jika tidak diperlukan.

### React

- Pisahkan data, komponen UI, dan scene 3D secara logis.
- Hindari penggunaan React state untuk setiap frame animasi.
- Gunakan refs untuk elemen yang dikendalikan GSAP.
- Pastikan perubahan proyek tidak menyebabkan flicker atau remount yang tidak perlu.

## 10. Performance & Accessibility

- Pertahankan performa yang baik pada desktop dan laptop kelas menengah.
- Hindari layout thrashing dan animasi properti layout seperti `top`, `left`, atau `width` jika transformasi dapat digunakan.
- Gunakan `transform` dan `opacity` untuk animasi yang sering berjalan.
- Hormati `prefers-reduced-motion`.
- Sediakan fallback tanpa efek 3D untuk perangkat yang kurang mampu.
- Pastikan teks, tombol, tautan, dan indikator tetap dapat diakses.
- Pada perangkat mobile, gunakan layout yang lebih sederhana dan jangan memaksakan book layout dua kolom yang terlalu sempit.
- Pastikan section tetap dapat dinavigasi tanpa mouse.

## 11. Responsive Behavior

Desktop:

- Gunakan book layout dua halaman.
- Aktifkan pinned scroll storytelling.
- Aktifkan parallax dan interaksi 3D jika performa memungkinkan.

Tablet:

- Pertahankan komposisi editorial dengan skala yang sesuai.
- Kurangi intensitas perspektif dan jumlah efek dekoratif.

Mobile:

- Gunakan satu card atau satu halaman informasi per proyek.
- Gunakan scroll vertikal yang natural.
- Kurangi atau nonaktifkan pinning jika membuat navigasi sulit.
- Nonaktifkan efek pointer yang tidak relevan.
- Pertahankan seluruh informasi dan tautan proyek.

## 12. Implementation Workflow

Sebelum menulis kode:

1. Periksa struktur repository dan `package.json`.
2. Temukan komponen Projects, data proyek, stylesheet, dan konfigurasi Tailwind yang sudah digunakan.
3. Identifikasi implementasi animasi yang ada dan tentukan bagian yang harus dipertahankan.
4. Periksa versi GSAP, Tailwind, React, dan dependency Three.js.
5. Hindari mengasumsikan struktur folder atau nama komponen sebelum memeriksanya.

Kemudian implementasikan secara bertahap:

1. Refactor struktur card jika diperlukan tanpa mengubah tampilan dasar secara drastis.
2. Implementasikan pinned scroll dan transisi antarproyek menggunakan GSAP.
3. Tambahkan depth dan perspektif 3D.
4. Integrasikan scene Three.js yang ringan.
5. Tambahkan microinteractions dan progress indicator.
6. Implementasikan responsive behavior dan reduced-motion fallback.
7. Jalankan build dan perbaiki seluruh error yang muncul.

## 13. Definition of Done

Implementasi dianggap selesai jika:

- Layout dua halaman yang sudah ada tetap dikenali.
- Perpindahan proyek terasa sinematik dan tidak monoton.
- Scroll mengendalikan progres animasi secara natural.
- Informasi proyek selalu terbaca dan sinkron dengan proyek aktif.
- Three.js menambahkan depth tanpa mengganggu konten.
- Seluruh tombol dan tautan tetap berfungsi.
- Tidak ada memory leak atau animation loop yang tertinggal.
- Tidak ada error build.
- Tampilan responsif di desktop, tablet, dan mobile.
- Pengalaman tetap baik saat reduced motion diaktifkan.

## 14. Expected Output

Berikan implementasi kode yang benar-benar terintegrasi dengan repository, bukan sekadar mockup atau pseudocode.

Jelaskan secara ringkas:

1. File yang diubah dan ditambahkan.
2. Dependensi yang diperlukan beserta alasan penggunaannya.
3. Cara kerja timeline GSAP dan ScrollTrigger.
4. Cara Three.js diintegrasikan.
5. Cara mengatur data dan jumlah proyek.
6. Cara menjalankan dan menguji implementasi.

Jika ada konflik dengan arsitektur yang sudah ada, prioritaskan solusi yang paling sederhana, stabil, dan mudah dirawat.

**Final creative direction:** the result should feel like an editorial portfolio transforming into a cinematic digital experience — precise, restrained, tactile, and unmistakably retro futuristic. The animations must serve the storytelling of each project rather than exist merely as decoration.
