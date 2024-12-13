import GoButton from "@/components/goui/button";



type Prop ={
    colorVariant?:'lightBlue'|'thickblue'
}
const StudyFooterCard =({colorVariant='lightBlue'}:Prop)=>{

    return (
        <div 
        className="p-[1rem] text-center md:text-left md:py-[3rem] md:px-[2.813rem] rounded-[5px]"
        style={{
            background:colorVariant==='lightBlue'?'url(/assets/study/StudyFooterCard.svg)':'url(/assets/study/bluestudyfooterbgiomgae.svg)',
            backgroundColor:colorVariant==='lightBlue'?'#e7f0ff':'#0d6efd' ,
            backgroundRepeat:'no-repeat',
            backgroundSize:'cover',
            // backgroundPositionX:'6px',
        }}
        >
            <h2 className={`font-[700] text-[1.2rem]  md:text-[2.25rem]  ${colorVariant=='thickblue'?'text-white':''}`}>
            Get Matched with the Perfect Program for You!
            </h2>
            <p className={`font-[500] text-[1rem] pt-[0.75rem] pb-[1.5rem] text-[#676E7E]  ${colorVariant=='thickblue'?'text-white':''}` }>
            Complete a free assessment form to help us guide you on the right track
            </p>
            <GoButton
            className={`!text-[1.125rem] font-[500] py-[1rem] px-[2rem] ${colorVariant=='thickblue'?'bg-white text-primary':''}`}
            >
                Take Eligibility Assesment
            </GoButton>
        </div>
    )
};
export default StudyFooterCard;
