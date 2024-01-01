interface PageProps {
  params: {
    slug: string;
  };
}

const Page = ({ params }: PageProps) => {
  return (
    <div className="pt-20">
      <p>item id: {params.slug}</p>
    </div>
  );
};

export default Page;
