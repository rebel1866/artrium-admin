const WaitSpinner = () => {
    return (<div style={
        {
            position: 'absolute',
            width: '150px',
            height: '130px',
            backgroundColor: 'white',
            top: '40%',
            left: '40%',
            borderRadius: '3px'
        }
    }>
        <div style={{
            position: 'absolute',
            top: '40%',
            left: '40%',
        }} className={"spinner-border text-success"}></div>
    </div>);
}

export default WaitSpinner;