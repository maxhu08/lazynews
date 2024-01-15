interface PageProps {
  params: {
    slug: string;
  };
}

const Page = ({ params }: PageProps) => {
  return <div className="grid place-items-center w-full h-screen">{params.slug}</div>;
};

export default Page;
