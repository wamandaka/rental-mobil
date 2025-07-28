# Rental Mobil

## 🔧 Stack

- React.js
- TypeScript
- Tailwind CSS
- React Router Dom
- React Icons
- React Toastify

## 🚀 Features

- Menampilkan daftar mobil yang tersedia untuk disewa.
- Pengguna dapat memilih tanggal dan lokasi penjemputan serta pengembalian.
- Dashboard untuk manajemen mobil dan pemesanan.

## 🛠️ Project Structure

```
src/
├── assets/                  # Asset statis seperti gambar, ikon, dll
├── components/              # Komponen UI reusable
│   ├── Dashboard/           # Komponen untuk halaman dashboard admin
│   │   ├── Sidebar.tsx
│   │   ├── TableCars.tsx
│   │   └── TableOrders.tsx
│   └── Home/                # Komponen bagian beranda (homepage)
│       ├── Hero.tsx
│       ├── PopularDeals.tsx
│       ├── WhyChooseUs.tsx
│       ├── Footer.tsx
│       └── Navbar.tsx
├── pages/                   # Halaman utama aplikasi berdasarkan routing
│   ├── BookingForm.tsx
│   ├── Dashboard.tsx
│   ├── DetailCar.tsx
│   ├── DetailOrder.tsx
│   ├── Home.tsx
│   └── ListCars.tsx
├── routes/                  # Definisi dan konfigurasi routing aplikasi
│   └── routes.tsx
├── service/                 # Modul untuk pemanggilan API (MockAPI)
│   └── service.tsx
├── types/                   # Tipe TypeScript untuk data yang digunakan
│   ├── car.types.ts
│   └── order.types.ts
├── utils/                   # Utility/helper functions
│   └── formatCurrency.ts
├── App.tsx                  # Root komponen aplikasi
├── App.css                  # Styling global aplikasi
└── main.tsx                 # Entry point utama React app

```

## 📦 Run Locally

```bash
npm install
npm run dev
```
