'use client'
import Navbar from "@/components/home/navbar";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { ScrollToNavBarDetail } from "../gopal/hotels/details/[id]/components/NavTab";


const BlueNotePin = ({name,body}:{name:string,body:string})=>{
    return (
        <div className="p-[1.5rem] font-satoshi bg-[#E7F0FF] w-[275px]">
            <h2 className="text-[#00004A] font-[700] text-[18px]">{name}</h2>
            <p className="font-[400] text-[15px] text-[#00004A] leading-[26px] rounded-[4px]">
            {body}
            </p>
        </div>
    )
}
type ListedItemsProp = React.PropsWithChildren<{

}>
const ListedItems = ({children}:ListedItemsProp)=>(
    <p className="flex gap-[0.832rem]">
    <PaperPlaneTilt size={15} weight="fill"  className="text-[#0D6EFD]" />
    <span className="block w-[95%]"> {children}</span>   
</p>
)

const WelcomeDiv =()=>{

    return (
        <div className="w-[80%]" id="WelcomeDiv"> 
            <h1 className="font-satoshi font-[900] text-[2rem] pb-[0.875rem]">Welcome to GoPaddi!</h1>

            <div className="font-satoshi font-[400] text-[18px] text-[#1D2433]">
                <p className="pb-[1rem]">These terms and conditions outline the rules and regulations for the use of our website.</p>
                <p className="pb-[1.5rem]">By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use GoPaddi if you do not accept all of the terms and conditions stated on this page. </p>
                <p  className="pb-[1.5rem]">The following terminology applies to these Terms and Conditions:</p>
            </div>

            <div className="flex flex-col gap-[0.875rem] items-start">
                <ListedItems >
                    "Client", "You" and "Your" refers to you, the person accessing this website and accepting the Company’s terms and conditions.
                </ListedItems>

                <ListedItems>
                    "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company.
                </ListedItems>
                <ListedItems>
                    "Party", "Parties", or "Us", refers to both the Client and ourselves, or either the Client or ourselves.
                </ListedItems>
                <ListedItems>
                    All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner, whether by formal meetings of a fixed duration, or any other means, for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services/products, in accordance with and subject to, prevailing law of Nigeria.
                </ListedItems>
                <ListedItems>
                    Any use of the above terminology or other words in the singular, plural, capitalisation and/or he/she or they, are taken as interchangeable and therefore as referring to the same.
                </ListedItems>
            </div>
        </div>
    )
};

const Cookies =()=>{
    return(
        <div  className="w-[80%]" id="Cookies">
            <h1 className="font-satoshi font-[900] text-[2rem] pb-[0.875rem]">Cookies</h1>
            <div
            className="font-satoshi font-[400] text-[18px] text-[#1D2433]"
            >
                <p className="pb-[1rem]">We utilize cookies on GoPaddi in accordance with industry standards. </p>
                <p
                className="pb-[1rem]"
                >
                    Your use of our website constitutes your consent to the deployment of cookies as outlined in our privacy policy. These cookies are instrumental in enhancing your browsing experience and facilitating site functionality. 
                </p>
                <p
                className="pb-[1rem]"
                
                >
                For detailed information regarding our cookie practices, please refer to our <a href="" className="text-[#0D6EFD]">privacy policy</a>. Your continued use of our website signifies your acceptance of these practices.
                </p>
            </div>
        </div>
    )
}
const License =()=>{

    return (
        <div 
        className="w-[80%] font-satoshi "
        id="License"
        >
            <h1 className="font-satoshi font-[900] text-[2rem] pb-[0.875rem]">License</h1>

            <div className="font-satoshi font-[400] text-[18px] text-[#1D2433]">
                <p  className="pb-[1rem]">
                Unless otherwise stated, GoPaddi and/or its licensors own the intellectual property rights for all material on GoPaddi. All intellectual property rights are reserved. You may view and/or print pages from GoPaddi for your own personal use subject to restrictions set in these terms and conditions.
                </p>
            </div>

            <p className="font-[700] text-[18px] pb-[0.875rem] "><strong>You must not:</strong></p>
            <div className="flex gap-[1rem] flex-col">
            <ListedItems>
            Republish material from GoPaddi
            </ListedItems>
            <ListedItems>
            Sell, rent or sub-license material from GoPaddi
            </ListedItems>
            <ListedItems>
            Reproduce, duplicate or copy material from GoPaddi
            </ListedItems>
            <ListedItems>
            Redistribute content from GoPaddi (unless content is specifically made for redistribution).
            </ListedItems>
            </div>
        </div>
    )
}

