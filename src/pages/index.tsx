import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { reduxState } from "@/interfaces/reduxInterface";
import { Form, Formik } from "formik";
import { Button, Checkbox, Input } from "@material-tailwind/react";
import Alert from "@/components/Alert";
import * as Yup from "yup";
import Loading from "@/components/Loading";

interface adminProps {
  email: string | null;
  password: string | null;
}

const adminValidation = Yup.object().shape({
  email: Yup.string()
    .email("Email tidak valid")
    .required("Email harus diisi !"),
  password: Yup.string().required("Password harus diisi !"),
});

const Home = (props: any) => {
  const router = useRouter(),
    dispatch = useDispatch(),
    [seePassword, setSeePassword] = useState<boolean>(false),
    [focus, setFocus] = useState<boolean>(false),
    [saveLogin, setSaveLogin] = useState<boolean>(false),
    initialValues: adminProps = {
      email: null,
      password: null,
    };
  // alert = useSelector((state: reduxState) => state.main.alert);

  const handleLogin = async (data: any) => {
    console.log(data);
    dispatch({
      type: "main/setLoading",
      payload: true,
    });
    dispatch({
      type: "main/setAlert",
      payload: {
        show: true,
        message: "Login berhasil",
        type: "success",
      },
    });
    setTimeout(() => {
      dispatch({
        type: "main/setLoading",
        payload: false,
      });
      router.push("/dashboard");
    }, 3000);
  };

  return (
    <>
      <Head>
        <title>Portal Balik | Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex w-screen h-screen">
        <Alert />
        <Loading />
        <div className="flex grow justify-center items-center">
          <Formik
            initialValues={initialValues}
            validationSchema={adminValidation}
            validateOnChange
            validateOnMount
            onSubmit={async (values, { setSubmitting }) => {
              dispatch({
                type: "main/setLoading",
                payload: true,
              });
              setSubmitting(true);
              const data = { id: props.id, ...values, saveLogin: saveLogin };
              await handleLogin(data);
              return false;
            }}
          >
            {({ isSubmitting, setFieldValue, touched, errors }) => (
              <Form className="lg:bg-transparent bg-white rounded-xl p-5 mx-3">
                <div
                  onFocus={() => setFocus(true)}
                  onBlurCapture={() => setFocus(false)}
                  className="flex flex-col gap-3 sm:w-80 w-full sm:p-0 px-3"
                >
                  <div className="bg-blue-400 p-4 rounded-lg">
                    <h3 className="text-3xl font-serif text-white font-bold">
                      Login
                    </h3>
                  </div>
                  <Input
                    variant="outlined"
                    color="blue"
                    size="lg"
                    type="text"
                    label={`${
                      errors.email && touched.email ? errors.email : "Email"
                    }`}
                    onChange={(e) => {
                      setFieldValue("email", e.target.value);
                    }}
                    error={errors.email && touched.email ? true : false}
                  />
                  <Input
                    variant="outlined"
                    color="blue"
                    size="lg"
                    icon={
                      seePassword ? (
                        <i
                          className="hover:text-blue-gray-700 transition-all"
                          onClick={() => setSeePassword(false)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="h-5 aspect-square"
                          >
                            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                            <path
                              fillRule="evenodd"
                              d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </i>
                      ) : (
                        <i
                          className="hover:text-blue-gray-700 transition-all"
                          onClick={() => setSeePassword(true)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-5 aspect-square"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.28 2.22a.75.75 0 00-1.06 1.06l14.5 14.5a.75.75 0 101.06-1.06l-1.745-1.745a10.029 10.029 0 003.3-4.38 1.651 1.651 0 000-1.185A10.004 10.004 0 009.999 3a9.956 9.956 0 00-4.744 1.194L3.28 2.22zM7.752 6.69l1.092 1.092a2.5 2.5 0 013.374 3.373l1.091 1.092a4 4 0 00-5.557-5.557z"
                              clipRule="evenodd"
                            />
                            <path d="M10.748 13.93l2.523 2.523a9.987 9.987 0 01-3.27.547c-4.258 0-7.894-2.66-9.337-6.41a1.651 1.651 0 010-1.186A10.007 10.007 0 012.839 6.02L6.07 9.252a4 4 0 004.678 4.678z" />
                          </svg>
                        </i>
                      )
                    }
                    type={seePassword ? "text" : "password"}
                    label={`${
                      errors.password && touched.password
                        ? errors.password
                        : "Password"
                    }`}
                    onChange={(e) => {
                      setFieldValue("password", e.target.value);
                    }}
                    error={errors.password && touched.password ? true : false}
                  />
                </div>
                <Checkbox
                  onChange={(_) => setSaveLogin(_.target.checked)}
                  color="blue"
                  label="Ingat Saya"
                />
                <div className="text-center">
                  <Button
                    className="mt-3"
                    type="submit"
                    disabled={isSubmitting}
                    color="green"
                    fullWidth
                  >
                    Masuk
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div
          className={`bg-blue-400 text-white lg:block fixed w-full h-full lg:h-auto lg:relative lg:w-2/4 -z-10 lg:m-3 p-5 shadow-lg transition-all lg:rounded-2xl ${
            focus ? "blur-xl" : "blur-0"
          }`}
        >
          <h2 className="font-serif font-bold text-5xl">PORTAL BALIK</h2>
          <p className="text-lg">Program Digitalisasi Barang Milik Daerah</p>
          <Image
            src={"/profil.png"}
            alt="login-images"
            className="object-cover bottom-0 left-1/2 -translate-x-1/2 mx-auto absolute"
            height={500}
            width={500}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
