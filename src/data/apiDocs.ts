export interface ApiResponse {
  label: string;
  color: string; // Tailwind CSS class (bg-red-500, etc.)
  description: string;
  example: object;
}

export interface ApiDoc {
  id: number;
  url: string;
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH' | 'ANY';
  description: string;
  responses: ApiResponse[];
}

export const apiDocs: ApiDoc[] = [
  {
    id: 1,
    url: "/api/saldo/check",
    method: "GET",
    description: "Mengecek saldo akun pengguna berdasarkan ID atau nomor akun. Endpoint ini mengembalikan informasi saldo terkini beserta detail akun.",
    responses: [
      { 
        label: "Error", 
        color: "bg-red-500", 
        description: "Terjadi kesalahan server atau akun tidak ditemukan", 
        example: {
          "statusCode": 404,
          "status": false,
          "message": "Akun tidak ditemukan!",
          "data": null
        }
      },
      { 
        label: "Pending", 
        color: "bg-yellow-500", 
        description: "Akun ditemukan tapi ada masalah dengan data saldo", 
        example: {
          "statusCode": 200,
          "status": true,
          "message": "Data ditemukan, namun saldo sedang dalam proses update!",
          "data": {
            "saldo": 0,
            "status_akun": "pending"
          }
        }
      },
      { 
        label: "Success", 
        color: "bg-green-500", 
        description: "Data saldo berhasil diambil", 
        example: {
          "statusCode": 200,
          "status": true,
          "message": "Data ditemukan!",
          "data": {
            "saldo": 6406323,
            "nama_akun": "John Doe",
            "nomor_akun": "1234567890"
          }
        }
      },
    ]
  },
  {
    id: 2,
    url: "/api/transfer",
    method: "POST",
    description: "Melakukan transfer dana antar akun. Endpoint ini memproses transfer dengan validasi saldo, nomor tujuan, dan PIN keamanan.",
    responses: [
      { 
        label: "Error", 
        color: "bg-red-500", 
        description: "Transfer gagal - saldo tidak mencukupi atau data tidak valid", 
        example: {
          "statusCode": 400,
          "status": false,
          "message": "Saldo tidak mencukupi untuk melakukan transfer!",
          "data": {
            "saldo_tersedia": 50000,
            "jumlah_transfer": 100000
          }
        }
      },
      { 
        label: "Warning", 
        color: "bg-yellow-500", 
        description: "Transfer berhasil tapi ada peringatan biaya admin", 
        example: {
          "statusCode": 200,
          "status": true,
          "message": "Transfer berhasil, biaya admin dikenakan!",
          "data": {
            "id_transaksi": "TRX001234",
            "jumlah_transfer": 100000,
            "biaya_admin": 2500,
            "saldo_akhir": 397500
          }
        }
      },
      { 
        label: "Success", 
        color: "bg-green-500", 
        description: "Transfer berhasil dilakukan", 
        example: {
          "statusCode": 200,
          "status": true,
          "message": "Transfer berhasil!",
          "data": {
            "id_transaksi": "TRX001234",
            "jumlah_transfer": 100000,
            "rekening_tujuan": "9876543210",
            "saldo_akhir": 6306323
          }
        }
      },
    ]
  },
  {
    id: 3,
    url: "/api/history/transaksi",
    method: "GET",
    description: "Mengambil riwayat transaksi pengguna dengan opsi filter berdasarkan tanggal, jenis transaksi, dan jumlah data per halaman.",
    responses: [
      { 
        label: "Error", 
        color: "bg-red-500", 
        description: "Gagal mengambil data riwayat transaksi", 
        example: {
          "statusCode": 500,
          "status": false,
          "message": "Terjadi kesalahan sistem saat mengambil data transaksi!",
          "data": null
        }
      },
      { 
        label: "Warning", 
        color: "bg-yellow-500", 
        description: "Data ditemukan tapi tidak lengkap", 
        example: {
          "statusCode": 200,
          "status": true,
          "message": "Data ditemukan, namun beberapa transaksi masih dalam proses!",
          "data": {
            "total_transaksi": 15,
            "transaksi_pending": 2,
            "riwayat": []
          }
        }
      },
      { 
        label: "Success", 
        color: "bg-green-500", 
        description: "Riwayat transaksi berhasil diambil", 
        example: {
          "statusCode": 200,
          "status": true,
          "message": "Data riwayat transaksi ditemukan!",
          "data": {
            "total_transaksi": 25,
            "halaman": 1,
            "riwayat": [
              {
                "id": "TRX001234",
                "tanggal": "2024-01-15",
                "jenis": "transfer",
                "jumlah": 100000,
                "status": "berhasil"
              }
            ]
          }
        }
      },
    ]
  },
  {
    id: 4,
    url: "/api/topup",
    method: "POST",
    description: "Melakukan top-up saldo akun melalui berbagai metode pembayaran seperti bank transfer, e-wallet, atau kartu kredit.",
    responses: [
      { 
        label: "Error", 
        color: "bg-red-500", 
        description: "Top-up gagal - metode pembayaran tidak valid", 
        example: {
          "statusCode": 400,
          "status": false,
          "message": "Metode pembayaran tidak tersedia!",
          "data": {
            "metode_tersedia": ["bank_transfer", "ewallet", "credit_card"]
          }
        }
      },
      { 
        label: "Warning", 
        color: "bg-yellow-500", 
        description: "Top-up dalam proses, menunggu konfirmasi pembayaran", 
        example: {
          "statusCode": 202,
          "status": true,
          "message": "Top-up sedang diproses, menunggu konfirmasi pembayaran!",
          "data": {
            "id_topup": "TOP001234",
            "jumlah": 500000,
            "status": "pending",
            "batas_waktu": "2024-01-15 23:59:59"
          }
        }
      },
      { 
        label: "Success", 
        color: "bg-green-500", 
        description: "Top-up berhasil, saldo telah ditambahkan", 
        example: {
          "statusCode": 200,
          "status": true,
          "message": "Top-up berhasil!",
          "data": {
            "id_topup": "TOP001234",
            "jumlah_topup": 500000,
            "saldo_sebelum": 6406323,
            "saldo_sesudah": 6906323
          }
        }
      },
    ]
  },
  {
    id: 5,
    url: "/api/profile",
    method: "GET",
    description: "Mengambil informasi profil pengguna termasuk data personal, pengaturan akun, dan status verifikasi.",
    responses: [
      { 
        label: "Error", 
        color: "bg-red-500", 
        description: "Gagal mengambil data profil pengguna", 
        example: {
          "statusCode": 401,
          "status": false,
          "message": "Token tidak valid atau sudah expired!",
          "data": null
        }
      },
      { 
        label: "Warning", 
        color: "bg-yellow-500", 
        description: "Profil ditemukan tapi belum terverifikasi lengkap", 
        example: {
          "statusCode": 200,
          "status": true,
          "message": "Profil ditemukan, namun verifikasi belum lengkap!",
          "data": {
            "nama": "John Doe",
            "email": "john@example.com",
            "status_verifikasi": "partial",
            "dokumen_pending": ["ktp", "selfie"]
          }
        }
      },
      { 
        label: "Success", 
        color: "bg-green-500", 
        description: "Data profil berhasil diambil", 
        example: {
          "statusCode": 200,
          "status": true,
          "message": "Data profil ditemukan!",
          "data": {
            "id": "USR001234",
            "nama": "John Doe",
            "email": "john@example.com",
            "telepon": "081234567890",
            "status_verifikasi": "verified",
            "tanggal_daftar": "2024-01-01"
          }
        }
      },
    ]
  },
  {
    id: 6,
    url: "/api/notification",
    method: "GET",
    description: "Mengambil daftar notifikasi pengguna termasuk notifikasi transaksi, promosi, dan update sistem.",
    responses: [
      { 
        label: "Error", 
        color: "bg-red-500", 
        description: "Gagal mengambil notifikasi", 
        example: {
          "statusCode": 500,
          "status": false,
          "message": "Sistem notifikasi sedang dalam perbaikan!",
          "data": null
        }
      },
      { 
        label: "Warning", 
        color: "bg-yellow-500", 
        description: "Notifikasi ditemukan tapi ada yang gagal dimuat", 
        example: {
          "statusCode": 200,
          "status": true,
          "message": "Sebagian notifikasi berhasil dimuat!",
          "data": {
            "total_notifikasi": 10,
            "berhasil_dimuat": 8,
            "gagal_dimuat": 2,
            "notifikasi": []
          }
        }
      },
      { 
        label: "Success", 
        color: "bg-green-500", 
        description: "Semua notifikasi berhasil diambil", 
        example: {
          "statusCode": 200,
          "status": true,
          "message": "Notifikasi berhasil dimuat!",
          "data": {
            "total_notifikasi": 5,
            "belum_dibaca": 2,
            "notifikasi": [
              {
                "id": "NOT001",
                "judul": "Transfer Berhasil",
                "pesan": "Transfer Rp 100.000 ke rekening 9876543210 berhasil",
                "tanggal": "2024-01-15 14:30:00",
                "dibaca": false
              }
            ]
          }
        }
      },
    ]
  }
];
