import axios from "axios";
import { useImperativeHandle } from "react";
import { UserInfo } from "~/components/users/user-info";
import { API_URL } from "~/constants/api-url";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const user = await axios.get(`${API_URL}/user/${params.slug}.json`);

  return (
    <div className="pt-20">
      <UserInfo user={user.data} />
    </div>
  );
};

export default Page;
