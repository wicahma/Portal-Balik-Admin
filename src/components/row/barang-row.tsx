import { setBarang } from "@/redux/slices/item";
import { Tooltip } from "@material-tailwind/react";
import { useDispatch } from "react-redux";

interface barang {
  identifier: string;
  preview: () => void;
  deletes: () => void;
  data: any;
}

const BarangRow = ({ identifier, preview, deletes, data }: barang) => {
  const dispatch = useDispatch(),
    newDate = (date: string) => {
      const datetime = new Date(date);
      return `${datetime.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })}`;
    },
    rupiah = new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    });
  return (
    <>
      <td className="py-3 px-6 text-center">
        <div className="flex items-center justify-center bg-blue-400 rounded-md text-white">
          <span className="font-medium">{data._id}</span>
        </div>
      </td>
      <td className="py-3 px-6 text-center uppercase">
        <div className="flex text-sm items-center justify-center">
          <p className="font-extralight">{data.upb}</p>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex text-sm items-center justify-center">
          <p className="font-extralight">{data.jenisBarang}</p>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex text-sm items-center justify-center">
          <p className="font-extralight">{newDate(data.tanggalSPK)}</p>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex text-sm items-center justify-center">
          <p className="font-extralight">{data.nomorSPK}</p>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex text-sm items-center justify-center">
          <p className="font-extralight">{newDate(data.tanggalSPM)}</p>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex text-sm items-center justify-center">
          <p className="font-extralight">{data.nomorSPM}</p>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex text-sm items-center justify-center">
          <p className="font-extralight">{newDate(data.tanggalSP2D)}</p>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex text-sm items-center justify-center">
          <p className="font-extralight">{data.nomorSP2D}</p>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex text-sm items-center justify-center">
          <p className="font-extralight">{data.jumlahBarang}</p>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex text-sm items-center justify-center">
          <p className="font-extralight">{rupiah.format(data.hargaSatuan)}</p>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex text-sm items-center justify-center">
          <p className="font-extralight">{rupiah.format(data.jumlahHarga)}</p>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex text-sm items-center justify-center">
          <p className="font-extralight">{rupiah.format(data.totalBelanja)}</p>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex text-sm items-center justify-center">
          <p className="font-extralight">{newDate(data.createdAt)}</p>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex text-sm items-center justify-center">
          <p className="font-extralight">{newDate(data.updatedAt)}</p>
        </div>
      </td>
      <td className="py-3 px-6 text-center">
        <div className="flex item-center bg-gray-300 space-x-2 px-3 py-1 rounded-full w-fit mx-auto justify-center">
          {/* //NOTE - Lihat Preview */}
          <Tooltip
            content={"Lihat preview"}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            className="bg-white text-gray-700 shadow-xl"
          >
            <div
              onClick={() => preview()}
              className="w-4 transform hover:text-blue-500 hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
          </Tooltip>
          {/* //NOTE - Edit Kolom */}
          {identifier === "barang" && (
            <Tooltip
              content={"Edit kolom ini"}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
              className="bg-white text-gray-700 shadow-xl"
            >
              <div
                onClick={() => dispatch(setBarang(data))}
                className="w-4 transform hover:text-blue-500 hover:scale-110"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
              </div>
            </Tooltip>
          )}
          {/* //NOTE - Hapus Data */}
          <Tooltip
            content={"Hapus data kolom ini"}
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0, y: 25 },
            }}
            className="bg-white text-gray-700 shadow-xl"
          >
            <div
              onClick={() => deletes()}
              className="w-4 transform hover:text-blue-500 hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </div>
          </Tooltip>
        </div>
      </td>
    </>
  );
};

export default BarangRow;
