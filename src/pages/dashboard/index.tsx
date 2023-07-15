import Layout from "@/components/Layout";
import Product from "@/components/Product";
import { getAllBarang } from "@/redux/actions/barang-action";
import { getAllKualitas } from "@/redux/actions/kualitas-action";
import { checkSession } from "@/redux/actions/user-action";
import { setUser } from "@/redux/slices/main";
import { wrapper } from "@/redux/store";
import { getServerSession } from "next-auth/next";
import { signOut } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";

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
  console.log(props);
  if (!props.isUserValid) {
    signOut()
    return <></>
  }
  return (
    <Layout>
      <Product />
    </Layout>
  );
};

export default Index;
