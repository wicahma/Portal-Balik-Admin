import { deleteBarang } from "@/redux/actions/barang-action";
import { deleteKualitas, getQrCode } from "@/redux/actions/kualitas-action";
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
} from "@material-tailwind/react";
import { useSession } from "next-auth/react";
import React from "react";
import { useDispatch } from "react-redux";
import BarangRow from "./row/barang-row";
import KualitasRow from "./row/kualitas-row";
import Image from "next/image";
import Link from "next/link";
import Loading from "./Loading";
import { setLoading } from "@/redux/slices/main";
import { useRouter } from "next/router";

const DataTable = (props: any) => {
  const { tableTitle, tableData, identifier } = props,
    router = useRouter(),
    session = useSession(),
    [handleOpenDelete, setHandleOpenDelete] = React.useState<boolean>(false),
    [handleOpenPreview, setHandleOpenPreview] = React.useState<boolean>(false),
    [handleOpenQrCode, setHandleOpenQrCode] = React.useState<boolean>(false),
    [dataQrCode, setDataQrCode] = React.useState<any>(""),
    [dataPreview, setHandleDataPreview] = React.useState<Object>({}),
    [selectedID, setSelectedID] = React.useState<string>(""),
    [selectedData, setSelectedData] = React.useState<any>({}),
    dispatch = useDispatch();

  //NOTE - Delete Handler
  const handleDelete = async (id: string, data: any) => {
    dispatch({
      type: "main/setLoading",
      payload: true,
    });
    switch (identifier) {
      case "barang":
        deleteBarang({
          id,
          dispatch,
          session,
        });
        break;
      case "kualitas":
        deleteKualitas({
          id,
          dispatch,
          session,
          data,
        });
      default:
        dispatch({
          type: "main/setLoading",
          payload: false,
        });
        return dispatch({
          type: "main/setAlert",
          payload: {
            type: "info",
            message: "Fitur hapus data belum diatur!",
            show: true,
          },
        });
    }
  };

  return (
    <>
      <table className="min-w-max bg-white font-sans rounded-2xl shadow-xl overflow-hidden mb-6 w-full table-auto">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            {tableTitle.map((title: any, i: number) => (
              <th key={i} className="py-3 px-6 text-center">
                {title}
              </th>
            ))}
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {tableData.map((data: any, i: number) => {
            switch (identifier) {
              case "barang":
                return (
                  <tr
                    id={`data-${data._id}-barang`}
                    className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
                    key={`${i}-${data._id}-barang`}
                  >
                    <BarangRow
                      identifier={identifier}
                      preview={() => {
                        setHandleOpenPreview(!handleOpenPreview);
                        setHandleDataPreview(data);
                      }}
                      deletes={() => {
                        setSelectedID(data._id);
                        setHandleOpenDelete(true);
                      }}
                      data={data}
                    />
                  </tr>
                );
              case "kualitas":
                return (
                  <tr
                    id={`data-${data._uuid}-kualitas`}
                    className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
                    key={`${i}-${data._uuid}-kualitas`}
                  >
                    <KualitasRow
                      identifier={identifier}
                      preview={() => {
                        setHandleOpenPreview(!handleOpenPreview);
                        setHandleDataPreview(data);
                      }}
                      deletes={() => {
                        setSelectedID(data._uuid);
                        setSelectedData({
                          idBarang: data._idBarang,
                          barangKe: data.barangKe,
                          pdf: data.dokumenPemegang,
                        });
                        setHandleOpenDelete(true);
                      }}
                      qrcode={async () => {
                        setSelectedID(data._uuid);
                        setHandleOpenQrCode(true);
                        dispatch(setLoading(true));
                        await getQrCode({
                          id: data._uuid,
                          dispatch,
                          session,
                        })
                          .then((data) => {
                            console.log(data);
                            setDataQrCode(data);
                          })
                          .finally(() => {
                            dispatch(setLoading(false));
                          });
                      }}
                      data={data}
                    />
                  </tr>
                );
              default:
                break;
            }
          })}
        </tbody>
      </table>

      {/* NOTE - Dialog Preview Data */}
      <Dialog
        open={handleOpenPreview}
        size={"sm"}
        handler={() => setHandleOpenPreview(!handleOpenPreview)}
      >
        <DialogHeader className="capitalize">Data {identifier}</DialogHeader>
        <DialogBody divider>
          {Object.entries(dataPreview).map((data, i) =>
            data[0].includes("_") ? (
              <div
                key={i}
                className="flex bg-blue-400 uppercase rounded-md mb-3 px-3 gap-3 justify-center text-white"
              >
                <h4>{data[0]}:</h4>
                <p>{data[1]}</p>
              </div>
            ) : (
              <div key={i} className="flex items-start gap-2 mx-5">
                <p className="font-light">
                  {data[0]}: {data[1]}
                </p>
              </div>
            )
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="filled"
            color="green"
            onClick={() => setHandleOpenPreview(!handleOpenPreview)}
            className="mr-1"
          >
            <span>Tutup</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* NOTE - Dialog QR CODE */}
      <Dialog
        open={handleOpenQrCode}
        size={"sm"}
        handler={() => setHandleOpenQrCode(!handleOpenQrCode)}
      >
        <DialogHeader className="capitalize">QR {identifier}</DialogHeader>
        <DialogBody divider>
          <div className="flex flex-col items-center">
            <p className="uppercase text-center text-sm text-black">
              UUID-{selectedID}
            </p>
            {dataQrCode === "" ? (
              <Loading />
            ) : (
              <>
                <Image
                  src={dataQrCode?.qr ?? ""}
                  alt="qr-code"
                  width={400}
                  height={400}
                />
                <div className="flex gap-3">
                  <a
                    href={dataQrCode?.qr ?? ""}
                    download={`QR-${
                      dataQrCode?.data?.jenisBarang ?? "BARANG"
                    }-KE-${dataQrCode?.data?.barangKe ?? "0"}`}
                  >
                    <Button
                      color="green"
                      className="p-2 flex normal-case font-normal space-x-2"
                      size="sm"
                    >
                      <p>Download QR Code</p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 aspect-square"
                      >
                        <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                        <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                      </svg>
                    </Button>
                  </a>
                  <Button
                    color="blue"
                    className="p-2 flex normal-case font-normal space-x-2"
                    size="sm"
                    onClick={() => {
                      router.push(
                        {
                          pathname: `/dashboard/pdf`,
                          query: {
                            ...dataQrCode?.data,
                            qr: dataQrCode?.qr,
                          },
                        },
                        `/dashboard/pdf`
                      );
                    }}
                  >
                    <p>Print QR Code</p>
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
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="filled"
            color="green"
            onClick={() => setHandleOpenQrCode(!handleOpenQrCode)}
            className="mr-1"
          >
            <span>Tutup</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* NOTE - Dialog Delete Data */}
      <Dialog
        open={handleOpenDelete}
        size={"xs"}
        handler={() => setHandleOpenDelete(!handleOpenDelete)}
      >
        <DialogHeader>Hapus data?.</DialogHeader>
        <DialogBody divider>
          Anda yakin ingin menghapus data dengan ID {selectedID}?. Kegiatan ini
          tidak dapat diundur kembali
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => setHandleOpenDelete(!handleOpenDelete)}
            className="mr-1"
          >
            <span>Batal hapus</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={() => {
              setHandleOpenDelete(!handleOpenDelete);
              handleDelete(selectedID, selectedData);
            }}
          >
            <span>Ya, hapus data</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DataTable;
