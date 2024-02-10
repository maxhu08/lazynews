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
      <div className="grid grid-flow-row gap-2">
        <UserInfo user={user.data} />
        <p className="font-semibold text-lg">User Submissions</p>
        <SubmissionsFeed submissionIds={user.data.submitted} />
      </div>
    </div>
  );
};

export default Page;
