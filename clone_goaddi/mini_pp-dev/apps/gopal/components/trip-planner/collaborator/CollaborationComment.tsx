import Image from "next/image";

const CollaborationComment = () => {
  return (
    <div className="flex items-start gap-2">
      <Image
        src={"/assets/avatar.png"}
        width={48}
        height={48}
        className="object-cover rounded-full"
        alt=""
      />
      <div className="flex flex-col items-start">
        <h3 className="font-medium text-[#1D2433]">Feyi Omoteni</h3>
        <p className="text-[#676E7E] text-sm">March 21, 2024 at 5:09pm</p>
        {/* Comment message */}
        <p className="text-[#1D2433] text-sm mt-2">
          Hey everyone, just wanted to share some updates on the trip! I booked
          our flights️ and also secured a great hotel. What activities are you
          most interested in? I found some interesting options for museums,
          historical sites, and walking tours.
        </p>
      </div>
    </div>
  );
};

export default CollaborationComment;
