import React from "react";
import Account from "../../components/AccountsPage/Account";
import { GetStaticProps, GetStaticPaths } from "next";
import { getAllUsersId, getUserById } from "../../lib/Database";

interface Props {
	account: {
		description: string,
		email: string,
		username: string
	}
}

const accountPage: React.FC<Props> = ({account}) => {
  return <Account username={account.username} email={account.email} description={account.email} />;
};

export const getStaticPaths: GetStaticPaths = async (context) => {
  const res: string[] = await getAllUsersId();
	const paths = res.map(id => ({params: {accountId: id}}))
	return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const accountId = context.params?.accountId;
	const account = await getUserById(accountId as string) as Document;
  return {
    props: {
      account: account
    },
  };
};

export default accountPage;
