'use client';
import {Star,CaretDown} from  "@phosphor-icons/react";


function classNames(...classes:any) {
    return classes.filter(Boolean).join(' ')
  }
const reviews = {
    average: 4,
    totalCount: 1624,
    counts: [
      { rating: 5, count: 1019 },
      { rating: 4, count: 162 },
      { rating: 3, count: 97 },
      { rating: 2, count: 199 },
      { rating: 1, count: 147 },
    ],
    featured: [
      {
        id: 1,
        rating: 5,
        content: `
          <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
        `,
        author: 'Emily Selman',
        avatarSrc:
          'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
      },
      {
        id: 1,
        rating: 5,
        content: `
          <p>This is the bag of my dreams. I took it on my last vacation and was able to fit an absurd amount of snacks for the many long and hungry flights.</p>
        `,
        author: 'Emily Selman',
        avatarSrc:
          'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
      },
      // More reviews...
    ],
  }
  
const ReviewsComponent =()=>{

    return (
        <div className="bg-[#F9FAFB] border-[1px] rounded-[6px]">
        <div className="px-4 py-2  gap-[1.5rem]    md:px-[2rem] md:flex md:items-start">
          <div className="">
            {/* <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customer Reviews</h2> */}
            <div>
                <label htmlFor="">Sort by</label>
                <div className="max-w-[348px] bg-white border-[1px] border-[#98A2B3] rounded-[4px] py-[1rem] px-[0.875rem]
                flex mb-[2.5rem] mt-[0.25rem]
                ">
                    <select name="" id="" className="bg-[transparent] w-full">
                        <option value="">Most Recent</option>
                    </select>
                    {/* <CaretDown size={20} weight="fill" /> */}
                </div>
            </div>
            <div className="flex items-center gap-[0.25rem]">
                <p className="flex items-center ">
                    <Star className="text-yellow-400" 
                    weight="fill"
                    size={30}/>
                    <span className="text-[#1D2433] font-[700] text-[2rem]">4.8</span>
                </p>
                <p className="text-[#676E7E] font-[700] text-[1.5rem]">/5.0</p>
            </div>
            <p>1,210 users reviewed this hotel</p>
  
            {/* <div className="mt-3 flex items-center">
              <div>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <Star 
                      key={rating}
                      className={classNames(
                        reviews.average > rating ? 'text-yellow-400' : 'text-gray-300',
                        'h-5 w-5 flex-shrink-0'
                      )}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
              </div>
              <p className="ml-2 text-sm text-gray-900">Based on {reviews.totalCount} reviews</p>
            </div> */}
  
            <div className="mt-6">
              <h3 className="sr-only">Review data</h3>
  
              <dl className="space-y-3 border-[1px] p-[1.5rem] rounded-[6px] w-full md:w-[348px]">
                {reviews.counts.map((count) => (
                  <div key={count.rating} className="flex items-center font-[500] text-[1rem] text-[#676E7E]">
                    <dt className="flex flex-1 items-center ">
                      <p className="w-3 ">
                        {count.rating}
                        <span className="sr-only"> star reviews</span>
                      </p>
                      <div aria-hidden="true" className="ml-1 flex flex-1 items-center">
                        <p>star</p>
                        {/* <Star
                          className={classNames(
                            count.count > 0 ? 'text-yellow-400' : 'text-gray-300',
                            'h-5 w-5 flex-shrink-0'
                          )}
                          aria-hidden="true"
                        /> */}
  
                        <div className="relative ml-3 flex-1">
                          <div className="h-3 rounded-full border border-gray-200 bg-gray-100" />
                          {count.count > 0 ? (
                            <div
                              className="absolute inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                              style={{ width: `calc(${count.count} / ${reviews.totalCount} * 100%)` }}
                            />
                          ) : null}
                        </div>
                      </div>
                    </dt>
                    <dd className="ml-3 w-10 text-right tabular-nums ">
                      {Math.round((count.count / reviews.totalCount) * 100)}%
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
  
          </div>
  
            <div className="border-[1px] p-[1.5rem] w-full flex flex-col gap-[1.5rem]">
                {/* <div className=" ">
                </div> */}
                    {reviews.featured.map((review,index) => (
                        <div className="bg-white w-full border-b-[1px] border-[#D0D5DD] flex flex-col gap-[0.25rem]" key={index}>
                            <p className="text-[#1D2433] font-[700] text-[1.125rem]">Francesca, O.</p>
                            <p className="font-[500] text-[0.875rem] text-[#676E7E] flex items-center">
                                <span>Lagos, Nigeria</span>
                                <div className="w-[2px] h-[12px] bg-[#676E7E] mx-[.5rem]"></div>
                                <span>Apr 07, 2024</span>
                            </p>
                            <p className="flex items-center gap-[0.75rem]">
                                <span className="text-[#1D2433] text-[1.125rem] font-[500]">2.4</span>
                                <span className="flex gap-[0.813rem]">
                                <Star className="text-yellow-400"  weight="fill" size={20}/>
                                <Star className="text-yellow-400"  weight="fill" size={20}/>
                                <Star className="text-yellow-400"  weight="fill" size={20}/>
                                <Star className="text-yellow-400"  weight="fill" size={20}/>
                                <Star className="text-yellow-400"  weight="fill" size={20}/>
                                </span>
                            </p>
                            <p className="pb-[1.5rem] pt-[1rem] text-[#1D2739] font-[500] text-[1rem]">
                            I love the practicality of this passport holder. My kids love it too. Although I am not giving it 4 stars because of the colour options presented. I will like to request the production of more feminine colours. Great product, but I need more colours!
                            </p>
                        </div>
                    ))}
            </div>
        </div>
      </div>
    )
}

export default ReviewsComponent;































{/* <div key={review.id} className="">
<div className="flex items-center">
<img src={review.avatarSrc} alt={`${review.author}.`} className="h-12 w-12 rounded-full" />
<div className="ml-4">
    <h4 className="text-sm font-bold text-gray-900">{review.author}</h4>
    <div className="mt-1 flex items-center">
    {[0, 1, 2, 3, 4].map((rating) => (
        <Star
        key={rating}
        className={classNames(
            review.rating > rating ? 'text-yellow-400' : 'text-gray-300',
            'h-5 w-5 flex-shrink-0'
        )}
        aria-hidden="true"
        weight="fill"
        />
    ))}
    </div>
    <p className="sr-only">{review.rating} out of 5 stars</p>
</div>
</div>

<div
className="mt-4 space-y-6 text-base italic text-gray-600"
dangerouslySetInnerHTML={{ __html: review.content }}
/>
</div> */}
