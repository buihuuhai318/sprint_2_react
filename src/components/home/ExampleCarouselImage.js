


function ExampleCarouselImage(props) {
    return (
        <>
            <img src={props.link} className="d-block w-100" alt="..."
                            style={{ maxHeight: '100em', objectFit: 'cover' }}/>
        </>
    )
}

export default ExampleCarouselImage;