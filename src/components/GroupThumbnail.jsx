import '../styles/components.css'

export default function GroupThumbnail() {

    return (
        <div className='group_thumbnail'>
            <div className='group_thumbnail_left'>
                <i className="fas fa-users"></i>
            </div>
            <div className='group_thumbnail_right'>
                <h3><a>GrupoName</a></h3>
                <span className="group_info">
                    50 membros
                </span>
            </div>
        </div>
    )
}