const UserComments =()=>{
    return (
        <div className="w-[80%]" id="UserComments">

            <h1 className="font-satoshi font-[900] text-[2rem] pb-[0.875rem]">User Comments</h1>

        <div className="font-satoshi font-[400] text-[18px] text-[#1D2433]">
            <p className="pb-[1rem]">Certain parts of this website offer the opportunity for users to post and exchange opinions, information, material and data ('Comments') in areas of the website. GoPaddi does not screen, edit, publish or review Comments prior to their appearance on the website and Comments do not reflect the views or opinions of GoPaddi, its agents or affiliates. Comments reflect the view and opinion of the person who posts such view or opinion. To the extent permitted by applicable laws GoPaddi shall not be responsible or liable for the Comments or for any loss cost, liability, damages or expenses caused and or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</p>
            <p className="pb-[1rem]">GoPaddi reserves the right to monitor all Comments and to remove any Comments which it considers in its absolute discretion to be inappropriate, offensive or otherwise in breach of these Terms and Conditions</p>
        </div>

        <div>
            <p className="font-[700] text-[18px] pb-[0.875rem] "><strong>You must not:</strong></p>
            <div className="flex gap-[1rem] flex-col">
            <ListedItems>
            You are entitled to post the Comments on our website and have all necessary licenses and consents to do so;
                </ListedItems>

                <ListedItems>
                The Comments do not infringe any intellectual property right, including without limitation copyright, patent or trademark, or other proprietary right of any third party;
                </ListedItems>

                <ListedItems>
                The Comments do not contain any defamatory, libelous, offensive, indecent or otherwise unlawful material or material which is an invasion of privacy.
                </ListedItems>
            </div>
        </div>

        </div>
    )
}
const HyperLinkingToOurContent =()=>{

    return (
        <div  className="w-[80%]" id="HyperLinkingToOurContent"> 
            <h1 className="font-satoshi font-[900] text-[2rem] pb-[0.875rem]">Hyperlinking to our Content</h1>
            <p className="font-satoshi font-[400] text-[18px] text-[#1D2433] pb-[1rem]">The following organizations may link to our website without prior written approval:</p>

            <div className="flex flex-col gap-[0.875rem] items-start">
                <ListedItems>
                Government agencies;
                </ListedItems>

                <ListedItems>
                Search engines;
                </ListedItems>

                <ListedItems>
                News organizations;
                </ListedItems>


                <ListedItems>
                Online directory distributors when they list us in the directory may link to our website in the same manner as they hyperlink to the websites of other listed businesses; and
                </ListedItems>

                <ListedItems>
                Systemwide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our website.
                </ListedItems>
            </div>

            <div className="font-satoshi font-[400] text-[18px] text-[#1D2433]">
                <p className="py-[1rem]">These organizations may link to our home page, to publications or to other website information so long as the link: (a) is not in any way misleading; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party’s site.</p>
                <p  className="pb-[1rem]">We may consider and approve in our sole discretion other link requests from the following types of organizations:</p>
            </div>

            <div className="flex flex-col gap-[0.875rem] items-start">
                <ListedItems>
                commonly-known consumer and/or business information sources such as Chambers of Commerce, American Automobile Association, AARP and Consumers Union;
                </ListedItems>

                <ListedItems>
                dot.com community sites;
                </ListedItems>
                <ListedItems>
                associations or other groups representing charities, including charity giving sites,
                </ListedItems>
                <ListedItems>
                online directory distributors;
                </ListedItems>
                <ListedItems>
                internet portals;   
                </ListedItems>
                <ListedItems>
                accounting, law and consulting firms whose primary clients are businesses; and
                </ListedItems>
                <ListedItems>
                educational institutions and trade associations.
                </ListedItems>
            </div>

            <div
            className="font-satoshi font-[400] text-[18px] text-[#1D2433]"
            >
                <p className="pb-[1rem]">
                We will approve link requests from these organizations if we determine that: (a) the link would not reflect unfavorably on us or our accredited businesses (for example, trade associations or other organizations representing inherently suspect types of business, such as work-at-home opportunities, shall not be allowed to link); (b)the organization does not have an unsatisfactory record with us; (c) the benefit to us from the visibility associated with the hyperlink outweighs the absence of ; and (d) where the link is in the context of general resource information or is otherwise consistent with editorial content in a newsletter or similar product furthering the mission of the organization.
                </p>
                <p className="pb-[1rem]">
                These organizations may link to our home page, to publications or to other website information so long as the link: (a) is not in any way misleading; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and it products or services; and (c) fits within the context of the linking party’s site.
                </p>
                <p className="pb-[1rem]">
                If you are among the organizations listed in paragraph 2 above and are interested in linking to our website, you must notify us by sending an e-mail to [Your Name]@[Your Website]. Please include your name, your organization name, contact information (such as a phone number and/or e-mail address) as well as the URL of your site, a list of any URLs from which you intend to link to our Web site, and a list of the URL(s) on our site to which you would like to link. Allow 2-3 weeks for a response.
                </p>

                <p className="pb-[1rem]">Approved organizations may hyperlink to our Web site as follows:</p>
                <div className="pb-[1rem] flex flex-col gap-[0.875rem] items-start">
                <ListedItems>
                By use of our corporate name; or
                </ListedItems>

                <ListedItems>
                By use of the uniform resource locator (Web address) being linked to; or
                </ListedItems>

                <ListedItems>
                By use of any other description of our Web site or material being linked to that makes sense within the context and format of content on the linking party’s site.
                </ListedItems>
                </div>
                <p>No use of GoPaddi's logo or other artwork will be allowed for linking absent a trademark license agreement.</p>
            </div>
        </div>
    )
}

