import {
  barangInterface,
  kualitasInterface,
} from "@/interfaces/reduxInterface";
import {
  Button,
  Input,
  Option,
  Popover,
  PopoverContent,
  PopoverHandler,
  Select,
  Switch,
  Tooltip,
} from "@material-tailwind/react";
import React, { useEffect } from "react";

interface FinderInterface {
  initData: any | barangInterface[] | kualitasInterface[];
  resultCallback: (data: any | barangInterface[] | kualitasInterface[]) => void;
  identifier: "barang" | "kualitas";
}

interface tanggalFilter {
  awal: string;
  akhir: string;
}

const Finder = ({ initData, resultCallback, identifier }: FinderInterface) => {
  const [product, setDataProduct] = React.useState<
      any | barangInterface | kualitasInterface
    >(initData),
    [barangFilter, setBarangFilter] = React.useState<Object>({}),
    [spmFilter, setSpmFilter] = React.useState<boolean>(false),
    [spkFilter, setSpkFilter] = React.useState<boolean>(false),
    [sp2dFilter, setSp2dFilter] = React.useState<boolean>(false),
    [spmFilterValue, setSpmFilterValue] = React.useState<tanggalFilter>({
      awal: "",
      akhir: "",
    }),
    [spkFilterValue, setSpkFilterValue] = React.useState<tanggalFilter>({
      awal: "",
      akhir: "",
    }),
    [sp2dFilterValue, setSp2dFilterValue] = React.useState<tanggalFilter>({
      awal: "",
      akhir: "",
    }),
    [kualitasFilter, setKualitasFilter] = React.useState<boolean>(false),
    [statusFilter, setStatusFilter] = React.useState<boolean>(false),
    [kualitasFilterValue, setKualitasFilterValue] = React.useState<
      string | undefined
    >(""),
    [statusFilterValue, setStatusFilterValue] = React.useState<
      string | undefined
    >("");

  const findProduct = (input: string) => {
    if (input.length > 0) {
      return setDataProduct(
        product.filter(
          (item: barangInterface | kualitasInterface | any) =>
            item._id.includes(input) ||
            (item.jenisBarang &&
              item.jenisBarang.toLowerCase().includes(input.toLowerCase())) ||
            (item._idBarang &&
              item._idBarang.toLowerCase().includes(input.toLowerCase())) ||
            (item.namaPemegang &&
              item.namaPemegang.toLowerCase().includes(input.toLowerCase())) ||
            (item.dokumenPemegang &&
              item.dokumenPemegang
                .toLowerCase()
                .includes(input.toLowerCase())) ||
            (item.nomorSPK &&
              item.nomorSPK.toLowerCase().includes(input.toLowerCase())) ||
            (item.nomorSPM &&
              item.nomorSPM.toLowerCase().includes(input.toLowerCase())) ||
            (item.nomorSP2D &&
              item.nomorSP2D.toLowerCase().includes(input.toLowerCase()))
        )
      );
    }
    return setDataProduct(initData);
  };

  const filterProduct = (identifier: "barang" | "kualitas") => {
    switch (identifier) {
      case "barang":
        if (spmFilter)
          setDataProduct(
            product.filter(
              (item: barangInterface) =>
                spmFilterValue.awal < item.tanggalSPM &&
                item.tanggalSPM < spmFilterValue.akhir
            )
          );
        if (spkFilter)
          setDataProduct(
            product.filter(
              (item: barangInterface) =>
                spkFilter &&
                spkFilterValue.awal < item.tanggalSPK &&
                item.tanggalSPK < spkFilterValue.akhir
            )
          );
        if (sp2dFilter)
          setDataProduct(
            product.filter(
              (item: barangInterface) =>
                sp2dFilter &&
                sp2dFilterValue.awal < item.tanggalSP2D &&
                item.tanggalSP2D < sp2dFilterValue.akhir
            )
          );
        break;
      case "kualitas":
        setDataProduct(
          product.filter(
            (item: kualitasInterface) =>
              (kualitasFilter ? item.kualitas === kualitasFilterValue : true) &&
              (statusFilter ? item.status === statusFilterValue : true)
          )
        );

        break;
      default:
        throw new Error("Identifier not found");
    }
  };

  useEffect(() => {
    resultCallback(product);
  }, [product, resultCallback]);

  return (
    <div className="my-5 flex gap-3">
      <div className="w-[300px] grow xl:grow-0 ml-3">
        <Input
          variant="outlined"
          className="border-blue-gray-400 border-2 rounded-full"
          label="Cari data"
          labelProps={{
            className:
              "text-blue-gray-400 after:border-none before:border-none",
          }}
          onChange={(e) => findProduct(e.target.value)}
          color="blue-gray"
        />
      </div>
      <Popover
        placement="right-start"
        animate={{
          mount: { scale: 1, x: 0, y: 0 },
          unmount: { scale: 0, x: -255, y: -5 },
        }}
      >
        <PopoverHandler>
          <Button
            variant="gradient"
            size="sm"
            color="blue-gray"
            className="rounded-full"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M10 3.75a2 2 0 10-4 0 2 2 0 004 0zM17.25 4.5a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM5 3.75a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zM4.25 17a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM17.25 17a.75.75 0 000-1.5h-5.5a.75.75 0 000 1.5h5.5zM9 10a.75.75 0 01-.75.75h-5.5a.75.75 0 010-1.5h5.5A.75.75 0 019 10zM17.25 10.75a.75.75 0 000-1.5h-1.5a.75.75 0 000 1.5h1.5zM14 10a2 2 0 10-4 0 2 2 0 004 0zM10 16.25a2 2 0 10-4 0 2 2 0 004 0z" />
            </svg>
          </Button>
        </PopoverHandler>
        <PopoverContent className="z-[100] space-y-4 w-[80%] md:w-fit">
          <h2 className="font-semibold text-xl capitalize text-gray-800">
            Filter {identifier}
          </h2>
          {identifier.includes("kualitas") && (
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
              <div className="space-y-3">
                <Switch
                  color="light-green"
                  id="kualitas-filter"
                  label={"Kualitas"}
                  checked={kualitasFilter}
                  onChange={(e) => setKualitasFilter(e.target.checked)}
                />
                <div className={`${kualitasFilter ? "block" : "hidden"}`}>
                  <Select
                    variant="standard"
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 25 },
                    }}
                    label={"Kualitas Barang"}
                    value={kualitasFilterValue}
                    onChange={(e) => setKualitasFilterValue(e)}
                  >
                    <Option value="baik">Baik</Option>
                    <Option value="rusak">Rusak</Option>
                  </Select>
                </div>
              </div>
              <div className="space-y-3">
                <Switch
                  color="light-green"
                  id="status-filter"
                  label={"Status"}
                  checked={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.checked)}
                />
                <div className={`${statusFilter ? "block" : "hidden"}`}>
                  <Select
                    variant="standard"
                    animate={{
                      mount: { y: 0 },
                      unmount: { y: 25 },
                    }}
                    label={"Status Barang"}
                    value={statusFilterValue}
                    onChange={(e) => setStatusFilterValue(e)}
                  >
                    <Option value="digunakan">Digunakan</Option>
                    <Option value="tidak-digunakan">Tidak Digunakan</Option>
                    <Option value="service">Service</Option>
                  </Select>
                </div>
              </div>
            </div>
          )}
          {identifier.includes("barang") && (
            <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
              <div className="space-y-5 w-full">
                <Switch
                  color="light-green"
                  label={"Rentang Tanggal SPM"}
                  id="spm-filter"
                  checked={spmFilter}
                  onChange={(e) => setSpmFilter(e.target.checked)}
                />
                <div className={`space-y-3 ${spmFilter ? "block" : "hidden"}`}>
                  <Input
                    variant="standard"
                    value={spmFilterValue.awal}
                    type="date"
                    label="Tanggal Awal"
                    onChange={(e) =>
                      setSpmFilterValue({
                        ...spmFilterValue,
                        awal: e.target.value,
                      })
                    }
                  />
                  <Input
                    variant="standard"
                    type="date"
                    label="Tanggal Akhir"
                    value={spmFilterValue.akhir}
                    onChange={(e) =>
                      setSpmFilterValue({
                        ...spmFilterValue,
                        akhir: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-5 w-full">
                <Switch
                  color="light-green"
                  id="spk-filter"
                  label={"Rentang Tanggal SPK"}
                  checked={spkFilter}
                  onChange={(e) => setSpkFilter(e.target.checked)}
                />
                <div className={`space-y-3 ${spkFilter ? "block" : "hidden"}`}>
                  <Input
                    variant="standard"
                    type="date"
                    label="Tanggal Awal"
                    value={spkFilterValue.awal}
                    onChange={(e) =>
                      setSpkFilterValue({
                        ...spkFilterValue,
                        awal: e.target.value,
                      })
                    }
                  />
                  <Input
                    variant="standard"
                    type="date"
                    label="Tanggal Akhir"
                    value={spkFilterValue.akhir}
                    onChange={(e) =>
                      setSpkFilterValue({
                        ...spkFilterValue,
                        akhir: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="space-y-5 w-full">
                <Switch
                  color="light-green"
                  id="sp2d-filter"
                  label={"Rentang Tanggal SP2D"}
                  checked={sp2dFilter}
                  onChange={(e) => setSp2dFilter(e.target.checked)}
                />
                <div className={`space-y-3 ${sp2dFilter ? "block" : "hidden"}`}>
                  <Input
                    variant="standard"
                    type="date"
                    label="Tanggal Awal"
                    value={sp2dFilterValue.awal}
                    onChange={(e) =>
                      setSp2dFilterValue({
                        ...sp2dFilterValue,
                        awal: e.target.value,
                      })
                    }
                  />
                  <Input
                    variant="standard"
                    type="date"
                    label="Tanggal Akhir"
                    value={sp2dFilterValue.akhir}
                    onChange={(e) =>
                      setSp2dFilterValue({
                        ...sp2dFilterValue,
                        akhir: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          )}
          <div className="flex gap-3 justify-end col-span-3">
            <Tooltip
              content={"Hapus Filter"}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
              placement="bottom"
              className="bg-white z-[200] text-gray-700 shadow-xl"
            >
              <Button
                size="sm"
                color="red"
                onClick={() => {
                  setSp2dFilter(false);
                  setSpkFilter(false);
                  setSpmFilter(false);
                  setKualitasFilter(false);
                  setStatusFilter(false);
                  setSpmFilterValue({ awal: "", akhir: "" });
                  setSpkFilterValue({ awal: "", akhir: "" });
                  setSp2dFilterValue({ awal: "", akhir: "" });
                  setKualitasFilterValue("");
                  setStatusFilterValue("");
                  setDataProduct(initData);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 aspect-square"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                    clip-rule="evenodd"
                  />
                </svg>
              </Button>
            </Tooltip>
            <Tooltip
              content={"Terapkan filter"}
              animate={{
                mount: { scale: 1, y: 0 },
                unmount: { scale: 0, y: 25 },
              }}
              placement="bottom"
              className="bg-white z-[200] text-gray-700 shadow-xl"
            >
              <Button
                size="sm"
                color="light-green"
                onClick={() => {
                  //NOTE - Filter Barang
                  console.log("spm", spmFilterValue);
                  console.log("spk", spkFilterValue);
                  console.log("sp2d", sp2dFilterValue);
                  //NOTE - Filter Kualitas
                  console.log("kualitas", kualitasFilterValue);
                  console.log("status", statusFilterValue);
                  filterProduct(identifier);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 aspect-square"
                >
                  <path
                    fill-rule="evenodd"
                    d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
                    clip-rule="evenodd"
                  />
                </svg>
              </Button>
            </Tooltip>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Finder;
