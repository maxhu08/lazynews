import axios from "axios";
import { Metadata } from "next";
import { ExpandedStory } from "~/components/expanded-story";
import { API_URL } from "~/constants/api-url";
import { Story } from "~/types";

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const story: { data: Story } = await axios.get(`${API_URL}/item/${params.slug}.json`);

  return {
    title: story.data.title,
    description: story.data.text
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
