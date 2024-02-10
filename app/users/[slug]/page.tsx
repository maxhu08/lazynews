import axios from "axios";
import { SubmissionsFeed } from "~/components/feeds/submissions-feed";
import { UserInfo } from "~/components/users/user-info";
import { API_URL } from "~/constants/api-url";
import { User } from "~/types";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const user: { data: User } = await axios.get(`${API_URL}/user/${params.slug}.json`);

  return (
    <div className="pt-20">
      <UserInfo user={user.data} />
      <SubmissionsFeed submissionIds={user.data.submitted} />
    </div>
  );
};

export default Page;
