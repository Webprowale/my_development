'use client';
import { useMediaQuery } from 'react-responsive';




type Prop ={
    XTransform?:string,
    YTransform?:string,
     heading:string,
     content:any,
     img:string
}
const StudySimpleStep =({XTransform='0',YTransform='0',content,heading,img}:Prop)=>{
    const isDesktopOrLaptop = useMediaQuery({
        query: '(min-width: 1224px)'
      })
    return (
        <div className={`
        max-w-[224.54px] relative z-[20px]
        

        `}
        style={isDesktopOrLaptop?{
            'transform':`translateX(${XTransform}) translateY(${YTransform})`,
        }:{}}
        >
            <img src={img} className="block mx-auto h-[60px] w-[60px] mb-[.8rem] md:mb-[1.5rem]  md:h-[80px] md:w-[80px]" alt="" />
            <h3 className="text-[#1D2433] font-[700] text-[1.125rem] text-center ">{
                heading
            }</h3>
            <p className="font-[400] text-[#676E7E] text-[0.875rem] text-center ">
                {content}
            {/* Complete a <span className="text-primary">free assessment form</span> to help us guide you on the right track */}
            </p>
        </div>
    )
}

export default StudySimpleStep;