
const HorizontalCard = ({flip,imgSrc,text}) => {
    return (
        <div className="container mt-5">
            <div className="row">
                {flip ? (
                    <>
                        <HorizontalCardText text={text} />
                        <HorizontalCardImage flip={flip} imgSrc={imgSrc} />
                    </>
                ) : (
                    <>
                        <HorizontalCardImage flip={flip} imgSrc={imgSrc} />
                        <HorizontalCardText text={text} />
                    </>
                )}
            </div>
        </div>
    )
}

function HorizontalCardImage({flip,imgSrc}) {
    return(
        <div className="col-md-6">
            <img src={imgSrc} alt="" className={`img-fluid rounded-${flip ? 'end' : 'start'}`}/>
        </div>
    )
}

function HorizontalCardText({text}) {
    return(
        <div className="col-md-6">
            <div className="d-flex align-items-center h-100">
                <p className="fs-3 fw-semibold text-center">
                    {text}
                </p>
            </div>
        </div>
    )
}

export default HorizontalCard