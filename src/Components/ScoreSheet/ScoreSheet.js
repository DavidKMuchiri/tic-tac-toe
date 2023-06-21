import './ScoreSheet.css';

const ScoreSheet = ({playerScore, programmingScore}) =>{

    return(
        <div className='scoreSheet'>
            <div>
                <h2>You</h2>
                <p>{playerScore}</p>

            </div>
            <div className='computerScore'>
                <h2>Programming</h2>
                <p>{programmingScore}</p>
            </div>
        </div>
    )
}

export default ScoreSheet;