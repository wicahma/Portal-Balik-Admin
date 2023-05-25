import Navbars from "@/components/Navbar";
import React from "react";
import Layout from "@/styles/Layout.module.css";
import Product from "@/components/Product";

const index = (props: any) => {
  return (
    <>
      <main className="bg-white">
        <Navbars />
        <div className="min-h-screen w-screen border-l grow flex flex-col overflow-hidden">
          <div className="flex gap-5 bg-blue-400 pb-20 pt-36 justify-center flex-col lg:flex-row">
            <div className={Layout.adminCard}>
              <div className={Layout.header}>
                <div>
                  <h3>Total Pesanan</h3>
                  <h1>254</h1>
                </div>
                <div className="text-white bg-red-500 h-fit aspect-square p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 aspect-square"
                  >
                    <path d="M2.879 7.121A3 3 0 007.5 6.66a2.997 2.997 0 002.5 1.34 2.997 2.997 0 002.5-1.34 3 3 0 104.622-3.78l-.293-.293A2 2 0 0015.415 2H4.585a2 2 0 00-1.414.586l-.292.292a3 3 0 000 4.243zM3 9.032a4.507 4.507 0 004.5-.29A4.48 4.48 0 0010 9.5a4.48 4.48 0 002.5-.758 4.507 4.507 0 004.5.29V16.5h.25a.75.75 0 010 1.5h-4.5a.75.75 0 01-.75-.75v-3.5a.75.75 0 00-.75-.75h-2.5a.75.75 0 00-.75.75v3.5a.75.75 0 01-.75.75h-4.5a.75.75 0 010-1.5H3V9.032z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className={Layout.adminCard}>
              <div className={Layout.header}>
                <div>
                  <h3>Total Pemasukan</h3>
                  <h1>254</h1>
                </div>
                <div className="text-white bg-green-500 h-fit aspect-square p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 aspect-square"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1 4a1 1 0 011-1h16a1 1 0 011 1v8a1 1 0 01-1 1H2a1 1 0 01-1-1V4zm12 4a3 3 0 11-6 0 3 3 0 016 0zM4 9a1 1 0 100-2 1 1 0 000 2zm13-1a1 1 0 11-2 0 1 1 0 012 0zM1.75 14.5a.75.75 0 000 1.5c4.417 0 8.693.603 12.749 1.73 1.111.309 2.251-.512 2.251-1.696v-.784a.75.75 0 00-1.5 0v.784a.272.272 0 01-.35.25A49.043 49.043 0 001.75 14.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className={Layout.adminCard}>
              <div className={Layout.header}>
                <div>
                  <h3>Pemasukan Bulan ini</h3>
                  <h1>254</h1>
                </div>
                <div className="text-white bg-light-blue-500 h-fit aspect-square p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 aspect-square"
                  >
                    <path d="M10.75 10.818v2.614A3.13 3.13 0 0011.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 00-1.138-.432zM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 00-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152z" />
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-6a.75.75 0 01.75.75v.316a3.78 3.78 0 011.653.713c.426.33.744.74.925 1.2a.75.75 0 01-1.395.55 1.35 1.35 0 00-.447-.563 2.187 2.187 0 00-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 11-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 111.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 01-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 011.653-.713V4.75A.75.75 0 0110 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
            <div className={Layout.adminCard}>
              <div className={Layout.header}>
                <div>
                  <h3>Produk</h3>
                  <h1>254</h1>
                </div>
                <div className="text-white bg-orange-500 h-fit aspect-square p-2 rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-6 aspect-square"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 5v1H4.667a1.75 1.75 0 00-1.743 1.598l-.826 9.5A1.75 1.75 0 003.84 19H16.16a1.75 1.75 0 001.743-1.902l-.826-9.5A1.75 1.75 0 0015.333 6H14V5a4 4 0 00-8 0zm4-2.5A2.5 2.5 0 007.5 5v1h5V5A2.5 2.5 0 0010 2.5zM7.5 10a2.5 2.5 0 005 0V8.75a.75.75 0 011.5 0V10a4 4 0 01-8 0V8.75a.75.75 0 011.5 0V10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <Product />
        </div>
      </main>
    </>
  );
};

export default index;
