import axios from "axios";
import { ExpandedStory } from "~/components/expanded-story";
import { API_URL } from "~/constants/api-url";

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const story = await axios.get(`${API_URL}/item/${params.slug}.json`);

  return (
    <div className="pt-20">
      <ExpandedStory story={story.data} />
    </div>
  );
};

export default Page;
