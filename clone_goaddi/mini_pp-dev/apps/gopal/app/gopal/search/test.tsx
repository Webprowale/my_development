import { Button } from "@/components/ui/button";

const SearchPage = () => {
  return (
    <>
      <div className="space-6 bg-white rounded-sm">
        <div className="flex gap-2 p-6">
          <Button className="bg-[#F0F2F5] text-black hover:text-white w-[82px]">
            People
          </Button>
          <Button className="bg-[#F0F2F5] text-black hover:text-white  w-[82px]">
            Post
          </Button>
        </div>
      </div>

      <div className="space-6 bg-white rounded-sm">search list</div>
    </>
  );
};

export default SearchPage;
