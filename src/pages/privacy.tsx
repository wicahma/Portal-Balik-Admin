import React from "react";

const Privacy = () => {
  return (
    <div className="container mx-auto my-10">
      <h2 className="text-4xl text-center mb-10">Kebijakan Privasi</h2>
      <div className="space-y-4">
        <p>
          Kami, pengembang aplikasi Sibesti, menghargai privasi Anda dan
          berkomitmen untuk melindungi informasi pribadi AndKebijakan privasi
          ini menjelaskan bagaimana kami mengumpulkan, menggunakan,
          mengungkapkan, dan melindungi informasi pribadi yang Anda berikan saat
          menggunakan aplikasi Sibesti. Dengan menggunakan aplikasi kami, Anda
          setuju dengan praktik yang dijelaskan dalam kebijakan privasi ini.
        </p>

        <div>
          <p>Informasi yang Kami Kumpulkan:</p>
          <ul className="list-item ml-10 list-disc">
            <li>
              Scanning Data Inventaris: Aplikasi Sibesti akan memindai kode QR
              yang Anda berikan dan mencocokkannya dengan data inventaris yang
              ada dalam database pemerintahan. Kami tidak menyimpan informasi
              kode QR yang Anda pindai dalam database kami.
            </li>
            <li>
              Riwayat Scan: Aplikasi Sibesti dapat menyimpan riwayat scan yang
              mencatat kode QR yang telah Anda pindai dan data inventaris yang
              terkait dengan kode QR tersebut. Riwayat scan ini hanya akan
              disimpan di penyimpanan lokal perangkat Anda dan tidak akan
              diunggah ke server kami.
            </li>
          </ul>
        </div>

        <div>
          <p>Penggunaan Informasi:</p>
          <ul className="list-item ml-10 list-disc">
            <li>
              Informasi yang terkait dengan hasil scanning akan digunakan untuk
              menampilkan data inventaris yang sesuai dengan kode QR yang
              dipindai.
            </li>
            <li>
              Riwayat scan yang disimpan di penyimpanan lokal Anda akan membantu
              Anda melacak dan mengelola hasil scanning sebelumnya.
            </li>
          </ul>
        </div>

        <div>
          <p>Akses ke Internet:</p>
          <ul className="list-item ml-10 list-disc">
            <li>
              Aplikasi Sibesti membutuhkan akses internet untuk melakukan
              pengecekan hasil scanning dengan database pemerintahan dan
              memperbarui data inventaris jika ada pembaruan.
            </li>
          </ul>
        </div>

        <div>
          <p>Akses ke Penyimpanan Lokal Telepon:</p>
          <ul className="list-item ml-10 list-disc">
            <li>
              Aplikasi Sibesti memerlukan akses ke penyimpanan lokal telepon
              Anda untuk menyimpan data hasil scan. Data ini akan tetap berada
              di perangkat Anda dan tidak akan diunggah ke server kami.
            </li>
          </ul>
        </div>

        <div>
          <p>Akses ke Kamera dan Galeri:</p>
          <ul className="list-item ml-10 list-disc">
            <li>
              Aplikasi Sibesti membutuhkan akses ke kamera dan galeri perangkat
              Anda agar Anda dapat melakukan pemindaian kode QR menggunakan
              kamera dan megecek hasil scan dari galeri.
            </li>
            <li>
              Kami tidak mengumpulkan dan juga mengambl data gambar yang anda
              scan, kami hanya mengeceknya lalu setelah itu data yang ada akan
              disimpan di penyimpanan ponsel apabila scan berhasil.
            </li>
          </ul>
        </div>
        <div>
          <p>Keamanan Informasi:</p>
          <ul className="list-item ml-10 list-disc">
            <li>
              Kami mengambil langkah-langkah yang wajar untuk melindungi
              informasi pribadi Anda namun, kami tidak dapat menjamin keamanan
              mutlak data yang dikirimkan melalui internet atau disimpan di
              perangkat Anda.
            </li>
          </ul>
        </div>

        <div>
          <p>Perubahan Kebijakan Privasi:</p>
          <ul className="list-item ml-10 list-disc">
            <li>
              Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu.
              Perubahan akan diberlakukan segera setelah kebijakan privasi yang
              diperbarui tersedia di dalam aplikasi. Dianjurkan bagi Anda untuk
              mengkaji kebijakan privasi ini secara berkala untuk memahami
              bagaimana informasi pribadi Anda dilindungi.
            </li>
          </ul>
        </div>

        <p>
          Jika Anda memiliki pertanyaan atau kekhawatiran tentang kebijakan
          privasi kami, jangan ragu untuk menghubungi kami melalui
          sibesti.service@gmail.com
        </p>

        <p>Terima kasih telah menggunakan aplikasi Sibesti!</p>
      </div>
    </div>
  );
};

export default Privacy;