const ContentLiablity =()=>{
    return (
        <div className="w-[80%]" id="ContentLiablity">
            <h1 className="font-satoshi font-[900] text-[2rem] pb-[0.875rem]">Content Liability</h1>

            <div className="font-satoshi font-[400] text-[18px] text-[#1D2433]">
                <p className="pb-[1rem]">We shall have no responsibility or liability for any content appearing on your Web site. You agree to indemnify and defend us against all claims arising out of or based upon your Website. </p>
                <p className="pb-[1rem]">No link(s) may appear on any page on your Web site or within any context containing content or materials that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p>
            </div>
        </div>
    )
}
const ReservationOfFlights =()=>{

    return (
        <div className="w-[80%]" id="ReservationOfFlights">
        <h1 className="font-satoshi font-[900] text-[2rem] pb-[0.875rem]">Reservation of Rights</h1>

        <div className="font-satoshi font-[400] text-[18px] text-[#1D2433]">
            <p className="pb-[1rem]">
            We reserve the right at any time and in its sole discretion to request that you remove all links or any particular link to our Web site. You agree to immediately remove all links to our Web site upon such request. 
             </p>
            <p className="pb-[1rem]">
            We also reserve the right to amend these terms and conditions and its linking policy at any time. 
            </p>

            <p className="pb-[1rem]">By continuing to link to our Web site, you agree to be bound to and abide by these linking terms and conditions.</p>
        </div>
    </div>
    )
}
const RemovalOfLinksFromOurSite =()=>{
    return(
        <div className="w-[80%]" id="RemovalOfLinksFromOurSite">
        <h1 className="font-satoshi font-[900] text-[2rem] pb-[0.875rem]">Removal of links from our website</h1>

        <div className="font-satoshi font-[400] text-[18px] text-[#1D2433]">
            <p className="pb-[1rem]">
            f you find any link on our Web site or any linked web site objectionable for any reason, you may contact us about this. We will consider requests to remove links but will have no obligation to do so or to respond directly to you.
             </p>
            <p className="pb-[1rem]">
            Whilst we endeavor to ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we commit to ensuring that the website remains available or that the material on the website is kept up to date.
            </p>

        </div>
    </div>
    )
}
const Disclaimer=()=>{
    return(
        <div 
        className="w-[80%] font-satoshi"
        id="Disclaimer"
        >
            <h1 className="font-satoshi font-[900] text-[2rem] pb-[0.875rem]">Disclaimer</h1>

            <p
            className="font-satoshi font-[400] text-[18px] text-[#1D2433] pb-[14px]" 
            >
To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website (including, without limitation, any warranties implied by law in respect of satisfactory quality, fitness for purpose and/or the use of reasonable care and skill). Nothing in this disclaimer will:
            </p>

            <div
             className="flex gap-[1rem] flex-col"
            >
                <ListedItems>
                Limit or exclude our or your liability for death or personal injury resulting from negligence;
            </ListedItems>

            <ListedItems>
            Limit or exclude our or your liability for fraud or fraudulent misrepresentation;
            </ListedItems>

            <ListedItems>
            Limit any of our or your liabilities in any way that is not permitted under applicable law; or
            </ListedItems>

            <ListedItems>
            Exclude any of our or your liabilities that may not be excluded under applicable law.
            </ListedItems>

            </div>

            <p className="py-[1rem]">
            The limitations and exclusions of liability set out in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer or in relation to the subject matter of this disclaimer, including liabilities arising in contract, in tort (including negligence) and for breach of statutory duty.
            </p>
            <p className="pb-[1rem]">To the extent that the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p>
        </div>
    )
}
const TermsAndConditions = ()=>{
    const [currentSection,setCurrentSection] = useState('WelcomeDiv')

    useEffect(()=>{ 
        const sections = document.querySelectorAll('.content-section')
        window.addEventListener('scroll',()=>{
            // let current = "";
            sections.forEach((section) => {
                // @ts-ignore
                const sectionTop = section?.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - sectionHeight / 10) {
                //   current = section.getAttribute("id");
                  console.log({current: section.getAttribute("id") ,section,child:section.firstElementChild })

                  if(section.firstElementChild ){
                    setCurrentSection(section.firstElementChild.getAttribute('id'));
                  }
                }
              });
            
        })
    },[])

    return (
        <main className=" font-satoshi relative ">
            <Navbar />


            <div className="px-[2rem]" id="terms-condition">
                <div className="w-[100%] h-[300px]  mt-[90px] flex items-center justify-center rounded-[8px] beach_bush_img">
                    <h1 className="text-white font-[900] text-[3.5rem]">Terms & Conditions</h1>
                </div>

                <div className="mt-[70px]  flex  gap-[2.5rem] relative">
                   <div className="w-[275px]">
                     {/* side bar */}
                     <ul className="w-[275px] border-l-[2px] sticky top-[0] left-0">
                        <li className={`cursor-pointer px-[1.5rem] py-[0.75rem] font-[500] text-[1rem] text-[#676E7E] 
                            ${currentSection==='WelcomeDiv'?' text-black font-[700] border-l-[#0D6EFD] border-l-[4px]':''}`}
                            onClick={()=>{
        ScrollToNavBarDetail({ value:'WelcomeDiv', offset: 50 });
        setCurrentSection('WelcomeDiv')
                            }}
                            >Welcome</li>
                        <li className={`cursor-pointer px-[1.5rem] py-[0.75rem] font-[500] text-[1rem] text-[#676E7E] ${currentSection==='Cookies'?' text-black font-[700] border-l-[#0D6EFD] border-l-[4px]':''}`}
                                                    onClick={()=>{
                                                        ScrollToNavBarDetail({ value:'Cookies', offset: 50 });
        setCurrentSection('Cookies');

                                                                            }}
                        >Cookies</li>
                        <li  className={`cursor-pointer px-[1.5rem] py-[0.75rem] font-[500] text-[1rem] text-[#676E7E] ${currentSection==='License'?' text-black font-[700] border-l-[#0D6EFD] border-l-[4px]':''}`}
                             onClick={()=>{
                                ScrollToNavBarDetail({ value:'License', offset: 50 });
        setCurrentSection('License');

                                                    }}
                        >License</li>
                        <li  className={`cursor-pointer px-[1.5rem] py-[0.75rem] font-[500] text-[1rem] text-[#676E7E] ${currentSection==='UserComments'?' text-black font-[700] border-l-[#0D6EFD] border-l-[4px]':''}`}
                         onClick={()=>{
                            ScrollToNavBarDetail({ value:'UserComments', offset: 50 });
        setCurrentSection('UserComments');

                                                }}
                        >User Comments</li>
                        <li  className={`cursor-pointer px-[1.5rem] py-[0.75rem] font-[500] text-[1rem] text-[#676E7E] ${currentSection==='HyperLinkingToOurContent'?' text-black font-[700] border-l-[#0D6EFD] border-l-[4px]':''}`}
                           onClick={()=>{
                            ScrollToNavBarDetail({ value:'HyperLinkingToOurContent', offset: 50 });
        setCurrentSection('HyperLinkingToOurContent');

                                                }}
                        >Hyperlinking to our Content</li>
                        <li className={`cursor-pointer px-[1.5rem] py-[0.75rem] font-[500] text-[1rem] text-[#676E7E] ${currentSection==='ContentLiablity'?' text-black font-[700] border-l-[#0D6EFD] border-l-[4px]':''}`}
                             onClick={()=>{
                                ScrollToNavBarDetail({ value:'ContentLiablity', offset: 50 });
        setCurrentSection('ContentLiablity');

                                                    }}
                        >Content Liability</li>
                        <li  className={`cursor-pointer px-[1.5rem] py-[0.75rem] font-[500] text-[1rem] text-[#676E7E] ${currentSection==='ReservationOfFlights'?' text-black font-[700] border-l-[#0D6EFD] border-l-[4px]':''}`}
                           onClick={()=>{
                            ScrollToNavBarDetail({ value:'ReservationOfFlights', offset: 50 });
        setCurrentSection('ReservationOfFlights');

                                                }}
                        >Reservation of Rights</li>
                        <li  className={`cursor-pointer px-[1.5rem] py-[0.75rem] font-[500] text-[1rem] text-[#676E7E] ${currentSection==='RemovalOfLinksFromOurSite'?' text-black font-[700] border-l-[#0D6EFD] border-l-[4px]':''}`}
                          onClick={()=>{
                            ScrollToNavBarDetail({ value:'RemovalOfLinksFromOurSite', offset: 50 });
        setCurrentSection('RemovalOfLinksFromOurSite');

                                                }}
                        >Removal of links from our website</li>
                        <li  className={`cursor-pointer px-[1.5rem] py-[0.75rem] font-[500] text-[1rem] text-[#676E7E] ${currentSection==='Disclaimer'?' text-black font-[700] border-l-[#0D6EFD] border-l-[4px]':''}`}
                            onClick={()=>{
                                ScrollToNavBarDetail({ value:'Disclaimer', offset: 50 });
        setCurrentSection('Disclaimer');

                                                    }}
                        >Disclaimer</li>
                    </ul>
                    {/* end side bar */}
                   </div>
                   <div className="w-[100%] flex flex-col gap-[3rem]">
                        <div className="w-[100%] flex items-start gap-[2rem] content-section"
                            //  style={{'border':'1px solid red'}}
                            > 
                                <WelcomeDiv />
                                <BlueNotePin 
                                name="More simply put"
                                body="Every company has its terms. These are ours. They include rules and regulations for the use of our website"
                                />

                        </div>

                        <div
                        className="w-[100%] flex items-start gap-[2rem] content-section"
                        >
                            <Cookies />
                            <BlueNotePin 
                            name="More simply put"
                            body="
                            Feel free to peek around and even print stuff from our site for your personal use. But sorry, you can't sell it, remix it into a hit song, or use it to wallpaper your bathroom. Cool?
                            "
                            />
                        </div>

                        <div
                        className="w-[100%] flex items-start gap-[2rem] content-section"
                        >
                            <License/>
                            <BlueNotePin
                            name="More simply put"
                            body="Feel free to peek around and even print stuff from our site for your personal use. But sorry, you can't sell it, remix it into a hit song, or use it to wallpaper your bathroom. Cool?"
                            />
                        </div>

                        <div
                        className="w-[100%] flex items-start gap-[2rem] content-section"
                        >
                            <UserComments/>
                            <BlueNotePin
                            name="More simply put"
                            body="
                            Got something to say? Awesome! But keep it classy, folks. No trolling or dropping spicy memes that would make grandma blush. We reserve the right to boot any comments that don't play nice.
                            "
                            />
                        </div>

                        <div
                        className="w-[100%] flex items-start gap-[2rem] content-section"
                        >
                            <HyperLinkingToOurContent/>
                            <BlueNotePin
                            name="More simply put"
                            body="
                           Want to shout about us from the digital rooftops? Go for it! Just make sure your link game is strong, and you're not leading folks down any shady alleyways. Oh, and if we're not feeling the vibe, we might politely ask you to take down the link.
                            "
                            />
                        </div>

                        <div
                        className="w-[100%] flex items-start gap-[2rem] content-section"
                        >
                            <ContentLiablity/>
                            <BlueNotePin
                            name="More simply put"
                            body="
                         We're like that friend who gives great advice but won't bail you out of jail. We're not responsible for content on other websites that link to us.
                            "
                            />
                        </div>

                        <div
                        className="w-[100%] flex items-start gap-[2rem] content-section"
                        >
                            <ReservationOfFlights/>
                            <BlueNotePin
                            name="More simply put"
                            body="
                         We're the kings and queens of our digital castle. If we're not vibing with a link, we might kindly ask you to remove it. Flexibility is our middle name, though, so let's chat if you're unsure.
                         "
                            />
                        </div>

                        <div
                        className="w-[100%] flex items-start gap-[2rem] content-section"
                        >
                            <RemovalOfLinksFromOurSite/>
                            <BlueNotePin
                            name="More simply put"
                            body="
                       If something's not your cup of tea on our site, just give us a holler. We're all about spreading good vibes, so we'll consider your request to nix any links that don't jive with your style.
                         "
                            />
                        </div>


                        <div
                        className="w-[100%] flex items-start gap-[2rem] content-section" 
                        >
                            <Disclaimer/>
                            <BlueNotePin
                            name="More simply put"
                            body="
                       While we strive to be as accurate as a GPS on a road trip, we can't guarantee there won't be a few detours along the way. So, browse responsibly, and if anything goes awry, just remember, we're in this digital adventure together!
                            "
                            />
                        </div>
                   </div>
                    
                </div>
            </div>



        </main>

    )
}
export default TermsAndConditions;