
import CenteredContent from "../components/CenteredContent"
import HorizontalCard from "../components/HorizontalCard"
import bannerImg from "../imgs/MainPage/banner.png"
import lonelyStudent from "../imgs/MainPage/lonely_student.svg"
import groupStudents from "../imgs/MainPage/group_students.jpg"
import partyStudents from "../imgs/MainPage/party_students.svg"
import { Link } from "react-router-dom"

const MainPage = () => {
    return(
        <>
            <div className="p-5">
                <Banner text="Don't study alone anymore" imgSrc={bannerImg} />
                <CenteredContent>
                    <div className="p-5">
                        <h2 className="fw-bold text-center">We help institutions reach out to their students</h2>
                        <CenteredContent>
                            <div className="w-75">
                                <p className="fs-5 text-wrap text-center">
                                    Our mission is to empower educational institutions to foster stronger, 
                                    more effective communication with their students. Through innovative solutions and dedicated support, we facilitate the bridge that connects educators and learners, 
                                    ensuring a seamless and enriching educational experience for all.
                                </p>
                            </div>
                        </CenteredContent>
                    </div>
                </CenteredContent>
            </div>
            <HorizontalCard flip={false} imgSrc={lonelyStudent} text={"Always working alone? Maybe you just entered a new school and now have no friends."}/>
            <HorizontalCard flip={true} imgSrc={groupStudents} text={"Do you get put into that group with students in the same situation as you?"}/>
            <HorizontalCard flip={false} imgSrc={partyStudents} text={"Or do you just want to be updated on all the events that happen in your institution?"}/>
            <div className="p-5">
                <CenteredContent>
                    <div>
                        <h2 className="fw-bold text-center">Say no more</h2>
                        <div className="container">
                            <div className="row">
                                <div className="d-flex justify-content-center">
                                    <div className="w-75">
                                        <p className="fs-5 text-wrap text-center">
                                            With {"OneCampus"} you icebreak and socialize easily with other people in your classes, help others, meet new people, stay up-to-date on
                                            the events of your institution and more...
                                        </p>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center mb-5">
                                    <Link to="/login" className="btn btn-primary">Login to your institution</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </CenteredContent>
            </div>
        </>
    )
}

function Banner({text,imgSrc}) {
    return(
        <div>
            <div className="position-relative">
                <img src={imgSrc} className="img-fluid" alt=""/>
                <div className="position-absolute top-50 ms-5">
                    <h1 className="text-center text-white fw-bold">{text}</h1>
                </div>
            </div>
        </div>
    )
}

export default MainPage