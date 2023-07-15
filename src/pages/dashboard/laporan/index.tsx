import Layout from "@/components/Layout";
import { kualitasInterface, reduxState } from "@/interfaces/reduxInterface";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getAllBarang } from "@/redux/actions/barang-action";
import { getAllKualitas } from "@/redux/actions/kualitas-action";
import { checkSession } from "@/redux/actions/user-action";
import { setUser } from "@/redux/slices/main";
import { wrapper } from "@/redux/store";
import { Button, Input } from "@material-tailwind/react";
import xlsx, { IJsonSheet } from "json-as-xlsx";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

interface dateRange {
  start: string;
  end: string;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res, ...etc }) => {
      const session = await getServerSession(req, res, authOptions);
      if (!session) {
        return {
          redirect: {
            destination: "/",
            permanent: false,
          },
        };
      }

      const { dispatch } = store;
      const isValid = await checkSession({ session, dispatch });
      await getAllBarang({ dispatch, session });
      await getAllKualitas({ dispatch, session });
      dispatch(setUser(session.user));
      return {
        props: { isUserValid: isValid },
      };
    }
);

const Index = (props: any) => {
  const dataKualitas = useSelector(
      (state: reduxState) => state.item.dataKualitas
    ),
    [dateRangeMonth, setDateRangeMonth] = React.useState<dateRange>({
      start: "",
      end: "",
    }),
    [errorMonth, setErrorMonth] = React.useState<string>(""),
    [errorWeek, setErrorWeek] = React.useState<string>(""),
    [dateRangeWeek, setDateRangeWeek] = React.useState<dateRange>({
      start: "",
      end: "",
    });

  const generateXlsx = async (type: string, downloadAll: boolean) => {
    let newDataKualitas: any = [];
    const thisDay = new Date();
    if (type === "month") {
      !downloadAll
        ? (newDataKualitas = dataKualitas.filter((item: kualitasInterface) => {
            const date = new Date(item.updatedAt);
            return (
              date >= new Date(dateRangeMonth.start) &&
              date <= new Date(dateRangeMonth.end)
            );
          }))
        : (newDataKualitas = dataKualitas.filter((item: kualitasInterface) => {
            const date = new Date(item.updatedAt);
            return (
              date >= new Date(date.getFullYear(), date.getMonth(), 1) &&
              date <= new Date(date.getFullYear(), date.getMonth() + 1, 0)
            );
          }));
    } else {
      !downloadAll
        ? (newDataKualitas = dataKualitas.filter((item) => {
            const date = new Date(item.updatedAt);
            return (
              date >= new Date(dateRangeWeek.start) &&
              date <= new Date(dateRangeWeek.end)
            );
          }))
        : (newDataKualitas = dataKualitas.filter((item) => {
            const date = new Date(item.updatedAt);
            return (
              date >= new Date(thisDay.getDate() - thisDay.getDay()) &&
              date <= new Date(thisDay.getDate() - thisDay.getDay() + 6)
            );
          }));
    }
    const dataJSON: IJsonSheet[] = [
      {
        sheet: "Riwayat Kualitas",
        columns: [
          { value: "_id", label: "ID Riwayat" },
          { value: "_idBarang", label: "ID Barang" },
          { value: "gambar", label: "Gambar" },
          { value: "namaPemegang", label: "Nama Pemegang" },
          { value: "dokumenPemegang", label: "Dokumen Pemegang" },
          { value: "kondisi", label: "Kondisi" },
          { value: "status", label: "Status" },
          { value: "barangKe", label: "List Barang Ke" },
          { value: "updatedAt", label: "Pembaruan Terakhir" },
        ],
        content: newDataKualitas,
      },
      {
        sheet: "Riwayat Rusak",
        columns: [
          { value: "_id", label: "ID Riwayat" },
          { value: "_idBarang", label: "ID Barang" },
          { value: "gambar", label: "Gambar" },
          { value: "namaPemegang", label: "Nama Pemegang" },
          { value: "dokumenPemegang", label: "Dokumen Pemegang" },
          { value: "kondisi", label: "Kondisi" },
          { value: "status", label: "Status" },
          { value: "barangKe", label: "List Barang Ke" },
          { value: "updatedAt", label: "Pembaruan Terakhir" },
        ],
        content: newDataKualitas.filter(
          (data: any) => data.kondisi === "rusak"
        ),
      },
      {
        sheet: "Riwayat Baik",
        columns: [
          { value: "_id", label: "ID Riwayat" },
          { value: "_idBarang", label: "ID Barang" },
          { value: "gambar", label: "Gambar" },
          { value: "namaPemegang", label: "Nama Pemegang" },
          { value: "dokumenPemegang", label: "Dokumen Pemegang" },
          { value: "kondisi", label: "Kondisi" },
          { value: "status", label: "Status" },
          { value: "barangKe", label: "List Barang Ke" },
          { value: "updatedAt", label: "Pembaruan Terakhir" },
        ],
        content: newDataKualitas.filter((data: any) => data.kondisi === "baik"),
      },
      {
        sheet: "Riwayat Service",
        columns: [
          { value: "_id", label: "ID Riwayat" },
          { value: "_idBarang", label: "ID Barang" },
          { value: "gambar", label: "Gambar" },
          { value: "namaPemegang", label: "Nama Pemegang" },
          { value: "dokumenPemegang", label: "Dokumen Pemegang" },
          { value: "kondisi", label: "Kondisi" },
          { value: "status", label: "Status" },
          { value: "barangKe", label: "List Barang Ke" },
          { value: "updatedAt", label: "Pembaruan Terakhir" },
        ],
        content: newDataKualitas.filter(
          (data: any) => data.kondisi === "service"
        ),
      },
    ];

    const settings = {
      fileName: "Riwayat Kualitas", // Name of the resulting spreadsheet
      extraLength: 3, // A bigger number means that columns will be wider
      writeMode: "writeFile", // The available parameters are 'WriteFile' and 'write'. This setting is optional. Useful in such cases https://docs.sheetjs.com/docs/solutions/output#example-remote-file
      writeOptions: {}, // Style options from https://docs.sheetjs.com/docs/api/write-options
      RTL: false, // Display the columns from right-to-left (the default value is false)
    };

    return xlsx(dataJSON, settings);
  };

  useEffect(() => {
    const start = new Date(dateRangeMonth.start),
      epochTime30Days = start.setDate(start.getDate() + 30);
    const endDate = new Date(epochTime30Days);
    setDateRangeMonth({
      ...dateRangeMonth,
      end:
        endDate.getFullYear() +
        "-" +
        (endDate.getMonth() + 1) +
        "-" +
        endDate.getDate(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRangeMonth.start]);

  useEffect(() => {
    const start = new Date(dateRangeWeek.start),
      epochTime30Days = start.setDate(start.getDate() + 7);
    const endDate = new Date(epochTime30Days);
    setDateRangeWeek({
      ...dateRangeWeek,
      end:
        endDate.getFullYear() +
        "-" +
        (endDate.getMonth() + 1) +
        "-" +
        endDate.getDate(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRangeWeek.start]);

  if (!props.isUserValid) {
    signOut();
    return <></>;
  }
  return (
    <Layout>
      <div className="container text-gray-800 mx-auto block md:p-10 py-10 px-2">
        <h2 className="text-3xl font-semibold">Laporan Barang</h2>
        <div className="grid grid-cols-6 my-10 gap-5">
          <div className="md:col-span-3 col-span-6">
            <h3 className="text-xl text-center">Bulan Ini</h3>
            <div className="bg-gray-200 rounded-xl px-5 py-3 space-y-4">
              <p>
                Download laporan bulan ini{" "}
                <Button color="green" className="p-2" size="sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 aspect-square"
                    onClick={() => generateXlsx("month", true)}
                  >
                    <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                    <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                  </svg>
                </Button>
              </p>
              <p>
                Atau download laporan Bulanan lainnya dengan memasukkan tanggal
                awal
              </p>
              <div className="flex gap-2">
                <Input
                  value={dateRangeMonth.start}
                  onChange={(e) => {
                    setErrorMonth("");
                    setDateRangeMonth({
                      ...dateRangeMonth,
                      start: e.target.value,
                    });
                  }}
                  error={errorMonth !== "" ? true : false}
                  label={`${errorMonth !== "" ? errorMonth : "Tanggal awal"}`}
                  type="date"
                />
                <Button
                  className="p-2 aspect-square"
                  color="red"
                  disabled={dateRangeMonth.start === ""}
                  onClick={() =>
                    setDateRangeMonth({
                      start: "",
                      end: "",
                    })
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 aspect-square"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </div>
              {dateRangeMonth.start !== "" && (
                <div className="flex items-center gap-3">
                  <div>
                    Rentang tanggal yang dipilih: {dateRangeMonth.start} -{" "}
                    {dateRangeMonth.end}
                  </div>
                  <Button
                    color="green"
                    className="p-2 flex gap-3 items-center"
                    size="sm"
                    onClick={() => generateXlsx("month", false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 aspect-square"
                    >
                      <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                      <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                    </svg>
                    <p>Download</p>
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div className="md:col-span-3 col-span-6">
            <h3 className="text-xl text-center">Minggu Ini</h3>
            <div className="bg-gray-200 rounded-xl px-5 py-3 space-y-4">
              <p>
                Download laporan minggu ini{" "}
                <Button
                  color="green"
                  className="p-2"
                  size="sm"
                  onClick={() => generateXlsx("week", true)}
                >
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
              </p>
              <p>
                Atau download laporan Mingguan lainnya dengan memasukkan tanggal
                awal
              </p>
              <div className="flex gap-2">
                <Input
                  value={dateRangeWeek.start}
                  onChange={(e) => {
                    setErrorWeek("");
                    setDateRangeWeek({
                      ...dateRangeWeek,
                      start: e.target.value,
                    });
                  }}
                  error={errorWeek !== "" ? true : false}
                  label={`${errorWeek !== "" ? errorMonth : "Tanggal awal"}`}
                  type="date"
                />
                <Button
                  className="p-2 aspect-square"
                  color="red"
                  disabled={dateRangeWeek.start === ""}
                  onClick={() =>
                    setDateRangeWeek({
                      start: "",
                      end: "",
                    })
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 aspect-square"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </div>
              {dateRangeWeek.start !== "" && (
                <div className="flex items-center gap-3">
                  <p>
                    Rentang tanggal yang dipilih: {dateRangeWeek.start} -{" "}
                    {dateRangeWeek.end}
                  </p>
                  <Button
                    color="green"
                    className="p-2 flex gap-3 items-center"
                    size="sm"
                    onClick={() => generateXlsx("week", false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 aspect-square"
                    >
                      <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
                      <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
                    </svg>
                    <p>Download</p>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
