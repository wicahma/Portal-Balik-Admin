import { getServerSession } from "next-auth";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { wrapper } from "@/redux/store";
import { checkSession } from "@/redux/actions/user-action";
import { signOut } from "next-auth/react";
import { Button } from "@material-tailwind/react";

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      const session = await getServerSession(req, res, authOptions);
      const { query } = etc;
      if (!session) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      if (!query.qr || !query._id) {
        return {
          redirect: {
            destination: "/dashboard",
            permanent: false,
          },
        };
      }
      return {
        props: {},
      };
    }
);

const PDF = (props: any) => {
  const { query, push } = useRouter();
  const {
    _id,
    _uuid,
    _idBarang,
    namaPemegang,
    barangKe,
    upb,
    jenisBarang,
    tanggalSPK,
    nomorSPK,
    tanggalSPM,
    nomorSPM,
    tanggalSP2D,
    nomorSP2D,
    hargaSatuan,
    qr,
  } = query;
  useEffect(() => {
    return () => {
      print();
    };
  }, []);
  return (
    <div className="container mx-auto my-10 space-y-5">
      <h1 className="capitalize text-5xl font-bold">{jenisBarang}</h1>
      <div className="flex gap-3 items-center">
        <Button
          variant="text"
          color="green"
          className="gap-3 p-3 py-1 flex items-center"
          onClick={() => {
            push("/dashboard");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 aspect-square"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
          <p>kembali</p>
        </Button>
        <Button
          variant="outlined"
          color="blue"
          className="gap-3 p-3 py-1 flex items-center"
          onClick={() => {
            print();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-4 aspect-square"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z"
            />
          </svg>
          <p>print</p>
        </Button>
      </div>
      <div className="flex gap-4 mt-5">
        <div className="border-2 w-fit border-gray-500">
          <Image
            src={qr?.toString() ?? ""}
            alt="qr-code"
            width={200}
            height={200}
          />
        </div>
        <div>
          <h2 className="uppercase">
            ID - {_id} - {_uuid}
          </h2>
          <h2>ID BARANG - {_idBarang}</h2>
        </div>
      </div>
      <table className="w-full table-auto border-collapse border border-gray-800">
        <tbody>
          <tr>
            <td className="border border-gray-800 p-3">ID Barang</td>
            <td className="border border-gray-800 p-3">{_id}</td>
          </tr>
          <tr>
            <td className="border border-gray-800 p-3">UUID</td>
            <td className="border border-gray-800 p-3">{_uuid}</td>
          </tr>
          <tr>
            <td className="border border-gray-800 p-3">Nama Pemegang</td>
            <td className="border border-gray-800 p-3">{namaPemegang}</td>
          </tr>
          <tr>
            <td className="border border-gray-800 p-3">Barang Ke</td>
            <td className="border border-gray-800 p-3">{barangKe}</td>
          </tr>
          <tr>
            <td className="border border-gray-800 p-3">UPB</td>
            <td className="border border-gray-800 p-3">{upb}</td>
          </tr>
          <tr>
            <td className="border border-gray-800 p-3">Taggal SPK</td>
            <td className="border border-gray-800 p-3">{tanggalSPK}</td>
          </tr>
          <tr>
            <td className="border border-gray-800 p-3">Nomor SPK</td>
            <td className="border border-gray-800 p-3">{nomorSPK}</td>
          </tr>
          <tr>
            <td className="border border-gray-800 p-3">Tanggal SPM</td>
            <td className="border border-gray-800 p-3">{tanggalSPM}</td>
          </tr>
          <tr>
            <td className="border border-gray-800 p-3">Nomor SPM</td>
            <td className="border border-gray-800 p-3">{nomorSPM}</td>
          </tr>
          <tr>
            <td className="border border-gray-800 p-3">Tanggal SP2D</td>
            <td className="border border-gray-800 p-3">{tanggalSP2D}</td>
          </tr>
          <tr>
            <td className="border border-gray-800 p-3">Nomor SP2D</td>
            <td className="border border-gray-800 p-3">{nomorSP2D}</td>
          </tr>
          <tr>
            <td className="border border-gray-800 p-3">Harga Barang</td>
            <td className="border border-gray-800 p-3">{hargaSatuan}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PDF;
