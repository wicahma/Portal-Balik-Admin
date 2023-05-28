import { reduxState } from "@/interfaces/reduxInterface";
import {
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Switch,
  Tooltip,
} from "@material-tailwind/react";
import axios from "axios";
import { useFormikContext } from "formik";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const DataTable = (props: any) => {
  const { tableTitle, tableData, identifier } = props,
    [handleOpenDelete, setHandleOpenDelete] = React.useState<boolean>(false),
    [handleOpenEditImage, setHandleOpenEditImage] =
      React.useState<boolean>(false),
    [handleOpenPreview, setHandleOpenPreview] = React.useState<boolean>(false),
    [dataPreview, setHandleDataPreview] = React.useState<Object>({}),
    [selectedID, setSelectedID] = React.useState<string>(""),
    { values, setFieldValue }: any = useFormikContext(),
    dispatch = useDispatch(),
    [dataUpdateGambar, setDataGambar] = React.useState<any>([]),
    gambarWisata = React.useRef<HTMLInputElement>(null),
    gambarOutbond = React.useRef<HTMLInputElement>(null),
    gambarCar = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    setDataGambar([]);
  }, [handleOpenEditImage]);

  const getDataProduk = async (
    data: any,
    identifier: string,
    type?: string | undefined
  ) => {
    dispatch({
      type: "main/setLoading",
      payload: true,
    });
    axios
      .get(`${process.env.API_URL}/api/v1/${identifier}/${data._id}`)
      .then((res) => {
        switch (identifier) {
          case "wisata":
            type === "edit"
              ? dispatch({
                  type: "produk/setSelectedDataWisata",
                  payload: res.data.data,
                })
              : dispatch({
                  type: "produk/setSelectedDataWisataImage",
                  payload: res.data.data.jenisPaket,
                });
            break;
          case "outbond":
            type === "edit"
              ? dispatch({
                  type: "produk/setSelectedDataOutbond",
                  payload: res.data.data,
                })
              : dispatch({
                  type: "produk/setSelectedDataOutbondImage",
                  payload: res.data.data.jenisPaket,
                });
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        dispatch({
          type: "main/setLoading",
          payload: false,
        });
      });
  };

  //NOTE - Update Status Handler
  const updateStatus = (dataSelected: any, status: boolean) => {
    let carried;
    let state: any;
    switch (identifier) {
      //   case "barang":
      //     state = "produk/setWisataState";
      //     carried = {
      //       ...dataSelected,
      //       status: status ? "aktif" : "nonaktif",
      //     };
      //     break;
      //   case "kualitas":
      //     state = "produk/setMobilState";
      //     carried = {
      //       nama: dataSelected.unitName,
      //       harga: dataSelected.pricePerDay,
      //       seat: dataSelected.seat,
      //       fasilitas: dataSelected.fasilitas,
      //       status: status ? "aktif" : "nonaktif",
      //     };
      //     break;
      default:
        dispatch({
          type: "main/setLoading",
          payload: false,
        });
        return dispatch({
          type: "main/setAlert",
          payload: {
            type: "info",
            message: "Fitur Update Status belum diatur!",
            show: true,
          },
        });
    }
    dispatch({
      type: "main/setLoading",
      payload: true,
    });
    console.log(carried);
    axios
      .put(
        `${process.env.API_URL}/api/v1/${identifier}/${dataSelected._id}`,
        carried,
        {
          headers: {
            Authorization: `Bearer ${
              (localStorage.getItem("token") ||
                sessionStorage.getItem("token")) ??
              ""
            }`,
          },
        }
      )
      .then(({ data }) => {
        dispatch({
          type: "main/setLoading",
          payload: false,
        });
        const newTableData: any[] = [...tableData];
        newTableData.splice(
          tableData.findIndex((d: any) => d._id === data.data._id),
          1,
          {
            ...tableData.filter((d: any) => d._id === data.data._id)[0],
            status: status ? "aktif" : "nonaktif",
          }
        );
        console.log(newTableData);
        dispatch({ type: state, payload: newTableData });
        dispatch({
          type: "main/setAlert",
          payload: {
            type: "success",
            message: "Sukses mengubah status produk!",
            show: true,
          },
        });
      })
      .catch((err) => {
        dispatch({
          type: "main/setLoading",
          payload: false,
        });
        dispatch({
          type: "main/setAlert",
          payload: {
            type: "error",
            message: err.response?.data.message,
            show: true,
          },
        });
        console.log(err);
      });
  };

  //NOTE - Delete Handler
  const handleDelete = async (id: string) => {
    dispatch({
      type: "main/setLoading",
      payload: true,
    });
    let state: string;
    switch (identifier) {
      //   case "wisata":
      //     state = "produk/setWisataState";
      //     break;
      //   case "car":
      //     state = "produk/setMobilState";
      //     break;
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
    await axios
      .delete(`${process.env.API_URL}/api/v1/${identifier}/${id}`, {
        headers: {
          Authorization: `Bearer ${
            (localStorage.getItem("token") ||
              sessionStorage.getItem("token")) ??
            ""
          }`,
        },
      })
      .then(({ data, status }) => {
        dispatch({
          type: "main/setLoading",
          payload: false,
        });
        const newTableData = tableData.filter((data: any) => data._id !== id);
        dispatch({ type: state, payload: newTableData });
        dispatch({
          type: "main/setAlert",
          payload: {
            type: "success",
            message: data.message,
            show: true,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: "main/setLoading",
          payload: false,
        });
        dispatch({
          type: "main/setAlert",
          payload: {
            type: "error",
            message:
              err.response.data.message ||
              "Terjadi kesalahan, data gagal dihapus!",
            show: true,
          },
        });
      });
  };

  //NOTE - Edit Image Handler
  const handleEditFile = async (
    data: Array<File> | undefined,
    identifier: string | undefined,
    id: string | undefined
  ): Promise<any> => {
    dispatch({
      type: "main/setLoading",
      payload: true,
    });
    if (!id) {
      dispatch({
        type: "main/setLoading",
        payload: false,
      });
      return dispatch({
        type: "main/setAlert",
        payload: {
          type: "error",
          message:
            "ID belum terinput, Silahkan pilih ulang data yang akan diupdate terlebih dahulu",
          show: true,
        },
      });
    }
    const formData = new FormData();
    data?.map((file, i) => {
      formData.append("images", file);
    });
    axios
      .put(
        `${process.env.API_URL}/api/v1/${identifier}/${id}/images`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${
              (localStorage.getItem("token") ||
                sessionStorage.getItem("token")) ??
              ""
            }`,
          },
        }
      )
      .then((res) => {
        dispatch({
          type: "main/setAlert",
          payload: {
            type: "success",
            message: res.data.message,
            show: true,
          },
        });
        axios.get(`${process.env.API_URL}/api/v1/${identifier}`).then((res) => {
          let state;
          switch (identifier) {
            // case "wisata":
            //   state = "produk/setWisataState";
            //   break;
            // case "car":
            //   state = "produk/setMobilState";
            //   break;
            // case "outbond":
            //   state = "produk/setOutbondState";
            default:
              break;
          }
          dispatch({ type: state, payload: res.data.data });
        });
      })
      .catch((err) => {
        dispatch({
          type: "main/setAlert",
          payload: {
            type: "error",
            message:
              "Terjadi kesalahan pada server! data gambar gagal diupdate!",
            show: true,
          },
        });
        console.log(err);
      })
      .finally(() => dispatch({ type: "main/setLoading", payload: false }));
  };

  //NOTE - Handle Preview Page
  const handlePreviewPage = (data: any, identifier: string) => {
    switch (identifier) {
      //   case "wisata":
      //     window.open(
      //       `/paket-tour/private/${data?.namaPaket}/${data?._id}/detail`,
      //       "_blank"
      //     );
      //     break;
      //   case "car":
      //     window.open(`/sewa-mobil`, "_blank");
      //     break;
      // case "outbond":
      //   window.open(``);
      //   break;
      default:
        dispatch({
          type: "main/setAlert",
          payload: {
            type: "info",
            message: "Fitur belum diatur!",
            show: true,
          },
        });
        break;
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
          {tableData.map((data: any, i: number) => (
            <tr
              key={i}
              className="border-b border-gray-200 bg-gray-50 hover:bg-gray-100"
            >
              {Object.values(data).map(
                (value, ind): React.ReactNode => (
                  <td key={ind} className="py-3 px-6 text-left">
                    <div className="flex items-center">
                      <span className="font-medium">{String(value)}</span>
                    </div>
                  </td>
                )
              )}
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
                      onClick={() => {
                        setHandleOpenPreview(!handleOpenPreview);
                        setHandleDataPreview(data);
                      }}
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
                        onClick={() => {
                          switch (identifier) {
                            case "barang":
                              dispatch({
                                type: "item/setBarang",
                                payload: data,
                              });
                              break;
                            case "kualitas":
                              dispatch({
                                type: "item/setKualitas",
                                payload: data,
                              });
                              break;
                            default:
                              dispatch({
                                type: "main/setLoading",
                                payload: false,
                              });
                              return dispatch({
                                type: "main/setAlert",
                                payload: {
                                  type: "info",
                                  message: "Fitur edit gambar belum diatur!",
                                  show: true,
                                },
                              });
                          }
                        }}
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
                  {/* //NOTE - Update File */}
                  {identifier === "kualitas" && (
                    <Tooltip
                      content={"Update File"}
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0, y: 25 },
                      }}
                      className="bg-white text-gray-700 shadow-xl"
                    >
                      <div
                        onClick={() => {
                          switch (identifier) {
                            //   case "car":
                            //     dispatch({
                            //       type: "produk/setSelectedDataMobil",
                            //       payload: data,
                            //     });
                            //     break;
                            //   case "wisata":
                            //     getDataProduk(data, identifier);
                            //     break;
                            //   case "outbond":
                            //     getDataProduk(data, identifier);
                            //     break;
                            default:
                              dispatch({
                                type: "main/setLoading",
                                payload: false,
                              });
                              return dispatch({
                                type: "main/setAlert",
                                payload: {
                                  type: "info",
                                  message: "Fitur edit gambar belum diatur!",
                                  show: true,
                                },
                              });
                          }
                          setHandleOpenEditImage(!handleOpenEditImage);
                        }}
                        className="w-4 transform hover:text-blue-500 hover:scale-110"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
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
                      onClick={() => {
                        setSelectedID(data._id);
                        setHandleOpenDelete(true);
                      }}
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
            </tr>
          ))}
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
            data[0].includes("_id") ? (
              <div
                key={i}
                className="flex bg-blue-400 uppercase rounded-md mb-3 px-3 gap-3 justify-center text-white"
              >
                <h4>{data[0]}:</h4>
                <p>{data[1]}</p>
              </div>
            ) : (
              <div key={i} className="flex items-end gap-2 mx-5">
                <h4 className="font-medium text-lg">{data[0]}:</h4>
                <p className="font-light">{data[1]}</p>
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
              handleDelete(selectedID);
            }}
          >
            <span>Ya, hapus data</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* NOTE - Dialog Update Image */}
      <Dialog
        open={handleOpenEditImage}
        size={"xs"}
        handler={() => {
          setHandleOpenEditImage(!handleOpenEditImage);
          setDataGambar([]);
          if (gambarWisata.current) {
            gambarWisata.current!.value = "";
            gambarWisata.current!.files = null;
          }
          if (gambarCar.current) {
            gambarCar.current!.value = "";
            gambarCar.current!.files = null;
          }
        }}
      >
        <DialogHeader>Update Gambar.</DialogHeader>
        <DialogBody divider>
          {/*//NOTE - Update Gambar Mobil*/}
          {identifier === "car" && (
            <div className="space-y-3">
              {/* <Image
                src={
                  dataUpdateGambar.length > 0
                    ? URL.createObjectURL(dataUpdateGambar[0])
                    : `${process.env.API_URL}/images/${produk.selectedDataMobil?.imageId}`
                }
                alt={`Gambar Mobil - ${produk.selectedDataMobil?.imageId}`}
                height={400}
                width={500}
                className="w-full aspect-auto rounded-lg"
              /> */}
              <div className="flex justify-center items-center gap-3">
                <input
                  type="file"
                  ref={gambarCar}
                  accept="image/*"
                  onChange={(image: any) => {
                    const data = image.target.files[0];
                    if (data) {
                      return (
                        data.type.includes("image") &&
                        data.size <= 5_000_000 &&
                        setDataGambar([data])
                      );
                    }
                    image.target.files = [];
                    image.target.value = "";
                    return setDataGambar([]);
                  }}
                  className="relative m-0 block w-full min-w-0 flex-auto rounded-md border border-solid border-gray-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-gray-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-gray-400 file:px-3 file:py-[0.32rem] file:text-white file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-gray-200 focus:border-primary focus:text-gray-700 focus:shadow-te-primary focus:outline-none dark:border-gray-600 dark:text-gray-200 dark:file:bg-gray-700 dark:file:text-gray-100 dark:focus:border-primary"
                />
                <Tooltip
                  content={"Hapus gambar!"}
                  animate={{
                    mount: { scale: 1, y: 0 },
                    unmount: { scale: 0, y: 25 },
                  }}
                  className="bg-white text-gray-700 shadow-xl"
                >
                  <Button
                    disabled={dataUpdateGambar.length > 0 ? false : true}
                    className="p-2 flex justify-center items-center aspect-square rounded-full"
                    color="red"
                    onClick={() => {
                      setDataGambar([]);
                      gambarCar.current!.value = "";
                      gambarCar.current!.files = null;
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 aspect-square"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                      />
                    </svg>
                  </Button>
                </Tooltip>
              </div>
              <p className="text-xs font-light">
                <span className="text-red-500">*</span> Pastikan ukuran file
                tidak lebih dari 5 Mb.
              </p>
            </div>
          )}
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => {
              setHandleOpenEditImage(!handleOpenEditImage);
              setDataGambar([]);
              if (gambarCar.current) {
                gambarCar.current!.value = "";
                gambarCar.current!.files = null;
              }
            }}
            className="mr-1"
          >
            <span>Batal</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            disabled={dataUpdateGambar.length > 0 ? false : true}
            onClick={() => {
              let id;
              switch (identifier) {
                // case "car":
                //   id = produk.selectedDataMobil?._id;
                //   break;
                default:
                  dispatch({
                    type: "main/setLoading",
                    payload: false,
                  });
                  return dispatch({
                    type: "main/setAlert",
                    payload: {
                      type: "info",
                      message: "Fitur Update Gambar belum diatur!",
                      show: true,
                    },
                  });
              }
              handleEditFile(dataUpdateGambar, identifier, id);
              setHandleOpenEditImage(!handleOpenEditImage);
            }}
          >
            <span>Update File</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default DataTable;
